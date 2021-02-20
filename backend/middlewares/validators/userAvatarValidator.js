const { celebrate, Joi } = require('celebrate');

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/([\da-z-]+)\.([a-z]{2,6})\S*/i).messages({
      'string.pattern.base': 'Введите ссылку на картинку!',
    }),
  }),
});

module.exports = userAvatarValidator;
