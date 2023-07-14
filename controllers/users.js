const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');
const {
  InaccurateDataError,
  ConflictError,
  NotFoundError,
} = require('../errors/errors');
const { devJwtKey } = require('../utils/config');

const getUserById = (req, res, next) => {
  userModel
    .findById(req.user._id)
    .orFail(() => next(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashesPassword) =>
      userModel.create({
        name,
        password: hashesPassword,
        email,
      }),
    )
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(ERROR_CODE.CREATED).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_PROFILE));
      } else if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  userModel
    .findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    )
    .orFail(() => next(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_PROFILE));
      } else if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : devJwtKey,
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  login,
};
