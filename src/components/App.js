import logo from '../logo.svg';
//import './App.css';

function App() {
  return (
    <div class="page">
      <header class="header">
        <img alt="Место Россия" class="header__logo" src="<%=require('./images/logo/logo.svg')%>"/>
      </header>

  <main class="content">
    <section class="profile">
      <div class="profile__avatar-img">
        <img src="<%=require('./images/avatar.jpg')%>" alt="Фото профеля" class="profile__avatar"/>
        <button title="Загрузить аватар" class="profile__avatar-button"></button>
      </div>
      <div class="profile__info">
        <div class="profile__top-row">
          <h1 class="profile__name">Жак-Ив Кусто</h1>
          <button type="button" id="open_popup" class="profile__add-info" aria-label="Редактировать профиль"></button>
        </div>
        <p class="profile__bio">Исследователь океана</p>
      </div>
      <button type="button" class="profile__add-place" aria-label="Добавить фото"></button>
    </section>
    <section class="places">
    </section>
  </main>

  <footer class="footer">
    <p class="footer__tag">&copy; Оля Сивьюк. 2022 Mesto Russia</p>
  </footer>

  <div class="popup popup_type_profile">
    <div class="popup__body">
      <h3 class="popup__title">Редактировать профиль</h3>
      <form class="popup__form popup__form_profile" id="form-profile" autocomplete="off" name="edit-profile-form" novalidate>
        <input type="text" id="name" name="name" class="popup__input" placeholder="Имя" minlength="2" maxlength="40" required/>
        <span id="error-name" class="popup__error"></span>
        <input type="text" id="bio" name="bio" class="popup__input" placeholder="О себе" minlength="2" maxlength="200" required/>
        <span id="error-bio" class="popup__error"></span>
        <button type="submit" class="popup__submit">Сохранить</button>
      </form>
      <button type="button" class="popup__close-popup" aria-label="Закрыть редактирование профиля"></button>
    </div>
  </div>

  
  <div class="popup popup_type_profile-avatar">
    <div class="popup__body">
      <h3 class="popup__title">Обновить автар</h3>
      <form class="popup__form popup__form_profile-avatar" id="form-profile-avatar" autocomplete="off" name="edit-profile-avatar" novalidate>
        <input type="url" id="profile-avatar-link" name="profile-avatar-link" class="popup__input popup__input_profile-avatar_link" placeholder="Ссылка на картинку" required/>
        <span id="error-profile-avatar-link" class="popup__error"></span>
        <button type="submit" class="popup__submit">Сохранить</button>
      </form>
      <button type="button" class="popup__close-popup" aria-label="Закрыть форму редактирования аватара"></button>
    </div>
  </div>

  <div class="popup popup_type_place">
    <div class="popup__body">
      <h3 class="popup__title">Новое место</h3>
      <form class="popup__form" id="form-place" autocomplete="off" name="edit-place-form" novalidate>
        <input type="text" id="place-name" name="place-name" class="popup__input popup__input_place-name" placeholder="Название" minlength="2" maxlength="30" required/>
        <span id="error-place-name" class="popup__error"></span>
        <input type="url" id="place-link" name="place-link" class="popup__input popup__input_place_link" placeholder="Ссылка на картинку" required/>
        <span id="error-place-link" class="popup__error"></span>
        <button type="submit" class="popup__submit">Создать</button>
      </form>
      <button type="button" class="popup__close-popup" aria-label="Закрыть редактирование карточки место"></button>
    </div>
  </div>

  
  <div class="popup popup_type_delete-card">
    <div class="popup__body">
      <h3 class="popup__title">Вы уверены?</h3>
      <form class="popup__form popup__form_delete-card" id="form-delete-card" name="delete-place-card" novalidate>
        <button type="submit" class="popup__submit">Да</button>
      </form>
      <button type="button" class="popup__close-popup" aria-label="Закрыть форму удаления карточки"></button>
    </div>
  </div>

  <div class="popup popup_type_photo">
    <div class="popup__photo-body">
      <img class="popup__photo-url" src="." alt=""/>
      <h3 class="popup__photo-name"></h3>
      <button type="button" class="popup__close-popup" aria-label="Закрыть фото место"></button>
    </div>
  </div>

  <template class="template">
    <article class="place">
      <img alt="" class="place__image" src="."/>
      <div class="place__info">
        <h2 class="place__name"></h2>
        <div class="place__reaction">
          <button type="button" class="place__like" aria-label="Нравится"></button>
          <span class="place__like-count"></span>
        </div>  
      </div>
      <button type="button" class="place__delete" arial-label="Удалить"></button>
    </article>
  </template>
  </div>
  );
}

export default App;
