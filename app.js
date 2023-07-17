require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { limiter, devDatabaseUrl } = require('./utils/config');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centerErrorHandler } = require('./middlewares/centerErrorHandler');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(centerErrorHandler);

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : devDatabaseUrl);
app.listen(PORT);
