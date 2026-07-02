import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "10k+", label: "Pacientes Atendidos", icon: "bi-people-fill" },
    { number: "99.2%", label: "Eficiencia Operativa", icon: "bi-graph-up-arrow" },
    { number: "24/7", label: "Soporte y Telemedicina", icon: "bi-shield-check" }
  ];

  return (
    <div className="row my-5 g-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-4 text-center">
        
          <div className="p-4 bg-white shadow-sm rounded-3" style={{ borderLeft: '4px solid #0a2e5c' }}>
            <i className={`bi ${stat.icon} fs-3 mb-2 d-block`} style={{ color: '#0a2e5c' }}></i>
            <h2 className="display-6 fw-bold m-0" style={{ color: '#0a2e5c' }}>{stat.number}</h2>
            <small className="text-uppercase text-muted fw-bold d-block mt-1">{stat.label}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;