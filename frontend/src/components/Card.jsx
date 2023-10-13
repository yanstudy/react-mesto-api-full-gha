import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `elements__heart ${
    isLiked && 'elements__heart_liked'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className='elements__element'>
      {isOwn && (
        <button
          className='elements__delete-button'
          type='button'
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className='elements__picture'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className='elements__info'>
        <h2 className='elements__name'>{card.name}</h2>
        <div className='elements__likes-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Лайк'
            onClick={handleLikeClick}
          ></button>
          <p className='elements__likes'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
