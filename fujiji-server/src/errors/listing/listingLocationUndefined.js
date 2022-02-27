const APIError = require('../api');

class ListingLocationUndefinedError extends APIError {
  constructor(message) {
    super(message || 'Listing\'s location is undefined. Please input city or province code.', 400);
  }
}

module.exports = ListingLocationUndefinedError;
