import { useState, useEffect } from "react";
import { getPacientes } from "../services/api";
import { toast } from "react-toastify";

export default function usePacientes() {

    const [pacientes, setPacientes] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchPacientes = async () => {

        setLoading(true);

        try {

            const data = await getPacientes();

            setPacientes(data);

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

    return {

        pacientes,

        loading,

        fetchPacientes

    }

}