const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { ERROR_MESSAGE } = require('../utils/constants');
const { devJwtKey } = require('../utils/config');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(ERROR_MESSAGE.AUTHORIZATION_REQUIRED));
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : devJwtKey,
    );
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGE.AUTHORIZATION_REQUIRED));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
