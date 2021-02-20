/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const { NotFound } = require('./errors/index');
const errorHandler = require('./middlewares/errorHandler');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signin, signup } = require('./middlewares/validators/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', signin, login);
app.post('/signup', signup, createUser);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
