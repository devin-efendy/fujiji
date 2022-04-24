const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postMessage,
  getMessages,
} = require('../controllers/message');

const router = express.Router();

router.post('/', authentication, postMessage);
router.get('/:id', authentication, getMessages);

module.exports = router;
