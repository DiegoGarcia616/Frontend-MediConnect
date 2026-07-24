import { useEffect, useState } from "react";
import { getMisPacientes } from "../services/api";
import { toast } from "react-toastify";

export default function useMisPacientes() {

  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPacientes = async () => {

    setLoading(true);

    try {

      const response = await getMisPacientes();

      setPacientes(response.data || []);

    } catch (error) {

      console.error("Error al cargar pacientes:", error);

      toast.error(
        error.response?.data?.message ||
        "Error al cargar pacientes"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchPacientes();
  }, []);


  return {
    pacientes,
    loading,
    fetchPacientes
  };

}