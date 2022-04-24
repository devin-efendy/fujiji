const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
const sequelize = require('./db');

// PURPOSE: used to insert a new comment to the db
async function createConversation(listingID, senderID, receiverID) {
  const [result] = await sequelize.query(
    `INSERT INTO fujiji_conversations
            (sender_id, listing_id, receiver_id, creation_date)
          OUTPUT INSERTED.*
          VALUES
            ($1, $2, $3, getutcdate());`,
    {
      bind: [senderID, listingID, receiverID],
      type: Sequelize.INSERT,
    },
  );
  logDebug('DEBUG-createConversation', result);
  return result[0];
}

// PURPOSE: used to fetch comments from the db based on the listing_id
async function getConversationsByUserId(userID) {
  const [result] = await sequelize.query(
    'SELECT * FROM fujiji_conversations WHERE sender_id = ? OR receiver_id = ? ',
    {
      replacements: [userID, userID],
      type: Sequelize.SELECT,
    },
  );
  logDebug('DEBUG-getConversations', result);
  return result;
}

// PURPOSE: used to fetch comments from the db based on the listing_id
async function getConversationsByConId(conversationID) {
  const [result] = await sequelize.query(
    'SELECT * FROM fujiji_conversations WHERE conversation_id = ?',
    {
      replacements: [conversationID],
      type: Sequelize.SELECT,
    },
  );
  logDebug('DEBUG-getConversationsByConversationId', result);
  return result;
}

module.exports = {
  createConversation,
  getConversationsByUserId,
  getConversationsByConId,
};
