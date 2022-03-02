const { QueryTypes } = require('sequelize');
const sequelize = require('./db');

async function testGetUser() {
  try {
    const [allUser] = await sequelize.query('SELECT * FROM fujiji_user');
    return allUser;
  } catch (err) {
    return err;
  }
}

async function getUserByEmail(email) {
  const [result] = await sequelize.query(
    `SELECT * FROM fujiji_user WHERE email_address='${email}'`,
  );
  return result[0];
}

async function createUser(email, password, name, phoneNumber) {
  const [result] = await sequelize.query(
    `INSERT INTO fujiji_user
      (name, email_address, phone_number, password)
    OUTPUT INSERTED.*
    VALUES  
      ($1, $2, $3, $4);`,
    { bind: [name, email, phoneNumber, password], type: QueryTypes.INSERT },
  );
  return result[0];
}

module.exports = { testGetUser, getUserByEmail, createUser };
