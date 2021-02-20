import React from 'react';

export default function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_info-tooltip ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_type_infotooltip">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <div className={`popup__infotooltip-icon ${props.type === "success" ? "" : "popup__infotooltip-icon_fail"}`}></div>
                <p className="popup__infotooltip-text">{props.type === "success" ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."}</p>
            </div>
        </div>
    )
}