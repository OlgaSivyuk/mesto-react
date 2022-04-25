import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

//import './App.css';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
  
  <div className="popup popup_type_profile">
    <div className="popup__body">
      <h3 className="popup__title">Редактировать профиль</h3>
      <form className="popup__form popup__form_profile" id="form-profile" autoComplete="off" name="edit-profile-form" noValidate>
        <input type="text" id="name" name="name" className="popup__input" placeholder="Имя" minLength="2" maxLength="40" required/>
        <span id="error-name" className="popup__error"></span>
        <input type="text" id="bio" name="bio" className="popup__input" placeholder="О себе" minLength="2" maxLength="200" required/>
        <span id="error-bio" className="popup__error"></span>
        <button type="submit" className="popup__submit">Сохранить</button>
      </form>
      <button type="button" className="popup__close-popup" aria-label="Закрыть редактирование профиля"></button>
    </div>
  </div>

  
  <div className="popup popup_type_profile-avatar">
    <div className="popup__body">
      <h3 className="popup__title">Обновить автар</h3>
      <form className="popup__form popup__form_profile-avatar" id="form-profile-avatar" autoComplete="off" name="edit-profile-avatar" novalidate>
        <input type="url" id="profile-avatar-link" name="profile-avatar-link" className="popup__input popup__input_profile-avatar_link" placeholder="Ссылка на картинку" required/>
        <span id="error-profile-avatar-link" className="popup__error"></span>
        <button type="submit" className="popup__submit">Сохранить</button>
      </form>
      <button type="button" className="popup__close-popup" aria-label="Закрыть форму редактирования аватара"></button>
    </div>
  </div>

  <div className="popup popup_type_place">
    <div className="popup__body">
      <h3 className="popup__title">Новое место</h3>
      <form className="popup__form" id="form-place" autoComplete="off" name="edit-place-form" noValidate>
        <input type="text" id="place-name" name="place-name" className="popup__input popup__input_place-name" placeholder="Название" minlength="2" maxlength="30" required/>
        <span id="error-place-name" className="popup__error"></span>
        <input type="url" id="place-link" name="place-link" class="popup__input popup__input_place_link" placeholder="Ссылка на картинку" required/>
        <span id="error-place-link" className="popup__error"></span>
        <button type="submit" className="popup__submit">Создать</button>
      </form>
      <button type="button" className="popup__close-popup" aria-label="Закрыть редактирование карточки место"></button>
    </div>
  </div>

  
  <div className="popup popup_type_delete-card">
    <div className="popup__body">
      <h3 className="popup__title">Вы уверены?</h3>
      <form className="popup__form popup__form_delete-card" id="form-delete-card" name="delete-place-card" noValidate>
        <button type="submit" className="popup__submit">Да</button>
      </form>
      <button type="button" className="popup__close-popup" aria-label="Закрыть форму удаления карточки"></button>
    </div>
  </div>

  <div className="popup popup_type_photo">
    <div className="popup__photo-body">
      <img className="popup__photo-url" src="." alt=""/>
      <h3 className="popup__photo-name"></h3>
      <button type="button" className="popup__close-popup" aria-label="Закрыть фото место"></button>
    </div>
  </div>

  
  </div>
  );
}

export default App;
