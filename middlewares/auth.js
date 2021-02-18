const jwt = require('jsonwebtoken');
const { AUTHENTIFICATION_ERROR_CODE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(AUTHENTIFICATION_ERROR_CODE).send({ message: 'Пройдите авторизацию.' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'b18d360a0cc0c48434f7db51d7b6952e395eaeb95cbe67aab2160e6f70852ea5');
  } catch (err) {
    return res.status(AUTHENTIFICATION_ERROR_CODE).send({ message: 'Пройдите авторизацию.' });
  }

  req.user = payload;

  next();
};
