const APIError = require('../api');

class ListingInvalidPriceRangeError extends APIError {
  constructor(message) {
    super(message || 'Listing\'s price range needs 2 values with the first one being less than the second one.', 400);
  }
}

module.exports = ListingInvalidPriceRangeError;
