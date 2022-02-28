const sequelize = require('./db');

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
