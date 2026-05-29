import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getPacientePerfil, updatePacienteContacto } from "../services/api";

export const usePacientePerfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchPerfil = async () => {
    setLoading(true);
    try {
      const data = await getPacientePerfil();
      setPerfil(data);
    } catch (err) {
      console.error("Error al cargar perfil:", err);
      toast.error("Error al cargar los datos del perfil.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (field, currentValue) => {
    setEditingField(field);
    setFieldValue(currentValue || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingField(null);
    setFieldValue("");
  };

  const handleSave = async () => {
    if (editingField === "correo") {
      if (!fieldValue) {
        toast.error("El correo es obligatorio.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fieldValue)) {
        toast.error("Ingresa un correo válido.");
        return;
      }
    }

    if (editingField === "telefono") {
      if (!fieldValue) {
        toast.error("El teléfono es obligatorio.");
        return;
      }
      if (fieldValue.length !== 9) {
        toast.error("El teléfono debe tener 9 dígitos.");
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {};
      payload[editingField] = fieldValue;

      await updatePacienteContacto(
        editingField === "correo" ? fieldValue : perfil?.correo,
        editingField === "telefono" ? fieldValue : perfil?.telefono,
        editingField === "ubigeo" ? fieldValue : perfil?.ubigeo
      );

      toast.success("Datos actualizados correctamente.");
      closeModal();
      await fetchPerfil();
    } catch (err) {
      console.error("Error al actualizar:", err);

      let errorMessage = "Error al actualizar los datos.";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "No se puede conectar al servidor.";
      } else if (err.response?.data) {
        const responseData = typeof err.response.data === "string" 
          ? err.response.data 
          : JSON.stringify(err.response.data);
        
        if (responseData.includes("mensaje")) {
          errorMessage = err.response.data.mensaje || errorMessage;
        }
      }

      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleBlockedFieldClick = () => {
    toast.warning("Consulte a un administrador para editar estos datos.");
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  return {
    perfil,
    loading,
    showModal,
    editingField,
    fieldValue,
    setFieldValue,
    saving,
    openEditModal,
    closeModal,
    handleSave,
    handleBlockedFieldClick,
  };
};