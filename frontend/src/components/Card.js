import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

export default function Card(props) {
    const user = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick(){
        props.onCardDelete(props.card);
    }

    const isOwn = props.card.owner._id === user._id;
    const isLiked = props.card.likes.some(i => i._id === user._id);

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? '' : 'element__delete-button_hidden'}`
    );

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    return (
        <div className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
            <div className="element__image" alt={props.card.name} style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}></div>
            <div className="element__content">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}