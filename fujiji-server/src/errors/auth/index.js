const InvalidPasswordError = require('./InvalidPasswordError');
const InvalidTokenError = require('./InvalidTokenError');
const UserNotFoundError = require('./UserNotFoundError');
const EmailAlreadyRegistredError = require('./EmailAlreadyRegistredError');

module.exports = {
  EmailAlreadyRegistredError,
  InvalidPasswordError,
  InvalidTokenError,
  UserNotFoundError,
};
