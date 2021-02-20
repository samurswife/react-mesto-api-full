const signin = require('./login');
const signup = require('./register');
const getUserByIdValidator = require('./getUserByIdValidator');
const userDataValidator = require('./userDataValidator');
const userAvatarValidator = require('./userAvatarValidator');
const getCardByIdValidator = require('./getCardByIdValidator');
const cardDataValidator = require('./cardDataValidator');

module.exports = {
  signin,
  signup,
  getUserByIdValidator,
  userDataValidator,
  userAvatarValidator,
  getCardByIdValidator,
  cardDataValidator,
};
