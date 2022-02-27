const express = require('express');
const { getAllListings } = require('../controllers/listing');

const router = express.Router();

router.get('/', getAllListings);

module.exports = router;
