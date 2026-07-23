import Hero from '../../components/Hero';
import SedesGrid from '../../components/sedes/SedesGrid';

import Sedecomas from '../../images/Sedecomas.jpg';
import Sedeindependencia from '../../images/Sedeindependencia.jpg';
import Sedepuentepiedra from '../../images/Sedepuentepiedra.jpg';

const accentColor = '#0a2e5c';
const highlightColor = '#12b886';

const sedes = [
  {
    imagen: Sedecomas,
    nombre: 'Sede Comas',
    direccion: 'Av. Túpac Amaru 5421, Comas, Lima, Perú',
    descripcion: 'Atención médica integral y especialidades clínicas.',
    estado: 'activa'
  },
  {
    imagen: Sedeindependencia,
    nombre: 'Sede Independencia',
    direccion: 'Av. Carlos Izaguirre 125, Independencia, Lima, Perú',
    descripcion: 'Consultas rápidas y atención especializada.',
    estado: 'inactiva'
  },
  {
    imagen: Sedepuentepiedra,
    nombre: 'Sede Puente Piedra',
    direccion: 'Av. Sáenz Peña 310, Puente Piedra, Lima, Perú',
    descripcion: 'Infraestructura moderna y atención personalizada.',
    estado: 'activa'
  }
];

export default function Sedes() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Hero
        title="Encuentra tu sede más cercana"
        subtitle="Contamos con sedes modernas equipadas para ofrecer atención rápida, segura y eficiente en distintos puntos de Lima Norte."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="45vh"
      />

      <div className="container py-5">
        <SedesGrid items={sedes} accentColor={accentColor} highlightColor={highlightColor} />
      </div>
    </div>
  );
}