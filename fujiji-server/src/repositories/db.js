const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/config');

const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;
