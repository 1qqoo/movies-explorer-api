const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ERROR_MESSAGE } = require('../utils/constants');

const isURL = (value, helpers) =>
  validator.isURL(value)
    ? value
    : helpers.message(ERROR_MESSAGE.WRONG_URL_FORMAT);

// POST /signin
const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

// POST /signup
const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

// PATCH /users/me
const userInfoValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// POST /movies
const movieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameEN: Joi.string().required(),
    nameRU: Joi.string().required(),
    image: Joi.string().required().custom(isURL),
    trailerLink: Joi.string().required().custom(isURL),
    thumbnail: Joi.string().required().custom(isURL),
    movieId: Joi.number().required(),
  }),
});

// DELETE /movies/:movieId
const movieIdValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signinValidate,
  signupValidate,
  userInfoValidate,
  movieValidate,
  movieIdValidate,
};
