import { Container, Row, Col } from 'react-bootstrap';
import BannerEspecialidades from '../../components/BannerEspecialidades';
import CardEspecialidad from '../../components/CardEspecialidad';


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

const Especialidades = () => {
  const especialidades = [
    {
      id: 1,
      nombre: "Cardiología",
      descripcion: "Diagnóstico y tratamiento de enfermedades del corazón y sistema circulatorio.",
      imagen: cardiologiaImg,
      color: "primary"
    },
    {
      id: 2,
      nombre: "Pediatría",
      descripcion: "Atención integral para niños y adolescentes desde el nacimiento.",
      imagen: pediatriaImg,
      color: "primary"
    },
    {
      id: 3,
      nombre: "Ginecología",
      descripcion: "Salud de la mujer, control prenatal y planificación familiar.",
      imagen: ginecologiaImg,
      color: "primary"
    },
    {
      id: 4,
      nombre: "Traumatología",
      descripcion: "Atención de fracturas, lesiones deportivas y problemas óseos.",
      imagen: traumatologiaImg,
      color: "primary"
    },
    {
      id: 5,
      nombre: "Neurología",
      descripcion: "Trastornos del sistema nervioso central y periférico.",
      imagen: neurologiaImg,
      color: "primary"
    },
    {
      id: 6,
      nombre: "Dermatología",
      descripcion: "Cuidado de la piel, cabello, uñas y enfermedades dermatológicas.",
      imagen: dermatologiaImg,
      color: "primary"
    },
    {
      id: 7,
      nombre: "Oftalmología",
      descripcion: "Salud visual, diagnóstico y tratamiento de enfermedades oculares.",
      imagen: oftalmologiaImg,
      color: "primary"
    },
    {
      id: 8,
      nombre: "Odontología",
      descripcion: "Salud bucal, limpiezas, ortodoncia y tratamientos dentales.",
      imagen: odontologiaImg,
      color: "primary"
    },
    {
      id: 9,
      nombre: "Psicología",
      descripcion: "Apoyo emocional, terapia individual y familiar.",
      imagen: psicologiaImg,
      color: "primary"
    },
    {
      id: 10,
      nombre: "Nutrición",
      descripcion: "Planes alimenticios personalizados para una vida saludable.",
      imagen: nutricionImg,
      color: "primary"
    }
  ];

  return (
    <div>
      <BannerEspecialidades />

      <Container className="my-5">
        <Row>
          {especialidades.map((esp) => (
            <Col key={esp.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <CardEspecialidad 
                nombre={esp.nombre}
                descripcion={esp.descripcion}
                imagen={esp.imagen}
                color={esp.color}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Especialidades;