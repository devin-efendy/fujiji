const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postBoost,
} = require('../controllers/boost');

const router = express.Router();

// POST /boost/listing_id, user must be authenticated
router.post('/:listing_id', authentication, postBoost);

module.exports = router;
