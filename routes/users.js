const router = require('express').Router();
const { getUserById, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { userInfoValidate } = require('../middlewares/validation');

router.use(auth);
router.get('/me', getUserById);
router.patch('/me', userInfoValidate, updateUser);

module.exports = router;
