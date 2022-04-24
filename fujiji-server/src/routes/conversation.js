const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postConversation,
  getConversations,
  getConversationsByConversationId,
} = require('../controllers/conversation');

const router = express.Router();

router.post('/', authentication, postConversation);
router.get('/:id', authentication, getConversationsByConversationId);
router.get('/user/:id', authentication, getConversations);

module.exports = router;
