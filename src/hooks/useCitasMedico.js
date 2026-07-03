import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const useCitasMedico = () => {
    const [citas, setCitas] = useState([]);

    const navigate = useNavigate();

    const fetchCitas = async () => {
        const res = await api.get("/api/medico/reservas");
        setCitas(res.data);
    };

    const enEspera = async (id) => {
        await api.patch(`/api/medico/citas/${id}/en-espera`);
        toast.success("Cita en espera");
        fetchCitas();
    };

    const comenzar = async (id) => {
        const res = await api.post(`/api/medico/consultas/comenzar/${id}`);
        toast.success("Consulta iniciada");
        navigate(`/medico/consulta/${res.data.idConsulta}`);
        fetchCitas();
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    return { citas, enEspera, comenzar };
};