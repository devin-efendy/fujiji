const express = require('express');

const router = express.Router();
const user = require('./user');
const listing = require('./listing');
const auth = require('./auth');
const comment = require('./comment');
const boost = require('./boost');

// --- Routes ---
router.use('/user', user);
router.use('/listing', listing);
router.use('/auth', auth);
router.use('/comment', comment);
router.use('/boost', boost);

module.exports = router;
