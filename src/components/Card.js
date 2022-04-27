import React from 'react';

function Card(card) {

  return (
    <article className="place">
      <img alt={card.name} className="place__image" src={card.link} />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__reaction">
          <button type="button" className="place__like" aria-label="Нравится"></button>
          <span className="place__like-count">{card.likes}</span>
        </div>
      </div>
      <button type="button" className="place__delete" arial-label="Удалить"></button>
    </article>
  );
}

export default Card;
