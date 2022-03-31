const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postComment,
  getListingComments,
} = require('../controllers/comment');

const router = express.Router();

router.post('/:listing_id', authentication, postComment);
router.get('/:listing_id', getListingComments);

module.exports = router;
