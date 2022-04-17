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

async function getBoostByListingId(listingID) {
  try {
    const [boost] = await sequelize.query(
      'SELECT * FROM fujiji_boost WHERE listing_id = ?',
      {
        replacements: [listingID],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-getBoostByListingId', boost);
    return boost[0];
  } catch (err) {
    return err;
  }
}

module.exports = {
  createBoost, getBoostByListingId,
};
