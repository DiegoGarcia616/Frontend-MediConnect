import React from 'react';
import ContactForm from '../../components/ContactForm';

import {
  FaClock,
  FaLaptopMedical,
  FaHospital
} from 'react-icons/fa';

export default function Contacto() {
  return (
    <div
      className="container py-5"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <div
        className="rounded-5 overflow-hidden shadow-lg mb-5 mx-2 mx-md-0"
        style={{
          background: 'linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)'
        }}
      >
        <div className="row justify-content-center text-center text-white p-5">

          <div className="col-lg-8">

            <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-semibold">
              Canal de Soporte
            </span>

            <h1 className="fw-bold mb-3 display-5">
              Estamos aquí para ayudarte
            </h1>

            <p className="opacity-90 mx-auto" style={{ maxWidth: '750px', lineHeight: '1.8' }}>
              Escríbenos si tienes inconvenientes con tu acceso, dudas sobre tu historial clínico o problemas con citas médicas.
            </p>

          </div>

        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-lg-10">
          <ContactForm />
        </div>
      </div>

      <div className="row g-4">

        <div className="col-md-4">
          <div
            className="bg-white rounded-5 shadow-sm h-100 p-4 text-center contact-card"
          >
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: 70, height: 70, backgroundColor: 'rgba(10,46,92,0.08)' }}
            >
              <FaClock size={26} color="#0a2e5c" />
            </div>

            <h5 className="fw-bold mb-3" style={{ color: '#0a2e5c' }}>
              Horario de Atención
            </h5>

            <p className="text-muted small mb-0">
              Lunes a Viernes: 7:00 AM - 8:00 PM
              <br />
              Sábados: 8:00 AM - 2:00 PM
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="bg-white rounded-5 shadow-sm h-100 p-4 text-center contact-card"
          >
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: 70, height: 70, backgroundColor: 'rgba(10,46,92,0.08)' }}
            >
              <FaLaptopMedical size={26} color="#0a2e5c" />
            </div>

            <h5 className="fw-bold mb-3" style={{ color: '#0a2e5c' }}>
              Soporte Tecnológico
            </h5>

            <p className="text-muted small mb-0">
              Respuesta optimizada con arquitectura moderna y estable.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="bg-white rounded-5 shadow-sm h-100 p-4 text-center contact-card"
          >
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: 70, height: 70, backgroundColor: 'rgba(10,46,92,0.08)' }}
            >
              <FaHospital size={26} color="#0a2e5c" />
            </div>

            <h5 className="fw-bold mb-3" style={{ color: '#0a2e5c' }}>
              Infraestructura
            </h5>

            <p className="text-muted small mb-0">
              Sistema escalable con proyección multi-sede.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .contact-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .contact-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
        }
      `}</style>

    </div>
  );
}