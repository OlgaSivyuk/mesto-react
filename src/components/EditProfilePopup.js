import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, onUpdateUser}){
  const currentUser = useContext(CurrentUserContext); // ПР11 Подписываемся на контекст CurrentUserContext
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  
  function handleNameChange(e) {
    //console.log(e.target.value);
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(event) {// Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    onUpdateUser({ // Передаём значения управляемых компонентов во внешний обработчик
      name: name,
      about: description,
    });
  }

  useEffect(() => { // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        id="form-profile"
        formName="edit-profile-form"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              className="popup__input"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
              defaultValue={name || ''}
              onChange={handleNameChange} 
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
              defaultValue={description || ''}
              onChange={handleDescriptionChange}
            />
            <span 
              id="error-bio" 
              className="popup__error">
            </span>
        </PopupWithForm>
  )
}

export default EditProfilePopup;