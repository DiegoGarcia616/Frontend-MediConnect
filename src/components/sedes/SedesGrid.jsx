import SedeCard from './SedeCard';

const SedesGrid = ({ items = [], accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  return (
    <div className="row g-4">
      {items.map((sede, index) => (
        <SedeCard
          key={index}
          imagen={sede.imagen}
          nombre={sede.nombre}
          direccion={sede.direccion}
          descripcion={sede.descripcion}
          estado={sede.estado}
          accentColor={accentColor}
          highlightColor={highlightColor}
        />
      ))}
    </div>
  );
};

export default SedesGrid;