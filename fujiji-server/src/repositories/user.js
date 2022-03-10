const { QueryTypes } = require('sequelize');
const { logDebug } = require('../utils/logging');
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
  logDebug('DEBUG-getUserByEmail', result);
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
  logDebug('DEBUG-createUser', result);
  return result[0];
}

async function getUserByID(id) {
  try {
    const [userByID] = await sequelize.query(
      'SELECT * FROM fujiji_user WHERE user_id = ?',
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      },
    );
    logDebug('DEBUG-userByID', userByID);
    return userByID;
  } catch (err) {
    return err;
  }
}

async function getUserListingsByID(id) {
  try {
    const userListings = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE user_id = ?',
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      },
    );
    logDebug('DEBUG-userListings', userListings);
    return userListings;
  } catch (err) {
    return err;
  }
}

async function updateUser(name, email, phoneNumber, password, userID) {
  const [result] = await sequelize.query(
    `UPDATE fujiji_user
     SET name = ?, email_address = ?, phone_number = ?, password = ? 
     WHERE user_id = ?`,
    {
      replacements: [
        name,
        email,
        phoneNumber,
        password,
        userID,
      ],
      type: QueryTypes.UPDATE,
    },
  );
  logDebug('DEBUG-updateUser', result);
  return result[0];
}

module.exports = {
  testGetUser,
  getUserByEmail,
  createUser,
  getUserByID,
  getUserListingsByID,
  updateUser,
};
