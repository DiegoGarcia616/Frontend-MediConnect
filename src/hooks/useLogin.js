import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/api";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setSession, fetchAndStoreUser, getDefaultRoute } = useAuth();

  const handleLogin = async () => {
    if (!dni || !password) {
      toast.warning("Completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(dni, password);

      if (!response.success) {
        toast.error(response.message || "No se pudo iniciar sesión.");
        return;
      }

      const { accessToken, refreshToken } = response.data;

      setSession(accessToken, refreshToken);

      const userData = await fetchAndStoreUser();

      toast.success("Inicio de sesión exitoso.");
      navigate(getDefaultRoute(userData.nombreRol));
    } catch (error) {
      let mensaje = "No se pudo conectar al servidor. Intenta nuevamente.";

      if (error?.response?.data?.message) {
        mensaje = error.response.data.message;
      } else if (error.code === "ERR_NETWORK") {
        mensaje = "No se puede conectar al servidor. Intenta nuevamente.";
      }

      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return {
    dni,
    setDni,
    password,
    setPassword,
    loading,
    handleLogin,
  };
};