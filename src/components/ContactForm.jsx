import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="card border-0 shadow-lg overflow-hidden rounded-4">
      <div className="row g-0">
      
        <div className="col-lg-5 text-white p-5 d-flex flex-column justify-content-between" style={{ backgroundColor: '#0a2e5c' }}>
          <div>
            <h3 className="fw-bold mb-3">Contacto Directo</h3>
            <p className="opacity-75 small">Transformando la administración clínica de Lima Norte para darte una atención ágil, rápida y sin papeles.</p>
          </div>
          <div className="mt-4 small opacity-90">
            <p className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i> Sede Lima Norte, Perú</p>
            <p className="mb-2"><i className="bi bi-telephone-fill me-2"></i> +51 599 2000</p>
            <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i> contacto@mediconnect.pe</p>
          </div>
        </div>
        
    
        <div className="col-lg-7 p-5 bg-white">
          <h4 className="fw-bold mb-4" style={{ color: '#0a2e5c' }}>Envíanos un mensaje</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted fw-bold">Nombre Completo</label>
              <input type="text" name="nombre" className="form-control bg-light border-0 py-2" placeholder="Tu nombre" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted fw-bold">Correo Electrónico</label>
              <input type="email" name="email" className="form-control bg-light border-0 py-2" placeholder="nombre@correo.com" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label small text-muted fw-bold">Mensaje / Consulta</label>
              <textarea name="mensaje" rows="4" className="form-control bg-light border-0" placeholder="¿En qué podemos ayudarte?" onChange={handleChange} required></textarea>
            </div>
         
            <button 
              type="submit" 
              className="btn text-white w-100 fw-bold shadow-sm py-2" 
              style={{ backgroundColor: '#0a2e5c', border: 'none' }}
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;