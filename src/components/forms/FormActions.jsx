import React from 'react';

export default function FormActions({ pasoActual, totalPasos, onBack, onNext, accentColor = '#0a2e5c', labels = {} }) {
  const {
    volver = 'Volver',
    siguiente = 'Siguiente Paso',
    registrar = 'Registrar Documento'
  } = labels;

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mt-5 pt-3 border-top gap-3">
      <button
        type="button"
        className={`btn btn-light px-4 fw-bold text-secondary ${pasoActual === 1 ? 'd-none' : ''}`}
        onClick={onBack}
      >
        {volver}
      </button>

      {pasoActual < totalPasos ? (
        <button
          type="button"
          className="btn text-white w-100 w-md-auto px-5 py-2 fw-bold rounded-3"
          style={{ backgroundColor: accentColor }}
          onClick={onNext}
        >
          {siguiente}
        </button>
      ) : (
        <button
          type="submit"
          className="btn text-white w-100 w-md-auto px-5 py-2 fw-bold rounded-3"
          style={{ backgroundColor: accentColor }}
        >
          {registrar}
        </button>
      )}
    </div>
  );
}