import React from 'react';
import Sedecomas from "../images/Sedecomas.png"
import Sedeindependencia from "../images/Sedeindependencia.png"
import Sedepuentepiedra from "../images/Sedepuentepiedra.png"

export default function Sedes() {
  return (
    <div className="container py-5">

      {/* HERO */}
      <div
        className="row align-items-center mb-5 text-white rounded-4 p-5 shadow-sm"
        style={{ backgroundColor: '#0a2e5c' }}
      >

        <div className="col-lg-8">

          <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-bold">
            Sedes
            
          </span>

          <h1 className="display-5 fw-bold mb-3">
            Encuentra tu sede más cercana
          </h1>

          <p className="lead opacity-90 fs-6">
            Contamos con sedes modernas equipadas para ofrecer atención rápida,
            segura y eficiente en distintos puntos de la ciudad.
          </p>

        </div>

        <div className="col-lg-4 text-center d-none d-lg-block">

          <div className="p-4 bg-white bg-opacity-10 rounded-circle d-inline-block shadow-sm">

            <span
              className="text-white fw-bold"
              style={{ fontSize: '70px' }}
            >
              📍
            </span>

          </div>

        </div>

      </div>

      {/* TARJETAS */}
      <div className="row g-4">

        {/* SEDE 1 */}
        <div className="col-md-4">

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">

            <div
              className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
              style={{ height: '220px' }}
            >

              <img
                src={Sedecomas}
                alt="Sede Comas"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover' }}
              />

            </div>

            <div className="card-body">

              <h5 className="fw-bold">
                Sede Comas
              </h5>

              <p className="text-muted small mb-2">
                Av. Túpac Amaru 5421, Comas, Lima, Perú
              </p>

              <p className="text-muted small">
                Atención médica integral y especialidades clínicas.
              </p>

            </div>

          </div>

        </div>

        {/* SEDE 2 */}
        <div className="col-md-4">

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">

            <div
              className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
              style={{ height: '220px' }}
            >

              <img
                src={Sedeindependencia}
                alt="Sede Independencia"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover' }}
              />

            </div>

            <div className="card-body">

              <h5 className="fw-bold">
                Av. Carlos Izaguirre 125, Independencia, Lima, Perú
              </h5>

              <p className="text-muted small mb-2">
                Los Olivos
              </p>

              <p className="text-muted small">
                Consultas rápidas y atención especializada.
              </p>

            </div>

          </div>

        </div>

        {/* SEDE 3 */}
        <div className="col-md-4">

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">

            <div
              className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
              style={{ height: '220px' }}
            >

              <img
                src={Sedepuentepiedra}
                alt="Sede Puente Piedra"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover' }}
              />

            </div>

            <div className="card-body">

              <h5 className="fw-bold">
                Sede Puente Piedra
              </h5>

              <p className="text-muted small mb-2">
                Av. Sáenz Peña 310, Puente Piedra, Lima, Perú
              </p>

              <p className="text-muted small">
                Infraestructura moderna y atención personalizada.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
