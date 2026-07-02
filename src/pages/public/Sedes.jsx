import React from 'react';

import {
  FaMapMarkerAlt,
  FaClinicMedical,
  FaArrowRight
} from 'react-icons/fa';

import Sedecomas from "../../images/Sedecomas.jpg";
import Sedeindependencia from "../../images/Sedeindependencia.jpg";
import Sedepuentepiedra from "../../images/Sedepuentepiedra.jpg";

export default function Sedes() {
  return (
    <div
      className="container py-5"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <div
        className="row align-items-center text-white rounded-5 shadow-lg overflow-hidden mb-5 mx-2 mx-md-0 position-relative"
        style={{
          background: 'linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)'
        }}
      >
        <div className="col-lg-8 p-4 p-lg-5">
          <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-semibold">
            Nuestras Sedes
          </span>

          <h1 className="display-5 fw-bold mb-3">
            Encuentra tu sede más cercana
          </h1>

          <p className="lead opacity-90 fs-6 mb-4">
            Contamos con sedes modernas equipadas para ofrecer atención rápida,
            segura y eficiente en distintos puntos de Lima Norte.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex align-items-center gap-2">
              <FaClinicMedical />
              <span className="small">Infraestructura moderna</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FaMapMarkerAlt />
              <span className="small">Ubicaciones accesibles</span>
            </div>
          </div>
        </div>

        <div className="col-lg-4 d-none d-lg-flex justify-content-center align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '180px',
              height: '180px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <FaMapMarkerAlt
              size={75}
              color="white"
            />
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm rounded-5 overflow-hidden h-100"
            style={{
              transition: '0.3s ease'
            }}
          >
            <div
              style={{
                height: '240px',
                overflow: 'hidden'
              }}
            >
              <img
                src={Sedecomas}
                alt="Sede Comas"
                className="img-fluid w-100 h-100"
                style={{
                  objectFit: 'cover'
                }}
              />
            </div>

            <div className="card-body p-4 text-center">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <FaClinicMedical color="#0a2e5c" />

                <h5 className="fw-bold mb-0">
                  Sede Comas
                </h5>
              </div>

              <div className="d-flex align-items-start justify-content-center gap-2 mb-3">
                <FaMapMarkerAlt
                  color="#6c757d"
                  style={{ marginTop: '4px' }}
                />

                <p className="text-muted small mb-0">
                  Av. Túpac Amaru 5421, Comas, Lima, Perú
                </p>
              </div>

              <p className="text-muted small mb-4">
                Atención médica integral y especialidades clínicas.
              </p>

              <button className="btn btn-outline-primary rounded-pill px-4">
                Ver sede <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm rounded-5 overflow-hidden h-100"
            style={{
              transition: '0.3s ease'
            }}
          >
            <div
              style={{
                height: '240px',
                overflow: 'hidden'
              }}
            >
              <img
                src={Sedeindependencia}
                alt="Sede Independencia"
                className="img-fluid w-100 h-100"
                style={{
                  objectFit: 'cover'
                }}
              />
            </div>

            <div className="card-body p-4 text-center">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <FaClinicMedical color="#0a2e5c" />

                <h5 className="fw-bold mb-0">
                  Sede Independencia
                </h5>
              </div>

              <div className="d-flex align-items-start justify-content-center gap-2 mb-3">
                <FaMapMarkerAlt
                  color="#6c757d"
                  style={{ marginTop: '4px' }}
                />

                <p className="text-muted small mb-0">
                  Av. Carlos Izaguirre 125, Independencia, Lima, Perú
                </p>
              </div>

              <p className="text-muted small mb-4">
                Consultas rápidas y atención especializada.
              </p>

              <button className="btn btn-outline-primary rounded-pill px-4">
                Ver sede <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm rounded-5 overflow-hidden h-100"
            style={{
              transition: '0.3s ease'
            }}
          >
            <div
              style={{
                height: '240px',
                overflow: 'hidden'
              }}
            >
              <img
                src={Sedepuentepiedra}
                alt="Sede Puente Piedra"
                className="img-fluid w-100 h-100"
                style={{
                  objectFit: 'cover'
                }}
              />
            </div>

            <div className="card-body p-4 text-center">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <FaClinicMedical color="#0a2e5c" />

                <h5 className="fw-bold mb-0">
                  Sede Puente Piedra
                </h5>
              </div>

              <div className="d-flex align-items-start justify-content-center gap-2 mb-3">
                <FaMapMarkerAlt
                  color="#6c757d"
                  style={{ marginTop: '4px' }}
                />

                <p className="text-muted small mb-0">
                  Av. Sáenz Peña 310, Puente Piedra, Lima, Perú
                </p>
              </div>

              <p className="text-muted small mb-4">
                Infraestructura moderna y atención personalizada.
              </p>

              <button className="btn btn-outline-primary rounded-pill px-4">
                Ver sede <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}