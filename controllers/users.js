const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  AUTHENTIFICATION_ERROR_CODE, VALIDATION_ERROR_CODE, NOT_FOUND_ERROR_CODE, DEFAULT_ERROR_CODE,
} = require('../utils/constants');

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'b18d360a0cc0c48434f7db51d7b6952e395eaeb95cbe67aab2160e6f70852ea5', { expiresIn: '7d' });
      // res.cookie('token', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      // })
        res.send({ token });
    })
    .catch((err) => {
      res.status(AUTHENTIFICATION_ERROR_CODE).send({ message: err.message });
    });
};

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
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: `Введены некорректные данные: ${err}` });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
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
  login,
  getUsers,
  getUserById,
  createUser,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
};
