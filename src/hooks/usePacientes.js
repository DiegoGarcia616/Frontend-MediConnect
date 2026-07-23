import { useState, useEffect } from "react";
import { getUsuarios, buscarPacientesAdmin, completarDatosPaciente } from "../services/api";
import { toast } from "react-toastify";

export default function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPacientes = async () => {
    setLoading(true);
    try {
      const [usuariosResp, pacientesResp] = await Promise.all([getUsuarios(), buscarPacientesAdmin("")]);
      const usuarios = usuariosResp.data || [];
      const listaPacientes = pacientesResp.data || [];

      const usuariosPaciente = usuarios.filter((u) => u.idRol === 5);
      const idsCompletados = new Set(listaPacientes.map((p) => p.idUsuario));
      const usuariosPendientes = usuariosPaciente.filter((u) => !idsCompletados.has(u.idUsuario));

      setPacientes(listaPacientes);
      setPendientes(usuariosPendientes);
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
      toast.error("Error al cargar los pacientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const completarDatos = async (idUsuario, data) => {
    setSaving(true);
    try {
      await completarDatosPaciente(idUsuario, data);
      toast.success("Datos de contacto completados correctamente");
      await fetchPacientes();
      return true;
    } catch (err) {
      console.error("Error al completar datos del paciente:", err);
      toast.error(err.response?.data?.message || "Error al completar los datos");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    pacientes,
    pendientes,
    loading,
    saving,
    fetchPacientes,
    completarDatos,
  };
}