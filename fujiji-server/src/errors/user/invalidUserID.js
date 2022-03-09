const APIError = require('../api');

class InvalidUserIDError extends APIError {
  constructor(message) {
    super(message || 'User ID must contain only numbers', 400);
  }
}

module.exports = InvalidUserIDError;
