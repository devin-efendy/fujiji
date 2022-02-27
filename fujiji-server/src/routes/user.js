const express = require('express');
const { testEndpoint } = require('../controllers/user');

const router = express.Router();

router.get('/testEndpoint', testEndpoint);

module.exports = router;
