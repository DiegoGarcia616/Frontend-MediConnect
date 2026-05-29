import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");
  const getRol = () => localStorage.getItem("rol");
  const getNombre = () => localStorage.getItem("nombre");

  const isAuthenticated = () => {
    return !!getToken() && !!getRol();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    toast.info("Sesión cerrada correctamente.");
    navigate("/portal-web");
  };

  const getDefaultRoute = (rol) => {
    const rutas = {
      PACIENTE: "/paciente",
      MEDICO: "/medico",
      ADMIN_LOCAL: "/admin-local",
      ADMIN_TOTAL: "/admin",
    };
    return rutas[rol] || "/";
  };

  return {
    isAuthenticated,
    getToken,
    getRol,
    getNombre,
    logout,
    getDefaultRoute,
  };
};