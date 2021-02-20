const { celebrate, Joi } = require('celebrate');

const register = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто')
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    about: Joi.string().min(2).max(30).default('Исследователь')
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    avatar: Joi.string().pattern(/^https?:\/\/([\da-z-]+)\.([a-z]{2,6})\S*/i).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').messages({
      'string.pattern.base': 'Введите ссылку на аватар',
    }),
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

module.exports = register;
