const express = require('express');
const authentication = require('../middleware/authentication');
const {
  postListing,
  getAllListings,
  getByListingId,
  editListing,
  deleteListing,
  getAllListingsBySearch,
} = require('../controllers/listing');

const router = express.Router();

router.post('/', authentication, postListing);
router.get('/', getAllListings);
router.get('/search', getAllListingsBySearch);
router.get('/:id', getByListingId);
router.put('/', authentication, editListing);
router.delete('/:id', authentication, deleteListing);

module.exports = router;
