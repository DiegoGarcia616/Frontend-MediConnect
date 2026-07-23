import Hero from '../../components/Hero';
import ContactForm from '../../components/ContactForm';
import InfoContactGrid from '../../components/contacto/InfoContactGrid';

import { FaClock, FaLaptopMedical, FaHospital } from 'react-icons/fa';

const accentColor = '#0a2e5c';
const highlightColor = '#12b886';

const infoContacto = [
  {
    icon: FaClock,
    title: 'Horario de Atención',
    description: 'Lunes a Viernes: 7:00 AM - 8:00 PM. Sábados: 8:00 AM - 2:00 PM.'
  },
  {
    icon: FaLaptopMedical,
    title: 'Soporte Tecnológico',
    description: 'Respuesta optimizada con arquitectura moderna y estable.'
  },
  {
    icon: FaHospital,
    title: 'Infraestructura',
    description: 'Sistema escalable con proyección multi-sede.'
  }
];

export default function Contacto() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Hero
        title="Estamos aquí para ayudarte"
        subtitle="Escríbenos si tienes inconvenientes con tu acceso, dudas sobre tu historial clínico o problemas con citas médicas."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="40vh"
      />

      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <ContactForm accentColor={accentColor} highlightColor={highlightColor} />
          </div>
        </div>

        <InfoContactGrid items={infoContacto} accentColor={accentColor} highlightColor={highlightColor} />
      </div>
    </div>
  );
}