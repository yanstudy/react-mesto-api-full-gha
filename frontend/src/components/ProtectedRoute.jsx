import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ onlyUnAuth, user, children }) => {
  const location = useLocation();

  if (onlyUnAuth && user?.email) {
    const from = location.state?.from || { pathname: "/" };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user?.email) {
    return (
      <Navigate
        to={{ pathname: "/sign-in" }}
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};
