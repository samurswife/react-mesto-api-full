const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

const { getCardByIdValidator, cardDataValidator } = require('../middlewares/validators/index');

router.get('/', getCards);

router.post('/', cardDataValidator, createCard);

router.delete('/:cardId', getCardByIdValidator, deleteCard);

router.put('/:cardId/likes', getCardByIdValidator, likeCard);

router.delete('/:cardId/likes', getCardByIdValidator, dislikeCard);

module.exports = router;
