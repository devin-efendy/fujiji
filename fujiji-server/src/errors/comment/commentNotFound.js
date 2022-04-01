const APIError = require('../api');

class CommentNotFoundError extends APIError {
  constructor(message) {
    super(message || 'No comment with such id is found.', 404);
  }
}

module.exports = CommentNotFoundError;
