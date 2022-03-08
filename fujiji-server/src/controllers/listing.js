const {
  getAllListingsByCity,
  getAllListingsByProvince,
  getAllListingsByCityCategory,
  getAllListingsByProvinceCategory,
  getAllListingsByCityCondition,
  getAllListingsByProvinceCondition,
  getAllListingsByCityPriceRange,
  getAllListingsByProvincePriceRange,
  createListing,
  updateListing,
  getListingById: queryByListingId,
  deleteListingById,
} = require('../repositories/listing');

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

async function getByListingId(req, res, next) {
  try {
    const listingID = req?.params?.id;

    const listing = await queryByListingId(listingID);

    if (!listing) {
      return next(
        new ListingNotFoundError(`Listing with id: ${listingID} is not found.`),
      );
    }

    return res.status(200).json({ listing });
  } catch (err) {
    return next(new APIError());
  }
}

async function postListing(req, res, next) {
  try {
    const {
      userID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    } = req.body;
    const newListing = await createListing(
      userID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    );

    res.status(200).json({
      listingId: newListing.listing_id,
    });
  } catch (err) {
    next(new APIError(err, 500));
  }
}

async function editListing(req, res, next) {
  try {
    const {
      userID,
      listingID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    } = req.body;

    await updateListing(
      userID,
      listingID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    );

    const updatedListing = await queryByListingId(parseInt(listingID, 10));
    return res.status(200).json({ updatedListing });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

async function deleteListing(req, res, next) {
  try {
    const listingID = req?.params?.id;
    const { id } = req.locals.userData;

    const listing = await deleteListingById(listingID, id);

    if (listing === 0) {
      return next(
        new ListingNotFoundError(`Listing with id: ${listingID} is not found.`),
      );
    }

    return res.status(200).json({ data: listing });
  } catch (err) {
    return next(new APIError());
  }
}

module.exports = {
  getAllListings,
  getByListingId,
  postListing,
  editListing,
  deleteListing,
};
