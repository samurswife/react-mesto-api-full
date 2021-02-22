/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;

const options = {
  origin: [
    'http://localhost:8080',
    'https://shakarova.students.nomoreparties.space',
    'https://www.shakarova.students.nomoreparties.space',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  // optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { NotFound } = require('./errors/index');
const errorHandler = require('./middlewares/errorHandler');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signin, signup } = require('./middlewares/validators/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', signup, createUser);
app.post('/signin', signin, login);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
