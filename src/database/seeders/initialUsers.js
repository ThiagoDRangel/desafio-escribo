'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        nome: 'Thiago Rangel',
        email: 'thiago@escribo.com',
        senha: '$2a$10$z5uZ.Vw52EF.3oqWTDwT2uiNlIJYGEUymAIxrWdd1GjDpGkHPJwWK',
        telefones: JSON.stringify([{ numero: '998720889', ddd: '22' }]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
