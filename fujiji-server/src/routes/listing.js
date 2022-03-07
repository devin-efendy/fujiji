const express = require('express');
const authentication = require('../middleware/authentication');
const { postListing, getAllListings, editListing } = require('../controllers/listing');

const router = express.Router();

router.post('/', authentication, postListing);
router.get('/', getAllListings);
router.put('/', authentication, editListing);

module.exports = router;
