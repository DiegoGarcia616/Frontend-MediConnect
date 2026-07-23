import { useState } from "react";
import usePacientes from "../../hooks/usePacientes";

const initialForm = {
  telefono: "",
  contactoEmergenciaNombre: "",
  contactoEmergenciaTelefono: "",
  contactoEmergenciaParentesco: "",
};

export default function AdminTotalPacientes() {
  const { pacientes, pendientes, loading, saving, completarDatos } = usePacientes();

  const [showCompletar, setShowCompletar] = useState(false);
  const [usuarioCompletar, setUsuarioCompletar] = useState(null);
  const [form, setForm] = useState(initialForm);

  const [showDetalle, setShowDetalle] = useState(false);
  const [pacienteDetalle, setPacienteDetalle] = useState(null);

  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAbrirCompletar = (usuario) => {
    setUsuarioCompletar(usuario);
    setForm(initialForm);
    setShowCompletar(true);
  };

  const handleCerrarCompletar = () => {
    setShowCompletar(false);
    setUsuarioCompletar(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.telefono.trim()) return;
    const ok = await completarDatos(usuarioCompletar.idUsuario, form);
    if (ok) handleCerrarCompletar();
  };

  const handleAbrirDetalle = (paciente) => {
    setPacienteDetalle(paciente);
    setShowDetalle(true);
  };

  const handleCerrarDetalle = () => {
    setShowDetalle(false);
    setPacienteDetalle(null);
  };

  const pacientesFiltrados = pacientes.filter((p) => {
    const nombreCompleto = `${p.nombres} ${p.apellidoPaterno} ${p.apellidoMaterno}`.toLowerCase();
    const termino = busqueda.trim().toLowerCase();
    return (
      nombreCompleto.includes(termino) ||
      p.dni.includes(busqueda.trim()) ||
      p.correo.toLowerCase().includes(termino) ||
      (p.codigoHistoriaClinica || "").toLowerCase().includes(termino)
    );
  });

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
          .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
          .header-left { display: flex; align-items: center; gap: 1rem; }
          .page-title { font-size: 1.9rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
          .page-subtitle { font-size: 0.9rem; color: #64748b; margin-top: 0.15rem; }
          .page-icon { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(37,99,235,0.35); flex-shrink: 0; }
          .search-bar { position: relative; max-width: 380px; margin-bottom: 1.6rem; }
          .search-bar svg { position: absolute; top: 50%; left: 14px; transform: translateY(-50%); width: 18px; height: 18px; }
          .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.6rem; border-radius: 12px; border: 1.5px solid #e2e8f0; font-size: 0.92rem; background: white; box-sizing: border-box; }
          .search-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
          .search-clear { position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: #f1f5f9; border: none; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; }
          .search-clear svg { position: static; transform: none; width: 13px; height: 13px; }
          .search-clear:hover { background: #e2e8f0; }

          .pendientes-box { background: #fff7ed; border: 1.5px dashed #fdba74; border-radius: 16px; padding: 1.2rem 1.4rem; margin-bottom: 1.6rem; }
          .pendientes-titulo { font-size: 0.9rem; font-weight: 800; color: #c2410c; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.9rem; }
          .pendiente-item { display: flex; align-items: center; justify-content: space-between; background: white; border-radius: 12px; padding: 0.8rem 1rem; margin-bottom: 0.6rem; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
          .pendiente-item:last-child { margin-bottom: 0; }
          .pendiente-info { display: flex; flex-direction: column; }
          .pendiente-nombre { font-weight: 700; color: #0f172a; font-size: 0.88rem; }
          .pendiente-dni { font-size: 0.76rem; color: #94a3b8; }
          .btn-completar { background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 0.5rem 1rem; border-radius: 9px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
          .btn-completar:hover { opacity: 0.9; }

          .tabla-wrap { background: white; border-radius: 20px; box-shadow: 0 2px 12px rgba(15,23,42,0.06); border: 1px solid #eef2f6; overflow: hidden; }
          .tabla-scroll { overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; min-width: 820px; }
          thead th { text-align: center; font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; padding: 1rem 1rem; border-bottom: 2px solid #f1f5f9; background: #fbfcfe; white-space: nowrap; }
          thead th:first-child { text-align: left; padding-left: 1.6rem; }
          thead th:last-child { padding-right: 1.6rem; }
          tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease; }
          tbody tr:hover { background: #fbfcfe; }
          tbody tr:last-child { border-bottom: none; }
          tbody td { padding: 0.9rem 1rem; font-size: 0.86rem; color: #334155; vertical-align: middle; text-align: center; }
          tbody td:first-child { text-align: left; padding-left: 1.6rem; }
          tbody td:last-child { padding-right: 1.6rem; }

          .paciente-nombre-cell { display: flex; align-items: center; gap: 0.8rem; text-align: left; }
          .avatar-mini { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
          .avatar-mini-placeholder { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }
          .paciente-nombre-info { display: flex; flex-direction: column; min-width: 0; }
          .paciente-nombre-txt { font-weight: 700; color: #0f172a; line-height: 1.25; display: block; }
          .paciente-nombre-linea2 { display: block; }
          .paciente-dni-txt { font-size: 0.74rem; color: #94a3b8; margin-top: 0.2rem; }

          .hc-badge { font-size: 0.71rem; font-weight: 700; padding: 0.32rem 0.8rem; border-radius: 999px; background: #eff6ff; color: #2563eb; display: inline-block; white-space: nowrap; }

          .acciones-cell { display: flex; gap: 0.4rem; align-items: center; justify-content: center; }
          .action-btn { border: none; width: 34px; height: 34px; min-width: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; padding: 0; }
          .action-btn svg { display: block; width: 16px; height: 16px; }
          .action-btn.view { background: #f1f5f9; }
          .action-btn.view:hover { background: #e2e8f0; transform: scale(1.08); }

          .empty-state { text-align: center; padding: 4rem 2rem; color: #64748b; background: white; border-radius: 18px; box-shadow: 0 2px 12px rgba(15,23,42,0.06); }

          .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); padding: 1rem; }
          .modal-box { background: white; border-radius: 20px; padding: 2rem; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
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
          .confirm-mensaje { font-size: 0.92rem; color: #475569; line-height: 1.5; margin-bottom: 0.4rem; }

          .detalle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.1rem; }
          .detalle-item { display: flex; flex-direction: column; gap: 0.3rem; }
          .detalle-label { font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.03em; }
          .detalle-value { font-size: 0.92rem; font-weight: 600; color: #0f172a; }
          .detalle-header-user { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.4rem; padding-bottom: 1.2rem; border-bottom: 1px solid #f1f5f9; }
          .detalle-avatar-img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
          .detalle-avatar-placeholder { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.3rem; }
          .detalle-header-nombre { font-size: 1.1rem; font-weight: 800; color: #0f172a; }
          .detalle-header-correo { font-size: 0.84rem; color: #64748b; margin-top: 0.15rem; }

          @media (max-width: 768px) { .detalle-grid { grid-template-columns: 1fr; } }
        `}
      </style>

      <div className="page-header">
        <div className="header-left">
          <div className="page-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <div className="page-title">Pacientes</div>
            <div className="page-subtitle">{pacientesFiltrados.length} de {pacientes.length} pacientes</div>
          </div>
        </div>
      </div>

      {pendientes.length > 0 && (
        <div className="pendientes-box">
          <div className="pendientes-titulo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {pendientes.length} paciente(s) pendientes de completar datos de contacto
          </div>

          {pendientes.map((u) => (
            <div className="pendiente-item" key={u.idUsuario}>
              <div className="pendiente-info">
                <span className="pendiente-nombre">{u.nombres} {u.apellidoPaterno} {u.apellidoMaterno}</span>
                <span className="pendiente-dni">DNI: {u.dni} · {u.correo}</span>
              </div>
              <button className="btn-completar" onClick={() => handleAbrirCompletar(u)}>
                Completar datos
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, DNI, correo o historia clínica..."
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

      {pacientesFiltrados.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: "1.1rem" }}>
            {busqueda ? "No se encontraron pacientes con esa búsqueda" : "No hay pacientes con datos completos"}
          </p>
        </div>
      ) : (
        <div className="tabla-wrap">
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Historia clínica</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientesFiltrados.map((p) => (
                  <tr key={p.idPaciente}>
                    <td>
                      <div className="paciente-nombre-cell">
                        {p.fotoPerfil ? (
                          <img src={p.fotoPerfil} alt={p.nombres} className="avatar-mini" />
                        ) : (
                          <div className="avatar-mini-placeholder">
                            {(p.nombres?.charAt(0) || "") + (p.apellidoPaterno?.charAt(0) || "")}
                          </div>
                        )}
                        <div className="paciente-nombre-info">
                          <span className="paciente-nombre-txt">
                            {p.nombres}
                            <span className="paciente-nombre-linea2">{p.apellidoPaterno} {p.apellidoMaterno}</span>
                          </span>
                          <span className="paciente-dni-txt">DNI: {p.dni}</span>
                        </div>
                      </div>
                    </td>
                    <td>{p.correo}</td>
                    <td>{p.telefono || "N/A"}</td>
                    <td>
                      <span className="hc-badge">{p.codigoHistoriaClinica || "Sin código"}</span>
                    </td>
                    <td>
                      <div className="acciones-cell">
                        <button className="action-btn view" onClick={() => handleAbrirDetalle(p)} title="Ver más">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCompletar && usuarioCompletar && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Completar datos de contacto</div>
              <button className="close-btn" onClick={handleCerrarCompletar}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="confirm-mensaje" style={{ marginBottom: "1.2rem" }}>
              {usuarioCompletar.nombres} {usuarioCompletar.apellidoPaterno} {usuarioCompletar.apellidoMaterno}
            </p>

            <form onSubmit={handleSubmit}>
              <label className="modal-label">Teléfono</label>
              <input
                type="text"
                className="modal-input"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ej: 987654321"
                autoFocus
              />

              <label className="modal-label">Nombre de contacto de emergencia</label>
              <input
                type="text"
                className="modal-input"
                name="contactoEmergenciaNombre"
                value={form.contactoEmergenciaNombre}
                onChange={handleChange}
                placeholder="Ej: María Pérez"
              />

              <label className="modal-label">Teléfono de contacto de emergencia</label>
              <input
                type="text"
                className="modal-input"
                name="contactoEmergenciaTelefono"
                value={form.contactoEmergenciaTelefono}
                onChange={handleChange}
                placeholder="Ej: 987654321"
              />

              <label className="modal-label">Parentesco</label>
              <input
                type="text"
                className="modal-input"
                name="contactoEmergenciaParentesco"
                value={form.contactoEmergenciaParentesco}
                onChange={handleChange}
                placeholder="Ej: Madre, Padre, Hermano..."
              />

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCerrarCompletar}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Guardando..." : "Completar datos"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetalle && pacienteDetalle && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Detalle del paciente</div>
              <button className="close-btn" onClick={handleCerrarDetalle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="detalle-header-user">
              {pacienteDetalle.fotoPerfil ? (
                <img src={pacienteDetalle.fotoPerfil} alt={pacienteDetalle.nombres} className="detalle-avatar-img" />
              ) : (
                <div className="detalle-avatar-placeholder">
                  {(pacienteDetalle.nombres?.charAt(0) || "") + (pacienteDetalle.apellidoPaterno?.charAt(0) || "")}
                </div>
              )}
              <div>
                <div className="detalle-header-nombre">
                  {pacienteDetalle.nombres} {pacienteDetalle.apellidoPaterno} {pacienteDetalle.apellidoMaterno}
                </div>
                <div className="detalle-header-correo">{pacienteDetalle.correo}</div>
              </div>
            </div>

            <div className="detalle-grid">
              <div className="detalle-item">
                <span className="detalle-label">DNI</span>
                <span className="detalle-value">{pacienteDetalle.dni}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Historia clínica</span>
                <span className="detalle-value">{pacienteDetalle.codigoHistoriaClinica || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Teléfono</span>
                <span className="detalle-value">{pacienteDetalle.telefono || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Dirección</span>
                <span className="detalle-value">{pacienteDetalle.direccion || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Contacto de emergencia</span>
                <span className="detalle-value">{pacienteDetalle.contactoEmergenciaNombre || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Teléfono de emergencia</span>
                <span className="detalle-value">{pacienteDetalle.contactoEmergenciaTelefono || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Parentesco</span>
                <span className="detalle-value">{pacienteDetalle.contactoEmergenciaParentesco || "N/A"}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={handleCerrarDetalle}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}