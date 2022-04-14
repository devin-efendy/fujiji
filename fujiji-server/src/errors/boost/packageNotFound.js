const APIError = require('../api');

class PackageNotFoundError extends APIError {
  constructor(message) {
    super(message || 'No boost package is found.', 404);
  }
}

module.exports = PackageNotFoundError;
