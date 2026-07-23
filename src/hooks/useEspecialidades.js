import { useState, useEffect } from "react";
import {
  getEspecialidadesAdmin,
  createEspecialidad,
  updateEspecialidad,
  subirFotoEspecialidad,
  eliminarFotoEspecialidad,
  eliminarEspecialidad,
} from "../services/api";
import { toast } from "react-toastify";

export default function useEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchEspecialidades = async () => {
    setLoading(true);
    try {
      const response = await getEspecialidadesAdmin();
      setEspecialidades(response.data || []);
    } catch (err) {
      console.error("Error al cargar especialidades:", err);
      toast.error("Error al cargar especialidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const guardarEspecialidad = async (id, data, archivoFoto) => {
    setSaving(true);
    try {
      const payload = {
        nombre: data.nombre,
        descripcion: data.descripcion,
      };

      let idResultante = id;

      if (id) {
        await updateEspecialidad(id, payload);
        toast.success("Especialidad actualizada correctamente");
      } else {
        const response = await createEspecialidad(payload);
        idResultante = response.data.idEspecialidad;
        toast.success("Especialidad registrada correctamente");
      }

      if (archivoFoto) {
        await subirFotoEspecialidad(idResultante, archivoFoto);
      }

      await fetchEspecialidades();
      return true;
    } catch (err) {
      console.error("Error al guardar especialidad:", err);
      toast.error(err.response?.data?.message || "Error al guardar la especialidad");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const eliminarFotoDeEspecialidad = async (id) => {
    try {
      await eliminarFotoEspecialidad(id);
      toast.success("Foto eliminada correctamente");
      await fetchEspecialidades();
    } catch (err) {
      console.error("Error al eliminar foto:", err);
      toast.error("Error al eliminar la foto");
    }
  };

  const eliminarEspecialidadCompleta = async (id) => {
    try {
      await eliminarEspecialidad(id);
      toast.success("Especialidad eliminada correctamente");
      await fetchEspecialidades();
    } catch (err) {
      console.error("Error al eliminar especialidad:", err);
      toast.error("Error al eliminar la especialidad");
    }
  };

  return {
    especialidades,
    loading,
    saving,
    fetchEspecialidades,
    guardarEspecialidad,
    eliminarFotoDeEspecialidad,
    eliminarEspecialidadCompleta,
  };
}