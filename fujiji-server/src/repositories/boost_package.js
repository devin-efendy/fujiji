const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
const sequelize = require('./db');

// PURPOSE: used to fetch a comment from the db based on its id
async function getBoostPackageById(packageid) {
  const [result] = await sequelize.query(
    'SELECT * FROM fujiji_boost_package WHERE package_id = ?;',
    {
      replacements: [packageid],
      type: Sequelize.SELECT,
    },
  );
  logDebug('DEBUG-getBoostPackageById', result);
  return result[0];
}

module.exports = {
  getBoostPackageById,
};
