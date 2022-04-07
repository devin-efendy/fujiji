const { Sequelize } = require('sequelize');
const { logDebug } = require('../utils/logging');
const sequelize = require('./db');

// PURPOSE: used to insert a new comment to the db
async function createComment(userID, listingID, comment, isAuthor) {
  const [result] = await sequelize.query(
    `INSERT INTO fujiji_comments
            (user_id, listing_id, comment, isHighlighted, isAuthor, creation_date)
          OUTPUT INSERTED.*
          VALUES
            ($1, $2, $3, $4, $5, getutcdate());`,
    {
      bind: [userID, listingID, comment, 0, isAuthor],
      type: Sequelize.INSERT,
    },
  );
  logDebug('DEBUG-createComment', result);
  return result[0];
}

// PURPOSE: used to fetch comments from the db based on the listing_id
async function getComments(listingID) {
  const [result] = await sequelize.query(
    `SELECT fc.*, fu.name 
      FROM fujiji_comments fc LEFT JOIN fujiji_user fu
        ON fc.user_id = fu.user_id
      WHERE listing_id = ? 
      ORDER BY fc.creation_date DESC;`,
    {
      replacements: [listingID],
      type: Sequelize.SELECT,
    },
  );
  logDebug('DEBUG-getComments', result);
  return result;
}

module.exports = {
  createComment,
  getComments,
};

// PURPOSE: used to fetch a comment from the db based on its id
async function getCommentById(commentID) {
  const [result] = await sequelize.query(
    'SELECT * FROM fujiji_comments WHERE comment_id = ?;',
    {
      replacements: [commentID],
      type: Sequelize.SELECT,
    },
  );
  logDebug('DEBUG-getCommentById', result);
  return result[0];
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
};

// PURPOSE: used to update a comment from the db based on its id
async function updateCommentById(commentID, comment) {
  const [result] = await sequelize.query(
    `UPDATE fujiji_comments 
      SET comment = ?, modified_date = getutcdate() 
      WHERE comment_id = ?;`,
    {
      replacements: [comment, commentID],
      type: Sequelize.UPDATE,
    },
  );
  logDebug('DEBUG-updateCommentById', result);
  return result;
}

// PURPOSE: used to highlight a comment from the db based on its id
async function highlightsCommentById(commentID, isHighlighted) {
  const [result] = await sequelize.query(
    `UPDATE fujiji_comments 
      SET isHighlighted = ?
      WHERE comment_id = ?;`,
    {
      replacements: [isHighlighted, commentID],
      type: Sequelize.UPDATE,
    },
  );
  logDebug('DEBUG-highlightsCommentById', result);
  return result;
}

// PURPOSE: used to delete a comment from the db based on its id
async function deleteCommentById(commentId) {
  try {
    const comment = await sequelize.query(
      'DELETE FROM fujiji_comments WHERE comment_id = ?',
      {
        replacements: [commentId],
        type: Sequelize.SELECT,
      },
    );
    logDebug('DEBUG-deleteCommentById', comment);
    return comment[1];
  } catch (err) {
    return err;
  }
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateCommentById,
  highlightsCommentById,
  deleteCommentById,
};
