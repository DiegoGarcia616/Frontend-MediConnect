import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicRoute() {
  const { isAuthenticated, getRol, getDefaultRoute } = useAuth();

  if (isAuthenticated()) {
    const rol = getRol();
    return <Navigate to={getDefaultRoute(rol)} replace />;
  }

  return <Outlet />;
}