import React from 'react';

export default function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <form className="popup__form popup__form_edit" method="POST" name={props.name} onSubmit={props.onSubmit}>
                    <h3 className="popup__form-title">{props.title}</h3>
                    {props.children}
                    <button type="submit" className="popup__form-button popup__form-button_save">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}