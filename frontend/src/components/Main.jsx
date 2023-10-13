import { useState, useEffect, useContext } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Кнопка редактирования"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          aria-label="Кнопка добавления фотографии"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements"></section>

      <section className="popup popup_dark" id="imagePopup">
        <div className="popup__image-container">
          <button
            className="popup__close-icon popup__close-icon_pict"
            type="button"
            aria-label="Кнопка закрытия попапа"
          ></button>
          <img src="#" alt="#" className="popup__image" />
          <p className="popup__title"></p>
        </div>
      </section>

      <div className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.handleCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
