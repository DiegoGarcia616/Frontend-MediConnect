const CardEspecialidad = ({ nombre, descripcion, imagen, accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
    return (
      <div
        className="d-flex align-items-center gap-3 bg-white specialty-bar p-3"
        style={{
          borderRadius: '16px',
          boxShadow: '0 4px 14px rgba(10, 46, 92, 0.08)',
          borderLeft: `4px solid ${highlightColor}`
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
          style={{
            width: '64px',
            height: '64px',
            background: `linear-gradient(135deg, ${accentColor}20, ${highlightColor}20)`
          }}
        >
          <img
            src={imagen}
            alt={nombre}
            style={{ width: '52px', height: '52px', objectFit: 'cover' }}
            className="rounded-circle"
          />
        </div>
  
        <div className="flex-grow-1 text-start">
          <h6 className="fw-bold mb-1" style={{ color: accentColor, fontSize: '1rem' }}>
            {nombre}
          </h6>
          <p className="text-muted small mb-0" style={{ lineHeight: '1.4' }}>
            {descripcion}
          </p>
        </div>
  
        <style>{`
          .specialty-bar {
            transition: all 0.25s ease;
          }
  
          .specialty-bar:hover {
            transform: translateX(4px);
            box-shadow: 0 8px 22px rgba(10, 46, 92, 0.15) !important;
          }
        `}</style>
      </div>
    );
  };
  
  export default CardEspecialidad;