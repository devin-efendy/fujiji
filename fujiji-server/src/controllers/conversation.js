const {
  createConversation,
  getConversationsByUserId,
  getConversationsByConId,
  getConversationIdByListingIdUsersID,
} = require('../repositories/conversation');

const {
  getListingById,
} = require('../repositories/listing');

const {
  APIError,
  ConversationNotFoundError,
} = require('../errors');

// PURPOSE: implement the post conversation endpoint
async function postConversation(req, res, next) {
  /* eslint consistent-return: off */
  const { listingID, senderID, receiverID } = req.body;

  try {
    const insertConversationResult = await createConversation(
      listingID,
      senderID,
      receiverID,
    );
    return res.status(200).json({ id: insertConversationResult.conversation_id });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

// PURPOSE: implement the get conversations endpoint
async function getConversations(req, res, next) {
  /* eslint consistent-return: off */
  const userID = req?.params?.id;

  try {
    const conversations = await getConversationsByUserId(parseInt(userID, 10));

    if (conversations.length === 0) {
      next(new ConversationNotFoundError());
      return;
    }

    for (let index = 0; index < conversations.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      const listing = await getListingById(conversations[index].listing_id);
      // add no listing error
      conversations[index].listingData = {
        title: listing.title,
        image_url: listing.image_url,
        listingUserId: listing.user_id,
      };
    }

    return res.status(200).json({ conversations });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

// PURPOSE: implement the get conversations by conversation id endpoint
async function getConversationsByConversationId(req, res, next) {
  /* eslint consistent-return: off */
  const conversationID = req?.params?.id;

  try {
    const conversations = await getConversationsByConId(parseInt(conversationID, 10));

    if (conversations.length === 0) {
      next(new ConversationNotFoundError());
      return;
    }

    return res.status(200).json({ conversations });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

// PURPOSE: implement the get conversation id endpoint
async function getConversationId(req, res, next) {
  const senderID = req.query.senderID;
  const receiverID = req.query.receiverID;
  const { listing_id: listingID } = req.params;

  try {
    const conversationID = await getConversationIdByListingIdUsersID(
      parseInt(listingID, 10),
      parseInt(senderID, 10),
      parseInt(receiverID, 10),
    );

    if (conversationID.length === 0) {
      next(new ConversationNotFoundError());
      return;
    }

    return res.status(200).json({ conversationID });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

module.exports = {
  postConversation,
  getConversations,
  getConversationsByConversationId,
  getConversationId,
};
