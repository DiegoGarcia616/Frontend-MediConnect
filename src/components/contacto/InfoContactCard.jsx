const InfoContactCard = ({ icon: Icon, title, description, accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
    return (
      <div className="col-md-4">
        <div className="bg-white rounded-4 h-100 p-4 text-center contact-card position-relative overflow-hidden">
          <div
            style={{
              height: '5px',
              background: `linear-gradient(90deg, ${accentColor}, ${highlightColor})`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          />
  
          <div
            className="mx-auto mb-3 mt-2 d-flex align-items-center justify-content-center rounded-4"
            style={{
              width: '68px',
              height: '68px',
              background: `linear-gradient(135deg, ${accentColor}, ${highlightColor})`,
              boxShadow: `0 8px 20px ${accentColor}30`
            }}
          >
            <Icon size={26} color="#ffffff" />
          </div>
  
          <h5 className="fw-bold mb-2" style={{ color: accentColor }}>{title}</h5>
  
          <div
            className="mx-auto mb-3"
            style={{ width: '32px', height: '3px', backgroundColor: highlightColor, borderRadius: '2px' }}
          />
  
          <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>{description}</p>
        </div>
  
        <style>{`
          .contact-card {
            box-shadow: 0 4px 18px rgba(10, 46, 92, 0.08);
            transition: all 0.35s ease;
          }
  
          .contact-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(10, 46, 92, 0.16);
          }
        `}</style>
      </div>
    );
  };
  
  export default InfoContactCard;