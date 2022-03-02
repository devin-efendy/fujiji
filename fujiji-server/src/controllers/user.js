const { getUserByID } = require('../repositories/user');
const APIError = require('../errors/api');
const UserNotFoundError = require('../errors/user/userNotFound');
const InvalidUserIDError = require('../errors/user/invalidUserID');

async function getUser(req, res, next) {
  try {
    if (!Number.isInteger(req.params.id)) {
      next(new InvalidUserIDError());
      return;
    }

    const user = await getUserByID(req.params.id);

    if (user.length === 0) {
      next(new UserNotFoundError());
      return;
    }
    res.status(200).json({ user });
  } catch (err) {
    next(new APIError());
  }
}

module.exports = { getUser };
