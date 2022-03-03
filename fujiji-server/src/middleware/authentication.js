const jwt = require('jsonwebtoken');
const { InvalidTokenError } = require('../errors');
const { config } = require('../config/config');

function authentication(req, res, next) {
  try {
    const authToken = req.headers.authorization.split(' ')[1];
    const userData = jwt.verify(authToken, config.JWT_SECRET);
    req.locals = { userData };
    return next();
  } catch (err) {
    return next(new InvalidTokenError());
  }
}

module.exports = authentication;
