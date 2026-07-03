import { useState, useEffect } from "react";
import {
  getSedes,
  createSede,
  updateSede,
  activarSede,
  inactivarSede,
} from "../services/api";
import { toast } from "react-toastify";

export default function useSedes() {

    const [sedes, setSedes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const fetchSedes = async () => {

        setLoading(true);

        try {

            const data = await getSedes();

            setSedes(data);

        } catch (err) {

            console.error("Error al cargar sedes:", err);

            toast.error("Error al cargar las sedes.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchSedes();

    }, []);

    const guardarSede = async (id, data) => {

        setSaving(true);

        try {

            if (id) {

                await updateSede(id, data);

                toast.success("Sede actualizada correctamente");

            } else {

                await createSede(data);

                toast.success("Sede registrada correctamente");

            }

            await fetchSedes();

            return true;

        } catch (err) {

            console.error("Error al guardar sede:", err);

            toast.error(

                err.response?.data?.message ||

                "Error al guardar la sede"

            );

            return false;

        } finally {

            setSaving(false);

        }

    };

    const cambiarEstado = async (sede) => {

        try {

            if (sede.activo) {

                await inactivarSede(sede.idSede);

                toast.success("Sede inactivada");

            } else {

                await activarSede(sede.idSede);

                toast.success("Sede activada");

            }

            await fetchSedes();

        } catch (err) {

            console.error("Error al cambiar estado:", err);

            toast.error("Error al cambiar el estado de la sede");

        }

    };

    return {

        sedes,

        loading,

        saving,

        fetchSedes,

        guardarSede,

        cambiarEstado

    }

}