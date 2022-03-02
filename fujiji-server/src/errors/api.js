class APIError extends Error {
  constructor(message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message
            || 'Oops! Something went wrong. Try again in a few minutes.';
    this.status = status || 500;
  }
}

module.exports = APIError;
