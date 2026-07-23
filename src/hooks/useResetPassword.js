import { useState } from "react";
import { toast } from "react-toastify";
import { confirmarResetPassword } from "../services/api";

export const useResetPassword = (onSuccess) => {
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmar = async (token) => {
    if (!nuevaContrasena || !confirmarContrasena) {
      toast.error("Completa todos los campos.");
      return;
    }

    if (nuevaContrasena.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      await confirmarResetPassword(token, nuevaContrasena);
      toast.success("Contraseña restablecida correctamente.");
      setNuevaContrasena("");
      setConfirmarContrasena("");
      if (onSuccess) onSuccess();
    } catch (err) {
      const mensaje = err?.response?.data?.message || "El enlace no es válido o ha expirado.";
      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return {
    nuevaContrasena,
    setNuevaContrasena,
    confirmarContrasena,
    setConfirmarContrasena,
    loading,
    handleConfirmar,
  };
};