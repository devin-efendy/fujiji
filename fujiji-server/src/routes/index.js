const express = require('express');

const router = express.Router();
const user = require('./user');
const listing = require('./listing');
const auth = require('./auth');

// --- Routes ---
router.use('/user', user);
router.use('/listing', listing);
router.use('/auth', auth);

module.exports = router;
