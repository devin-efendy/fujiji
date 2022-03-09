const APIError = require('../api');

class UserListingsNotFoundError extends APIError {
  constructor(message) {
    super(message || 'No listing has been posted by this user', 404);
  }
}

module.exports = UserListingsNotFoundError;
