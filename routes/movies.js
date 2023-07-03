const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { movieIdValidate, movieValidate } = require('../middlewares/validation');

module.exports = router;

router.use(auth);
router.get('/', getMovies);
router.post('/', movieValidate, createMovie);
router.delete('/:movieId', movieIdValidate, deleteMovie);

module.exports = router;
