import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      nameInput: "",
      jobInput: "",
    });

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues({
        nameInput: currentUser.name,
        jobInput: currentUser.about,
      });
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.nameInput,
      about: values.jobInput,
    });
  }

  return (
    <PopupWithForm
      name={"editPopup"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <div className="popup__input-wrapper">
        <input
          type="text"
          className="popup__input"
          id="nameInput"
          name="nameInput"
          placeholder="Введите имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.nameInput}
        />
        <span className="popup__input-error nameInput-error">
          {errors.nameInput}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          type="text"
          className="popup__input"
          id="jobInput"
          name="jobInput"
          placeholder="Чем вы занимаетесь?"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={values.jobInput}
        />
        <span className="popup__input-error jobInput-error">
          {errors.jobInput}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
