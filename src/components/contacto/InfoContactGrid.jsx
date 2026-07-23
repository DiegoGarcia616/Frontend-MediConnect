import InfoContactCard from './InfoContactCard';

const InfoContactGrid = ({ items = [], accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  return (
    <div className="row g-4">
      {items.map((item, index) => (
        <InfoContactCard
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
          accentColor={accentColor}
          highlightColor={highlightColor}
        />
      ))}
    </div>
  );
};

export default InfoContactGrid;