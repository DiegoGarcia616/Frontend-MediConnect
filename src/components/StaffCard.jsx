import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffCard({
  nombre,
  especialidad,
  sede,
  imagen
}) {

  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <>

      <div
        className="bg-white border-0 shadow-sm rounded-4 p-4 staff-card h-100"
      >

        <div className="d-flex align-items-center gap-3 flex-column flex-md-row text-center text-md-start">

          <img
            src={imagen}
            alt={nombre}
            className="rounded-circle shadow-sm"
            style={{
              width: "90px",
              height: "90px",
              objectFit: "cover"
            }}
          />

          <div className="flex-grow-1">

            <p className="text-muted mb-1 small">
              {especialidad}
            </p>

            <h5 className="fw-bold text-primary mb-2">
              {nombre}
            </h5>

            <span className="badge bg-light text-dark border">
              {sede}
            </span>

          </div>

        </div>

        <div className="d-grid gap-2 mt-4">

          <button
            className="btn btn-outline-primary rounded-pill"
            onClick={() => setMostrarModal(true)}
          >
            Conócelo aquí
          </button>

          <button
            className="btn btn-portal rounded-pill"
            onClick={() => navigate("/portal-web")}
          >
            Haz una cita
          </button>

        </div>

      </div>

      {mostrarModal && (

        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content rounded-4 p-3">

              <div className="modal-header border-0">

                <h5 className="fw-bold text-primary">
                  Información del Médico
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                />

              </div>

              <div className="modal-body text-center">

                <img
                  src={imagen}
                  alt={nombre}
                  className="rounded-circle mb-3 shadow-sm"
                  style={{ width: 120, height: 120, objectFit: "cover" }}
                />

                <h4 className="fw-bold text-primary">
                  {nombre}
                </h4>

                <p className="text-muted">{especialidad}</p>

                <span className="badge bg-primary mb-3">
                  {sede}
                </span>

                <p className="text-muted small">
                  Médico especialista altamente capacitado en atención clínica y tratamiento integral de pacientes.
                </p>

              </div>

              <div className="modal-footer border-0">

                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={() => setMostrarModal(false)}
                >
                  Cerrar
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      <style>{`
        .staff-card {
          transition: all 0.3s ease;
        }

        .staff-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
        }

        .btn-portal {
          background: linear-gradient(135deg, #1a73e8, #00c2a8);
          color: #fff !important;
          border: none;
          border-radius: 12px;
          padding: 11px 22px;
          font-weight: 600;
          transition: all 0.25s ease;
          box-shadow: 0 6px 14px rgba(0, 194, 168, 0.25);
        }

        .btn-portal:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 194, 168, 0.35);
        }
      `}</style>

    </>
  );
}