import React, { useState } from 'react';
import Hero from '../../components/Hero';

export default function LibroReclamaciones() {
  const [esMenor, setEsMenor] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', tipoDoc: 'DNI', nroDoc: '', telefono: '', correo: '',
    departamento: 'Lima', provincia: 'Lima', distrito: '', direccion: '',
    nombreApoderado: '', docApoderado: '',
    sede: 'Lima Norte', especialidad: 'Medicina General',
    tipoReclamacion: 'Reclamo', bienContratado: 'Servicio',
    montoReclamado: '', detalleHechos: '', pedidoConsumidor: '',
    aceptarTerminos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aceptarTerminos) {
      alert('Debe declarar que los datos ingresados son verdaderos antes de enviar.');
      return;
    }
    alert('Su reclamación ha sido registrada con éxito de acuerdo con las normativas de salud.');
  };

  return (
    <div className="bg-light pb-5">
      <Hero 
        title="Libro de Reclamaciones Virtual" 
        subtitle="Ponemos a su disposición nuestra plataforma oficial para registrar cualquier disconformidad."
        background="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop"
        height="35vh"
      />
      
      <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4">
              
              {/* Cabecera completamente blanca y limpia */}
              <div className="card-header bg-white p-4 rounded-top-4 border-bottom">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                  <div>
                    <h4 className="fw-bold mb-1 text-primary text-uppercase">Clínica MediConnect</h4>
                    <p className="small mb-0 text-muted">Establecimiento de Salud Autorizado | R.U.C. 20123456789</p>
                  </div>
                  <div className="text-md-end mt-3 mt-md-0 bg-light p-2 rounded border">
                    <span className="small d-block text-muted text-uppercase fw-semibold">Hoja de Reclamación</span>
                    <span className="text-dark fw-bold">N° RECL-2026-00412</span>
                  </div>
                </div>
              </div>

              <div className="card-body p-4 p-md-5 bg-white">
                <form onSubmit={handleSubmit}>
                  
                  {/* SECCIÓN 1: DATOS DEL CONSUMIDOR */}
                  <div className="border-start border-primary border-4 ps-3 mb-4">
                    <h5 className="fw-bold text-dark mb-1">1. Identificación del Paciente o Usuario</h5>
                    <p className="text-muted small mb-0">Por favor, ingrese sus datos completos para poder enviarle la respuesta oficial.</p>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                        <label htmlFor="nombre">Nombres y Apellidos Completos</label>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-floating">
                        <select className="form-select" id="tipoDoc" name="tipoDoc" onChange={handleChange}>
                          <option value="DNI">DNI</option>
                          <option value="CE">C.E.</option>
                          <option value="Pasaporte">Pasaporte</option>
                        </select>
                        <label htmlFor="tipoDoc">Documento</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="nroDoc" name="nroDoc" placeholder="Número" onChange={handleChange} required />
                        <label htmlFor="nroDoc">Número de Documento</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="tel" className="form-control" id="telefono" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
                        <label htmlFor="telefono">Teléfono Celular</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="correo" name="correo" placeholder="Correo" onChange={handleChange} required />
                        <label htmlFor="correo">Correo Electrónico (Donde recibirá la respuesta)</label>
                      </div>
                    </div>

                    {/* Domicilio */}
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="departamento" name="departamento" value={formData.departamento} onChange={handleChange} required />
                        <label htmlFor="departamento">Departamento</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} required />
                        <label htmlFor="provincia">Provincia</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="distrito" name="distrito" placeholder="Distrito" onChange={handleChange} required />
                        <label htmlFor="distrito">Distrito</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Dirección" onChange={handleChange} required />
                        <label htmlFor="direccion">Dirección Domiciliaria Completa (Av., Calle, Nro., Dpto.)</label>
                      </div>
                    </div>

                    {/* Menor de Edad */}
                    <div className="col-12 mt-3">
                      <div className="form-check form-switch p-3 bg-light rounded border">
                        <input className="form-check-input ms-1" type="checkbox" id="checkMenor" checked={esMenor} onChange={(e) => setEsMenor(e.target.checked)} />
                        <label className="form-check-label fw-semibold ms-3 text-secondary" htmlFor="checkMenor">
                          La persona que presenta el reclamo es menor de edad
                        </label>
                      </div>
                    </div>

                    {esMenor && (
                      <div className="row g-3 m-0 pt-2 p-3 bg-light rounded border border-top-0">
                        <div className="col-md-8">
                          <div className="form-floating">
                            <input type="text" className="form-control bg-white" id="nombreApoderado" name="nombreApoderado" placeholder="Apoderado" onChange={handleChange} required />
                            <label htmlFor="nombreApoderado">Nombres y Apellidos del Padre, Madre o Tutor Legal</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-floating">
                            <input type="text" className="form-control bg-white" id="docApoderado" name="docApoderado" placeholder="Doc" onChange={handleChange} required />
                            <label htmlFor="docApoderado">DNI del Apoderado</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SECCIÓN 2: DETALLES DE LA ATENCIÓN */}
                  <div className="border-start border-primary border-4 ps-3 mb-4 mt-5">
                    <h5 className="fw-bold text-dark mb-1">2. Información del Servicio o Atención Recibida</h5>
                    <p className="text-muted small mb-0">Indique en qué área o especialidad se originó el inconveniente.</p>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select className="form-select" id="sede" name="sede" onChange={handleChange}>
                          <option value="Lima Norte">Sede Lima Norte</option>
                          <option value="Puente Piedra">Sede Puente Piedra</option>
                        </select>
                        <label htmlFor="sede">Sede de la Clínica</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select className="form-select" id="especialidad" name="especialidad" onChange={handleChange}>
                          <option value="Medicina General">Medicina General</option>
                          <option value="Pediatría">Pediatría</option>
                          <option value="Cardiología">Cardiología</option>
                        </select>
                        <label htmlFor="especialidad">Especialidad Médica</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="montoReclamado" name="montoReclamado" placeholder="0.00" step="0.01" onChange={handleChange} />
                        <label htmlFor="montoReclamado">Monto abonado (Opcional - en Soles)</label>
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 3: DETALLE DE LA RECLAMACIÓN */}
                  <div className="border-start border-primary border-4 ps-3 mb-4 mt-5">
                    <h5 className="fw-bold text-dark mb-1">3. Detalle de su Reclamación</h5>
                    <p className="text-muted small mb-0">Elija el tipo de documento e infórmenos lo sucedido.</p>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex gap-3 flex-column flex-md-row">
                      <div className="form-check p-3 border rounded-3 bg-white flex-fill pe-4">
                        <input className="form-check-input ms-1" type="radio" name="tipoReclamacion" id="radioReclamo" value="Reclamo" checked={formData.tipoReclamacion === 'Reclamo'} onChange={handleChange} />
                        <label className="form-check-label fw-bold ms-2 text-dark" htmlFor="radioReclamo">
                          RECLAMO <span className="d-block small text-muted fw-normal">Disconformidad relacionada con la atención del médico o los resultados de su consulta.</span>
                        </label>
                      </div>
                      <div className="form-check p-3 border rounded-3 bg-white flex-fill pe-4">
                        <input className="form-check-input ms-1" type="radio" name="tipoReclamacion" id="radioQueja" value="Queja" checked={formData.tipoReclamacion === 'Queja'} onChange={handleChange} />
                        <label className="form-check-label fw-bold ms-2 text-dark" htmlFor="radioQueja">
                          QUEJA <span className="d-block small text-muted fw-normal">Malestar por la atención en recepción, tiempos de espera o problemas con la plataforma web.</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" id="detalleHechos" name="detalleHechos" placeholder="Hechos" style={{ height: '140px' }} onChange={handleChange} required></textarea>
                        <label htmlFor="detalleHechos">¿Qué sucedió? Explíquenos de forma sencilla lo ocurrido...</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" id="pedidoConsumidor" name="pedidoConsumidor" placeholder="Pedido" style={{ height: '90px' }} onChange={handleChange} required></textarea>
                        <label htmlFor="pedidoConsumidor">¿Qué solución o respuesta espera de nuestra parte?</label>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-light border small text-muted p-3 rounded-3 mb-4">
                    <strong>Información importante:</strong> De acuerdo con las normas de protección al consumidor, responderemos a su comunicación en un plazo máximo de quince (15) días hábiles.
                  </div>

                  <div className="form-check mb-4">
                    <input className="form-input form-check-input" type="checkbox" id="aceptarTerminos" name="aceptarTerminos" checked={formData.aceptarTerminos} onChange={handleChange} required />
                    <label className="form-check-label small text-secondary" htmlFor="aceptarTerminos">
                      Confirmo que toda la información brindada en este documento es verdadera y describe fielmente los hechos.
                    </label>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm">
                      Enviar Formulario Oficial
                    </button>
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