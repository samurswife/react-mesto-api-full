const { celebrate, Joi } = require('celebrate');

const userDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Это поле обязательно для заполнения',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Это поле обязательно для заполнения',
      }),
  }),
});

module.exports = userDataValidator;
