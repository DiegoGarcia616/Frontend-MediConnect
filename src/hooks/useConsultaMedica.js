import { useEffect, useState } from "react";
import {
    getConsultaContexto,
    getHistorialPaciente,
    registrarDiagnostico,
    terminarConsulta
} from "../services/api";
import { toast } from "react-toastify";

export const useConsultaMedica = (idConsulta) => {
    const [contexto, setContexto] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [diagnostico, setDiagnostico] = useState("");

    const cargarDatos = async () => {
        const data = await getConsultaContexto(idConsulta);
        setContexto(data);

        const hist = await getHistorialPaciente(data.idPaciente);
        setHistorial(hist);
    };

    const guardarDiagnostico = async () => {
        if (!diagnostico || diagnostico.trim().length === 0) {
            toast.error("El diagnóstico no puede estar vacío");
            return;
        }

        try {
            setLoading(true);

            await api.post(`/api/diagnosticos/consulta/${consultaId}`, {
                descripcion: diagnostico,
            });

            toast.success("Diagnóstico guardado");
        } catch (err) {
            toast.error("Error al guardar diagnóstico");
        } finally {
            setLoading(false);
        }
    };

    const finalizar = async () => {
        await terminarConsulta(idConsulta);
        toast.success("Consulta finalizada");
    };

    useEffect(() => {
        if (idConsulta) cargarDatos();
    }, [idConsulta]);

    return {
        contexto,
        historial,
        diagnostico,
        setDiagnostico,
        guardarDiagnostico,
        finalizar
    };
};