import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerPaciente } from "../services/api";

export const useRegister = () => {
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!dni || !correo || !telefono || !password) {
      toast.error("Completa todos los campos.");
      return;
    }

    if (dni.length !== 8) {
      toast.error("El DNI debe tener 8 dígitos.");
      return;
    }

    if (telefono.length !== 9) {
      toast.error("El teléfono debe tener 9 dígitos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      toast.error("Ingresa un correo válido.");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const data = await registerPaciente(dni, correo, telefono, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      toast.success(`¡Cuenta creada exitosamente! Bienvenido, ${data.nombre}!`);

      const rutasPorRol = {
        PACIENTE: "/paciente",
        MEDICO: "/medico",
        ADMIN_LOCAL: "/admin-local",
        ADMIN_TOTAL: "/admin",
      };

      navigate(rutasPorRol[data.rol] || "/");
    } catch (err) {
      console.error("Error en registro:", err);

      let errorMessage = "Error al crear la cuenta. Intenta nuevamente.";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "No se puede conectar al servidor. Intenta nuevamente.";
      } else if (err.response?.data) {
        const responseData = typeof err.response.data === "string" 
          ? err.response.data 
          : JSON.stringify(err.response.data);

        if (responseData.includes("DNI ya registrado en el sistema")) {
          errorMessage = "DNI ya registrado en el sistema. Inicia sesión en su lugar.";
        } else if (responseData.includes("No se encontraron datos en RENIEC")) {
          errorMessage = "No se encontraron datos en RENIEC para el DNI ingresado. Por favor comuníquese con un administrador para registrar sus datos manualmente.";
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
    correo,
    setCorreo,
    telefono,
    setTelefono,
    password,
    setPassword,
    loading,
    handleRegister,
  };
};