import { useState, useRef } from "react";
import usePerfil from "../../hooks/usePerfil";

export default function AdminLocalProfile() {
  const { perfil, sede, loading, saving, uploadingFoto, guardarPerfil, subirFoto, eliminarFoto } = usePerfil();

  const inputFotoRef = useRef(null);

  const [showEditarPerfil, setShowEditarPerfil] = useState(false);
  const [formPerfil, setFormPerfil] = useState({ correo: "", direccion: "", estadoCivil: "" });

  const [showConfirmFoto, setShowConfirmFoto] = useState(false);

  const handleAbrirEditarPerfil = () => {
    setFormPerfil({
      correo: perfil?.correo || "",
      direccion: perfil?.direccion || "",
      estadoCivil: perfil?.estadoCivil || "",
    });
    setShowEditarPerfil(true);
  };

  const handleCerrarEditarPerfil = () => setShowEditarPerfil(false);

  const handleSubmitPerfil = async (e) => {
    e.preventDefault();
    const ok = await guardarPerfil(formPerfil);
    if (ok) handleCerrarEditarPerfil();
  };

  const handleSeleccionarFoto = () => inputFotoRef.current?.click();

  const handleArchivoSeleccionado = async (e) => {
    const archivo = e.target.files[0];
    if (archivo) await subirFoto(archivo);
    e.target.value = "";
  };

  const handleConfirmarEliminarFoto = async () => {
    await eliminarFoto();
    setShowConfirmFoto(false);
  };

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
          .page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.8rem; }
          .page-icon { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(37,99,235,0.35); flex-shrink: 0; }
          .page-title { font-size: 1.9rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
          .page-subtitle { font-size: 0.9rem; color: #64748b; margin-top: 0.15rem; }

          .perfil-grid { display: grid; grid-template-columns: 320px 1fr; gap: 1.6rem; align-items: start; }

          .card { background: white; border-radius: 20px; box-shadow: 0 2px 12px rgba(15,23,42,0.06); border: 1px solid #eef2f6; padding: 1.8rem; }

          .foto-card { display: flex; flex-direction: column; align-items: center; text-align: center; }

          .foto-wrap { position: relative; width: 140px; height: 140px; margin-bottom: 1.2rem; }

          .foto-img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid #eff6ff; }

          .foto-placeholder { width: 140px; height: 140px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 2.4rem; border: 4px solid #eff6ff; }

          .foto-nombre { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.2rem; }
          .foto-correo { font-size: 0.85rem; color: #64748b; margin-bottom: 1rem; }

          .foto-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.2rem; }

          .badge { font-size: 0.72rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 999px; white-space: nowrap; }
          .badge.rol { background: #eff6ff; color: #2563eb; }
          .badge.estado-activo { background: #ecfdf5; color: #059669; }
          .badge.estado-inactivo { background: #fef2f2; color: #dc2626; }

          .foto-botones { display: flex; gap: 0.6rem; width: 100%; }

          .btn-foto { flex: 1; border: none; padding: 0.65rem 0.8rem; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
          .btn-foto.upload { background: #eff6ff; color: #2563eb; }
          .btn-foto.upload:hover { background: #dbeafe; }
          .btn-foto.remove { background: #fef2f2; color: #dc2626; }
          .btn-foto.remove:hover { background: #fee2e2; }
          .btn-foto:disabled { opacity: 0.6; cursor: not-allowed; }

          .section-title { font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: space-between; }

          .btn-editar-mini { background: #eff6ff; color: #2563eb; border: none; padding: 0.5rem 1rem; border-radius: 9px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; }
          .btn-editar-mini:hover { background: #dbeafe; }

          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; margin-bottom: 1.8rem; }
          .info-grid:last-child { margin-bottom: 0; }

          .info-item { display: flex; flex-direction: column; gap: 0.4rem; }
          .info-label { font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.03em; }
          .info-value { font-size: 0.94rem; font-weight: 600; color: #0f172a; }

          .readonly-note { font-size: 0.78rem; color: #94a3b8; font-style: italic; margin-top: 1.2rem; }

          .sede-card { display: flex; gap: 1.4rem; align-items: flex-start; }
          .sede-img-wrap { width: 100px; height: 100px; border-radius: 14px; overflow: hidden; flex-shrink: 0; background: #eff6ff; display: flex; align-items: center; justify-content: center; }
          .sede-img { width: 100%; height: 100%; object-fit: cover; }
          .sede-placeholder { color: #2563eb; }
          .sede-info { flex: 1; }
          .sede-nombre { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 0.3rem; }
          .sede-direccion { font-size: 0.86rem; color: #64748b; margin-bottom: 0.6rem; }
          .sede-desc { font-size: 0.86rem; color: #475569; line-height: 1.5; }

          .estado-row { display: flex; align-items: stretch; }
          .estado-col { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; padding: 0 1rem; }
          .estado-col:first-child { padding-left: 0; }
          .estado-col:last-child { padding-right: 0; }
          .estado-sep { width: 1px; background: #f1f5f9; margin: 0 0.2rem; }
          .estado-pill { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.94rem; font-weight: 700; color: #0f172a; }
          .dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
          .dot.activo { background: #059669; }
          .dot.inactivo { background: #dc2626; }

          .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); padding: 1rem; }
          .modal-box { background: white; border-radius: 20px; padding: 2rem; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
          .modal-box.small { max-width: 420px; }
          .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.4rem; }
          .modal-title { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
          .close-btn { background: #f1f5f9; border: none; cursor: pointer; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 0; }
          .close-btn svg { width: 18px; height: 18px; display: block; }
          .close-btn:hover { background: #e2e8f0; }
          .modal-label { font-size: 0.85rem; font-weight: 700; color: #334155; display: block; margin-bottom: 0.5rem; }
          .modal-input { width: 100%; padding: 0.7rem 0.9rem; border-radius: 10px; border: 1.5px solid #e2e8f0; font-size: 0.95rem; margin-bottom: 1.2rem; box-sizing: border-box; }
          .modal-input:focus { outline: none; border-color: #2563eb; }
          .modal-actions { display: flex; justify-content: flex-end; gap: 0.7rem; margin-top: 0.4rem; }
          .btn-cancel { background: #f1f5f9; color: #334155; border: none; padding: 0.7rem 1.3rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
          .btn-cancel:hover { background: #e2e8f0; }
          .btn-save { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 0.7rem 1.3rem; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
          .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
          .btn-danger { background: #dc2626; color: white; border: none; padding: 0.7rem 1.3rem; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }
          .btn-danger:hover { background: #b91c1c; }
          .confirm-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.1rem; background: #fee2e2; }
          .confirm-mensaje { font-size: 0.92rem; color: #475569; line-height: 1.5; margin-bottom: 0.4rem; }

          @media (max-width: 900px) {
            .perfil-grid { grid-template-columns: 1fr; }
            .info-grid { grid-template-columns: 1fr; }
            .estado-row { flex-direction: column; gap: 1rem; }
            .estado-col { padding: 0 !important; }
            .estado-sep { display: none; }
            .sede-card { flex-direction: column; }
          }
        `}
      </style>

      <div className="page-header">
        <div className="page-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <div className="page-title">Mi Perfil</div>
          <div className="page-subtitle">Consulta tu información personal y de sede</div>
        </div>
      </div>

      <div className="perfil-grid">
        <div className="card foto-card">
          <div className="foto-wrap">
            {perfil?.fotoPerfil ? (
              <img src={perfil.fotoPerfil} alt={perfil.nombres} className="foto-img" />
            ) : (
              <div className="foto-placeholder">
                {(perfil?.nombres?.charAt(0) || "") + (perfil?.apellidoPaterno?.charAt(0) || "")}
              </div>
            )}
          </div>

          <div className="foto-nombre">{perfil?.nombres} {perfil?.apellidoPaterno} {perfil?.apellidoMaterno}</div>
          <div className="foto-correo">{perfil?.correo}</div>

          <div className="foto-badges">
            <span className="badge rol">{perfil?.nombreRol}</span>
            <span className={`badge ${perfil?.estado === "ACTIVO" ? "estado-activo" : "estado-inactivo"}`}>
              {perfil?.estado}
            </span>
          </div>

          <input type="file" ref={inputFotoRef} accept="image/*" style={{ display: "none" }} onChange={handleArchivoSeleccionado} />

          <div className="foto-botones">
            <button className="btn-foto upload" onClick={handleSeleccionarFoto} disabled={uploadingFoto}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              {uploadingFoto ? "Subiendo..." : "Cambiar"}
            </button>
            {perfil?.fotoPerfil && (
              <button className="btn-foto remove" onClick={() => setShowConfirmFoto(true)} disabled={uploadingFoto}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                Eliminar
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: "1.6rem" }}>
            <div className="section-title">
              Datos personales
              <button className="btn-editar-mini" onClick={handleAbrirEditarPerfil}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Editar
              </button>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">DNI</span>
                <span className="info-value">{perfil?.dni}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Correo electrónico</span>
                <span className="info-value">{perfil?.correo}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Fecha de nacimiento</span>
                <span className="info-value">{perfil?.fechaNacimiento || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Sexo</span>
                <span className="info-value">{perfil?.sexo || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado civil</span>
                <span className="info-value">{perfil?.estadoCivil || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Dirección</span>
                <span className="info-value">{perfil?.direccion || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Departamento</span>
                <span className="info-value">{perfil?.departamento || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Provincia</span>
                <span className="info-value">{perfil?.provincia || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Distrito</span>
                <span className="info-value">{perfil?.distrito || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: "1.6rem" }}>
            <div className="section-title">Cuenta y accesos</div>

            <div className="estado-row">
              <div className="estado-col">
                <span className="info-label">Rol</span>
                <span className="info-value">{perfil?.nombreRol}</span>
              </div>

              <div className="estado-sep" />

              <div className="estado-col">
                <span className="info-label">Estado</span>
                <span className="estado-pill">
                  <span className={`dot ${perfil?.estado === "ACTIVO" ? "activo" : "inactivo"}`} />
                  {perfil?.estado}
                </span>
              </div>

              <div className="estado-sep" />

              <div className="estado-col">
                <span className="info-label">Intentos fallidos</span>
                <span className="info-value">{perfil?.intentosFallidos ?? 0}</span>
              </div>
            </div>

            <p className="readonly-note">Estos datos son gestionados por la administración y no pueden ser editados desde aquí.</p>
          </div>

          {sede && (
            <div className="card">
              <div className="section-title">Sede asignada</div>

              <div className="sede-card">
                <div className="sede-img-wrap">
                  {sede.fotoUrl || sede.foto ? (
                    <img src={sede.fotoUrl || sede.foto} alt={sede.nombre} className="sede-img" />
                  ) : (
                    <svg className="sede-placeholder" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18" />
                      <path d="M5 21V7l7-4 7 4v14" />
                      <path d="M9 9h1" />
                      <path d="M9 13h1" />
                      <path d="M14 9h1" />
                      <path d="M14 13h1" />
                      <path d="M10 21v-4h4v4" />
                    </svg>
                  )}
                </div>

                <div className="sede-info">
                  <div className="sede-nombre">{sede.nombre}</div>
                  <div className="sede-direccion">{sede.direccion}</div>
                  {sede.descripcion && <p className="sede-desc">{sede.descripcion}</p>}
                </div>
              </div>

              <p className="readonly-note">La sede es asignada por la administración y no puede ser modificada desde aquí.</p>
            </div>
          )}
        </div>
      </div>

      {showEditarPerfil && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Editar datos personales</div>
              <button className="close-btn" onClick={handleCerrarEditarPerfil}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitPerfil}>
              <label className="modal-label">Correo electrónico</label>
              <input
                type="email"
                className="modal-input"
                value={formPerfil.correo}
                onChange={(e) => setFormPerfil((prev) => ({ ...prev, correo: e.target.value }))}
                placeholder="correo@ejemplo.com"
                autoFocus
              />

              <label className="modal-label">Dirección</label>
              <input
                type="text"
                className="modal-input"
                value={formPerfil.direccion}
                onChange={(e) => setFormPerfil((prev) => ({ ...prev, direccion: e.target.value }))}
                placeholder="Ej: Av. Los Álamos 123"
              />

              <label className="modal-label">Estado civil</label>
              <select
                className="modal-input"
                value={formPerfil.estadoCivil}
                onChange={(e) => setFormPerfil((prev) => ({ ...prev, estadoCivil: e.target.value }))}
              >
                <option value="">Selecciona</option>
                <option value="SOLTERO">Soltero(a)</option>
                <option value="CASADO">Casado(a)</option>
                <option value="DIVORCIADO">Divorciado(a)</option>
                <option value="VIUDO">Viudo(a)</option>
                <option value="CONVIVIENTE">Conviviente</option>
              </select>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCerrarEditarPerfil}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmFoto && (
        <div className="modal-overlay">
          <div className="modal-box small">
            <div className="confirm-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <div className="modal-title" style={{ marginBottom: "0.6rem" }}>Eliminar foto de perfil</div>

            <p className="confirm-mensaje">¿Seguro que deseas eliminar tu foto de perfil actual?</p>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowConfirmFoto(false)}>
                Cancelar
              </button>
              <button type="button" className="btn-danger" onClick={handleConfirmarEliminarFoto} disabled={uploadingFoto}>
                {uploadingFoto ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}