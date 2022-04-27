//import React from "react";

function ImagePopup ({card, onClose}){
  return (
  <div className={`popup popup_type_photo ${card ? "popup_opened" : " "}`}>
    <div className="popup__photo-body">
      <img className="popup__photo-url" src={card.link} alt={card.name}/>
      <h3 className="popup__photo-name">{card.name}</h3>
      <button type="button" className="popup__close-popup" aria-label="Закрыть фото место" onClick={onClose}></button>
    </div>
  </div>
  )
}

// function ImagePopup (props){
//   return (
// <div className={`popup popup_type_photo ${props.card ? "popup_opened" : " "}`}>
//     <div className="popup__photo-body">
//       <img className="popup__photo-url" src={props.card ? props.card.link : ""} alt={props.card ? props.card.link : ""}/>
//       <h3 className="popup__photo-name">{props.card ? props.card.link : ""}</h3>
//       <button type="button" className="popup__close-popup" aria-label="Закрыть фото место" onClick={props.onClose}></button>
//     </div>
//   </div>
//     )
//   }

export default ImagePopup;