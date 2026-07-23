import React from 'react';
import PolicyBlock from './PolicyBlock';

export default function PolicySection({ titulo, politicas = [], accentColor = '#0a2e5c' }) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card border-0 shadow-sm rounded-4 bg-white">
          <div
            className="card-body p-4 p-md-5 text-secondary text-center text-md-start"
            style={{ lineHeight: '1.9' }}
          >
            <h3 className="fw-bold mb-4 border-bottom pb-3 text-dark">{titulo}</h3>

            {politicas.map((politica, i) => (
              <PolicyBlock
                key={i}
                titulo={politica.titulo}
                descripcion={politica.descripcion}
                items={politica.items}
                accentColor={accentColor}
                lastBlock={i === politicas.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}