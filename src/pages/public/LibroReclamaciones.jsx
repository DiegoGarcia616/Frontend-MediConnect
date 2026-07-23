import React, { useState } from 'react';
import Hero from '../../components/Hero';
import StepProgress from '../../components/forms/StepProgress';
import FormField from '../../components/forms/FormField';
import FormActions from '../../components/forms/FormActions';
import ImagenLibroReclamaciones from '../../images/libros-reclamaciones.avif';

const accentColor = '#0a2e5c';
const codigoFormulario = 'RECL-2026';
const totalPasos = 2;

const titulosPaso = {
  1: 'Identificación y Sede',
  2: 'Detalle de la Incidencia'
};

const camposPaso1 = [
  { type: 'text', name: 'nombre', label: 'Nombres Completos', required: true },
  { type: 'text', name: 'nroDoc', label: 'DNI / CE', required: true },
  {
    type: 'select', name: 'sede', label: 'Sede de Atención',
    options: [{ value: 'Lima Norte', label: 'Sede Lima Norte' }]
  },
  {
    type: 'select', name: 'motivo', label: 'Motivo',
    options: [
      { value: 'Atención Médica', label: 'Atención Médica' },
      { value: 'Gestión Administrativa', label: 'Gestión Administrativa' }
    ]
  }
];

const camposPaso2 = [
  { type: 'textarea', name: 'detalle', label: 'Describa lo sucedido', required: true, rows: 5, colClass: 'col-12' },
  { type: 'checkbox', name: 'aceptarTerminos', label: 'Declaro que la información es verdadera.', required: true, colClass: 'col-12' }
];

export default function LibroReclamaciones() {
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '', nroDoc: '', correo: '', telefono: '', sede: 'Lima Norte',
    motivo: 'Atención Médica', detalle: '', aceptarTerminos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aceptarTerminos) return alert('Acepte la declaración jurada.');
    alert(`Reclamo registrado. ID: RN-LN-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setPaso(1);
  };

  const camposActuales = paso === 1 ? camposPaso1 : camposPaso2;

  return (
    <div className="bg-light pb-5" style={{ minHeight: '100vh' }}>
      <Hero
        title="Libro de Reclamaciones"
        subtitle="Registro oficial de incidencias"
        background={ImagenLibroReclamaciones}
        height="35vh"
      />

      <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">

              <StepProgress
                pasoActual={paso}
                totalPasos={totalPasos}
                titulo={titulosPaso[paso]}
                codigo={codigoFormulario}
                accentColor={accentColor}
              />

              <div className="card-body p-4 p-md-5 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {camposActuales.map((field) => (
                      <FormField
                        key={field.name}
                        field={field}
                        value={formData[field.name]}
                        onChange={handleChange}
                      />
                    ))}
                  </div>

                  <FormActions
                    pasoActual={paso}
                    totalPasos={totalPasos}
                    onBack={() => setPaso(1)}
                    onNext={() => setPaso(2)}
                    accentColor={accentColor}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}