import Container from 'react-bootstrap/Container';
import Hero from '../../components/Hero';
import SpecialtyGrid from '../../components/especialidades/SpecialtyGrid';
import useEspecialidadesPublico from '../../hooks/useEspecialidadesPublico';

const accentColor = '#0a2e5c';
const highlightColor = '#12b886';

const Especialidades = () => {
  const { especialidades, loading } = useEspecialidadesPublico();

  const items = especialidades.map((e) => ({
    id: e.idEspecialidad,
    nombre: e.nombre,
    descripcion: e.descripcion,
    imagen: e.foto,
  }));

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Hero
        title="Especialidades Médicas"
        subtitle="Contamos con un equipo de especialistas en diversas áreas de la medicina para brindarte la mejor atención integral."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="40vh"
      />
      <Container className="my-5">
        {loading ? (
          <p className="text-center">Cargando especialidades...</p>
        ) : (
          <SpecialtyGrid items={items} accentColor={accentColor} highlightColor={highlightColor} />
        )}
      </Container>
    </div>
  );
};

export default Especialidades;