import { usePacientePerfil } from "../../hooks/usePacientePerfil";
import { FiEdit2, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiFileText, FiLock, FiX } from "react-icons/fi";

export default function MiPerfil() {
  const {
    perfil,
    loading,
    showModal,
    editingField,
    fieldValue,
    setFieldValue,
    saving,
    openEditModal,
    closeModal,
    handleSave,
    handleBlockedFieldClick,
  } = usePacientePerfil();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const nombreCompleto = [
    perfil?.primerNombre,
    perfil?.segundoNombre,
    perfil?.primerApellido,
    perfil?.segundoApellido,
  ]
    .filter(Boolean)
    .join(" ");

  const getFieldLabel = () => {
    if (editingField === "correo") return "Correo Electrónico";
    if (editingField === "telefono") return "Teléfono";
    if (editingField === "ubigeo") return "Ubigeo";
    return "";
  };

  const getFieldPlaceholder = () => {
    if (editingField === "correo") return "correo@ejemplo.com";
    if (editingField === "telefono") return "987654321";
    if (editingField === "ubigeo") return "Ingrese ubigeo";
    return "";
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <style>
        {`
          .profile-card {
            background: #ffffff;
            border-radius: 20px;
            padding: 2.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
          }

          .profile-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid #e0f2fe;
          }

          .profile-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #0f172a;
          }

          .profile-icon {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }

          .profile-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .field-group {
            background: #f8fafc;
            padding: 1.25rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            position: relative;
          }

          .field-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
          }

          .field-value {
            font-size: 1rem;
            font-weight: 500;
            color: #0f172a;
            padding: 0.75rem;
            background: white;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .field-locked {
            background: #f1f5f9;
            cursor: not-allowed;
            border: 2px dashed #cbd5e1;
          }

          .empty-value {
            color: #94a3b8;
            font-style: italic;
          }

          .btn-edit-field {
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 6px 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s ease;
          }

          .btn-edit-field:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
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
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
          }

          .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e0f2fe;
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
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .btn-close-modal:hover {
            background: #f1f5f9;
            color: #0f172a;
          }

          .modal-input {
            width: 100%;
            padding: 0.9rem;
            border: 2px solid #cbd5e1;
            border-radius: 10px;
            font-size: 1rem;
            margin-bottom: 1.5rem;
            transition: all 0.2s ease;
          }

          .modal-input:focus {
            border-color: #0ea5e9;
            outline: none;
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
          }

          .modal-actions {
            display: flex;
            gap: 10px;
          }

          .btn-modal {
            flex: 1;
            padding: 0.9rem;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-save-modal {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
          }

          .btn-save-modal:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
          }

          .btn-save-modal:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .btn-cancel-modal {
            background: #f1f5f9;
            color: #475569;
          }

          .btn-cancel-modal:hover {
            background: #e2e8f0;
          }

          @media (max-width: 768px) {
            .profile-card {
              padding: 1.5rem;
            }

            .profile-grid {
              grid-template-columns: 1fr;
            }

            .modal-content {
              padding: 1.5rem;
            }
          }
        `}
      </style>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-icon">
            <FiUser size={24} />
          </div>
          <div className="profile-title">Mi Perfil</div>
        </div>

        <div className="profile-grid">
          <div className="field-group">
            <div className="field-label">
              <FiUser size={16} />
              Nombre Completo
            </div>
            <div className="field-value field-locked" onClick={handleBlockedFieldClick}>
              <span>{nombreCompleto || "No especificado"}</span>
              <FiLock size={16} style={{ color: "#94a3b8" }} />
            </div>
          </div>

          <div className="field-group">
            <div className="field-label">
              <FiFileText size={16} />
              DNI
            </div>
            <div className="field-value field-locked" onClick={handleBlockedFieldClick}>
              <span>{perfil?.dni || "No especificado"}</span>
              <FiLock size={16} style={{ color: "#94a3b8" }} />
            </div>
          </div>

          <div className="field-group">
            <div className="field-label">
              <FiCalendar size={16} />
              Fecha de Nacimiento
            </div>
            <div className="field-value field-locked" onClick={handleBlockedFieldClick}>
              <span>{perfil?.fechaNacimiento || "No especificado"}</span>
              <FiLock size={16} style={{ color: "#94a3b8" }} />
            </div>
          </div>

          <div className="field-group">
            <div className="field-label">
              <FiFileText size={16} />
              Historia Clínica
            </div>
            <div className="field-value field-locked" onClick={handleBlockedFieldClick}>
              <span>{perfil?.codigoHistoriaClinica || "No especificado"}</span>
              <FiLock size={16} style={{ color: "#94a3b8" }} />
            </div>
          </div>

          <div className="field-group">
            <div className="field-label">
              <FiMail size={16} />
              Correo Electrónico
            </div>
            <div className="field-value">
              <span className={!perfil?.correo ? "empty-value" : ""}>
                {perfil?.correo || "No especificado"}
              </span>
              <button 
                className="btn-edit-field" 
                onClick={() => openEditModal("correo", perfil?.correo)}
              >
                <FiEdit2 size={14} />
                Editar
              </button>
            </div>
          </div>

          <div className="field-group">
            <div className="field-label">
              <FiPhone size={16} />
              Teléfono
            </div>
            <div className="field-value">
              <span className={!perfil?.telefono ? "empty-value" : ""}>
                {perfil?.telefono || "No especificado"}
              </span>
              <button 
                className="btn-edit-field" 
                onClick={() => openEditModal("telefono", perfil?.telefono)}
              >
                <FiEdit2 size={14} />
                Editar
              </button>
            </div>
          </div>

          <div className="field-group">
            <div className="field-label">
              <FiMapPin size={16} />
              Ubigeo
            </div>
            <div className="field-value">
              <span className={!perfil?.ubigeo ? "empty-value" : ""}>
                {perfil?.ubigeo || "No especificado"}
              </span>
              <button 
                className="btn-edit-field" 
                onClick={() => openEditModal("ubigeo", perfil?.ubigeo)}
              >
                <FiEdit2 size={14} />
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Editar {getFieldLabel()}</div>
              <button className="btn-close-modal" onClick={closeModal}>
                <FiX size={24} />
              </button>
            </div>

            <input
              type={editingField === "correo" ? "email" : "text"}
              className="modal-input"
              value={fieldValue}
              onChange={(e) => {
                if (editingField === "telefono") {
                  setFieldValue(e.target.value.replace(/\D/g, "").slice(0, 9));
                } else {
                  setFieldValue(e.target.value);
                }
              }}
              placeholder={getFieldPlaceholder()}
              maxLength={editingField === "telefono" ? 9 : undefined}
              disabled={saving}
              autoFocus
            />

            <div className="modal-actions">
              <button 
                className="btn-modal btn-cancel-modal" 
                onClick={closeModal}
                disabled={saving}
              >
                Cancelar
              </button>
              <button 
                className="btn-modal btn-save-modal" 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}