const { ValidationError, CastError } = require('mongoose').Error;
const movieModel = require('../models/movie');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');
const {
  InaccurateDataError,
  NotFoundError,
  NotPermissionError,
} = require('../errors/errors');

const getMovies = (req, res, next) => {
  movieModel
    .find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;
  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner,
    })
    .then((movie) => res.status(ERROR_CODE.CREATED).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_MOVIE));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieModel
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(ERROR_MESSAGE.MOVIE_NOT_FOUND);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new NotPermissionError(ERROR_MESSAGE.ACCESS_ERROR);
      }
      movie.deleteOne().then(() => {
        res.status(ERROR_CODE.OK).send({
          message: movie,
        });
      });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(
          new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_MOVIE_DELETE),
        );
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
