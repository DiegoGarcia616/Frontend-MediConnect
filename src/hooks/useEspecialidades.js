import { useState, useEffect } from "react";
import {
  getEspecialidades,
  createEspecialidad,
  updateEspecialidad,
  activarEspecialidad,
  inactivarEspecialidad,
} from "../services/api";
import { toast } from "react-toastify";

export default function useEspecialidades() {

    const [especialidades, setEspecialidades] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const fetchEspecialidades = async () => {

        setLoading(true);

        try {

            const data = await getEspecialidades();

            setEspecialidades(data);

        } catch (err) {

            console.error("Error al cargar especialidades:", err);

            toast.error("Error al cargar especialidades.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchEspecialidades();

    }, []);

    const guardarEspecialidad = async (id, data) => {

        setSaving(true);

        try {

            if (id) {

                await updateEspecialidad(id, data);

                toast.success("Especialidad actualizada correctamente");

            } else {

                await createEspecialidad(data);

                toast.success("Especialidad registrada correctamente");

            }

            await fetchEspecialidades();

            return true;

        } catch (err) {

            console.error("Error al guardar especialidad:", err);

            toast.error(

                err.response?.data?.message ||

                "Error al guardar la especialidad"

            );

            return false;

        } finally {

            setSaving(false);

        }

    };

    const cambiarEstado = async (esp) => {

        try {

            if (esp.activo) {

                await inactivarEspecialidad(esp.idEspecialidad);

                toast.success("Especialidad inactivada");

            } else {

                await activarEspecialidad(esp.idEspecialidad);

                toast.success("Especialidad activada");

            }

            await fetchEspecialidades();

        } catch (err) {

            console.error("Error al cambiar estado:", err);

            toast.error("Error al cambiar el estado de la especialidad");

        }

    };

    return {

        especialidades,

        loading,

        saving,

        fetchEspecialidades,

        guardarEspecialidad,

        cambiarEstado

    }

}