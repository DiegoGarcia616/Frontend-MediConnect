import React from 'react';
import InfoCard from '../../components/InfoCard';
import StatsSection from '../../components/StatsSection';

export default function Nosotros() {
  return (
    <div className="container py-5">
      
      <div className="row align-items-center mb-5 text-white rounded-4 p-5 shadow-sm" style={{ backgroundColor: '#0a2e5c' }}>
        <div className="col-lg-8">
          <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-bold">Sobre Nosotros</span>
          <h1 className="display-5 fw-bold mb-3">MediConnect: Innovación y Control Clínico</h1>
          <p className="lead opacity-90 fs-6">
            Nacimos para solucionar la saturación operativa de los centros de salud tradicionales. Reemplazamos las hojas sueltas, los cuadernos de citas y la coordinación informal mediante WhatsApp por una plataforma centralizada en la nube que conecta a médicos y pacientes en tiempo real.
          </p>
        </div>
        <div className="col-lg-4 text-center d-none d-lg-block">
          <div className="p-4 bg-white bg-opacity-10 rounded-circle d-inline-block shadow-sm">
            <i className="bi bi-heart-pulse-fill text-white" style={{ fontSize: '100px' }}></i>
          </div>
        </div>
      </div>

      <div className="text-center my-5">
        <h2 className="fw-bold" style={{ color: '#0a2e5c' }}>Nuestros Pilares Operativos</h2>
        <p className="text-muted small">Diseñado bajo rigurosas arquitecturas tecnológicas para una mejor eficiencia.</p>
      </div>

      
      <div className="row mb-4">
        <InfoCard 
          icon="bi-shield-lock-fill" 
          title="Privacidad JWT" 
          description="Garantizamos la confidencialidad de tus datos clínicos implementando una separación estricta de accesos por roles."
        />
        <InfoCard 
          icon="bi-lightning-charge-fill" 
          title="Cero Dobles Reservas" 
          description="Validación de horarios médicos en tiempo real para evitar duplicidades y desorganización en las consultas."
        />
        <InfoCard 
          icon="bi-cloud-check-fill" 
          title="Sincronización Total" 
          description="Historial clínico unificado, recetas electrónicas y reportes gerenciales listos en un entorno de alta disponibilidad."
        />
      </div>

      
      <StatsSection />
    </div>
  );
}