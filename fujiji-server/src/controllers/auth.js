const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');

const { getUserByEmail, createUser } = require('../repositories/user');

const {
  APIError,
  EmailAlreadyRegistredError,
  InvalidPasswordError,
  UserNotFoundError,
} = require('../errors');

async function signUp(req, res, next) {
  try {
    const {
      email, password, name, phoneNumber,
    } = req.body;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      const hash = await bcrypt.hash(password, 10);

      const newUser = await createUser(email, hash, name, phoneNumber);

      const authToken = jwt.sign(
        {
          id: newUser.user_id,
          email,
        },
        config.JWT_SECRET,
        { expiresIn: '1h' },
      );

      return res.status(200).json({
        authToken,
        userId: newUser.user_id,
        name,
        email,
        phoneNumber,
      });
    }

    return next(new EmailAlreadyRegistredError());
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await getUserByEmail(email);
  } catch (error) {
    return next(new APIError());
  }

  if (!existingUser) {
    return next(new UserNotFoundError());
  }

  const hashedPassword = existingUser.password;
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    return next(new InvalidPasswordError());
  }

  const authToken = jwt.sign(
    {
      id: existingUser.user_id,
      email,
    },
    config.JWT_SECRET,
    { expiresIn: '1h' },
  );

  return res.status(200).json({
    authToken,
    userId: existingUser.user_id,
    name: existingUser.name,
    email,
    phoneNumber: existingUser.phone_number,
  });
}

module.exports = { signUp, signIn };
