import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function AuthForm({ buttonTitle, submit }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    submit({ password: values.password, email: values.email });
  }

  return (
    <form className="authform" onSubmit={handleSubmit} noValidate>
      <div className="authform__wrapper">
        <input
          className="authform__input"
          placeholder="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={values.email}
        ></input>
        <span className="authform__input-error">{errors.email}</span>
      </div>
      <div className="authform__wrapper">
        <input
          className="authform__input"
          placeholder="Пароль"
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          required
        ></input>
        <span className="authform__input-error">{errors.password}</span>
      </div>
      <button className="authform__button" type="submit" disabled={!isValid}>
        {buttonTitle}
      </button>
    </form>
  );
}
