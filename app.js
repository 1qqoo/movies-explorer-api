require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { centerErrorHandler } = require('./middlewares/centerErrorHandler');
const { signinValidate, signupValidate } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.post('/signup', signupValidate, createUser);
app.post('/signin', signinValidate, login);

app.use(auth, router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(centerErrorHandler);
app.listen(PORT);
