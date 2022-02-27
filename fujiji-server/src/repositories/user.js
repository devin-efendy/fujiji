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

async function testGetUser() {
  try {
    const [allUser] = await sequelize.query('SELECT * FROM fujiji_user');
    console.log('DEBUG-allUser');
    console.log(allUser);
    return allUser;
  } catch (err) {
    return err;
  }
}

module.exports = { testGetUser };
