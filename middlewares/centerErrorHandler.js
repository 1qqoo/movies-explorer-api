const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

module.exports.centerErrorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = ERROR_CODE.SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message:
      statusCode === ERROR_CODE.SERVER_ERROR
        ? ERROR_MESSAGE.SERVER_ERROR
        : message,
  });
  next();
};
