const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
const sequelize = require('./db');

// PURPOSE: used to insert a new comment to the db
async function createComment(userID, listingID, comment, isAuthor) {
  const [result] = await sequelize.query(
    `INSERT INTO fujiji_comments
            (user_id, listing_id, comment, isHighlighted, isAuthor, creation_date)
          OUTPUT INSERTED.*
          VALUES
            ($1, $2, $3, $4, $5, getutcdate());`,
    {
      bind: [userID, listingID, comment, 0, isAuthor],
      type: Sequelize.INSERT,
    },
  );
  logDebug('DEBUG-createComment', result);
  return result[0];
}

// PURPOSE: used to fetch comments from the db based on the listing_id
async function getComments(listingID) {
  const [result] = await sequelize.query(
    'SELECT * FROM fujiji_comments WHERE listing_id = ?;',
    {
      replacements: [listingID],
      type: Sequelize.SELECT,
    },
  );
  logDebug('DEBUG-getComments', result);
  return result;
}

module.exports = {
  createComment,
  getComments,
};
