const ERROR_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
};

const ERROR_MESSAGE = {
  ACCESS_ERROR: 'Попытка удалить чужой фильм.',
  MOVIE_NOT_FOUND: 'Фильм с указанным _id не найден.',
  WRONG_DATA_MOVIE_DELETE: 'Переданы некорректные данные при удалении фильма.',
  WRONG_DATA_MOVIE: 'Переданы некорректные данные при создании фильма.',
  EMAIL_ALREADY_EXISTS: 'Пользователь с таким email уже существует.',
  WRONG_DATA_USER: 'При регистрации пользователя произошла ошибка.',
  WRONG_DATA_PROFILE: 'Переданы некорректные данные при обновлении профиля',
  USER_NOT_FOUND: 'Пользователь по указанному _id не найден.',
  AUTHORIZATION_REQUIRED:
    'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  SERVER_ERROR: 'На сервере произошла ошибка.',
  WRONG_EMAIL_OR_PASSWORD: 'Вы ввели неправильный логин или пароль.',
  WRONG_EMAIL: 'Некорректный email.',
  WRONG_URL_FORMAT: 'Некорректный адрес URL.',
  URL_NOT_FOUND: 'Запрашиваемый ресурс не найден, проверьте адрес:',
};

module.exports = { ERROR_CODE, ERROR_MESSAGE };
