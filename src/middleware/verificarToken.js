const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'seuSegredoJWT');
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensagem: "Sessão inválida" });
    }
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};
