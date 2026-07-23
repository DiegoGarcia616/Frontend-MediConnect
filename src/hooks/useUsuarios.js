import { useState, useEffect } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  bloquearUsuario,
  inactivarUsuario,
  eliminarUsuario,
} from "../services/api";
import { toast } from "react-toastify";

export default function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await getUsuarios();
      setUsuarios(response.data || []);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      toast.error("Error al cargar usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const guardarUsuario = async (id, data) => {
    setSaving(true);
    try {
      if (id) {
        await updateUsuario(id, data);
        toast.success("Usuario actualizado correctamente");
      } else {
        await createUsuario(data);
        toast.success("Usuario registrado correctamente");
      }
      await fetchUsuarios();
      return true;
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      toast.error(err.response?.data?.message || "Error al guardar el usuario");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const bloquear = async (id) => {
    try {
      await bloquearUsuario(id);
      toast.success("Usuario bloqueado correctamente");
      await fetchUsuarios();
    } catch (err) {
      console.error("Error al bloquear usuario:", err);
      toast.error(err.response?.data?.message || "Error al bloquear el usuario");
    }
  };

  const inactivar = async (id) => {
    try {
      await inactivarUsuario(id);
      toast.success("Usuario inactivado correctamente");
      await fetchUsuarios();
    } catch (err) {
      console.error("Error al inactivar usuario:", err);
      toast.error(err.response?.data?.message || "Error al inactivar el usuario");
    }
  };

  const eliminarUsuarioCompleto = async (id) => {
    try {
      await eliminarUsuario(id);
      toast.success("Usuario eliminado correctamente");
      await fetchUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      toast.error(err.response?.data?.message || "Error al eliminar el usuario");
    }
  };

  return {
    usuarios,
    loading,
    saving,
    fetchUsuarios,
    guardarUsuario,
    bloquear,
    inactivar,
    eliminarUsuarioCompleto,
  };
}