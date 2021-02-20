const { celebrate, Joi } = require('celebrate');

const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'Введите адрес электронной почты',
      'any.required': 'Это поле обязательно для заполнения',
    }),
    password: Joi.string().min(8).max(30).required()
      .messages({
        'string.min': 'Минимум 8 символов',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Это поле обязательно для заполнения',
      }),
  }),
});

module.exports = login;
