import React from "react";

function PopupWithForm({ name, title, id, formName, buttonText, children, onClose, isOpen, onSubmit}) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}>
      <div className="popup__body">
        <h3 className="popup__title">{title}</h3>
        <form
          className={`popup__form popup__form_${name}`}
          name={formName}
          id={id}
          onSubmit={onSubmit}
          autoComplete="off"
          noValidate>  
          {/* рекомендуется убрать noValidate чтобы работала внутренняя валидация браузера, 
          но она не работает, TO DO => настроить валидацию */}
         
          {children}

          <button 
            type="submit" 
            className="popup__submit">
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-popup"
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
