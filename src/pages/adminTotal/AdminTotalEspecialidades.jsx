import { useState } from "react";
import useEspecialidades from "../../hooks/useEspecialidades";

const formatearFecha = (fechaISO) => {
  if (!fechaISO) return "N/A";
  const fecha = new Date(fechaISO);
  return fecha.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminTotalEspecialidades() {
  const {
    especialidades,
    loading,
    saving,
    guardarEspecialidad,
    eliminarFotoDeEspecialidad,
    eliminarEspecialidadCompleta,
  } = useEspecialidades();

  const [showModal, setShowModal] = useState(false);
  const [especialidadEditar, setEspecialidadEditar] = useState(null);
  const initialForm = { nombre: "", descripcion: "" };
  const [form, setForm] = useState(initialForm);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivoFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAbrirNueva = () => {
    setEspecialidadEditar(null);
    setForm(initialForm);
    setArchivoFoto(null);
    setPreview(null);
    setShowModal(true);
  };

  const handleAbrirEditar = (esp) => {
    setEspecialidadEditar(esp);
    setForm({
      nombre: esp.nombre,
      descripcion: esp.descripcion || "",
    });
    setArchivoFoto(null);
    setPreview(esp.foto || null);
    setShowModal(true);
  };

  const handleCerrar = () => {
    setShowModal(false);
    setEspecialidadEditar(null);
    setForm(initialForm);
    setArchivoFoto(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;

    const ok = await guardarEspecialidad(especialidadEditar ? especialidadEditar.idEspecialidad : null, form, archivoFoto);
    if (ok) handleCerrar();
  };

  const handleEliminarFoto = async (id) => {
    await eliminarFotoDeEspecialidad(id);
    setPreview(null);
  };

  const handleEliminarEspecialidad = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta especialidad? Esta acción no se puede revertir.")) {
      await eliminarEspecialidadCompleta(id);
    }
  };

  const especialidadesFiltradas = especialidades.filter((esp) =>
    esp.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

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
    <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>
      <style>
        {`
          .page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .header-left {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .page-title {
            font-size: 1.9rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
          }

          .page-subtitle {
            font-size: 0.9rem;
            color: #64748b;
            margin-top: 0.15rem;
          }

          .page-icon {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 16px rgba(249,115,22,0.35);
            flex-shrink: 0;
          }

          .btn-add {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            border: none;
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(249,115,22,0.3);
            transition: all 0.2s ease;
          }

          .btn-add:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(249,115,22,0.4);
          }

          .search-bar {
            position: relative;
            margin-bottom: 1.6rem;
            max-width: 420px;
          }

          .search-bar svg {
            position: absolute;
            top: 50%;
            left: 14px;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
          }

          .search-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.6rem;
            border-radius: 12px;
            border: 1.5px solid #e2e8f0;
            font-size: 0.92rem;
            background: white;
            box-sizing: border-box;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: #f97316;
            box-shadow: 0 0 0 3px rgba(249,115,22,0.15);
          }

          .search-clear {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            background: #f1f5f9;
            border: none;
            width: 24px;
            height: 24px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
          }

          .search-clear svg {
            position: static;
            transform: none;
            width: 13px;
            height: 13px;
          }

          .search-clear:hover { background: #e2e8f0; }

          .especialidades-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 1.4rem;
          }

          .especialidad-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            border: 1px solid #eef2f6;
            transition: all 0.25s ease;
            overflow: hidden;
          }

          .especialidad-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(15,23,42,0.12);
          }

          .card-cover {
            width: 100%;
            height: 150px;
            object-fit: cover;
            display: block;
          }

          .card-cover-placeholder {
            width: 100%;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #fff7ed, #ffedd5);
          }

          .card-body { padding: 1.25rem 1.4rem 1.4rem; }

          .card-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.75rem;
          }

          .especialidad-name {
            font-size: 1.08rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.25;
          }

          .especialidad-id {
            font-size: 0.76rem;
            color: #94a3b8;
            margin-top: 0.15rem;
            font-weight: 600;
          }

          .card-actions { display: flex; gap: 0.45rem; flex-shrink: 0; }

          .action-btn {
            border: none;
            width: 36px;
            height: 36px;
            min-width: 36px;
            min-height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 0;
          }

          .action-btn svg {
            display: block;
            width: 17px;
            height: 17px;
          }

          .action-btn.edit { background: #eff6ff; }
          .action-btn.edit:hover { background: #dbeafe; transform: scale(1.08); }
          .action-btn.delete { background: #fef2f2; }
          .action-btn.delete:hover { background: #fecaca; transform: scale(1.08); }

          .card-bottom {
            margin-top: 1rem;
            padding-top: 0.9rem;
            border-top: 1px solid #f1f5f9;
          }

          .especialidad-info-row {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            font-size: 0.85rem;
            color: #475569;
            margin-top: 0.5rem;
            line-height: 1.4;
          }

          .especialidad-info-row svg { flex-shrink: 0; margin-top: 2px; }

          .audit-box {
            margin-top: 0.9rem;
            padding: 0.75rem 0.9rem;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px dashed #e2e8f0;
          }

          .audit-row {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.72rem;
            color: #94a3b8;
            margin-top: 0.35rem;
          }

          .audit-row:first-child { margin-top: 0; }
          .audit-row svg { flex-shrink: 0; }

          .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: #64748b;
            background: white;
            border-radius: 18px;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
          }

          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15,23,42,0.55);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(2px);
            padding: 1rem;
          }

          .modal-box {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            width: 100%;
            max-width: 460px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.4rem;
          }

          .modal-title { font-size: 1.25rem; font-weight: 800; color: #0f172a; }

          .close-btn {
            background: #f1f5f9;
            border: none;
            cursor: pointer;
            width: 34px;
            height: 34px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          }

          .close-btn svg { width: 18px; height: 18px; display: block; }

          .close-btn:hover { background: #e2e8f0; }

          .modal-label {
            font-size: 0.85rem;
            font-weight: 700;
            color: #334155;
            display: block;
            margin-bottom: 0.5rem;
          }

          .modal-input {
            width: 100%;
            padding: 0.7rem 0.9rem;
            border-radius: 10px;
            border: 1.5px solid #e2e8f0;
            font-size: 0.95rem;
            margin-bottom: 1.2rem;
            transition: border-color 0.2s ease;
            box-sizing: border-box;
          }

          .modal-input:focus { outline: none; border-color: #f97316; }

          .foto-preview-row {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1.2rem;
          }

          .foto-preview-img {
            width: 64px;
            height: 64px;
            border-radius: 12px;
            object-fit: cover;
            border: 1px solid #e2e8f0;
          }

          .btn-quitar-foto {
            background: #fef2f2;
            border: none;
            padding: 0.5rem 0.85rem;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.8rem;
            font-weight: 600;
            color: #dc2626;
          }

          .btn-quitar-foto svg { width: 14px; height: 14px; }

          .btn-quitar-foto:hover { background: #fee2e2; }

          .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.7rem;
            margin-top: 0.4rem;
          }

          .btn-cancel {
            background: #f1f5f9;
            color: #334155;
            border: none;
            padding: 0.7rem 1.3rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
          }

          .btn-cancel:hover { background: #e2e8f0; }

          .btn-save {
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            border: none;
            padding: 0.7rem 1.3rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(249,115,22,0.3);
          }

          .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

          @media (max-width: 768px) {
            .especialidades-grid { grid-template-columns: 1fr; }
            .search-bar { max-width: 100%; }
          }
        `}
      </style>

      <div className="page-header">
        <div className="header-left">
          <div className="page-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div>
            <div className="page-title">Especialidades</div>
            <div className="page-subtitle">{especialidadesFiltradas.length} de {especialidades.length} especialidades</div>
          </div>
        </div>

        <button className="btn-add" onClick={handleAbrirNueva}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Agregar Especialidad
        </button>
      </div>

      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar especialidad por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        {busqueda && (
          <button className="search-clear" onClick={() => setBusqueda("")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {especialidadesFiltradas.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
            {busqueda ? "No se encontraron especialidades con ese nombre" : "No hay especialidades registradas"}
          </p>
        </div>
      ) : (
        <div className="especialidades-grid">
          {especialidadesFiltradas.map((esp) => (
            <div key={esp.idEspecialidad} className="especialidad-card">
              {esp.foto ? (
                <img src={esp.foto} alt={esp.nombre} className="card-cover" />
              ) : (
                <div className="card-cover-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
              )}

              <div className="card-body">
                <div className="card-top">
                  <div>
                    <div className="especialidad-name">{esp.nombre}</div>
                    <div className="especialidad-id">ID: {esp.idEspecialidad}</div>
                  </div>

                  <div className="card-actions">
                    <button className="action-btn edit" onClick={() => handleAbrirEditar(esp)} title="Editar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="action-btn delete" onClick={() => handleEliminarEspecialidad(esp.idEspecialidad)} title="Eliminar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="card-bottom">
                  {esp.descripcion && (
                    <div className="especialidad-info-row">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      {esp.descripcion}
                    </div>
                  )}

                  <div className="audit-box">
                    <div className="audit-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Creado: {formatearFecha(esp.fechaCreacion)}
                    </div>
                    <div className="audit-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Por usuario {esp.usuarioCreacion}
                    </div>
                    <div className="audit-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Modificado: {formatearFecha(esp.fechaModificacion)}
                    </div>
                    <div className="audit-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Por usuario {esp.usuarioModificacion}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">{especialidadEditar ? "Editar Especialidad" : "Nueva Especialidad"}</div>
              <button className="close-btn" onClick={handleCerrar}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="modal-label">Nombre de la especialidad</label>
              <input
                type="text"
                className="modal-input"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Cardiología"
                autoFocus
              />

              <label className="modal-label">Descripción</label>
              <input
                type="text"
                className="modal-input"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Ej: Diagnóstico y tratamiento del corazón"
              />

              <label className="modal-label">Foto</label>
              <input type="file" accept="image/*" onChange={handleFotoChange} className="modal-input" />

              {preview && (
                <div className="foto-preview-row">
                  <img src={preview} alt="preview" className="foto-preview-img" />
                  {especialidadEditar && especialidadEditar.foto && !archivoFoto && (
                    <button type="button" className="btn-quitar-foto" onClick={() => handleEliminarFoto(especialidadEditar.idEspecialidad)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="2" x2="22" y2="22" />
                        <path d="M10.41 5H21a1 1 0 0 1 1 1v10.59" />
                        <path d="M3 3v18a1 1 0 0 0 1 1h18" />
                        <circle cx="9" cy="9" r="2" />
                      </svg>
                      Quitar foto
                    </button>
                  )}
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCerrar}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}