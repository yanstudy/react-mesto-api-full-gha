import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      name: "",
      link: "",
    });

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues({ name: "", link: "" });
    }
  }, [isOpen, resetForm, setValues]);

  return (
    <PopupWithForm
      name={"newPlacePopup"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <div className="popup__input-wrapper">
        <input
          type="text"
          className="popup__input"
          id="nameOfPlaceInput"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
        <span className="popup__input-error nameOfPlaceInput-error">
          {errors.name}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          type="url"
          className="popup__input"
          id="placeInput"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.link}
        />
        <span className="popup__input-error placeInput-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
