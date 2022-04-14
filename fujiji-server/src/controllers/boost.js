const {
  createBoost,
} = require('../repositories/boost');
const { getListingById } = require('../repositories/listing');
const { getBoostPackageById } = require('../repositories/boost_package');

const {
  APIError,
  ListingNotFound,
  PackageNotFound,
} = require('../errors');

// PURPOSE: implement the post boost endpoint
async function postBoost(req, res, next) {
  const { listing_id: listingID } = req.params;
  const packageid = req.query.packageID;

  const listing = await getListingById(parseInt(listingID, 10));

  if (!listing) {
    return next(
      new ListingNotFound(`listing with id:${listingID} is not found`),
    );
  }

  const boostPackage = await getBoostPackageById(packageid);

  if (!boostPackage) {
    return next(
      new PackageNotFound(`boost package with id:${packageid} is not found`),
    );
  }

  const score = boostPackage.duration * 5;

  try {
    const insertBoostResult = await createBoost(
      listingID,
      packageid,
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
