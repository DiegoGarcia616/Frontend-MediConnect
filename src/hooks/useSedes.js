import { useState, useEffect } from "react";
import {
  getSedesAdmin,
  createSede,
  updateSede,
  subirFotoSede,
  eliminarFotoSede,
  activarSede,
  inactivarSede,
  eliminarSede,
} from "../services/api";
import { toast } from "react-toastify";

export default function useSedes() {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSedes = async () => {
    setLoading(true);
    try {
      const response = await getSedesAdmin();
      setSedes(response.data || []);
    } catch (err) {
      console.error("Error al cargar sedes:", err);
      toast.error("Error al cargar las sedes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  const guardarSede = async (id, data, archivoFoto) => {
    setSaving(true);
    try {
      const payload = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        direccion: data.direccion,
      };

      let idResultante = id;

      if (id) {
        await updateSede(id, payload);
        toast.success("Sede actualizada correctamente");
      } else {
        const response = await createSede(payload);
        idResultante = response.data.idSede;
        toast.success("Sede registrada correctamente");
      }

      if (archivoFoto) {
        await subirFotoSede(idResultante, archivoFoto);
      }

      await fetchSedes();
      return true;
    } catch (err) {
      console.error("Error al guardar sede:", err);
      toast.error(err.response?.data?.message || "Error al guardar la sede");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const eliminarFotoDeSede = async (id) => {
    try {
      await eliminarFotoSede(id);
      toast.success("Foto eliminada correctamente");
      await fetchSedes();
    } catch (err) {
      console.error("Error al eliminar foto:", err);
      toast.error("Error al eliminar la foto");
    }
  };

  const cambiarEstado = async (sede) => {
    try {
      if (sede.estado === "ACTIVO") {
        await inactivarSede(sede.idSede);
        toast.success("Sede inactivada");
      } else {
        await activarSede(sede.idSede);
        toast.success("Sede activada");
      }
      await fetchSedes();
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      toast.error("Error al cambiar el estado de la sede");
    }
  };

  const eliminarSedeCompleta = async (id) => {
    try {
      await eliminarSede(id);
      toast.success("Sede eliminada correctamente");
      await fetchSedes();
    } catch (err) {
      console.error("Error al eliminar sede:", err);
      toast.error("Error al eliminar la sede");
    }
  };

  return {
    sedes,
    loading,
    saving,
    fetchSedes,
    guardarSede,
    cambiarEstado,
    eliminarFotoDeSede,
    eliminarSedeCompleta,
  };
}