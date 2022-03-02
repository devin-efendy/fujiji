const { getAllListingsByCity } = require('../repositories/listing');
const { getAllListingsByProvince } = require('../repositories/listing');
const { getAllListingsByCityCategory } = require('../repositories/listing');
const { getAllListingsByProvinceCategory } = require('../repositories/listing');
const { getAllListingsByCityCondition } = require('../repositories/listing');
const { getAllListingsByProvinceCondition } = require('../repositories/listing');
const { getAllListingsByCityPriceRange } = require('../repositories/listing');
const { getAllListingsByProvincePriceRange } = require('../repositories/listing');
const APIError = require('../errors/api');
const ListingNotFoundError = require('../errors/listing/listingNotFound');
const ListingLocationUndefinedError = require('../errors/listing/listingLocationUndefined');
const ListingInvalidPriceRangeError = require('../errors/listing/listingInvalidPriceRange');

function validatePriceRange(priceRange) {
  try {
    if (priceRange.length == 2) {
      if (priceRange[0] <= priceRange[1]) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return err;
  }
}

async function getListingsByCity(req) {
  try {
    let listings = {};

    if (req.query.category) {
      listings = await getAllListingsByCityCategory(
        req.query.city,
        req.query.category,
      );
    } else if (req.query.condition) {
      listings = await getAllListingsByCityCondition(
        req.query.city,
        req.query.condition,
      );
    } else if (req.query.priceRange) {
      if (!validatePriceRange(req.query.priceRange)) {
        return new ListingInvalidPriceRangeError();
      }
      listings = await getAllListingsByCityPriceRange(
        req.query.city,
        req.query.priceRange[0],
        req.query.priceRange[1],
      );
    } else {
      listings = await getAllListingsByCity(req.query.city);
    }

    return listings;
  } catch (err) {
    return err;
  }
}

async function getListingsByProvince(req) {
  try {
    let listings = {};

    if (req.query.category) {
      listings = await getAllListingsByProvinceCategory(
        req.query.provinceCode,
        req.query.category,
      );
    } else if (req.query.condition) {
      listings = await getAllListingsByProvinceCondition(
        req.query.provinceCode,
        req.query.condition,
      );
    } else if (req.query.priceRange) {
      if (!validatePriceRange(req.query.priceRange)) {
        return new ListingInvalidPriceRangeError();
      }
      listings = await getAllListingsByProvincePriceRange(
        req.query.provinceCode,
        req.query.priceRange[0],
        req.query.priceRange[1],
      );
    } else {
      listings = await getAllListingsByProvince(req.query.provinceCode);
    }

    return listings;
  } catch (err) {
    return err;
  }
}

async function getAllListings(req, res, next) {
  try {
    let listings = {};

    if (req.query.city) {
      listings = await getListingsByCity(req);
    } else if (req.query.provinceCode) {
      listings = await getListingsByProvince(req);
    } else {
      next(new ListingLocationUndefinedError());
      return;
    }

    if (listings.length === 0) {
      next(new ListingNotFoundError());
      return;
    }

    if (listings instanceof APIError) {
      next(listings);
      return;
    }
    res.status(200).json({ listings });
  } catch (err) {
    next(new APIError());
  }
}

module.exports = { getAllListings };
