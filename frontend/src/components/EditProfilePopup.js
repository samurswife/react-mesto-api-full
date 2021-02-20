import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        if(currentUser.name)
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]);

    function handleNameInputChange(e) {
        setName(e.target.value);
    }

    function handleAboutInputChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} title="Редактировать профиль" buttonText="Сохранить" name="edit-profile" isOpen={props.isOpen} onClose={props.onClose}>
            <input value={name} onChange={handleNameInputChange} type="text" id="name-input" className="popup__form-input popup__form-input_name" name="name" minLength="2" maxLength="40" required />
            <span id="name-input-error" className="popup__form-input-error"></span>
            <input value={description} onChange={handleAboutInputChange} type="text" id="about-input" className="popup__form-input popup__form-input_about" name="about" minLength="2" maxLength="200" required />
            <span id="about-input-error" className="popup__form-input-error"></span>
        </PopupWithForm>
    )
}
