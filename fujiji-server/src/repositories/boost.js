const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
const sequelize = require('./db');

// PURPOSE: used to insert a new comment to the db
async function createBoost(listingID, packageid, score) {
  const [result] = await sequelize.query(
    `INSERT INTO fujiji_boost
            (listing_id, package_id, score, creation_date)
          OUTPUT INSERTED.*
          VALUES
            ($1, $2, $3, getutcdate());`,
    {
      bind: [listingID, packageid, score],
      type: Sequelize.INSERT,
    },
  );
  logDebug('DEBUG-createBoost', result);
  return result[0];
}

module.exports = {
  createBoost,
};
