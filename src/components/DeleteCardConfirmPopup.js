import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardConfirmPopup ({ card, isOpen, onClose, onConfirmCardDelete }){

    function handleSubmit(event) {
        event.preventDefault();
        onConfirmCardDelete(card);
      }
    return(
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        id="form-delete-card"
        formName="delete-place-card"
        buttonText="Да"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
    )
}

export default DeleteCardConfirmPopup;