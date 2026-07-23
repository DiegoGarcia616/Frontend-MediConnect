import { useState } from "react";
import { toast } from "react-toastify";
import { solicitarResetPassword } from "../services/api";

export const useForgotPassword = () => {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSolicitar = async () => {
    if (!dni || dni.length !== 8) {
      toast.error("Ingresa un DNI válido de 8 dígitos.");
      return;
    }

    setLoading(true);

    try {
      await solicitarResetPassword(dni);
      setSent(true);
      toast.success("Solicitud enviada correctamente.");
    } catch (err) {
      const mensaje = err?.response?.data?.message || "No se pudo procesar la solicitud.";
      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDni("");
    setSent(false);
  };

  return {
    dni,
    setDni,
    loading,
    sent,
    handleSolicitar,
    reset,
  };
};