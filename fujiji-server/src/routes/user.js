const express = require('express');
const authentication = require('../middleware/authentication');
const { getUser, getUserListings } = require('../controllers/user');

const router = express.Router();

router.get('/:id', getUser);
router.get('/:id/listings', authentication, getUserListings);

module.exports = router;
