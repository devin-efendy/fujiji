const APIError = require('../api');

class BoostAlreadyExists extends APIError {
  constructor(message) {
    super(message || 'Boost already exists for this listing', 404);
  }
}

module.exports = BoostAlreadyExists;
