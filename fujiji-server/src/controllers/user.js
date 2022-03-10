const bcrypt = require('bcrypt');
const { getUserByID, getUserListingsByID, updateUser } = require('../repositories/user');
const APIError = require('../errors/api');
const UserNotFoundError = require('../errors/user/userNotFound');
const UserListingsNotFoundError = require('../errors/user/userListingsNotFound');
const InvalidUserIDError = require('../errors/user/invalidUserID');

function isNumber(value) {
  try {
    if (/^\d+$/.test(value)) {
      return true;
    }
    return false;
  } catch (err) {
    return err;
  }
}

async function getUser(req, res, next) {
  try {
    const userID = req?.params?.id;
    if (!isNumber(userID)) {
      next(new InvalidUserIDError());
      return;
    }

    const user = await getUserByID(userID);

    if (user.length === 0) {
      next(new UserNotFoundError());
      return;
    }
    res.status(200).json({ user });
  } catch (err) {
    next(new APIError());
  }
}

async function getUserListings(req, res, next) {
  try {
    const userID = req?.params?.id;
    if (!isNumber(userID)) {
      next(new InvalidUserIDError());
      return;
    }

    const userListings = await getUserListingsByID(userID);

    if (userListings.length === 0) {
      next(new UserListingsNotFoundError());
      return;
    }
    res.status(200).json({ userListings });
  } catch (err) {
    next(new APIError());
  }
}

async function editUser(req, res, next) {
  try {
    const userID = req?.params?.id;
    if (!isNumber(userID)) {
      next(new InvalidUserIDError());
      return;
    }

    const {
      name,
      email,
      phoneNumber,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await updateUser(
      name,
      email,
      phoneNumber,
      hash,
      userID,
    );

    const updatedUser = await getUserByID(userID);
    res.status(200).json({ updatedUser });
  } catch (err) {
    next(new APIError(err, 500));
  }
}

module.exports = { getUser, getUserListings, editUser };
