import React from 'react';
import Hero from '../../components/Hero';
import PilaresSection from '../../components/nosotros/PilaresSection';
import StatsSection from '../../components/nosotros/StatsSection';

const accentColor = '#0a2e5c';
const highlightColor = '#12b886';

const pilares = [
  {
    icon: 'bi-shield-lock-fill',
    title: 'Privacidad JWT',
    description: 'Garantizamos la confidencialidad de tus datos clínicos implementando una separación estricta de accesos por roles.'
  },
  {
    icon: 'bi-lightning-charge-fill',
    title: 'Cero Dobles Reservas',
    description: 'Validación de horarios médicos en tiempo real para evitar duplicidades y desorganización en las consultas.'
  },
  {
    icon: 'bi-cloud-check-fill',
    title: 'Sincronización Total',
    description: 'Historial clínico unificado, recetas electrónicas y reportes gerenciales listos en un entorno de alta disponibilidad.'
  }
];

const stats = [
  { number: '10k+', label: 'Pacientes Atendidos', icon: 'bi-people-fill' },
  { number: '99.2%', label: 'Eficiencia Operativa', icon: 'bi-graph-up-arrow' },
  { number: '24/7', label: 'Soporte y Telemedicina', icon: 'bi-shield-check' }
];

export default function Nosotros() {
  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Hero
        title="MediConnect: Innovación y Control Clínico"
        subtitle="Reemplazamos las hojas sueltas, los cuadernos de citas y la coordinación informal por una plataforma centralizada en la nube que conecta a médicos y pacientes en tiempo real."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="45vh"
      />

      <div className="container py-5">
        <PilaresSection
          titulo="Nuestros Pilares Operativos"
          subtitulo="Diseñado bajo rigurosas arquitecturas tecnológicas para una mejor eficiencia."
          pilares={pilares}
          accentColor={accentColor}
          highlightColor={highlightColor}
        />

        <StatsSection stats={stats} accentColor={accentColor} highlightColor={highlightColor} />
      </div>
    </div>
  );
}