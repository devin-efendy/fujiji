const APIError = require('../api');

class UserNotFoundError extends APIError {
  constructor(message) {
    super(message || 'No user with such id is found.', 404);
  }
}

module.exports = UserNotFoundError;
