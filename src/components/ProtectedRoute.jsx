import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, getRol, getDefaultRoute } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/portal-web" replace />;
  }

  const userRol = getRol();

  if (allowedRoles && !allowedRoles.includes(userRol)) {
    return <Navigate to={getDefaultRoute(userRol)} replace />;
  }

  return <Outlet />;
}