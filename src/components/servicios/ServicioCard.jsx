const ServicioCard = ({ icon: Icon, title, description, index = 0, accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
    return (
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 rounded-4 h-100 servicio-card position-relative overflow-hidden">
          <div
            style={{
              height: '5px',
              background: `linear-gradient(90deg, ${accentColor}, ${highlightColor})`
            }}
          />
  
          <div className="card-body p-4 position-relative">
            <span
              className="position-absolute top-0 end-0 me-4 mt-3 fw-bold"
              style={{ color: `${accentColor}12`, fontSize: '3rem', lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
  
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-4 mb-4 icon-box"
              style={{
                width: '64px',
                height: '64px',
                background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
                boxShadow: `0 8px 20px ${accentColor}30`
              }}
            >
              <Icon size={28} color="#ffffff" />
            </div>
  
            <h5 className="fw-bold mb-2" style={{ color: accentColor }}>{title}</h5>
  
            <div
              className="mb-3"
              style={{ width: '32px', height: '3px', backgroundColor: highlightColor, borderRadius: '2px' }}
            />
  
            <p className="text-muted small mb-0" style={{ lineHeight: '1.7' }}>{description}</p>
          </div>
        </div>
  
        <style>{`
          .servicio-card {
            background: #ffffff;
            box-shadow: 0 4px 18px rgba(10, 46, 92, 0.08);
            transition: all 0.35s ease;
          }
  
          .servicio-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(10, 46, 92, 0.16);
          }
  
          .servicio-card:hover .icon-box {
            transform: scale(1.08) rotate(-4deg);
          }
  
          .icon-box {
            transition: all 0.35s ease;
          }
        `}</style>
      </div>
    );
  };
  
  export default ServicioCard;