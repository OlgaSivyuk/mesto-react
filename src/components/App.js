import React, { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
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
          setCurrentUser({...userData,
            userName: userData.name,
            userDescription: userData.about,
            userAvatar: userData.avatar,
          })
        })
        .catch((err) => console.log(`Ошибка...: ${err}`));
    }, []); // ПР11 создали эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения

    function handleUpdateUser (name, about){
      api.editProfile(name, about)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      }).catch(err => console.error(`Ошибка...: ${err}`));
    };

    function handleUpdateAvatar (avatar){
      api.editProfileAvatar(avatar)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      }).catch(err => console.error(`Ошибка...: ${err}`));
    };

  useEffect(() => {
    api
      .getUsersCards()
      .then((cardList) => {
        //console.log("res", cardList)
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
      .catch((err) => console.log(`Ошибка...: ${err}`));
  }, []);


  function handleCardLike(card) { // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(user => user._id === currentUser._id); // Отправляем запрос в API и получаем обновлённые данные карточки
    
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
  //     setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  // });
    if (isLiked){ //если карточка с лайком ==> удали лайк
      api.deleteLike(card.cardId)
      .then(newCard => { 
        setCards((state) => state.map((item) => 
        item.cardId === card.cardId ? newCard : item
        ));
      })
      .catch(err => console.log(`Ошибка...: ${err}`))
    } else { // если лайка нет ==> поставь лайк
        api.addLike(card.cardId)
          .then(newCard => { 
            //console.log(' поставить лайк', newCard)
            setCards((stateCards) => stateCards.map((item) => 
            item.cardId === card.cardId ? newCard : item
            ));
          })
          .catch(err => console.log(`Ошибка...: ${err}`))
      } 
  }

  function handleDeleteCard(card) {
    api.deleteCard(card.cardId)
      .then((res) => {
        console.log('удалить карточку', res)
        setCards((stateCards) => stateCards.filter((item) => 
        item.cardId !== card.cardId))
      })
      .catch(err => console.log(`Ошибка...: ${err}`))
  }

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
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
        cards={cards}
      />
      <Footer />
      {/* Модалка редактирования профиля */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}>
      </EditProfilePopup>

      {/* Модалка смены аватара */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}>
      </EditAvatarPopup>
      
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
