import React from 'react';
import ContactForm from '../../components/ContactForm';

export default function Contacto() {
  return (
    <div className="container py-5">
     
      <div className="text-center mb-5">
        <span 
          className="badge mb-2 px-3 py-2 text-uppercase fw-bold"
          style={{ backgroundColor: 'rgba(10, 46, 92, 0.1)', color: '#0a2e5c' }}
        >
          ¿Tienes dudas o consultas?
        </span>
        <h1 className="fw-bold mt-2" style={{ color: '#0a2e5c' }}>Canal de Soporte MediConnect</h1>
        <p className="text-muted small mx-auto" style={{ maxWidth: '500px' }}>
          Escríbenos si tienes inconvenientes con tu acceso, dudas sobre la visualización de tu historial clínico digitalizado o la programación de citas.
        </p>
      </div>

      
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <ContactForm />
        </div>
      </div>

      <div className="row mt-5 pt-4 text-center g-4 text-muted small">
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-3 h-100 border-0 shadow-sm">
            <i className="bi bi-clock-fill fs-4 mb-2 d-block" style={{ color: '#0a2e5c' }}></i>
            <h6 className="fw-bold mb-2" style={{ color: '#0a2e5c' }}>Horario de Atención</h6>
            <p className="mb-0">Lunes a Viernes: 7:00 AM - 8:00 PM<br/>Sábados: 8:00 AM - 2:00 PM</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-3 h-100 border-0 shadow-sm">
            <i className="bi bi-cpu-fill fs-4 mb-2 d-block" style={{ color: '#0a2e5c' }}></i>
            <h6 className="fw-bold mb-2" style={{ color: '#0a2e5c' }}>Soporte Tecnológico</h6>
            <p className="mb-0">Arquitectura optimizada con tiempos de respuesta menores a 3 segundos.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-3 h-100 border-0 shadow-sm">
            <i className="bi bi-building-fill-add fs-4 mb-2 d-block" style={{ color: '#0a2e5c' }}></i>
            <h6 className="fw-bold mb-2" style={{ color: '#0a2e5c' }}>Sedes e Infraestructura</h6>
            <p className="mb-0">Centralizado inicialmente en Lima Norte con proyección escalable en la nube.</p>
          </div>
        </div>
      </div>
    </div>
  );
}