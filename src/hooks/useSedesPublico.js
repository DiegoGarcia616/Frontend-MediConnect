import { useState, useEffect } from "react";
import { getSedes } from "../services/api";

export default function useSedesPublico() {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSedes = async () => {
    setLoading(true);
    try {
      const response = await getSedes();
      setSedes(response.data || []);
    } catch (err) {
      console.error("Error al cargar sedes:", err);
      setSedes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  return { sedes, loading, fetchSedes };
}