import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const [data, setData] = React.useState({
        email: "",
        password: ""
    });

    const history = useHistory();

    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleLogin(data)
            .then(() => history.push("/"))
            .catch((error) => console.log(error));
    }

    return (
        <div className="login center">
            <form className="popup__form popup__form_login" method="POST" name="login" onSubmit={handleSubmit}>
                <h3 className="popup__form-title popup__form-title_white">Вход</h3>
                <input placeholder="Email" type="email" id="email-input" className="popup__form-input popup__form-input_sign-up" name="email" value={data.email} onChange={handleChange} required />
                <span id="email-input-error" className="popup__form-input-error"></span>
                <input placeholder="Пароль" type="password" id="password-input" className="popup__form-input popup__form-input_sign-up" name="password" minLength="8" maxLength="20" value={data.password} onChange={handleChange} required />
                <span id="password-input-error" className="popup__form-input-error"></span>
                <button type="submit" className="popup__form-button popup__form-button_white">Войти</button>
            </form>
        </div>
    )
}