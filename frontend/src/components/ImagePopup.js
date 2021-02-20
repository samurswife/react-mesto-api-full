import React from 'react';

export default function ImagePopup(props) {
    return (
        <div className={`popup popup_type_preview ${props.card.link ? "popup_opened" : ""}`}>
            <div className="popup__preview-container">
                <button className="popup__close-button" onClick={props.onClose} type="button"></button>
                <img src={props.card.link} alt={props.card.name} className="popup__image" />
                <p className="popup__image-title">{props.card.name}</p>
            </div>
        </div>
    );
}