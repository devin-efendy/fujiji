const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
const sequelize = require('./db');

// PURPOSE: used to insert a new comment to the db
async function createMessage(senderID, conversationID, message) {
  console.log('I am creating');
  const [result] = await sequelize.query(
    'INSERT INTO fujiji_messages (sender_id, conversation_id, message, creation_date) OUTPUT INSERTED.* VALUES ($1, $2, $3, getutcdate());',
    {
      bind: [senderID, conversationID, message],
      type: Sequelize.INSERT,
    },
  );
  console.log(result);
  logDebug('DEBUG-createMessage', result);
  return result[0];
}

// PURPOSE: used to fetch comments from the db based on the listing_id
async function getMessagesByConversationId(conversationID) {
  const [result] = await sequelize.query(
    'SELECT * FROM fujiji_messages WHERE conversation_id = ? ORDER BY creation_date ASC',
    {
      replacements: [conversationID],
      type: Sequelize.SELECT,
    },
  );

  logDebug('DEBUG-getMessages', result);
  return result;
}

module.exports = {
  createMessage,
  getMessagesByConversationId,
};
