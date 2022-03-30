const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postComment,
} = require('../controllers/comment');

const router = express.Router();

router.post('/:listing_id', authentication, postComment);

module.exports = router;
