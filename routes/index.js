const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { ERROR_MESSAGE } = require('../utils/constants');
const { createUser, login } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(auth);
router.use('*', (req, res, next) =>
  next(new NotFoundError(`${ERROR_MESSAGE.URL_NOT_FOUND} ${req.originalUrl} `)),
);

module.exports = router;
