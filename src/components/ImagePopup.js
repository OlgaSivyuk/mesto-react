import React from "react";

function ImagePopup (card, isOpen, onClose){
  return (
  <div className={`popup popup_type_photo ${isOpen}`}>
    <div className="popup__photo-body">
      <img className="popup__photo-url" src={card.link} alt={card.name}/>
      <h3 className="popup__photo-name">{card.name}</h3>
      <button type="button" className="popup__close-popup" aria-label="Закрыть фото место" onClick={onClose}></button>
    </div>
  </div>
  )
}

export default ImagePopup;