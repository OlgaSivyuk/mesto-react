import React, {useState, useEffect} from 'react';
import {api} from '../utils/Api.js'
import Card from './Card.js'


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]); // добавляем переменную стейта с пустым массивом в качестве переменной по умолчанию

    useEffect(() => {
      api.getProfile()
        .then(res => {
          setUserName(res.name);
          setUserDescription(res.about);
          setUserAvatar(res.avatar);
        })
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
      api.getUsersCards()
        .then (cardList => {
          //console.log("res", res)
          const usersCard = cardList.map(card => {
              return {
              name: card.name, 
              link: card.link,
              likes: card.likes,
              cardId: card._id,
              }
        })
           //console.log('usersCard', usersCard)
           setCards(usersCard)
        })
      .catch(err => console.log(err));
    }, [])

    // useEffect(() => {
    //   Promise.all([api.getProfile(), api.getUsersCards()])
    //     .then(([userData, cardList]) => {
    //       setUserName(userData.name);
    //       setUserDescription(userData.about);
    //       setUserAvatar(userData.avatar)

    //       const usersCard = cardList.map(card => ({ 
    //         name: card.name, 
    //         link: card.link,
    //         likes: card.likes,
    //         cardId: card._id,
    //       })) 
    //       setCards(usersCard)
    //     })
    //     .catch(err => console.log(err));
    // }, [])


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
          {
            cards.map(card => {
              return (
              <Card key={card.cardId} card={card} onCardClick={onCardClick}/>
              );
            })
          }
        </section>

      </main>
    );
  }
  
  export default Main;