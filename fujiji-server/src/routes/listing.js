const express = require('express');
const authentication = require('../middleware/authentication');
const { postListing, getAllListings } = require('../controllers/listing');

const router = express.Router();

router.post('/', authentication, postListing);
router.get('/', getAllListings);

module.exports = router;
