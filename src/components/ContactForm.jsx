import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaHeadset, FaUser, FaPaperPlane } from 'react-icons/fa';

const ContactForm = ({ accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <div className="card border-0 shadow-lg overflow-hidden rounded-5">
      <div className="row g-0">
        <div
          className="col-lg-5 text-white p-5 d-flex flex-column justify-content-center text-center position-relative"
          style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)` }}
        >
          <div className="mb-4 d-flex justify-content-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
            >
              <FaHeadset size={32} />
            </div>
          </div>

          <h3 className="fw-bold mb-3">Contacto Directo</h3>

          <p className="opacity-75 small mb-4">
            Transformando la administración clínica de Lima Norte para darte una atención ágil, rápida y sin papeles.
          </p>

          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center justify-content-center gap-2 contact-info-item">
              <FaMapMarkerAlt />
              <span className="small">Sede Lima Norte, Perú</span>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2 contact-info-item">
              <FaPhoneAlt />
              <span className="small">+51 599 2000</span>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2 contact-info-item">
              <FaEnvelope />
              <span className="small">contacto@mediconnect.pe</span>
            </div>
          </div>
        </div>

        <div className="col-lg-7 p-5 bg-white">
          <h4 className="fw-bold mb-1" style={{ color: accentColor }}>Envíanos un mensaje</h4>
          <p className="text-muted small mb-4">Te responderemos a la brevedad posible.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted fw-bold">Nombre Completo</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0 rounded-start-3">
                  <FaUser color={highlightColor} size={14} />
                </span>
                <input
                  type="text"
                  name="nombre"
                  className="form-control bg-light border-0 py-2 rounded-end-3"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted fw-bold">Correo Electrónico</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0 rounded-start-3">
                  <FaEnvelope color={highlightColor} size={14} />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control bg-light border-0 py-2 rounded-end-3"
                  placeholder="nombre@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted fw-bold">Mensaje / Consulta</label>
              <textarea
                name="mensaje"
                rows="4"
                className="form-control bg-light border-0 rounded-3"
                placeholder="¿En qué podemos ayudarte?"
                value={formData.mensaje}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100 fw-bold shadow-sm py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 submit-btn"
              style={{ backgroundColor: accentColor, border: 'none' }}
            >
              Enviar Mensaje <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-info-item {
          transition: transform 0.25s ease;
        }

        .contact-info-item:hover {
          transform: translateX(4px);
        }

        .submit-btn {
          transition: all 0.25s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(10, 46, 92, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ContactForm;