import { useState, useEffect } from "react";
import {
  getPerfil,
  actualizarPerfil,
  subirMiFotoPerfil,
  eliminarMiFotoPerfil,
} from "../services/api";
import { toast } from "react-toastify";

export default function usePerfil() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  const fetchPerfil = async () => {
    setLoading(true);
    try {
      const response = await getPerfil();
      setPerfil(response.data);
    } catch (err) {
      console.error("Error al cargar el perfil:", err);
      toast.error("Error al cargar tu perfil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  const guardarPerfil = async (data) => {
    setSaving(true);
    try {
      const payload = {
        direccion: data.direccion,
        estadoCivil: data.estadoCivil,
        correo: data.correo,
      };
      const response = await actualizarPerfil(payload);
      setPerfil(response.data);
      toast.success("Perfil actualizado correctamente");
      return true;
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      toast.error(err.response?.data?.message || "Error al actualizar el perfil");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const subirFoto = async (archivo) => {
    setUploadingFoto(true);
    try {
      const response = await subirMiFotoPerfil(archivo);
      setPerfil((prev) => (prev ? { ...prev, fotoPerfil: response.data } : prev));
      toast.success("Foto de perfil actualizada correctamente");
      return true;
    } catch (err) {
      console.error("Error al subir la foto:", err);
      toast.error(err.response?.data?.message || "Error al subir la foto");
      return false;
    } finally {
      setUploadingFoto(false);
    }
  };

  const eliminarFoto = async () => {
    setUploadingFoto(true);
    try {
      await eliminarMiFotoPerfil();
      setPerfil((prev) => (prev ? { ...prev, fotoPerfil: null } : prev));
      toast.success("Foto de perfil eliminada correctamente");
      return true;
    } catch (err) {
      console.error("Error al eliminar la foto:", err);
      toast.error("Error al eliminar la foto");
      return false;
    } finally {
      setUploadingFoto(false);
    }
  };

  return {
    perfil,
    loading,
    saving,
    uploadingFoto,
    fetchPerfil,
    guardarPerfil,
    subirFoto,
    eliminarFoto,
  };
}