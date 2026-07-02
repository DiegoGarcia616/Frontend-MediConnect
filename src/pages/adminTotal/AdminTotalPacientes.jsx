import { useReniec } from "../../hooks/useReniec";
import { FiUsers, FiSearch, FiX, FiUser, FiCalendar, FiMapPin, FiFileText } from "react-icons/fi";

export default function AdminTotalPacientes() {
  const {
    dniConsulta,
    setDniConsulta,
    datosReniec,
    loading,
    showModal,
    handleConsultar,
    closeModal,
  } = useReniec();

  const onSubmit = (e) => {
    e.preventDefault();
    handleConsultar();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <style>
        {`
          .page-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 2rem;
          }

          .page-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #0f172a;
          }

          .page-icon {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }

          .search-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
          }

          .search-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .search-form {
            display: flex;
            gap: 10px;
          }

          .search-input {
            flex: 1;
            padding: 0.9rem;
            border: 2px solid #cbd5e1;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.2s ease;
          }

          .search-input:focus {
            border-color: #f97316;
            outline: none;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
          }

          .btn-search {
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0.9rem 1.5rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
          }

          .btn-search:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
          }

          .btn-search:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 1rem;
          }

          .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 700px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #ffedd5;
          }

          .modal-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #0f172a;
          }

          .btn-close-modal {
            background: transparent;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .btn-close-modal:hover {
            background: #f1f5f9;
          }

          .datos-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .dato-item {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .dato-item.full {
            grid-column: 1 / -1;
          }

          .dato-label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .dato-value {
            font-size: 1rem;
            font-weight: 600;
            color: #0f172a;
          }

          .sexo-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 700;
          }

          .sexo-masculino {
            background: #dbeafe;
            color: #1e40af;
          }

          .sexo-femenino {
            background: #fce7f3;
            color: #9f1239;
          }

          @media (max-width: 768px) {
            .search-form {
              flex-direction: column;
            }

            .datos-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="page-header">
        <div className="page-icon">
          <FiUsers size={24} />
        </div>
        <div className="page-title">Consultar Paciente</div>
      </div>

      <div className="search-card">
        <div className="search-title">Consultar datos en RENIEC</div>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Ingrese el DNI del paciente"
            value={dniConsulta}
            onChange={(e) => setDniConsulta(e.target.value.replace(/\D/g, "").slice(0, 8))}
            maxLength={8}
            disabled={loading}
          />
          <button type="submit" className="btn-search" disabled={loading}>
            <FiSearch size={18} />
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </form>
      </div>

      {showModal && datosReniec && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Datos del Paciente</div>
              <button className="btn-close-modal" onClick={closeModal}>
                <FiX size={24} />
              </button>
            </div>

            <div className="datos-grid">
              <div className="dato-item full">
                <div className="dato-label">
                  <FiUser size={14} />
                  Nombre Completo
                </div>
                <div className="dato-value">{datosReniec.nombreCompleto}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiFileText size={14} />
                  DNI
                </div>
                <div className="dato-value">{datosReniec.numDocumento}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiCalendar size={14} />
                  Fecha de Nacimiento
                </div>
                <div className="dato-value">{datosReniec.fechaNacimiento}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiUser size={14} />
                  Nombres
                </div>
                <div className="dato-value">{datosReniec.nombres}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiUser size={14} />
                  Apellido Paterno
                </div>
                <div className="dato-value">{datosReniec.apellidoPaterno}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiUser size={14} />
                  Apellido Materno
                </div>
                <div className="dato-value">{datosReniec.apellidoMaterno}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">Sexo</div>
                <div className="dato-value">
                  <span className={`sexo-badge ${datosReniec.sexo === "MASCULINO" ? "sexo-masculino" : "sexo-femenino"}`}>
                    {datosReniec.sexo}
                  </span>
                </div>
              </div>

              <div className="dato-item">
                <div className="dato-label">Estado Civil</div>
                <div className="dato-value">{datosReniec.estadoCivil}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiMapPin size={14} />
                  Ubigeo
                </div>
                <div className="dato-value">{datosReniec.ubigeo}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiMapPin size={14} />
                  Departamento
                </div>
                <div className="dato-value">{datosReniec.departamento}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiMapPin size={14} />
                  Provincia
                </div>
                <div className="dato-value">{datosReniec.provincia}</div>
              </div>

              <div className="dato-item">
                <div className="dato-label">
                  <FiMapPin size={14} />
                  Distrito
                </div>
                <div className="dato-value">{datosReniec.distrito}</div>
              </div>

              <div className="dato-item full">
                <div className="dato-label">
                  <FiMapPin size={14} />
                  Dirección Completa
                </div>
                <div className="dato-value">{datosReniec.direccionCompleta}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}