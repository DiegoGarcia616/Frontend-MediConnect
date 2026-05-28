import React from 'react';

export default function Servicios() {
  return (
    <div
      className="container py-5"
      style={{ backgroundColor: '#f8fafc' }}
    >

      {/* HERO */}
      <div
        className="row align-items-center mb-5 text-white rounded-4 p-5 shadow-sm"
        style={{ backgroundColor: '#0a2e5c' }}
      >

        <div className="col-lg-8">

          <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-bold">
            Servicios Médicos
          </span>

          <h1 className="display-5 fw-bold mb-3">
            Tecnología y atención médica en un solo ecosistema
          </h1>

          <p className="lead opacity-90 fs-6">
            En MediConnect transformamos la experiencia clínica mediante una
            plataforma moderna que integra consultas presenciales,
            telemedicina, historias clínicas digitales y gestión inteligente
            de citas.
          </p>

        </div>

        <div className="col-lg-4 text-center d-none d-lg-block">

          <div className="p-4 bg-white bg-opacity-10 rounded-circle d-inline-block shadow-sm">

            <span
              className="text-white fw-bold"
              style={{ fontSize: '70px' }}
            >
              🩺
            </span>

          </div>

        </div>

      </div>

      {/* INTRO */}
      <div className="text-center mb-5">

        <h2
          className="fw-bold mb-3"
          style={{ color: '#0a2e5c' }}
        >
          Soluciones diseñadas para una atención eficiente
        </h2>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: '900px' }}
        >
          MediConnect nace como respuesta al crecimiento acelerado de las
          clínicas privadas en Lima Norte y a la necesidad de reemplazar
          procesos manuales por herramientas digitales seguras, rápidas y
          escalables.
        </p>

      </div>

      {/* SERVICIOS */}
      <div className="row g-4">

        {/* CARD 1 */}
        <div className="col-md-6 col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <div
                className="mb-3"
                style={{ fontSize: '45px' }}
              >
                📅
              </div>

              <h5 className="fw-bold mb-3">
                Gestión Inteligente de Citas
              </h5>

              <p className="text-muted small">
                Automatizamos la reserva de consultas para evitar dobles
                registros, pérdidas de turnos y desorganización operativa,
                permitiendo una atención más rápida y eficiente.
              </p>

            </div>

          </div>

        </div>

        {/* CARD 2 */}
        <div className="col-md-6 col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <div
                className="mb-3"
                style={{ fontSize: '45px' }}
              >
                🧾
              </div>

              <h5 className="fw-bold mb-3">
                Historia Clínica Digital
              </h5>

              <p className="text-muted small">
                Centralizamos la información médica de los pacientes para
                que los especialistas puedan acceder rápidamente a
                antecedentes, diagnósticos y alergias desde cualquier sede.
              </p>

            </div>

          </div>

        </div>

        {/* CARD 3 */}
        <div className="col-md-6 col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <div
                className="mb-3"
                style={{ fontSize: '45px' }}
              >
                💻
              </div>

              <h5 className="fw-bold mb-3">
                Telemedicina Integrada
              </h5>

              <p className="text-muted small">
                Facilitamos consultas virtuales seguras para mejorar el
                acceso a la atención médica y ampliar la capacidad
                operativa de la clínica.
              </p>

            </div>

          </div>

        </div>

        {/* CARD 4 */}
        <div className="col-md-6 col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <div
                className="mb-3"
                style={{ fontSize: '45px' }}
              >
                🔒
              </div>

              <h5 className="fw-bold mb-3">
                Seguridad y Privacidad
              </h5>

              <p className="text-muted small">
                Implementamos control de accesos por roles y protección
                de datos clínicos para garantizar la confidencialidad de
                la información médica.
              </p>

            </div>

          </div>

        </div>

        {/* CARD 5 */}
        <div className="col-md-6 col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <div
                className="mb-3"
                style={{ fontSize: '45px' }}
              >
                📊
              </div>

              <h5 className="fw-bold mb-3">
                Reportes y Control Administrativo
              </h5>

              <p className="text-muted small">
                Generamos reportes automáticos sobre citas atendidas,
                cancelaciones y productividad médica para optimizar la
                toma de decisiones gerenciales.
              </p>

            </div>

          </div>

        </div>

        {/* CARD 6 */}
        <div className="col-md-6 col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <div
                className="mb-3"
                style={{ fontSize: '45px' }}
              >
                ☁️
              </div>

              <h5 className="fw-bold mb-3">
                Infraestructura Escalable en la Nube
              </h5>

              <p className="text-muted small">
                Nuestra arquitectura digital permite el crecimiento
                hacia nuevas sedes manteniendo acceso remoto,
                sincronización de datos y alta disponibilidad.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
