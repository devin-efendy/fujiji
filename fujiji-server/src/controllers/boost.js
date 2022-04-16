const {
  createBoost,
} = require('../repositories/boost');
const { getListingById } = require('../repositories/listing');
const { getBoostPackageById } = require('../repositories/boost_package');
const { getBoostByListingID } = require('../repositories/boost');

const {
  APIError,
  ListingNotFound,
  PackageNotFound,
  BoostAlreadyExists,
} = require('../errors');

// PURPOSE: implement the post boost endpoint
async function postBoost(req, res, next) {
  const { listing_id: listingID } = req.params;
  const { packageID } = req.body;

  const listing = await getListingById(parseInt(listingID, 10));

  if (!listing) {
    console.log(`listing with id:${listingID} is not found`);
    return next(
      new ListingNotFound(`listing with id:${listingID} is not found`),
    );
  }

  const boostPackage = await getBoostPackageById(packageID);

  if (!boostPackage) {
    console.log(`boost package with id:${packageID} is not found`);
    return next(
      new PackageNotFound(`boost package with id:${packageID} is not found`),
    );
  }

  const boost = await getBoostByListingID(listingID);

  if (boost) {
    console.log(`boost for listing id: ${listingID} already exists`);
    return next(
      new BoostAlreadyExists(`boost for listing id: ${listingID} already exists`),
    );
  }

  const score = boostPackage.duration * 5;

  try {
    const insertBoostResult = await createBoost(
      listingID,
      packageID,
      score,
    );

    return res.status(200).json({ id: insertBoostResult.listing_id });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

module.exports = {
  postBoost,
};
