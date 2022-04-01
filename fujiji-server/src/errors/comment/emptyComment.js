const APIError = require('../api');

class EmptyCommentError extends APIError {
  constructor(message) {
    super(message || "'comment' field can not be empty", 400);
  }
}

module.exports = EmptyCommentError;
