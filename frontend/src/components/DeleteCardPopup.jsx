function DeleteCardPopup({
  isOpen,
  onClose,
  onDeleteCard,
  isLoading,
  name,
  title,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`} id={`${name}`}>
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
          onSubmit={handleSubmit}
          noValidate
        >
          <h3 className="popup__edit">{title}</h3>

          <button
            type="submit"
            className="popup__button popup__button_edit"
            disabled={isLoading}
          >
            {isLoading ? "Да..." : "Да"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default DeleteCardPopup;
