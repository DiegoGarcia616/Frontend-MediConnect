import React, { useState } from 'react';

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHeadset
} from 'react-icons/fa';

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
    <div className="card border-0 shadow-lg overflow-hidden rounded-5">
      <div className="row g-0">

        <div
          className="col-lg-5 text-white p-5 d-flex flex-column justify-content-center text-center"
          style={{
            background: 'linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)'
          }}
        >

          <div className="mb-4 d-flex justify-content-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 80,
                height: 80,
                backgroundColor: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <FaHeadset size={32} />
            </div>
          </div>

          <h3 className="fw-bold mb-3">
            Contacto Directo
          </h3>

          <p className="opacity-75 small mb-4">
            Transformando la administración clínica de Lima Norte para darte una atención ágil, rápida y sin papeles.
          </p>

          <div className="small opacity-90 d-flex flex-column gap-2">

            <div className="d-flex align-items-center justify-content-center gap-2">
              <FaMapMarkerAlt />
              <span>Sede Lima Norte, Perú</span>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2">
              <FaPhoneAlt />
              <span>+51 599 2000</span>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2">
              <FaEnvelope />
              <span>contacto@mediconnect.pe</span>
            </div>

          </div>
        </div>

        <div className="col-lg-7 p-5 bg-white">
          <h4 className="fw-bold mb-4" style={{ color: '#0a2e5c' }}>
            Envíanos un mensaje
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label small text-muted fw-bold">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                className="form-control bg-light border-0 py-2 rounded-3"
                placeholder="Tu nombre"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted fw-bold">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                className="form-control bg-light border-0 py-2 rounded-3"
                placeholder="nombre@correo.com"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted fw-bold">
                Mensaje / Consulta
              </label>
              <textarea
                name="mensaje"
                rows="4"
                className="form-control bg-light border-0 rounded-3"
                placeholder="¿En qué podemos ayudarte?"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100 fw-bold shadow-sm py-2 rounded-3"
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