import { FaMapMarkerAlt, FaClinicMedical, FaTools } from 'react-icons/fa';

const SedeCard = ({ imagen, nombre, direccion, descripcion, estado = 'activa', accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  const inactiva = estado === 'inactiva';

  return (
    <div className="col-md-4">
      <div className={`card border-0 rounded-5 overflow-hidden h-100 sede-card ${inactiva ? 'sede-inactiva' : ''}`}>
        <div className="position-relative" style={{ height: '240px', overflow: 'hidden' }}>
          <img
            src={imagen}
            alt={nombre}
            className="img-fluid w-100 h-100 sede-img"
            style={{ objectFit: 'cover', filter: inactiva ? 'grayscale(1) brightness(0.75)' : 'none' }}
          />
          <div className="sede-overlay" />

          <span
            className="position-absolute top-0 start-0 m-3 badge rounded-pill px-3 py-2 fw-semibold small"
            style={{
              backgroundColor: inactiva ? 'rgba(108,117,125,0.9)' : 'rgba(255,255,255,0.9)',
              color: inactiva ? '#ffffff' : accentColor
            }}
          >
            <FaClinicMedical className="me-1" /> {inactiva ? 'Sede inactiva' : 'Sede activa'}
          </span>

          {inactiva && (
            <div className="position-absolute bottom-0 start-0 end-0 p-3 d-flex align-items-center gap-2 text-white" style={{ backgroundColor: 'rgba(33,37,41,0.75)' }}>
              <FaTools />
              <span className="small fw-semibold">Nos encontramos en mantenimiento en esta sede</span>
            </div>
          )}
        </div>

        <div className="card-body p-4">
          <h5 className="fw-bold mb-3 text-center" style={{ color: inactiva ? '#6c757d' : accentColor }}>
            {nombre}
          </h5>

          <div
            className="mx-auto mb-3"
            style={{ width: '32px', height: '3px', backgroundColor: inactiva ? '#adb5bd' : highlightColor, borderRadius: '2px' }}
          />

          <div className="d-flex align-items-start gap-2 mb-3">
            <FaMapMarkerAlt color={inactiva ? '#adb5bd' : highlightColor} style={{ marginTop: '4px', flexShrink: 0 }} />
            <p className="text-muted small mb-0">{direccion}</p>
          </div>

          <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>{descripcion}</p>
        </div>
      </div>

      <style>{`
        .sede-card {
          box-shadow: 0 4px 18px rgba(10, 46, 92, 0.08);
          transition: all 0.35s ease;
        }

        .sede-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(10, 46, 92, 0.16);
        }

        .sede-img {
          transition: transform 0.5s ease;
        }

        .sede-card:hover .sede-img {
          transform: scale(1.08);
        }

        .sede-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,46,92,0) 60%, rgba(10,46,92,0.35) 100%);
        }

        .sede-inactiva {
          background-color: #f1f3f5;
          opacity: 0.92;
        }

        .sede-inactiva:hover {
          transform: none;
          box-shadow: 0 4px 18px rgba(10, 46, 92, 0.08);
        }
      `}</style>
    </div>
  );
};

export default SedeCard;