const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация.');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'b18d360a0cc0c48434f7db51d7b6952e395eaeb95cbe67aab2160e6f70852ea5');
  } catch (err) {
    throw new Forbidden('Необходима авторизация.');
  }

  req.user = payload;

  next();
};
