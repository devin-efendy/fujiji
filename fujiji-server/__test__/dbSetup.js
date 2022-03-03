const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../src/repositories/db');

const mockUser = {
  name: 'test-user',
  email: 'test-user@email.com',
  password: 'super_strong_password',
  phoneNumber: '2041234444',
};

async function seedUser() {
  const mockUserData = [
    'test-user',
    'test-user@email.com',
    await bcrypt.hash('super_strong_password', 10),
    '2041234444',
  ];

  await sequelize.query(
    `INSERT INTO fujiji_user
      (name, email_address, password, phone_number)
    OUTPUT INSERTED.*
    VALUES  
      ($1, $2, $3, $4);`,
    { bind: [...mockUserData], type: QueryTypes.INSERT },
  );
}

async function seedListing() {
  const [userResult] = await sequelize.query(
    `SELECT * FROM fujiji_user WHERE email_address='${mockUser.email}'`,
  );

  const mockListingData = [
    parseInt(userResult[0].user_id, 10),
    'Dummy Title',
    'used',
    'Other',
    'Winnipeg',
    'MB',
    'https://source.unsplash.com/gySMaocSdqs/',
    80.9,
    'Some description here',
    `${new Date().toISOString()}`,
  ];

  await sequelize.query(
    `INSERT INTO fujiji_listing
      (user_id, title, condition, category, city, province_code, image_url, price, description, creation_date)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
    { bind: [...mockListingData], type: QueryTypes.INSERT },
  );
}

async function seedTestDB() {
  await seedUser();
  await seedListing();
}

async function tearDownDB() {
  await sequelize.query('DELETE FROM fujiji_user');
  await sequelize.query('DELETE FROM fujiji_listing');
}

module.exports = {
  sequelize,
  mockUser,
  seedTestDB,
  tearDownDB,
};
