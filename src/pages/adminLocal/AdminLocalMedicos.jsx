import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMedicos } from "../../services/api";
import RegistrarMedicoModal from "../../components/adminLocal/RegistrarMedicoModal";

export default function AdminLocalMedicos() {

    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchMedicos = async () => {
        setLoading(true);
        try {
            const data = await getMedicos();
            setMedicos(data);
        } catch (err) {
            console.error("Error al cargar médicos:", err);
            toast.error("Error al cargar médicos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicos();
    }, []);

    return (
        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-success m-0">
                    Gestión de Médicos
                </h2>

                <button
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                >
                    Agregar Médico
                </button>
            </div>

            <div className="card shadow border-0">
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : medicos.length === 0 ? (
                        <p className="text-center text-muted m-0">
                            No hay médicos registrados
                        </p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-success">
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre Completo</th>
                                        <th>Colegiatura</th>
                                        <th>Sede</th>
                                        <th>Especialidades</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicos.map(med => (
                                        <tr key={med.id}>
                                            <td>{med.dni}</td>
                                            <td>
                                                {med.primerNombre} {med.segundoNombre} {med.primerApellido} {med.segundoApellido}
                                            </td>
                                            <td>
                                                {med.numeroColegiatura ? med.numeroColegiatura.trim() : "-"}
                                            </td>
                                            <td>{med.sede || "-"}</td>
                                            <td>
                                                {med.especialidades && med.especialidades.length > 0
                                                    ? med.especialidades.map((esp, idx) => (
                                                        <span key={idx} className="badge bg-success-subtle text-success border border-success me-1">
                                                            {esp}
                                                        </span>
                                                    ))
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <RegistrarMedicoModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={fetchMedicos}
            />

        </div>
    );
}