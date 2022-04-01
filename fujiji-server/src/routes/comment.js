const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postComment,
  getListingComments,
  editComment,
} = require('../controllers/comment');

const router = express.Router();

// POST /comment/listing_id, user must be authenticated
router.post('/:listing_id', authentication, postComment);

// GET /comment/listing_id
router.get('/:listing_id', getListingComments);

// PUT /comment/comment_id
router.put('/:comment_id', authentication, editComment);

module.exports = router;
