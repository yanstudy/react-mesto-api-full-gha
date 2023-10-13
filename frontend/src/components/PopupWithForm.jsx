import Popup from "./Popup";
function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  onSubmit,
  isLoading,
  isValid,
  children,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <div className="popup__container">
        <button
          className="popup__close-icon popup__close-icon_edit"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={onClose}
        ></button>
        <form
          className="popup__form"
          name={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="popup__edit">{title}</h3>
          {children}
          <button
            type="submit"
            className={`popup__button popup__button_edit ${
              !isValid ? "popup__button_inactive" : ""
            }`}
            disabled={isLoading || !isValid}
          >
            {isLoading ? "Сохранить..." : "Сохранить"}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
