import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function StaffCard({
    nombre,
    especialidad,
    sede,
    imagen
}) {

    const navigate = useNavigate()

    const [mostrarModal, setMostrarModal] = useState(false)

    return (

        <>
            {/* CARD */}
            <div
                className="card shadow-lg border mb-4 p-4 rounded-4"
                style={{
                    transition: "0.3s ease"
                }}
            >

                <div className="row align-items-center">

                    {/* FOTO */}
                    <div className="col-12 col-md-2 text-center mb-3 mb-md-0">

                        <img
                            src={imagen}
                            alt={nombre}
                            className="img-fluid rounded-circle border"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover"
                            }}
                        />

                    </div>

                    {/* INFO */}
                    <div className="col-12 col-md-6 text-center text-md-start">

                        <p className="text-secondary mb-1">
                            {especialidad}
                        </p>

                        <h5 className="fw-bold text-primary">
                            {nombre}
                        </h5>

                        <span className="badge bg-light text-dark border">
                            {sede}
                        </span>

                    </div>

                    {/* BOTONES */}
                    <div className="col-12 col-md-4 mt-4 mt-md-0">

                        <div className="d-grid gap-2">

                            {/* MODAL */}
                            <button
                                className="btn btn-outline-primary rounded-pill"
                                onClick={() => setMostrarModal(true)}
                            >
                                Conócelo aquí
                            </button>

                            {/* REDIRECCION */}
                            <button
                                className="btn btn-primary rounded-pill"
                                onClick={() => navigate("/portal-web")}
                            >
                                Haz una cita
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* MODAL */}
            {mostrarModal && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content rounded-4">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Información del Médico
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setMostrarModal(false)}
                                ></button>

                            </div>

                            <div className="modal-body text-center">

                                <img
                                    src={imagen}
                                    alt={nombre}
                                    className="rounded-circle mb-3"
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        objectFit: "cover"
                                    }}
                                />

                                <h4 className="fw-bold text-primary">
                                    {nombre}
                                </h4>

                                <p className="text-muted">
                                    {especialidad}
                                </p>

                                <span className="badge bg-primary">
                                    {sede}
                                </span>

                                <hr />

                                <p>
                                    Médico especialista altamente capacitado
                                    en atención clínica y tratamiento integral
                                    de pacientes.
                                </p>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setMostrarModal(false)}
                                >
                                    Cerrar
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>

    )
}