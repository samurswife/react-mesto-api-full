import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {

    const avatarInputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarInputRef.current.value
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} title="Обновить аватар" buttonText="Сохранить" name="edit-avatar" isOpen={props.isOpen} onClose={props.onClose}>
            <input ref={avatarInputRef} type="url" id="avatar-input" className="popup__form-input popup__form-input_avatar" name="avatar" placeholder="Ссылка на картинку" required />
            <span id="avatar-input-error" className="popup__form-input-error"></span>
        </PopupWithForm>
    )
}