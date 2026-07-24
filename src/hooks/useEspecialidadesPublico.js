import { useState, useEffect } from "react";
import { getEspecialidades } from "../services/api";

export default function useEspecialidadesPublico() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEspecialidades = async () => {
    setLoading(true);
    try {
      const response = await getEspecialidades();
      setEspecialidades(response.data || []);
    } catch (err) {
      console.error("Error al cargar especialidades:", err);
      setEspecialidades([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  return { especialidades, loading, fetchEspecialidades };
}