const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

const devDatabaseUrl = 'mongodb://localhost:27017/bitfilmsdb';

const devJwtKey = 'dev-key';

module.exports = {
  limiter,
  devDatabaseUrl,
  devJwtKey,
};
