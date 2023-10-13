import AuthForm from "./AuthForm";

export default function Login({ onLogin }) {
  return (
    <div className="login">
      <h3 className="login__title">Вход</h3>
      <AuthForm submit={onLogin} buttonTitle="Войти" />
    </div>
  );
}
