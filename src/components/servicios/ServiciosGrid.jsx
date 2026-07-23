import ServicioCard from './ServicioCard';

const ServiciosGrid = ({ items = [], accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  return (
    <div className="row g-4">
      {items.map((item, index) => (
        <ServicioCard
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
          index={index}
          accentColor={accentColor}
          highlightColor={highlightColor}
        />
      ))}
    </div>
  );
};

export default ServiciosGrid;