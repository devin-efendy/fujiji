const { createComment } = require('../repositories/comment');
const { getListingById } = require('../repositories/listing');

const { APIError, ListingNotFound } = require('../errors');

async function postComment(req, res, next) {
  const { comment } = req.body;
  const { listing_id: listingID } = req.params;
  const { id } = req.locals.userData;
  const userID = parseInt(id, 10);

  if (!comment) {
    return res.status(400).json({ error: "'comment' field can not be empty" });
  }

  const listing = await getListingById(parseInt(listingID, 10));

  if (!listing) {
    return next(
      new ListingNotFound(`listing with id:${listingID} is not found`),
    );
  }

  const isAuthor = userID === parseInt(listing.user_id, 10) ? 1 : 0;

  try {
    const insertCommentResult = await createComment(
      userID,
      listingID,
      comment,
      isAuthor,
    );

    return res.status(200).json({ id: insertCommentResult.comment_id });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

module.exports = { postComment };
