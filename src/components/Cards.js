import React from 'react';


function Cards() {
  return (
    <article className="place">
      <img alt="" className="place__image" src="." />
      <div className="place__info">
        <h2 className="place__name"></h2>
        <div className="place__reaction">
          <button type="button" className="place__like" aria-label="Нравится"></button>
          <span className="place__like-count"></span>
        </div>
      </div>
      <button type="button" className="place__delete" arial-label="Удалить"></button>
    </article>
  );
}

export default Cards;
