const APIError = require('../api');

class EmailAlreadyRegistredError extends APIError {
  constructor(message) {
    super(message || 'User with this email address already exists', 400);
  }
}

module.exports = EmailAlreadyRegistredError;
