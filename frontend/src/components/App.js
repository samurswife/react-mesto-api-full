import React from 'react';
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ImagePopup from "./ImagePopup.js";
import { Api } from "../utils/api.js"; //
// import { api } from "../utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [infoTooltipType, setInfoTooltipType] = React.useState("");
  const [headerLink, setHeaderLink] = React.useState({ text: "Регистрация", className: "", path: "sign-up" });

  const [token, setToken] = React.useState("");

  const history = useHistory();

  let api = new Api({
    baseUrl: 'https://api.shakarova.students.nomoreparties.space',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleInfoTooltipType(type) {
    setInfoTooltipType(type);
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user)
      .then(userData => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.setUserAvatar(link)
      .then(userData => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id)
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleLogin(data) {
    const { email, password } = data;
    return auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          getContent(res.token);
        }
      })
      .catch((error) => console.log(error));
  }

  function getContent(token) {
    console.log(token, api);
    setToken(token);
    api._headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    return auth.getContent(token).then((res) => {
      if (res) {
        setCurrentUser(res);
        setUserEmail(res.email);
        setHeaderLink({ text: "Выйти", className: "header__link_logout", path: "/sign-in" });
        loadInitialCards();
        setLoggedIn(true);
        history.push('/');
      }
    })
      .catch((error) => console.log(error));
  }

  function loadInitialCards() {
    return api.loadInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      getContent(token);
    }
  }

  function handleRegister(data) {
    const { email, password } = data;
    return auth.register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          handleInfoTooltipType("fail");
          handleInfoTooltip();
          return;
        }
        handleInfoTooltipType("success");
        handleInfoTooltip();
        return res;
      })
      .catch((error) => console.log(error));
  }

  function handleHeaderLink() {
    if (headerLink.text === "Регистрация") {
      history.push('/sign-up');
      setHeaderLink({ text: "Войти", className: "", path: "/sign-in" });
    } else if (headerLink.text === "Войти") {
      history.push('/sign-in');
      setHeaderLink({ text: "Регистрация", className: "", path: "/sign-up" });
    } else if (headerLink.text === "Выйти") {
      localStorage.removeItem('token');
      setLoggedIn(false);
      history.push('/sign-in');
      setHeaderLink({ text: "Регистрация", className: "", path: "/sign-up" });
      setUserEmail("");
    }
  }

  function handleEnterLink() {
    history.push('/sign-in');
    setHeaderLink({ text: "Регистрация", className: "", path: "/sign-up" });
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/")
    }
  }, [loggedIn, history]);

  // React.useEffect(() => {
  //   api.getUserInfo()
  //     .then(userData => {
  //       setCurrentUser(userData);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   api.loadInitialCards()
  //     .then(initialCards => {
  //       setCards(initialCards);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} headerLink={headerLink} headerUserEmail={userEmail} handleClick={handleHeaderLink} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onClose={closeAllPopups} />
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} handleEnterLink={handleEnterLink} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
          <ConfirmPopup onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoTooltipPopupOpen} type={infoTooltipType} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default withRouter(App);
