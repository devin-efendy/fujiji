const APIError = require('../api');

class ListingNotFoundError extends APIError {
  constructor(message) {
    super(message || 'No listing is found.', 404);
  }
}

module.exports = ListingNotFoundError;
