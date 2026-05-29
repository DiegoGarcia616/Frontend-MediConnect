import { useAdminLocales } from "../../hooks/useAdminLocales";
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiX, FiMapPin, FiFileText } from "react-icons/fi";

export default function AdminTotalUsuarios() {
  const {
    adminLocales,
    sedes,
    loading,
    showModal,
    editingAdmin,
    formData,
    setFormData,
    saving,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSave,
    handleDelete,
  } = useAdminLocales();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <style>
        {`
          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .page-title-section {
            display: flex;
            align-items: center;
            gap: 0.75rem;
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

          .btn-create {
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 12px 24px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-create:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
          }

          .admins-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
          }

          .admin-card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
            position: relative;
          }

          .admin-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          }

          .badge-estado {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .badge-activo {
            background: #d1fae5;
            color: #065f46;
          }

          .badge-inactivo {
            background: #fee2e2;
            color: #991b1b;
          }

          .admin-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 0.25rem;
            line-height: 1.3;
            padding-right: 80px;
          }

          .admin-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          .info-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: #64748b;
          }

          .info-icon {
            color: #94a3b8;
            flex-shrink: 0;
          }

          .admin-actions {
            display: flex;
            gap: 0.5rem;
            padding-top: 1rem;
            border-top: 1px solid #f1f5f9;
          }

          .btn-action {
            flex: 1;
            background: transparent;
            border: 2px solid;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-weight: 600;
            font-size: 0.85rem;
          }

          .btn-edit {
            color: #0ea5e9;
            border-color: #0ea5e9;
          }

          .btn-edit:hover {
            background: #0ea5e9;
            color: white;
          }

          .btn-delete {
            color: #ef4444;
            border-color: #ef4444;
          }

          .btn-delete:hover {
            background: #ef4444;
            color: white;
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
            max-width: 600px;
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

          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-group.full {
            grid-column: 1 / -1;
          }

          .form-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748b;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .form-input {
            padding: 0.75rem;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.2s ease;
          }

          .form-input:focus {
            border-color: #f97316;
            outline: none;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
          }

          .form-input:disabled {
            background: #f1f5f9;
            cursor: not-allowed;
          }

          .modal-actions {
            display: flex;
            gap: 10px;
            margin-top: 1.5rem;
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

          .empty-state {
            text-align: center;
            padding: 3rem;
            color: #64748b;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          }

          @media (max-width: 768px) {
            .page-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .admins-grid {
              grid-template-columns: 1fr;
            }

            .form-grid {
              grid-template-columns: 1fr;
            }

            .btn-create {
              width: 100%;
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .admin-actions {
              flex-direction: column;
            }

            .modal-content {
              padding: 1.5rem;
            }
          }
        `}
      </style>

      <div className="page-header">
        <div className="page-title-section">
          <div className="page-icon">
            <FiUsers size={24} />
          </div>
          <div className="page-title">Administradores Locales</div>
        </div>
        <button className="btn-create" onClick={openCreateModal}>
          <FiPlus size={20} />
          Crear Administrador
        </button>
      </div>

      {adminLocales.length === 0 ? (
        <div className="empty-state">
          <FiUsers size={48} />
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>No hay administradores locales registrados</p>
        </div>
      ) : (
        <div className="admins-grid">
          {adminLocales.map((admin) => {
            const nombreCompleto = [
              admin.primerNombre,
              admin.segundoNombre,
              admin.primerApellido,
              admin.segundoApellido,
            ].filter(Boolean).join(" ");

            return (
              <div key={admin.idAdminLocal} className="admin-card">
                <span className={`badge-estado ${admin.estado === "ACTIVO" ? "badge-activo" : "badge-inactivo"}`}>
                  {admin.estado}
                </span>

                <div className="admin-name">{nombreCompleto}</div>

                <div className="admin-info">
                  <div className="info-row">
                    <FiFileText size={16} className="info-icon" />
                    <span>{admin.dni}</span>
                  </div>
                  <div className="info-row">
                    <FiMapPin size={16} className="info-icon" />
                    <span>{admin.nombreSede}</span>
                  </div>
                </div>

                <div className="admin-actions">
                  <button className="btn-action btn-edit" onClick={() => openEditModal(admin)}>
                    <FiEdit2 size={16} />
                    Editar
                  </button>
                  <button className="btn-action btn-delete" onClick={() => handleDelete(admin.idAdminLocal, nombreCompleto)}>
                    <FiTrash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {editingAdmin ? "Editar Administrador Local" : "Crear Administrador Local"}
              </div>
              <button className="btn-close-modal" onClick={closeModal}>
                <FiX size={24} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Primer Nombre *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.primerNombre}
                  onChange={(e) => setFormData({ ...formData, primerNombre: e.target.value })}
                  placeholder="Ingrese el primer nombre"
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Segundo Nombre</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.segundoNombre}
                  onChange={(e) => setFormData({ ...formData, segundoNombre: e.target.value })}
                  placeholder="Opcional"
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primer Apellido *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.primerApellido}
                  onChange={(e) => setFormData({ ...formData, primerApellido: e.target.value })}
                  placeholder="Ingrese el primer apellido"
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Segundo Apellido</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.segundoApellido}
                  onChange={(e) => setFormData({ ...formData, segundoApellido: e.target.value })}
                  placeholder="Opcional"
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label className="form-label">DNI *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value.replace(/\D/g, "").slice(0, 8) })}
                  placeholder="Ingrese el DNI"
                  maxLength={8}
                  disabled={saving || editingAdmin}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sede *</label>
                <select
                  className="form-input"
                  value={formData.idSede}
                  onChange={(e) => setFormData({ ...formData, idSede: e.target.value })}
                  disabled={saving}
                >
                  <option value="">Seleccione una sede</option>
                  {sedes.map((sede) => (
                    <option key={sede.idSede} value={sede.idSede}>
                      {sede.nombreSede}
                    </option>
                  ))}
                </select>
              </div>

              {!editingAdmin && (
                <div className="form-group full">
                  <label className="form-label">Contraseña *</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    disabled={saving}
                  />
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-modal btn-cancel-modal" onClick={closeModal} disabled={saving}>
                Cancelar
              </button>
              <button className="btn-modal btn-save-modal" onClick={handleSave} disabled={saving}>
                {saving ? "Guardando..." : editingAdmin ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}