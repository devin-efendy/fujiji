const { getUserByID, getUserListingsByID } = require('../repositories/user');
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

module.exports = { getUser, getUserListings };
