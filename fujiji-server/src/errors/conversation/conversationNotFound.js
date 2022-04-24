const APIError = require('../api');

class ConversationNotFoundError extends APIError {
  constructor(message) {
    super(message || 'You do not seem to have any conversation! You can always start one by messaging the user of the listing! ', 404);
  }
}

module.exports = ConversationNotFoundError;
