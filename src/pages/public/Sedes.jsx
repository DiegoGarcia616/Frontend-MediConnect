import Hero from '../../components/Hero';
import SedesGrid from '../../components/sedes/SedesGrid';
import useSedes from '../../hooks/useSedes';

const accentColor = '#0a2e5c';
const highlightColor = '#12b886';

export default function Sedes() {
  const { sedes, loading } = useSedes();

  const items = sedes.map((s) => ({
    imagen: s.foto,
    nombre: s.nombre,
    direccion: s.direccion,
    descripcion: s.descripcion,
    estado: s.estado === "ACTIVO" ? "activa" : "inactiva",
  }));

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Hero
        title="Encuentra tu sede más cercana"
        subtitle="Contamos con sedes modernas equipadas para ofrecer atención rápida, segura y eficiente en distintos puntos de Lima Norte."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="45vh"
      />

      <div className="container py-5">
        {loading ? (
          <p className="text-center">Cargando sedes...</p>
        ) : (
          <SedesGrid items={items} accentColor={accentColor} highlightColor={highlightColor} />
        )}
      </div>
    </div>
  );
}