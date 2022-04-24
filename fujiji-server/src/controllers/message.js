const {
  createMessage,
  getMessagesByConversationId,
} = require('../repositories/message');

const {
  getConversationsByConId,
} = require('../repositories/conversation')

const {
  APIError,
  ConversationNotFoundError,
  MessageNotFoundError,
} = require('../errors');

// PURPOSE: implement the post message endpoint
async function postMessage(req, res, next) {
  const { conversationID, senderID, message } = req.body;

  try {
    const conversations = await getConversationsByConId(conversationID)

    if (conversations.length === 0) {
      next(new ConversationNotFoundError());
      return;
    }

    const insertMessageResult = await createMessage(
      senderID,
      conversationID,
      message,
    );

    return res.status(200).json({ message: insertMessageResult });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

// PURPOSE: implement the get messages endpoint
async function getMessages(req, res, next) {
  const conversationID = req?.params?.id;

  try {
    const messages = await getMessagesByConversationId(parseInt(conversationID, 10));

    if (messages.length === 0) {
      next(new MessageNotFoundError());
      return;
    }

    return res.status(200).json({ messages });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

module.exports = {
  postMessage,
  getMessages,
};
