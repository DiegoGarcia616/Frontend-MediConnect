import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children, roles }) {
  const { isAuthenticated, getRol } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/portal-web" replace />;
  }

  const rol = getRol();

  if (roles && !roles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}