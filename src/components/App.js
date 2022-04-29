import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
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
  );
}

export default App;
