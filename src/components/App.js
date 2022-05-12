import React, { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({}); // ПР11 создали переменную состояния currentUser
  const [cards, setCards] = useState([]); // ПР11 перенесла карточки в корневой компонент

  useEffect(() => {
      api
        .getProfile()
        .then((userData) => {
          //console.log("res", userData)
          setCurrentUser(userData)
        })
        .catch((err) => console.log(err));
    }, []); // ПР11 создали эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения



  useEffect(() => {
    api
      .getUsersCards()
      .then((cardList) => {
        //console.log("res", res)
        const usersCard = cardList.map((card) => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
            ownerId: card.owner._id,
          };
        });
        //console.log('usersCard', usersCard)
        setCards(usersCard);
      })
      .catch((err) => console.log(err));
  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    // console.log(selectedCard)
    setSelectedCard(card);
  }

  function handleCardLike(card) { // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id); // Отправляем запрос в API и получаем обновлённые данные карточки
    
    if (isLiked){ //если карточка с лайком ==> удали лайк
      api.deleteLike(card.cardId)
      .then(newCard => { 
        setCards((state) => state.map((item) => 
        item._id === card.cardId ? newCard : item
        ));
      })
      .catch(err => console.log(err))
    } else { // если лайка нет ==> поставь лайк
        api.addLike(card.cardId)
          .then(newCard => { 
            setCards((state) => state.map((item) => 
            item._id === card.cardId ? newCard : item
            ));
          })
          .catch(err => console.log(err))
      } 
  }
    // api
    //   .addLike(cardId, !isLiked)
    //   .then((newCard) => {
    //   setCards((state) => state.map((c) => 
    //   c._id === cardId ? newCard : c
    //   ));
    // });
  

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        cards={cards}
      />
      <Footer />
      {/* Модалка редактирования профиля */}
      <PopupWithForm
        name="profile"
        isOpen={isEditProfilePopupOpen}
        title="Редактировать профиль"
        id="form-profile"
        formName="edit-profile-form"
        buttonText="Сохранить"
        onClose={closeAllPopups}>
            <input
              type="text"
              id="name"
              name="name"
              className="popup__input"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required 
            />
            <span 
              id="error-name" 
              className="popup__error">
            </span>
            <input
              type="text"
              id="bio"
              name="bio"
              className="popup__input"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
            />
            <span 
              id="error-bio" 
              className="popup__error">
            </span>
        </PopupWithForm>

      {/* Модалка смены аватара */}
      <PopupWithForm
        name="profile-avatar"
        isOpen={isEditAvatarPopupOpen}
        title="Обновить автар"
        id="form-profile-avatar"
        formName="edit-profile-avatar"
        buttonText="Сохранить"
        onClose={closeAllPopups}>
            <input
              type="url"
              id="profile-avatar-link"
              name="profile-avatar-link"
              className="popup__input popup__input_profile-avatar_link"
              placeholder="Ссылка на картинку"
              required
            />
            <span
              id="error-profile-avatar-link"
              className="popup__error">
            </span>
      </PopupWithForm>

      {/* Модалка добавления карточки */}
      <PopupWithForm
        name="place"
        isOpen={isAddPlacePopupOpen}
        title="Новое место"
        id="form-place"
        formName="edit-place-form"
        buttonText="Создать"
        onClose={closeAllPopups}>
            <input
              type="text"
              id="place-name"
              name="place-name"
              className="popup__input popup__input_place-name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span 
              id="error-place-name" 
              className="popup__error">
            </span>
            <input
              type="url"
              id="place-link"
              name="place-link"
              className="popup__input popup__input_place_link"
              placeholder="Ссылка на картинку"
              required
            />
            <span 
              id="error-place-link" 
              className="popup__error">
            </span>
      </PopupWithForm>

      {/* Модалка удаления карточки */}
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        id="form-delete-card"
        formName="delete-place-card"
        buttonText="Да"
        onClose={closeAllPopups}
      />

      {/* Модалка открытия картинки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
