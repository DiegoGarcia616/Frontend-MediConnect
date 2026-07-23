import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMe } from "../services/api";

const RUTAS_POR_ROL = {
  ADMINISTRADOR_TOTAL: "/admin",
  ADMINISTRADOR_LOCAL: "/admin-local",
  RECEPCIONISTA: "/recepcionista",
  MEDICO: "/medico",
  PACIENTE: "/paciente",
};

export const useAuth = () => {
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");
  const getRefreshToken = () => localStorage.getItem("refreshToken");
  const getDni = () => localStorage.getItem("dni");
  const getNombre = () => localStorage.getItem("nombreCompleto");
  const getRol = () => localStorage.getItem("rol");

  const isAuthenticated = () => {
    return !!getToken() && !!getRol();
  };

  const setSession = (accessToken, refreshToken) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const setUserData = ({ dni, nombreCompleto, nombreRol }) => {
    localStorage.setItem("dni", dni);
    localStorage.setItem("nombreCompleto", nombreCompleto);
    localStorage.setItem("rol", nombreRol);
  };

  const fetchAndStoreUser = async () => {
    const response = await getMe();
    setUserData(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("dni");
    localStorage.removeItem("nombreCompleto");
    localStorage.removeItem("rol");
    toast.info("Sesión cerrada correctamente.");
    navigate("/portal-web");
  };

  const getDefaultRoute = (rol) => {
    return RUTAS_POR_ROL[rol] || "/portal-web";
  };

  return {
    isAuthenticated,
    getToken,
    getRefreshToken,
    getDni,
    getNombre,
    getRol,
    setSession,
    setUserData,
    fetchAndStoreUser,
    logout,
    getDefaultRoute,
  };
};