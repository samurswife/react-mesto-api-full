const { celebrate, Joi } = require('celebrate');

const getCardByIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .messages({
        'string.length': 'Недопустимый формат ID',
        'string.hex': 'Недопустимый формат ID',
      }),
  }),
});

module.exports = getCardByIdValidator;
