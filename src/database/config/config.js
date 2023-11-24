const environment = process.env.NODE_ENV || 'test';

const options = {
  host: process.env.MYSQL_HOST || 'escribo-db.cluster-clwt84lh8asx.us-east-2.rds.amazonaws.com',
  port: process.env.MYSQL_PORT || '3306',
  database: 
    `${process.env.MYSQL_DB_NAME || 'escribo-db'}`,
  username: process.env.MYSQL_USER || 'admin',
  password: process.env.MYSQL_PASSWORD || 'Eucatec123!',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
};
