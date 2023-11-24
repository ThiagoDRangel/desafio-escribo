const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models/index');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

const gerarToken = (id) => jwt.sign({ id }, 'seuSegredoJWT', { expiresIn: '30m' });

router.post('/signup', async (req, res) => {
  try {
    const { nome, email, senha, telefones } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ mensagem: "E-mail já existente" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      nome,
      email,
      senha: hashedPassword,
      telefones
    });

    const token = gerarToken(user.id);
    res.status(201).json({
      id: user.id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: new Date(),
      token
    });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ mensagem: "Usuário e/ou senha inválidos" });
    }

    const token = gerarToken(user.id);
    res.json({
      id: user.id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: new Date(),
      token
    });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

router.get('/user', verificarToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.usuarioId);

    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const { senha, ...userWithoutPassword } = user.get();
    res.json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

module.exports = router;
