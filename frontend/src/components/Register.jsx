import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Login({ onRegister }) {
  return (
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <AuthForm buttonTitle="Зарегистрироваться" submit={onRegister} />

      <h4 className="register__question">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="register__link">
          <span> Войти</span>
        </Link>
      </h4>
    </div>
  );
}
