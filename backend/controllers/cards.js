const Card = require('../models/card');

const { NotFound, Conflict } = require('../errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const user = req.user._id;

  Card.create({ name, link, owner: user })
    .then((card) => {
      Card.findById(card._id)
        .populate(['owner'])
        .then((newCard) => res.send(newCard));
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { user } = req;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Нет карточки с таким ID');
    })
    .populate(['owner'])
    .then((card) => {
      if (user._id !== card.owner._id.toString()) {
        throw new Conflict('Это не ваша карточка, вы не можете ее удалить :-Р');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => res.send(deletedCard));
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const user = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: user } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Нет карточки с таким ID');
    })
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const user = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: user } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Нет карточки с таким ID');
    })
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
