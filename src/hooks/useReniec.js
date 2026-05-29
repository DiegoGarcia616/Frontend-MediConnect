import { useState } from "react";
import { toast } from "react-toastify";
import { consultarReniec } from "../services/api";

export const useReniec = () => {
  const [dniConsulta, setDniConsulta] = useState("");
  const [datosReniec, setDatosReniec] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleConsultar = async () => {
    if (!dniConsulta || dniConsulta.length !== 8) {
      toast.error("Ingrese un DNI válido de 8 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const data = await consultarReniec(dniConsulta);
      if (data.encontrado) {
        setDatosReniec(data);
        setShowModal(true);
      } else {
        toast.error(data.mensaje || "No se encontraron datos en RENIEC.");
      }
    } catch (err) {
      console.error("Error al consultar RENIEC:", err);
      let errorMessage = "Error al consultar RENIEC.";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "No se puede conectar al servidor.";
      } else if (err.response?.data?.mensaje) {
        errorMessage = err.response.data.mensaje;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setDatosReniec(null);
    setDniConsulta("");
  };

  return {
    dniConsulta,
    setDniConsulta,
    datosReniec,
    loading,
    showModal,
    handleConsultar,
    closeModal,
  };
};