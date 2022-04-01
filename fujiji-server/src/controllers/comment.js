const {
  createComment,
  getComments,
  getCommentById,
  updateCommentById,
  highlightsCommentById,
} = require('../repositories/comment');
const { getListingById } = require('../repositories/listing');

const {
  APIError,
  ListingNotFound,
  EmptyCommentError,
  CommentNotFoundError,
} = require('../errors');

// PURPOSE: implement the post comment endpoint
async function postComment(req, res, next) {
  const { comment } = req.body;
  const { listing_id: listingID } = req.params;
  const { id } = req.locals.userData;
  const userID = parseInt(id, 10);

  if (!comment) {
    return next(new EmptyCommentError());
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

// PURPOSE: implement the get comments by listing id endpoint
async function getListingComments(req, res, next) {
  const { listing_id: listingID } = req.params;

  const listing = await getListingById(parseInt(listingID, 10));

  if (!listing) {
    return next(
      new ListingNotFound(`listing with id:${listingID} is not found`),
    );
  }

  try {
    const comments = await getComments(listingID);

    return res.status(200).json({ comments });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

// PURPOSE: implement the put comment endpoint
async function editComment(req, res, next) {
  const { comment, isHighlighted } = req.body;
  const { comment_id: commentID } = req.params;
  const { id } = req.locals.userData;
  const userID = parseInt(id, 10);
  const intCommentId = parseInt(commentID, 10);

  const existingComment = await getCommentById(intCommentId);

  if (!existingComment) {
    return next(
      new CommentNotFoundError(`comment with id:${commentID} is not found`),
    );
  }

  const listingID = existingComment.listing_id;
  const listing = await getListingById(parseInt(listingID, 10));

  if (!listing) {
    return next(
      new ListingNotFound(`listing with id:${listingID} is not found`),
    );
  }

  const isCommenter = userID === parseInt(existingComment.user_id, 10) ? 1 : 0;

  const isAuthor = userID === parseInt(listing.user_id, 10) ? 1 : 0;

  if (!isCommenter && !isAuthor) {
    return res.status(400).json({ error: 'User does not own the comment nor is the seller of the listing.' });
  }

  try {
    if (isCommenter) {
      if (!comment) {
        return next(new EmptyCommentError());
      }

      if (comment != existingComment.comment) {
        await updateCommentById(intCommentId, comment);
      }
    }
    if (isAuthor) {
      if (isHighlighted != existingComment.isHighlighted) {
        await highlightsCommentById(intCommentId, isHighlighted);
      }
    }

    const updatedComment = await getCommentById(intCommentId);
    return res.status(200).json({ updatedComment });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

module.exports = { postComment, getListingComments, editComment };
