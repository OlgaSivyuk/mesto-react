import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
//import CurrentUserContext from '../contexts/CurrentUserContext'

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar }){
  //const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  useEffect(() => { // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
  <PopupWithForm
        name="profile-avatar"
        isOpen={isOpen}
        title="Обновить автар"
        id="form-profile-avatar"
        formName="edit-profile-avatar"
        buttonText="Сохранить"
        onClose={onClose}
        onSubmit={handleSubmit}>
            <input
              type="url"
              id="profile-avatar-link"
              name="profile-avatar-link"
              className="popup__input popup__input_profile-avatar_link"
              placeholder="Ссылка на картинку"
              required
              ref={avatarRef}
            />
            <span
              id="error-profile-avatar-link"
              className="popup__error">
            </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;