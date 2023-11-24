const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/database/models');

// Mocks para o modelo User
jest.mock('../src/database/models', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
  }
}));

// Mock para o middleware verificarToken
jest.mock('../src/middleware/verificarToken', () => (req, res, next) => {
  req.usuarioId = 1;
  next();
});

describe('POST /signup', () => {
  it('Deve criar um novo usuário', async () => {
    User.findOne.mockResolvedValueOnce(null);
    User.create.mockResolvedValueOnce({
      id: 1,
      nome: 'Teste',
      email: 'teste@teste.com',
      telefones: [{ numero: '123456789', ddd: '11' }],
      createdAt: new Date(),
      updatedAt: new Date(),
      get: jest.fn().mockReturnValue({})
    });

    const response = await request(app)
      .post('/signup')
      .send({
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123456',
        telefones: [{ numero: '123456789', ddd: '11' }]
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('data_criacao');
    expect(response.body).toHaveProperty('data_atualizacao');
    expect(response.body).toHaveProperty('ultimo_login');
    expect(response.body).toHaveProperty('token');
  });
});

describe('POST /signin', () => {
  it('Deve autenticar um usuário existente', async () => {
    User.findOne.mockResolvedValueOnce({
      id: 1,
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'senha_criptografada_mockada',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    jest.mock('bcryptjs', () => ({
      compare: jest.fn().mockResolvedValue(true)
    }));

    // Implemente o teste para a rota /signin aqui
  });
});

describe('GET /user', () => {
  it('Deve retornar informações do usuário', async () => {
    const fakeUser = {
      id: 1,
      nome: 'Teste',
      email: 'teste@teste.com',
      telefones: [{ numero: '123456789', ddd: '11' }],
      createdAt: new Date(),
      updatedAt: new Date(),
      get: jest.fn().mockReturnValue({
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com',
        telefones: [{ numero: '123456789', ddd: '11' }]
      })
    };

    User.findByPk.mockResolvedValue(fakeUser);

    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer fake_token`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Teste');
    expect(response.body).toHaveProperty('email', 'teste@teste.com');
    expect(response.body).not.toHaveProperty('senha');
  });
});
