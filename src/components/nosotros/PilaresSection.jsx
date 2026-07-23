import InfoCard from '../InfoCard';

const PilaresSection = ({ titulo, subtitulo, pilares = [], accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  return (
    <>
      <div className="text-center my-5">
        <h2 className="fw-bold" style={{ color: accentColor }}>{titulo}</h2>
        <p className="text-muted small">{subtitulo}</p>
      </div>

      <div className="row mb-4 g-4">
        {pilares.map((pilar, index) => (
          <InfoCard
            key={index}
            icon={pilar.icon}
            title={pilar.title}
            description={pilar.description}
            accentColor={accentColor}
            highlightColor={highlightColor}
          />
        ))}
      </div>
    </>
  );
};

export default PilaresSection;