import React, { useState } from 'react';
import Hero from '../../components/Hero';
import ImagenLibroReclamaciones from '../../images/libros-reclamaciones.avif';

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
              
              <div className="progress rounded-0" style={{ height: '6px' }}>
                <div className="progress-bar" style={{ width: `${(paso / 2) * 100}%`, backgroundColor: '#0a2e5c', transition: 'width 0.4s ease' }}></div>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom gap-2 text-center text-md-start">
                  <div>
                    <span className="badge rounded-pill px-3 py-2 mb-2" style={{ backgroundColor: 'rgba(10, 46, 92, 0.1)', color: '#0a2e5c' }}>Paso {paso} de 2</span>
                    <h4 className="fw-bold text-dark mb-0">
                      {paso === 1 ? "Identificación y Sede" : "Detalle de la Incidencia"}
                    </h4>
                  </div>
                  <h5 className="fw-bold mb-0" style={{ color: '#0a2e5c' }}>RECL-2026</h5>
                </div>

                <form onSubmit={handleSubmit}>
                  {paso === 1 && (
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label text-secondary fw-semibold small">Nombres Completos</label>
                        <input type="text" className="form-control bg-light border-0 py-2" name="nombre" value={formData.nombre} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-secondary fw-semibold small">DNI / CE</label>
                        <input type="text" className="form-control bg-light border-0 py-2" name="nroDoc" value={formData.nroDoc} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-secondary fw-semibold small">Sede de Atención</label>
                        <select className="form-select bg-light border-0 py-2" name="sede" value={formData.sede} onChange={handleChange}>
                          <option value="Lima Norte">Sede Lima Norte</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-secondary fw-semibold small">Motivo</label>
                        <select className="form-select bg-light border-0 py-2" name="motivo" value={formData.motivo} onChange={handleChange}>
                          <option value="Atención Médica">Atención Médica</option>
                          <option value="Gestión Administrativa">Gestión Administrativa</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {paso === 2 && (
                    <div className="row g-4">
                      <div className="col-12">
                        <label className="form-label text-secondary fw-semibold small">Describa lo sucedido</label>
                        <textarea className="form-control bg-light border-0" name="detalle" value={formData.detalle} onChange={handleChange} rows="5" required></textarea>
                      </div>
                      <div className="col-12">
                        <div className="form-check p-3 rounded-3" style={{ backgroundColor: 'rgba(10, 46, 92, 0.05)' }}>
                          <input className="form-check-input ms-1 mt-1" type="checkbox" id="aceptar" name="aceptarTerminos" checked={formData.aceptarTerminos} onChange={handleChange} required />
                          <label className="form-check-label ms-3 small text-dark fw-medium" htmlFor="aceptar">
                            Declaro que la información es verdadera.
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botones adaptables a móvil (w-100) */}
                  <div className="d-flex flex-column flex-md-row justify-content-between mt-5 pt-3 border-top gap-3">
                    <button type="button" className={`btn btn-light px-4 fw-bold text-secondary ${paso === 1 ? 'd-none' : ''}`} onClick={() => setPaso(1)}>
                      Volver
                    </button>
                    
                    {paso === 1 ? (
                      <button type="button" className="btn text-white w-100 w-md-auto px-5 py-2 fw-bold rounded-3" style={{ backgroundColor: '#0a2e5c' }} onClick={() => setPaso(2)}>
                        Siguiente Paso
                      </button>
                    ) : (
                      <button type="submit" className="btn text-white w-100 w-md-auto px-5 py-2 fw-bold rounded-3" style={{ backgroundColor: '#0a2e5c' }}>
                        Registrar Documento
                      </button>
                    )}
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}