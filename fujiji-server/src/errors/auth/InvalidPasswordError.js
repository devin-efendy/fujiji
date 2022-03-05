const APIError = require('../api');

class InvalidPasswordError extends APIError {
  constructor(message) {
    super(message || 'Invalid password', 401);
  }
}

module.exports = InvalidPasswordError;
