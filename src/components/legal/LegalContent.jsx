import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export default function LegalContent({
  titulo,
  contenido,
  badgeText = 'Actualizado 2026',
  accentColor = '#12b886'
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100 p-4 p-md-5 bg-white legal-content">
      <div
        className="mb-4 pb-4 d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start gap-3"
        style={{ borderBottom: `2px solid ${accentColor}20` }}
      >
        <h3 className="fw-bold text-dark mb-0" style={{ color: '#0a2e5c' }}>
          {titulo}
        </h3>
        <span
          className="badge px-3 py-2 fw-medium d-flex align-items-center gap-2"
          style={{ backgroundColor: '#e6f7f1', color: accentColor, border: `1px solid ${accentColor}40` }}
        >
          <FiCheckCircle size={14} />
          {badgeText}
        </span>
      </div>

      <div
        className="text-secondary fs-6 lead lh-lg text-center text-md-start"
        style={{ color: '#5b6b79' }}
      >
        {contenido}
      </div>

      <style>{`
        .legal-content {
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}