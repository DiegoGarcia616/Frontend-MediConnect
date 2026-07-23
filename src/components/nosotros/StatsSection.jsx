const StatsSection = ({ stats = [], accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
    return (
      <div className="row my-5 g-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-4">
            <div
              className="p-4 bg-white shadow-sm rounded-4 h-100 stat-card"
              style={{ borderLeft: `4px solid ${highlightColor}`, transition: 'all 0.3s ease' }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{ width: '48px', height: '48px', backgroundColor: `${accentColor}12` }}
              >
                <i className={`bi ${stat.icon}`} style={{ color: accentColor, fontSize: '22px' }}></i>
              </div>
              <h2 className="display-6 fw-bold m-0" style={{ color: accentColor }}>{stat.number}</h2>
              <small className="text-uppercase text-muted fw-bold d-block mt-1">{stat.label}</small>
            </div>
          </div>
        ))}
  
        <style>{`
          .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 28px rgba(10, 46, 92, 0.12) !important;
          }
        `}</style>
      </div>
    );
  };
  
  export default StatsSection;