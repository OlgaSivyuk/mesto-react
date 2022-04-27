import React from 'react';

function Card({card, onCardClick}) {

//   function handleClick () {
//     onCardClick(card);
// };

  return (
    <article className="place">
      <img className="place__image" alt={card.name} src={card.link} onClick={onCardClick} />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__reaction">
          <button type="button" className="place__like" aria-label="Нравится"></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button type="button" className="place__delete" arial-label="Удалить"></button>
    </article>
  );
}

export default Card;
