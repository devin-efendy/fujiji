const APIError = require('../api');

class ListingInvalidCityProvinceError extends APIError {
  constructor(message) {
    super(message || 'There is no such city in the selected province.', 400);
  }
}

module.exports = ListingInvalidCityProvinceError;
