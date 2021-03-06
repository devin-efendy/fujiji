const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/config');

const sequelize = new Sequelize(
  dbConfig.NAME,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: 'mssql',
    driver: 'tedious',
    options: {
      encrypt: true,
      database: dbConfig.NAME,
    },
    port: dbConfig.PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    // eslint-disable-next-line no-console
    logging: process.env.NODE_ENV == 'test' ? false : console.log(),
  },
);

module.exports = sequelize;
