import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerMedico } from "../services/api";
import api from "../services/api";

export const useMedicosAdmin = () => {
  const [medicos, setMedicos] = useState([]);
  const [idSede, setIdSede] = useState("");

  const [form, setForm] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    dni: "",
    numeroColegiatura: "",
    especialidad: "",
    idSede: "",
    password: ""
  });

  const fetchMedicos = async () => {
    try {
      const res = await api.get(`/api/admin-local/medicos/${idSede}`);
      setMedicos(res.data);
    } catch {
      toast.error("Error al cargar médicos");
    }
  };

  const crearMedico = async () => {
    try {
      await registerMedico(form);
      toast.success("Médico registrado correctamente");
      fetchMedicos();
    } catch (err) {
      toast.error("Error al registrar médico");
    }
  };

  return {
    medicos,
    idSede,
    setIdSede,
    form,
    setForm,
    fetchMedicos,
    crearMedico
  };
};