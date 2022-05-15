import React, { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import Header from "./Header";
import Main from "./Main";
//import PopupWithForm from "./PopupWithForm"; // все перенесли и больше не используется
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup";
import DeleteCardConfirmPopup from "./DeleteCardConfirmPopup";
import Footer from "./Footer";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardConfirmPopupOpen, setIsDeleteCardConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({}); // ПР11 создали переменную состояния currentUser
  const [cards, setCards] = useState([]); // ПР11 перенесла карточки в корневой компонент
  const [removeCard, setRemoveCard] = useState(null);

  useEffect(() => {
      api.getProfile()
        .then(userData => {
          //console.log("res", userData)
          setCurrentUser({...userData,
            userName: userData.name,
            userDescription: userData.about,
            userAvatar: userData.avatar
          })
        })
        .catch((err) => console.log(`Ошибка...: ${err}`));
    }, []); // ПР11 создали эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения

    function handleUpdateUser ({name, about}){
      api.editProfile(name, about)
      .then(userData => {
        //console.log("res", userData)
        setCurrentUser({...userData,
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar
        });
        closeAllPopups();
      }).catch(err => console.error(`Ошибка...: ${err}`));
    };

    function handleUpdateAvatar ({avatar}){
      api.editProfileAvatar(avatar)
      .then(userData => {
        setCurrentUser({...userData,
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar
        });
        closeAllPopups();
      }).catch(err => console.error(`Ошибка...: ${err}`));
    };

  useEffect(() => {
    api.getUsersCards()
      .then((cardList) => {
        //console.log("res", cardList)
        const usersCard = cardList.map((card) => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
            ownerId: card.owner._id
          };
        });
        //console.log('usersCard', usersCard)
        setCards(usersCard);
      })
      .catch((err) => console.log(`Ошибка...: ${err}`));
  }, []);

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard(name, link)
    .then (newCard => {
      setCards([{
        name: newCard.name,
        link: newCard.link,
        likes: newCard.likes,
        cardId: newCard._id,
        ownerId: newCard.owner._id
      }, ...cards]);
      closeAllPopups();
    }).catch(err => console.error(`Ошибка...: ${err}`));
  };


  function handleCardLike(card) { // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(user => user._id === currentUser._id); // Отправляем запрос в API и получаем обновлённые данные карточки
    
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
  //     setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  // });

    if (isLiked){ //если карточка с лайком ==> удали лайк
      api.deleteLike(card.cardId)
      .then(newCard => { 
        setCards((state) => state.map((item) => {
          if(item.cardId === card.cardId){
            return{
              name: newCard.name,
              link: newCard.link,
              likes: newCard.likes,
              cardId: newCard._id,
              ownerId: newCard.owner._id
            }
          } else return item;
        }
        // item.cardId === card.cardId ? newCard : item
        ));
      })
      .catch(err => console.log(`Ошибка...: ${err}`))
    } else { // если лайка нет ==> поставь лайк
        api.addLike(card.cardId)
          .then(newCard => { 
            //console.log(' поставить лайк', newCard)
            setCards((stateCards) => stateCards.map((item) => {
              if(item.cardId === card.cardId){
                return{
                  name: newCard.name,
                  link: newCard.link,
                  likes: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner._id
                }
              } else return item;
            }
            //item.cardId === card.cardId ? newCard : item
            ));
          })
          .catch(err => console.log(`Ошибка...: ${err}`))
      } 
   };

  function handleDeleteCard() {
    api.deleteCard(removeCard.cardId)
    //console.log('pr', removeCard.cardId)
      .then(() => {
        //console.log('удалить карточку', res)
        setCards((stateCards) => stateCards.filter((item) => 
        item.cardId !== removeCard.cardId));
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка...: ${err}`))
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    // console.log(selectedCard)
    setSelectedCard(card);
  };

  function handleTrashbinClick(card){
    setIsDeleteCardConfirmPopupOpen(true)
    setRemoveCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardConfirmPopupOpen(false);
  };

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
        // onCardDelete={handleDeleteCard} // меняем механику, переносим в компонент DeleteCardConfirmPopup
        onCardDelete={handleTrashbinClick}
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
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}>
      </AddPlacePopup>

      {/* Модалка удаления карточки */}
      <DeleteCardConfirmPopup
        isOpen={isDeleteCardConfirmPopupOpen}
        onClose={closeAllPopups}
        onConfirmCardDelete={handleDeleteCard}>
      </DeleteCardConfirmPopup>
      

      {/* Модалка открытия картинки */}
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
