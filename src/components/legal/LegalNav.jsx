import React from 'react';
import { FiFileText, FiCalendar, FiClipboard, FiSettings } from 'react-icons/fi';

const ICONOS = [FiFileText, FiCalendar, FiClipboard, FiSettings];

export default function LegalNav({
  items = [],
  activeId,
  onSelect,
  activeColor = '#0a2e5c',
  accentColor = '#12b886',
  label = 'Navegación Legal'
}) {
  return (
    <div className="nav flex-column gap-2 p-4 bg-white shadow-sm rounded-4 border-0 legal-nav">
      <p
        className="text-uppercase text-muted small fw-bold px-2 mb-3 text-center text-lg-start"
        style={{ letterSpacing: '1px' }}
      >
        {label}
      </p>

      {items.map((item, i) => {
        const isActive = activeId === item.id;
        const Icon = ICONOS[i % ICONOS.length];
        const textColor = isActive ? '#ffffff' : '#5b6b79';

        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="nav-link-custom text-start py-3 px-3 rounded-3 fw-medium d-flex align-items-center gap-2 border-0"
            style={{
              backgroundColor: isActive ? activeColor : 'transparent',
              color: textColor,
              borderLeft: isActive ? `4px solid ${accentColor}` : '4px solid transparent',
              transition: 'all 0.25s ease'
            }}
          >
            <Icon size={18} color={textColor} style={{ flexShrink: 0 }} />
            <span style={{ color: textColor }}>{item.titulo}</span>
          </button>
        );
      })}

      <style>{`
        .legal-nav .nav-link-custom:hover {
          background-color: #e6f7f1 !important;
          color: #0a2e5c !important;
          transform: translateX(3px);
        }
        .legal-nav .nav-link-custom:hover svg,
        .legal-nav .nav-link-custom:hover span {
          color: #0a2e5c !important;
        }
      `}</style>
    </div>
  );
}