const User = require('../models/user');
const { VALIDATION_ERROR_CODE, NOT_FOUND_ERROR_CODE, DEFAULT_ERROR_CODE } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(DEFAULT_ERROR_CODE).send({ message: `На сервере произошла ошибка: ${err}` }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Нет пользователя с таким ID' });
      } else if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Невалидный ID пользователя' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: `Введены некорректные данные: ${err}` });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Нет пользователя с таким ID' });
      } else if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Невалидный ID пользователя' });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: `Введены некорректные данные: ${err}` });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Нет пользователя с таким ID' });
      } else if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Невалидный ID пользователя' });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: `Введены некорректные данные: ${err}` });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
