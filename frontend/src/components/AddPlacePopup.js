import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameInputChange(e) {
        setName(e.target.value);
    }

    function handleLinkInputChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
        setName("");
        setLink("");
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} title="Новое место" buttonText="Создать" name="new-place" isOpen={props.isOpen} onClose={props.onClose}>
            <input value={name} onChange={handleNameInputChange} type="text" id="place-input" className="popup__form-input popup__form-input_place" name="name" placeholder="Название" required />
            <span id="place-input-error" className="popup__form-input-error"></span>
            <input value={link} onChange={handleLinkInputChange} type="url" id="link-input" className="popup__form-input popup__form-input_link" name="link" placeholder="Ссылка на картинку" required />
            <span id="link-input-error" className="popup__form-input-error"></span>
        </PopupWithForm>
    )
}