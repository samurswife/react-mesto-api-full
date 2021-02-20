/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Невалидный ID ресурса' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: `Введены некорректные данные: ${err}` });
  } else {
    res.status(500).send({ message: `Ошибка: ${err.message}` });
  }
};

module.exports = errorHandler;
