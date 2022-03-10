const express = require('express');
const authentication = require('../middleware/authentication');
const { getUser, getUserListings, editUser } = require('../controllers/user');

const router = express.Router();

router.get('/:id', getUser);
router.get('/:id/listings', authentication, getUserListings);
router.put('/:id', authentication, editUser);

module.exports = router;
