import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, getRol } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/portal-web" replace />;
  }

  const userRol = getRol();

  if (allowedRoles && !allowedRoles.includes(userRol)) {
    const rutas = {
      PACIENTE: "/paciente",
      MEDICO: "/medico",
      ADMIN_LOCAL: "/admin-local",
      ADMIN_TOTAL: "/admin",
    };
    return <Navigate to={rutas[userRol] || "/portal-web"} replace />;
  }

  return <Outlet />;
}