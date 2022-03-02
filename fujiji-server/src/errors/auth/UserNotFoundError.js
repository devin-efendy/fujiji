const APIError = require('../api');

class UserNotFoundError extends APIError {
  constructor(message) {
    super(
      message || 'The provided email is not associated with any account',
      404,
    );
  }
}

module.exports = UserNotFoundError;
