const {
  createMessage,
  getMessagesByConversationId,
} = require('../repositories/message');

const {
  APIError,
} = require('../errors');

// PURPOSE: implement the post comment endpoint
async function postMessage(req, res, next) {
  const { conversationID, senderID, message } = req.body;

  try {
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

// PURPOSE: implement the get comments by listing id endpoint
async function getMessages(req, res, next) {
  const conversationID = req?.params?.id;

  try {
    const messages = await getMessagesByConversationId(parseInt(conversationID, 10));

    return res.status(200).json({ messages });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

module.exports = {
  postMessage,
  getMessages,
};
