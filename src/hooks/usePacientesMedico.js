import { useState, useEffect } from "react";
import {
  getMisPacientes,
  actualizarAntecedentesPaciente,
} from "../services/api";

import { toast } from "react-toastify";


export default function usePacientesMedico() {

  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const cargarPacientes = async () => {

    setLoading(true);

    try {

      const response = await getMisPacientes();

      setPacientes(response.data || []);

    } catch(error){

      console.error(error);
      toast.error("Error al cargar pacientes");

    } finally {

      setLoading(false);

    }

  };


  const guardarAntecedentes = async(idPaciente, data)=>{

    setSaving(true);

    try{

      await actualizarAntecedentesPaciente(
        idPaciente,
        data
      );

      toast.success(
        "Antecedentes actualizados correctamente"
      );

      return true;


    }catch(error){

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Error al actualizar antecedentes"
      );

      return false;

    }finally{

      setSaving(false);

    }

  };


  useEffect(()=>{

    cargarPacientes();

  },[]);



  return {

    pacientes,
    loading,
    saving,
    cargarPacientes,
    guardarAntecedentes

  };

}