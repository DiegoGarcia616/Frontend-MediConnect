import { useState, useEffect } from "react";
import {
  getPerfil,
  actualizarPerfil,
  subirMiFotoPerfil,
  eliminarMiFotoPerfil,
  getMiContactoPaciente,
  actualizarMiContactoPaciente,
  getMiPerfilMedico,
  getSedeById,
} from "../services/api";
import { toast } from "react-toastify";
import { rolesRequierenSede } from "../utils/roles";

export default function usePerfil() {
  const [perfil, setPerfil] = useState(null);
  const [contactoPaciente, setContactoPaciente] = useState(null);
  const [datosMedico, setDatosMedico] = useState(null);
  const [sede, setSede] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  const fetchPerfil = async () => {
    setLoading(true);
    try {
      const response = await getPerfil();
      setPerfil(response.data);

      if (response.data?.idRol === 5) {
        try {
          const contactoResp = await getMiContactoPaciente();
          setContactoPaciente(contactoResp.data);
        } catch (err) {
          console.error("Error al cargar datos de contacto del paciente:", err);
        }
      }

      if (response.data?.idRol === 4) {
        try {
          const medicoResp = await getMiPerfilMedico();
          setDatosMedico(medicoResp.data);
        } catch (err) {
          console.error("Error al cargar datos del médico:", err);
        }
      }

      if (rolesRequierenSede.includes(response.data?.idRol) && response.data?.idSede) {
        try {
          const sedeResp = await getSedeById(response.data.idSede);
          setSede(sedeResp.data);
        } catch (err) {
          console.error("Error al cargar datos de la sede:", err);
        }
      }
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

  const guardarContactoPaciente = async (data) => {
    setSaving(true);
    try {
      const payload = {
        telefono: data.telefono,
        contactoEmergenciaNombre: data.contactoEmergenciaNombre,
        contactoEmergenciaTelefono: data.contactoEmergenciaTelefono,
        contactoEmergenciaParentesco: data.contactoEmergenciaParentesco,
      };
      const response = await actualizarMiContactoPaciente(payload);
      setContactoPaciente(response.data);
      toast.success("Datos de contacto actualizados correctamente");
      return true;
    } catch (err) {
      console.error("Error al actualizar los datos de contacto:", err);
      toast.error(err.response?.data?.message || "Error al actualizar los datos de contacto");
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
      setContactoPaciente((prev) => (prev ? { ...prev, fotoPerfil: response.data } : prev));
      setDatosMedico((prev) => (prev ? { ...prev, fotoPerfil: response.data } : prev));
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
      setContactoPaciente((prev) => (prev ? { ...prev, fotoPerfil: null } : prev));
      setDatosMedico((prev) => (prev ? { ...prev, fotoPerfil: null } : prev));
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
    contactoPaciente,
    datosMedico,
    sede,
    loading,
    saving,
    uploadingFoto,
    fetchPerfil,
    guardarPerfil,
    guardarContactoPaciente,
    subirFoto,
    eliminarFoto,
  };
}