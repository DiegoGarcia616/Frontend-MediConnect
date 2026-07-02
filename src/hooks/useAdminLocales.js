import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAdminLocales, createAdminLocal, updateAdminLocal, deleteAdminLocal, getSedes } from "../services/api";

export const useAdminLocales = () => {
  const [adminLocales, setAdminLocales] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    dni: "",
    idSede: "",
    password: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [adminsData, sedesData] = await Promise.all([
        getAdminLocales(),
        getSedes(),
      ]);
      setAdminLocales(adminsData);
      setSedes(sedesData);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      toast.error("Error al cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingAdmin(null);
    setFormData({
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      dni: "",
      idSede: "",
      password: "",
    });
    setShowModal(true);
  };

  const openEditModal = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      primerNombre: admin.primerNombre || "",
      segundoNombre: admin.segundoNombre || "",
      primerApellido: admin.primerApellido || "",
      segundoApellido: admin.segundoApellido || "",
      dni: admin.dni || "",
      idSede: admin.idSede || "",
      password: "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAdmin(null);
    setFormData({
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      dni: "",
      idSede: "",
      password: "",
    });
  };

  const handleSave = async () => {
    if (!formData.primerNombre || !formData.primerApellido || !formData.idSede) {
      toast.error("Los campos Primer Nombre, Primer Apellido y Sede son obligatorios.");
      return;
    }

    if (!editingAdmin && !formData.dni) {
      toast.error("El DNI es obligatorio.");
      return;
    }

    if (!editingAdmin && formData.dni.length !== 8) {
      toast.error("El DNI debe tener 8 dígitos.");
      return;
    }

    if (!editingAdmin && !formData.password) {
      toast.error("La contraseña es obligatoria.");
      return;
    }

    if (!editingAdmin && formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setSaving(true);
    try {
      if (editingAdmin) {
        const updateData = {
          primerNombre: formData.primerNombre,
          segundoNombre: formData.segundoNombre,
          primerApellido: formData.primerApellido,
          segundoApellido: formData.segundoApellido,
          idSede: parseInt(formData.idSede),
        };
        await updateAdminLocal(editingAdmin.idAdminLocal, updateData);
        toast.success("Administrador Local actualizado correctamente.");
      } else {
        const createData = {
          primerNombre: formData.primerNombre,
          segundoNombre: formData.segundoNombre,
          primerApellido: formData.primerApellido,
          segundoApellido: formData.segundoApellido,
          dni: formData.dni,
          idSede: parseInt(formData.idSede),
          password: formData.password,
        };
        await createAdminLocal(createData);
        toast.success("Administrador Local creado correctamente.");
      }
      closeModal();
      await fetchData();
    } catch (err) {
      console.error("Error al guardar:", err);
      let errorMessage = "Error al guardar los datos.";

      if (err.code === "ERR_NETWORK") {
        errorMessage = "No se puede conectar al servidor.";
      } else if (err.response?.data) {
        const responseData = typeof err.response.data === "string" 
          ? err.response.data 
          : JSON.stringify(err.response.data);
        
        if (responseData.includes("DNI ya registrado")) {
          errorMessage = "DNI ya registrado en el sistema.";
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar al administrador ${nombre}?`)) {
      return;
    }

    try {
      await deleteAdminLocal(id);
      toast.success("Administrador Local eliminado correctamente.");
      await fetchData();
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast.error("Error al eliminar el administrador.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    adminLocales,
    sedes,
    loading,
    showModal,
    editingAdmin,
    formData,
    setFormData,
    saving,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSave,
    handleDelete,
  };
};