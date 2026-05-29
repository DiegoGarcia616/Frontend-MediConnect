import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/api";

export const useLogin = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!dni || !password) {
      toast.error("Completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(dni, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      toast.success(`¡Bienvenido, ${data.nombre}!`);

      const rutasPorRol = {
        PACIENTE: "/paciente/perfil",
        MEDICO: "/medico",
        ADMIN_LOCAL: "/admin-local",
        ADMIN_TOTAL: "/admin",
      };

      navigate(rutasPorRol[data.rol] || "/");
    } catch (err) {
      console.error("Error en login:", err);

      let errorMessage = "Error al iniciar sesión. Intenta nuevamente.";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "No se puede conectar al servidor. Intenta nuevamente.";
      } else if (err.response?.data) {
        const responseData = typeof err.response.data === "string" 
          ? err.response.data 
          : JSON.stringify(err.response.data);

        if (responseData.includes("Credenciales inválidas")) {
          errorMessage = "Credenciales inválidas. Verifica tu DNI y contraseña.";
        } else if (responseData.includes("Cuenta bloqueada temporalmente por múltiples intentos fallidos")) {
          errorMessage = "Cuenta bloqueada temporalmente por múltiples intentos fallidos. Intenta más tarde.";
        }
      }

      toast.error(errorMessage);
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