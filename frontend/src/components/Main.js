import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Card from './Card.js';

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">

            <section className="profile center">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                    <div className="profile__avatar-overlay">
                        <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__person">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
            </section>

            <section className="elements center">
                {props.cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                ))}
            </section>

        </main>
    );
}