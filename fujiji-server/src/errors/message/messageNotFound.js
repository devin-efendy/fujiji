const APIError = require('../api');

class MessageNotFoundError extends APIError {
  constructor(message) {
    super(message || 'No message is found in this conversation', 404);
  }
}

module.exports = MessageNotFoundError;
