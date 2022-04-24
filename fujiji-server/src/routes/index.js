const express = require('express');

const router = express.Router();
const user = require('./user');
const listing = require('./listing');
const auth = require('./auth');
const comment = require('./comment');
const boost = require('./boost');
const conversation = require('./conversation');
const message = require('./message');

// --- Routes ---
router.use('/user', user);
router.use('/listing', listing);
router.use('/auth', auth);
router.use('/comment', comment);
router.use('/boost', boost);
router.use('/conversation', conversation);
router.use('/message', message);

module.exports = router;
