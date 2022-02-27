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

async function getAllListingsByCity(city) {
  try {
    const [listingsByCity] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE city = ?',
      {
        replacements: [city],
        type: Sequelize.SELECT,
      },
    );
    console.log('DEBUG-listingsByCity');
    console.log(listingsByCity);
    return listingsByCity;
  } catch (err) {
    return err;
  }
}

async function getAllListingsByProvince(provinceCode) {
  try {
    const [listingsByProvince] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE province_code = ?',
      {
        replacements: [provinceCode],
        type: Sequelize.SELECT,
      },
    );
    console.log('DEBUG-listingsByProvince');
    console.log(listingsByProvince);
    return listingsByProvince;
  } catch (err) {
    return err;
  }
}

async function getAllListingsDefault() {
  try {
    const [listingsByCity] = await sequelize.query('SELECT * FROM fujiji_listing');
    console.log('DEBUG-listingsByCity');
    console.log(listingsByCity);
    return listingsByCity;
  } catch (err) {
    return err;
  }
}

module.exports = { getAllListingsDefault, getAllListingsByCity, getAllListingsByProvince };
