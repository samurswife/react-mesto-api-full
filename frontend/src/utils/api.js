const handleOriginalResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor(config) {
        this._url = config.baseUrl;
        this._headers = config.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(handleOriginalResponse)
            .then(data => {
                console.log(data);
                return data;
            });
    }

    loadInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(handleOriginalResponse)
            .then(data => {
                return data;
            })
    }

    setUserInfo(user) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about
            })
        })
            .then(handleOriginalResponse)
            .then(data => {
                return data;
            })
    }

    setUserAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: link.avatar
            })
        })
            .then(handleOriginalResponse)
    }

    addNewCard(card) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then(handleOriginalResponse)
            .then(data => {
                return data;
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(handleOriginalResponse)
            .then(data => {
                return data;
            })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: "PUT",
                headers: this._headers,
            })
                .then(handleOriginalResponse)
                .then(data => {
                    return data;
                })
        } else if (!isLiked) {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            })
                .then(handleOriginalResponse)
                .then(data => {
                    return data;
                });
        }
    }
}

const api = new Api({
    baseUrl: 'https://api.shakarova.students.nomoreparties.space',
    headers: {
        'Content-Type': 'application/json',
    }
});

export { api };
