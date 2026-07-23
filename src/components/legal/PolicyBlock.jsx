import React from 'react';

export default function PolicyBlock({ titulo, descripcion, items = [], accentColor = '#0a2e5c', lastBlock = false }) {
  return (
    <div className={lastBlock ? '' : 'mb-5'}>
      <h5 className="fw-bold mb-3" style={{ color: accentColor }}>
        {titulo}
      </h5>
      {descripcion && <p>{descripcion}</p>}

      {items.length > 0 && (
        <ul className="list-group list-group-flush border rounded-3 bg-light text-start">
          {items.map((item, i) => (
            <li key={i} className="list-group-item bg-transparent">
              {item.label && <strong>{item.label}: </strong>}
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}