import Popup from "./Popup";
function ImagePopup(props) {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <div className="popup__image-container">
        <button
          className="popup__close-icon popup__close-icon_edit"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <p className="popup__title">{props.card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
