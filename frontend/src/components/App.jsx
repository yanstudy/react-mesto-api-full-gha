import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as authApi from '../utils/ApiAuth';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  // переменные состояния попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );

  useEffect(() => {
    if (user && user.email) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialCards()
        .then((cards) => setCards(cards))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  function handleCardLike(card) {
    // проверяем, есть ли лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // функции открытия попапов
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoToolTipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api
      .editAvatar(link)
      .then((data) => {
        setCurrentUser((state) => ({ ...state, avatar: data.avatar }));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddNewPlace(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(card) {
    setSelectedCard(card);
    setDeleteCardPopupOpen(true);
  }

  function confirmDeleteCard() {
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then((result) => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  const cbRegister = async (dataUser) => {
    await authApi
      .register(dataUser)
      .then((data) => {
        if (data) {
          setInfoToolTipPopupOpen(true);
          setUser(data);
          setRegistrationSuccess(true);
        }
      })
      .catch((err) => {
        setRegistrationSuccess(false);
        setInfoToolTipPopupOpen(true);
        console.log(err);
      });
  };

  const cbLogin = async (data) => {
    await authApi.authorize(data).catch((err) => console.log(err));

    await authApi
      .getContent()
      .then((dataUser) => {
        if (dataUser) {
          setUser(dataUser);
          setLoggedIn(localStorage.setItem('loggedIn', true));
        }
      })
      .catch((err) => console.log(err));
  };

  const cbLogout = async () => {
    await authApi
      .logOut()
      .then((data) => {
        console.log(data.message);
        setUser(null);
        setLoggedIn(localStorage.setItem('loggedIn', false));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn) {
      authApi
        .getContent()
        .then((dataUser) => {
          if (dataUser) {
            setUser(dataUser);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={user?.email} onLogout={cbLogout} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute user={user}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/sign-up'
            element={
              <ProtectedRoute onlyUnAuth user={user}>
                <Register onRegister={cbRegister} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/sign-in'
            element={
              <ProtectedRoute onlyUnAuth user={user}>
                <Login onLogin={cbLogin} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddNewPlace}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          name={'deletePopup'}
          title={'Вы уверены?'}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onDeleteCard={confirmDeleteCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <InfoTooltip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          success={registrationSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
