import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmPopup(props) {
    return (
        <PopupWithForm title="Вы уверены?" buttonText="Да" name="confirm" onClose={props.onClose} />
    )
}