import React from 'react';

export default function FormField({ field, value, onChange }) {
  const { type, name, label, required, options, rows, colClass = 'col-md-6' } = field;

  if (type === 'select') {
    return (
      <div className={colClass}>
        <label className="form-label text-secondary fw-semibold small">{label}</label>
        <select className="form-select bg-light border-0 py-2" name={name} value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={colClass}>
        <label className="form-label text-secondary fw-semibold small">{label}</label>
        <textarea
          className="form-control bg-light border-0"
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 5}
          required={required}
        />
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className={colClass}>
        <div className="form-check p-3 rounded-3" style={{ backgroundColor: 'rgba(10, 46, 92, 0.05)' }}>
          <input
            className="form-check-input ms-1 mt-1"
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            onChange={onChange}
            required={required}
          />
          <label className="form-check-label ms-3 small text-dark fw-medium" htmlFor={name}>
            {label}
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className={colClass}>
      <label className="form-label text-secondary fw-semibold small">{label}</label>
      <input
        type={type || 'text'}
        className="form-control bg-light border-0 py-2"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}