const APIError = require('../api');

class InvalidTokenError extends APIError {
  constructor(message) {
    super(message || 'User is not authenticated or invalid Authorization Token', 400);
  }
}

module.exports = InvalidTokenError;
