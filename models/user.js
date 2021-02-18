const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^https?:\/\/([\da-z-]+)\.([a-z]{2,6})\S*/gi;
        return regex.test(v);
      },
      message: 'Введите ссылку на аватар!',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
