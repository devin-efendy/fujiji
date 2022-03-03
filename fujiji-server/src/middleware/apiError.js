// eslint-disable-next-line no-unused-vars
const apiError = (error, req, res, next) => res.status(error.status).json({ error: error.message });

module.exports = apiError;
