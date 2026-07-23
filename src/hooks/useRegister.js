import { useState } from "react";
import { toast } from "react-toastify";
import { registerPaciente } from "../services/api";

export const useRegister = (onSuccess) => {
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleRegister = async () => {
    if (!dni || !correo || !password) {
      toast.error("Completa todos los campos.");
      return;
    }

    if (dni.length !== 8) {
      toast.error("El DNI debe tener 8 dígitos.");
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
      const body = await registerPaciente(dni, correo, password);

      if (body.success) {
        const nombres = body.data?.nombres || "";
        const apellidoPaterno = body.data?.apellidoPaterno || "";
        const apellidoMaterno = body.data?.apellidoMaterno || "";

        setSuccessData({
          nombres,
          apellidoPaterno,
          apellidoMaterno,
        });

        setDni("");
        setCorreo("");
        setPassword("");
      } else {
        let errorMessage = body.message || "Error al crear la cuenta. Intenta nuevamente.";

        if (body.data && typeof body.data === "object") {
          const primerError = Object.values(body.data)[0];
          if (primerError) {
            errorMessage = primerError;
          }
        }

        toast.error(errorMessage);
      }
    } catch (err) {
      let errorMessage = "Error al crear la cuenta. Intenta nuevamente.";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "No se puede conectar al servidor. Intenta nuevamente.";
      } else if (err.response?.data) {
        const body = err.response.data;

        if (body?.message) {
          errorMessage = body.message;
        }

        if (body?.data && typeof body.data === "object") {
          const primerError = Object.values(body.data)[0];
          if (primerError) {
            errorMessage = primerError;
          }
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    setSuccessData(null);
    if (onSuccess) onSuccess();
  };

  return {
    dni,
    setDni,
    correo,
    setCorreo,
    password,
    setPassword,
    loading,
    handleRegister,
    successData,
    closeSuccess,
  };
};