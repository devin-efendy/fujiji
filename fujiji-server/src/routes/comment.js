const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postComment,
  getListingComments,
  editComment,
  deleteComment,
  replyComment,
  deleteCommentReply,
} = require('../controllers/comment');

const router = express.Router();

// POST /comment/listing_id, user must be authenticated
router.post('/:listing_id', authentication, postComment);

// GET /comment/listing_id
router.get('/:listing_id', getListingComments);

// PUT /comment/comment_id
router.put('/:comment_id', authentication, editComment);

// DEL /comment/comment_id
router.delete('/:comment_id', authentication, deleteComment);

// to reply to a comment specified by their comment_id
router.put('/reply/:comment_id', authentication, replyComment);

// to delete a comment's reply
router.put('/delete-reply/:comment_id', authentication, deleteCommentReply);

module.exports = router;
