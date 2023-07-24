const router = require('express').Router();
const { getUserById, updateUser } = require('../controllers/users');
const { userInfoValidate } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/me', getUserById);
router.patch('/me', userInfoValidate, updateUser);

module.exports = router;
