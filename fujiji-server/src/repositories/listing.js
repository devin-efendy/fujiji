const { Sequelize } = require('sequelize');
const sequelize = require('./db');

async function getAllListingsByCity(city) {
  try {
    const [listingsByCity] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE city = ?',
      {
        replacements: [city],
        type: Sequelize.SELECT,
      },
    );
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
    return listingsByProvince;
  } catch (err) {
    return err;
  }
}

async function getAllListingsDefault() {
  try {
    const [listingsByCity] = await sequelize.query(
      'SELECT * FROM fujiji_listing',
    );
    return listingsByCity;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllListingsDefault,
  getAllListingsByCity,
  getAllListingsByProvince,
};
