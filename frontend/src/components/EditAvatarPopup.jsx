import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      link: "",
    });

  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setValues({ link: avatarInput.current.value });
    onUpdateAvatar(avatarInput.current.value);
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
      avatarInput.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"editAvatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <div className="popup__input-wrapper">
        <input
          type="url"
          className="popup__input"
          id="linkOfAvatarInput"
          name="link"
          placeholder="Введите ссылку на новый аватар"
          required
          ref={avatarInput}
          onChange={handleChange}
        />
        <span className="popup__input-error linkOfAvatarInput-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
