const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
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
    logDebug('DEBUG-listingsByCity', listingsByCity);
    return listingsByCity;
  } catch (err) {
    return err;
  }
}

async function getAllListingsByCityCategory(city, category) {
  try {
    const [listingsByCityCategory] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE city = ? AND category = ?',
      {
        replacements: [city, category],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-listingsByCityCategory', listingsByCityCategory);
    return listingsByCityCategory;
  } catch (err) {
    return err;
  }
}

async function getAllListingsByCityCondition(city, condition) {
  try {
    const [listingsByCityCondition] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE city = ? AND condition = ?',
      {
        replacements: [city, condition],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-listingsByCityCondition', listingsByCityCondition);
    return listingsByCityCondition;
  } catch (err) {
    return err;
  }
}

async function getAllListingsByCityPriceRange(city, startPrice, endPrice) {
  try {
    const [listingsByCityPriceRange] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE city = ? AND price BETWEEN ? AND ?',
      {
        replacements: [city, startPrice, endPrice],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-listingsByCityPriceRange', listingsByCityPriceRange);
    return listingsByCityPriceRange;
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
    logDebug('DEBUG-listingsByProvince', listingsByProvince);
    return listingsByProvince;
  } catch (err) {
    return err;
  }
}

async function getAllListingsByProvinceCategory(provinceCode, category) {
  try {
    const [listingsByProvinceCategory] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE province_code = ? AND category = ?',
      {
        replacements: [provinceCode, category],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-listingsByProvinceCategory', listingsByProvinceCategory);
    return listingsByProvinceCategory;
  } catch (err) {
    return err;
  }
}

async function getAllListingsByProvinceCondition(provinceCode, condition) {
  try {
    const [listingsByProvinceCondition] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE province_code = ? AND condition = ?',
      {
        replacements: [provinceCode, condition],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-listingsByProvinceConditon', listingsByProvinceCondition);
    return listingsByProvinceCondition;
  } catch (err) {
    return err;
  }
}

async function getAllListingsByProvincePriceRange(provinceCode, startPrice, endPrice) {
  try {
    const [listingsByProvincePriceRange] = await sequelize.query(
      'SELECT * FROM fujiji_listing WHERE province_code = ? AND price BETWEEN ? AND ?',
      {
        replacements: [provinceCode, startPrice, endPrice],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-listingsByProvincePriceRange', listingsByProvincePriceRange);
    return listingsByProvincePriceRange;
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
  getAllListingsByCityCategory,
  getAllListingsByProvinceCategory,
  getAllListingsByCityCondition,
  getAllListingsByProvinceCondition,
  getAllListingsByCityPriceRange,
  getAllListingsByProvincePriceRange,
};
