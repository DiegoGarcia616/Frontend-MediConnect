import { Container } from 'react-bootstrap';
import Hero from '../../components/Hero';
import SpecialtyGrid from '../../components/especialidades/SpecialtyGrid';

import cardiologiaImg from '../../images/especialidades/CARDIOLOGIA.jpg';
import dermatologiaImg from '../../images/especialidades/DERMATOLOGIA.png';
import ginecologiaImg from '../../images/especialidades/GINECOLOGIA.jpg';
import neurologiaImg from '../../images/especialidades/NEUROLOGIA.jpg';
import nutricionImg from '../../images/especialidades/NUTRICIÓN.png';
import odontologiaImg from '../../images/especialidades/ODONTOLOGIA.jpg';
import oftalmologiaImg from '../../images/especialidades/OFTAMOLOGIA.jpg';
import pediatriaImg from '../../images/especialidades/PEDIATRIA.jpg';
import psicologiaImg from '../../images/especialidades/PSICOLOGIA.png';
import traumatologiaImg from '../../images/especialidades/TRAUMATOLOGIA.jpg';

const accentColor = '#0a2e5c';
const highlightColor = '#12b886';

const especialidades = [
  { id: 1, nombre: "Cardiología", descripcion: "Diagnóstico y tratamiento de enfermedades del corazón y sistema circulatorio.", imagen: cardiologiaImg },
  { id: 2, nombre: "Pediatría", descripcion: "Atención integral para niños y adolescentes desde el nacimiento.", imagen: pediatriaImg },
  { id: 3, nombre: "Ginecología", descripcion: "Salud de la mujer, control prenatal y planificación familiar.", imagen: ginecologiaImg },
  { id: 4, nombre: "Traumatología", descripcion: "Atención de fracturas, lesiones deportivas y problemas óseos.", imagen: traumatologiaImg },
  { id: 5, nombre: "Neurología", descripcion: "Trastornos del sistema nervioso central y periférico.", imagen: neurologiaImg },
  { id: 6, nombre: "Dermatología", descripcion: "Cuidado de la piel, cabello, uñas y enfermedades dermatológicas.", imagen: dermatologiaImg },
  { id: 7, nombre: "Oftalmología", descripcion: "Salud visual, diagnóstico y tratamiento de enfermedades oculares.", imagen: oftalmologiaImg },
  { id: 8, nombre: "Odontología", descripcion: "Salud bucal, limpiezas, ortodoncia y tratamientos dentales.", imagen: odontologiaImg },
  { id: 9, nombre: "Psicología", descripcion: "Apoyo emocional, terapia individual y familiar.", imagen: psicologiaImg },
  { id: 10, nombre: "Nutrición", descripcion: "Planes alimenticios personalizados para una vida saludable.", imagen: nutricionImg }
];

const Especialidades = () => {
  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Hero
        title="Especialidades Médicas"
        subtitle="Contamos con un equipo de especialistas en diversas áreas de la medicina para brindarte la mejor atención integral."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="40vh"
      />

      <Container className="my-5">
        <SpecialtyGrid items={especialidades} accentColor={accentColor} highlightColor={highlightColor} />
      </Container>
    </div>
  );
};

export default Especialidades;