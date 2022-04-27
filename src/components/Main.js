import React, {useState, useEffect} from 'react';
import avatar from '../images/avatar.jpg';  // заглушка
import {api} from '../utils/Api.js'
import Cards from './Cards.js'


function Main({ onEditAvatar, onEditProfile, onAddPlace  }) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        api.getProfile()
          .then(res => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
          })
          .catch(err => console.log(err));
      }, []);




    return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-img">
            <img src={userAvatar} alt="Фото профиля" className="profile__avatar"/>
            <button title="Загрузить аватар" className="profile__avatar-button" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__top-row">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" id="open_popup" className="profile__add-info" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
            </div>
            <p className="profile__bio">{userDescription}</p>
          </div>
          <button type="button" className="profile__add-place" aria-label="Добавить фото" onClick={onAddPlace}></button>
        </section>
        <section className="places">
            
        </section>
      </main>
    );
  }
  
  export default Main;