const IntroSection = ({ titulo, descripcion, accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
    return (
      <div className="text-center mb-5 position-relative">
        <span
          className="badge rounded-pill px-3 py-2 mb-3 text-uppercase fw-semibold small"
          style={{ backgroundColor: `${highlightColor}15`, color: highlightColor }}
        >
          Nuestro Enfoque
        </span>
  
        <h2 className="fw-bold mb-3" style={{ color: accentColor, fontSize: '2rem' }}>{titulo}</h2>
  
        <div
          className="mx-auto mb-4"
          style={{ width: '60px', height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${highlightColor})`, borderRadius: '2px' }}
        />
  
        <p className="text-muted mx-auto" style={{ maxWidth: '820px', lineHeight: '1.8', fontSize: '1.02rem' }}>
          {descripcion}
        </p>
      </div>
    );
  };
  
  export default IntroSection;