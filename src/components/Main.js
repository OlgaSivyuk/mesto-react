import avatar from '../images/avatar.jpg';  // заглушка
import Cards from './Cards.js'

function Main() {
    return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-img">
            <img src={avatar} alt="Фото профеля" className="profile__avatar"/>
            <button title="Загрузить аватар" className="profile__avatar-button"></button>
          </div>
          <div className="profile__info">
            <div className="profile__top-row">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button type="button" id="open_popup" className="profile__add-info" aria-label="Редактировать профиль"></button>
            </div>
            <p className="profile__bio">Исследователь океана</p>
          </div>
          <button type="button" className="profile__add-place" aria-label="Добавить фото"></button>
        </section>
        <section className="places">
        </section>
      </main>
    );
  }
  
  export default Main;