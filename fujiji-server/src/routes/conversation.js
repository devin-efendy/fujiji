const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postConversation,
  getConversations,
  getConversationsByConversationId,
  getConversationId,
} = require('../controllers/conversation');

const router = express.Router();

router.post('/', authentication, postConversation);
router.get('/:id', authentication, getConversationsByConversationId);
router.get('/user/:id', authentication, getConversations);

// require senderID and receiverID as query parameters
router.get('/:listing_id', authentication, getConversationId);

module.exports = router;
