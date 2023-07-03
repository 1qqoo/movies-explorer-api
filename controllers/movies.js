const { ValidationError, CastError } = require('mongoose').Error;
const movieModel = require('../models/movie');
const { ERROR_CODE } = require('../utils/constants');
const {
  InaccurateDataError,
  NotFoundError,
  NotPermissionError,
} = require('../errors/errors');

const getMovies = (req, res, next) => {
  movieModel
    .find({})
    .populate('owner')
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
    .then((movie) =>
      movie
        .populate('owner')
        .then((popMovie) => res.status(ERROR_CODE.CREATED).send(popMovie)),
    )
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(
          new InaccurateDataError(
            'Переданы некорректные данные при создании фильма',
          ),
        );
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieModel
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным id не найден.');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new NotPermissionError('Нельзя трогать чужие фильмы');
      }
      movie.deleteOne().then(() => {
        res.status(ERROR_CODE.OK).send({
          message:
            'Спасибо что воспользовались моими услугами и удалили фильм, который я любил',
        });
      });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(
          new InaccurateDataError(
            'Переданы некорректные данные при удалении фильма',
          ),
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
