const { getAllListingsByCity } = require('../repositories/listing');
const { getAllListingsByProvince } = require('../repositories/listing');
const APIError = require('../errors/api');
const ListingNotFoundError = require('../errors/listing/listingNotFound');
const ListingLocationUndefinedError = require('../errors/listing/listingLocationUndefined');

async function getAllListings(req, res, next) {
  try {
    let listings = {};

    if (req.query.city) {
      listings = await getAllListingsByCity(req.query.city);
    } else if (req.query.provinceCode) {
      listings = await getAllListingsByProvince(req.query.provinceCode);
    } else {
      next(new ListingLocationUndefinedError());
      return;
    }

    if (listings.length === 0) {
      next(new ListingNotFoundError());
      return;
    }
    res.status(200).json({ listings });
  } catch (err) {
    next(new APIError());
  }
}

module.exports = { getAllListings };
