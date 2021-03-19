/* eslint-disable no-param-reassign */
const { celebrate, Joi } = require('celebrate');

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24)
      .messages({
        'string.length': 'Недопустимый формат ID',
        'string.hex': 'Недопустимый формат ID',
      }),
  }),
});

module.exports = getUserByIdValidator;
