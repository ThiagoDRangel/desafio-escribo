module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefones: DataTypes.JSON,
  }, {
    tableName: 'users',
  });

  return User;
};
