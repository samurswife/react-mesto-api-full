const { celebrate, Joi } = require('celebrate');

const cardDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Это поле обязательно для заполнения',
      }),
    link: Joi.string().pattern(/^https?:\/\/([\da-z-]+)\.([a-z]{2,6})\S*/i).required().messages({
      'string.pattern.base': 'Введите ссылку на картинку!',
      'any.required': 'Это поле обязательно для заполнения',
    }),
  }),
});

module.exports = cardDataValidator;
