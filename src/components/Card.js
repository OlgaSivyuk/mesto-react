import React,{ useContext }from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext); // ПР11 Подписываемся на контекст CurrentUserContext
  
  const isOwn = card.ownerId === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  //console.log("userid", currentUser._id)
  const cardDeleteButtonClassName = (
    `place__delete ${isOwn ? '' : 'place__delete_hidden'}`
  ); // Создаём переменную, которую после зададим в `className` для кнопки удаления
  
  const isLiked = card.likes.some(user => user._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  //console.log("likeid", currentUser._id)
  const cardLikeButtonClassName = (
    `place__like ${isLiked && 'place__like_active'}`
  );  // Создаём переменную, которую после зададим в `className` для кнопки лайка

  

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }
  
  return (
    <article className="place">
      <img
        className="place__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__reaction">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Нравится"
          ></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        arial-label="Удалить"
      ></button>
    </article>
  );
}

export default Card;
