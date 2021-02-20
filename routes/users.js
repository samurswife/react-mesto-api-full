const router = require('express').Router();
const {
  getUsers, getUserById, getUserInfo, updateUserInfo, updateUserAvatar,
} = require('../controllers/users.js');

const { getUserByIdValidator, userDataValidator, userAvatarValidator } = require('../middlewares/validators/index');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', getUserByIdValidator, getUserById);

router.patch('/me', userDataValidator, updateUserInfo);

router.patch('/me/avatar', userAvatarValidator, updateUserAvatar);

module.exports = router;
