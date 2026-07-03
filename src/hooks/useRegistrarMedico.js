import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getEspecialidades, registerMedico } from "../services/api";

export default function useRegistrarMedico(onSuccess) {

    const [especialidades, setEspecialidades] = useState([]);

    const [loading, setLoading] = useState(false);

    const initialForm = {
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        dni: "",
        edad: "",
        password: "",
        numeroColegiatura: "",
        disponible: true,
        idEspecialidades: []
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        cargarEspecialidades();

    }, []);

    const cargarEspecialidades = async () => {

        try {

            const data = await getEspecialidades();

            setEspecialidades(data);

        } catch {

            toast.error("No se pudieron cargar las especialidades");

        }

    };

    const handleChange = e => {

        const { name, value } = e.target;

        setForm(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const handleEspecialidad = e => {

        setForm(prev => ({

            ...prev,

            idEspecialidades: [parseInt(e.target.value)]

        }));

    };

    const resetForm = () => {

        setForm(initialForm);

    };

    const registrar = async () => {

        try {

            setLoading(true);

            await registerMedico(form);

            toast.success("Médico registrado correctamente");

            resetForm();

            if (onSuccess) onSuccess();

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Error registrando médico"

            );

        } finally {

            setLoading(false);

        }

    };

    return {

        form,

        handleChange,

        registrar,

        handleEspecialidad,

        especialidades,

        loading,

        resetForm

    }

}