import headerLogo from "../images/header__logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email, onLogout }) {
  const location = useLocation();
  const isMainRoute = location.pathname === "/";
  const isLoginRoute = location.pathname === "/sign-in";
  const isRegisterRoute = location.pathname === "/sign-up";

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      <div className="header__user">
        {isMainRoute ? (
          <>
            <p className="header__email">{email} </p>
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <p className="header__text header__text_dark" onClick={onLogout}>
                Выйти
              </p>{" "}
            </Link>
          </>
        ) : null}
        {isLoginRoute ? (
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            <p className="header__text">Регистрация</p>
          </Link>
        ) : isRegisterRoute ? (
          <Link to="/sign-in" style={{ textDecoration: "none" }}>
            <p className="header__text">Войти</p>
          </Link>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
