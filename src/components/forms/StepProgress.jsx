import React from 'react';

export default function StepProgress({ pasoActual, totalPasos, titulo, codigo, accentColor = '#0a2e5c' }) {
  return (
    <>
      <div className="progress rounded-0" style={{ height: '6px' }}>
        <div
          className="progress-bar"
          style={{ width: `${(pasoActual / totalPasos) * 100}%`, backgroundColor: accentColor, transition: 'width 0.4s ease' }}
        />
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom gap-2 text-center text-md-start px-4 pt-4 px-md-5 pt-md-5">
        <div>
          <span
            className="badge rounded-pill px-3 py-2 mb-2"
            style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
          >
            Paso {pasoActual} de {totalPasos}
          </span>
          <h4 className="fw-bold text-dark mb-0">{titulo}</h4>
        </div>
        <h5 className="fw-bold mb-0" style={{ color: accentColor }}>{codigo}</h5>
      </div>
    </>
  );
}