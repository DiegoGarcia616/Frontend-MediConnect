const InfoCard = ({ icon, title, description, accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 border-0 shadow-sm p-4 text-center bg-white rounded-4 info-card"
        style={{ transition: 'all 0.3s ease' }}
      >
        <div
          className="mb-3 d-inline-flex align-items-center justify-content-center text-white rounded-circle mx-auto"
          style={{
            width: '64px',
            height: '64px',
            fontSize: '26px',
            background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`
          }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
        <h5 className="fw-bold mb-2" style={{ color: accentColor }}>{title}</h5>
        <div
          className="mx-auto mb-2"
          style={{ width: '32px', height: '3px', backgroundColor: highlightColor, borderRadius: '2px' }}
        />
        <p className="text-muted small mb-0">{description}</p>
      </div>

      <style>{`
        .info-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 30px rgba(10, 46, 92, 0.12) !important;
        }
      `}</style>
    </div>
  );
};

export default InfoCard;