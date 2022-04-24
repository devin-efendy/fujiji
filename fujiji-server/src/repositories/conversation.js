const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
const sequelize = require('./db');

// PURPOSE: used to insert a new conversation to the db
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

// PURPOSE: used to fetch conversations from the db based on the user_id
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

// PURPOSE: used to fetch conversations from the db based on the conversation_id
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

// PURPOSE: used to fetch conversation id from the db based on the user_id
async function getConversationIdByListingIdUsersID(listingID, senderID, receiverID) {
  const [result] = await sequelize.query(
    `SELECT conversation_id FROM fujiji_conversations
      WHERE (listing_id = ? AND sender_id = ? AND receiver_id = ?) 
        OR (listing_id = ? AND receiver_id = ? AND sender_id = ?)`,
    {
      replacements: [listingID, senderID, receiverID, 
        listingID, senderID, receiverID],
      type: Sequelize.SELECT,
    },
  );
  logDebug('DEBUG-getConversationIdByListingIdUsersID', result);
  return result[0];
}

module.exports = {
  createConversation,
  getConversationsByUserId,
  getConversationsByConId,
  getConversationIdByListingIdUsersID,
};
