import Hero from '../../components/Hero';
import IntroSection from '../../components/servicios/IntroSection';
import ServiciosGrid from '../../components/servicios/ServiciosGrid';

import {
  FaCalendarCheck,
  FaFileMedical,
  FaLaptopMedical,
  FaShieldAlt,
  FaChartLine,
  FaCloud
} from 'react-icons/fa';

const accentColor = '#0a2e5c';
const highlightColor = '#12b886';

const servicios = [
  {
    icon: FaCalendarCheck,
    title: 'Gestión Inteligente de Citas',
    description: 'Automatizamos la reserva de consultas para evitar dobles registros, pérdidas de turnos y desorganización operativa, permitiendo una atención más rápida y eficiente.'
  },
  {
    icon: FaFileMedical,
    title: 'Historia Clínica Digital',
    description: 'Centralizamos la información médica de los pacientes para que los especialistas puedan acceder rápidamente a antecedentes, diagnósticos y alergias desde cualquier sede.'
  },
  {
    icon: FaLaptopMedical,
    title: 'Telemedicina Integrada',
    description: 'Facilitamos consultas virtuales seguras para mejorar el acceso a la atención médica y ampliar la capacidad operativa de la clínica.'
  },
  {
    icon: FaShieldAlt,
    title: 'Seguridad y Privacidad',
    description: 'Implementamos control de accesos por roles y protección de datos clínicos para garantizar la confidencialidad de la información médica.'
  },
  {
    icon: FaChartLine,
    title: 'Reportes y Control Administrativo',
    description: 'Generamos reportes automáticos sobre citas atendidas, cancelaciones y productividad médica para optimizar la toma de decisiones gerenciales.'
  },
  {
    icon: FaCloud,
    title: 'Infraestructura Escalable en la Nube',
    description: 'Nuestra arquitectura digital permite el crecimiento hacia nuevas sedes manteniendo acceso remoto, sincronización de datos y alta disponibilidad.'
  }
];

export default function Servicios() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Hero
        title="Tecnología y atención médica en un solo ecosistema"
        subtitle="En MediConnect transformamos la experiencia clínica mediante una plataforma moderna que integra consultas presenciales, telemedicina, historias clínicas digitales y gestión inteligente de citas."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="45vh"
      />

      <div className="container py-5">
        <IntroSection
          titulo="Soluciones diseñadas para una atención eficiente"
          descripcion="MediConnect nace como respuesta al crecimiento acelerado de las clínicas privadas en Lima Norte y a la necesidad de reemplazar procesos manuales por herramientas digitales seguras, rápidas y escalables."
          accentColor={accentColor}
          highlightColor={highlightColor}
        />

        <ServiciosGrid items={servicios} accentColor={accentColor} highlightColor={highlightColor} />
      </div>
    </div>
  );
}