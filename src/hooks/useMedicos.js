import { useState, useEffect } from "react";
import {
  getUsuarios,
  getMedicosAdmin,
  completarDatosMedico,
  actualizarEspecialidadSedeMedico,
  actualizarDisponibilidadMedico,
  activarMedico,
  inactivarMedico,
} from "../services/api";
import { toast } from "react-toastify";

export default function useMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchMedicos = async () => {
    setLoading(true);
    try {
      const [usuariosResp, medicosResp] = await Promise.all([getUsuarios(), getMedicosAdmin()]);
      const usuarios = usuariosResp.data || [];
      const listaMedicos = medicosResp.data || [];

      const usuariosMedico = usuarios.filter((u) => u.idRol === 4);
      const idsCompletados = new Set(listaMedicos.map((m) => m.idUsuario));
      const usuariosPendientes = usuariosMedico.filter((u) => !idsCompletados.has(u.idUsuario));

      setMedicos(listaMedicos);
      setPendientes(usuariosPendientes);
    } catch (err) {
      console.error("Error al cargar médicos:", err);
      toast.error("Error al cargar médicos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  const completarDatos = async (idUsuario, data) => {
    setSaving(true);
    try {
      await completarDatosMedico(idUsuario, data);
      toast.success("Datos profesionales completados correctamente");
      await fetchMedicos();
      return true;
    } catch (err) {
      console.error("Error al completar datos del médico:", err);
      toast.error(err.response?.data?.message || "Error al completar los datos");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const actualizarEspecialidadYSede = async (id, idEspecialidad, idSede) => {
    setSaving(true);
    try {
      await actualizarEspecialidadSedeMedico(id, idEspecialidad, idSede);
      toast.success("Especialidad y sede actualizadas correctamente");
      await fetchMedicos();
      return true;
    } catch (err) {
      console.error("Error al actualizar especialidad/sede:", err);
      toast.error(err.response?.data?.message || "Error al actualizar");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const cambiarDisponibilidad = async (id, disponible) => {
    try {
      await actualizarDisponibilidadMedico(id, disponible);
      toast.success(disponible ? "Médico marcado como disponible" : "Médico marcado como no disponible");
      await fetchMedicos();
    } catch (err) {
      console.error("Error al cambiar disponibilidad:", err);
      toast.error("Error al cambiar la disponibilidad");
    }
  };

  const activar = async (id) => {
    try {
      await activarMedico(id);
      toast.success("Médico activado correctamente");
      await fetchMedicos();
    } catch (err) {
      console.error("Error al activar médico:", err);
      toast.error("Error al activar el médico");
    }
  };

  const inactivar = async (id) => {
    try {
      await inactivarMedico(id);
      toast.success("Médico inactivado correctamente");
      await fetchMedicos();
    } catch (err) {
      console.error("Error al inactivar médico:", err);
      toast.error("Error al inactivar el médico");
    }
  };

  return {
    medicos,
    pendientes,
    loading,
    saving,
    fetchMedicos,
    completarDatos,
    actualizarEspecialidadYSede,
    cambiarDisponibilidad,
    activar,
    inactivar,
  };
}