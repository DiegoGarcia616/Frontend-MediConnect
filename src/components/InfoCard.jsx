import React from 'react';

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 border-0 shadow-sm p-4 text-center bg-white rounded-3">
        
        <div 
          className="mb-3 d-inline-flex align-items-center justify-content-center text-white rounded-circle mx-auto" 
          style={{ width: '60px', height: '60px', fontSize: '24px', backgroundColor: '#0a2e5c' }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
        <h4 className="fw-bold mb-2 text-dark" style={{ color: '#0a2e5c' }}>{title}</h4>
        <p className="text-muted small mb-0">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;