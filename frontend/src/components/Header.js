import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <div className="header center">
            <div className="header__logo"></div>
            <div className="header__links">
                <p className="header__email">{props.headerUserEmail}</p>
                <Link to={props.headerLink.path} className={`header__link ${props.headerLink.className}`} onClick={props.handleClick}>{props.headerLink.text}</Link>
            </div>
        </div>
    )
}