import { useState } from "react";
import useMedicos from "../../hooks/useMedicos";
import useEspecialidades from "../../hooks/useEspecialidades";
import usePerfil from "../../hooks/usePerfil";

export default function AdminLocalMedicos() {
  const { medicos, pendientes, loading, saving, completarDatos, actualizarEspecialidadYSede, cambiarDisponibilidad, activar, inactivar } = useMedicos();
  const { especialidades } = useEspecialidades();
  const { perfil } = usePerfil();

  const [showCompletar, setShowCompletar] = useState(false);
  const [usuarioCompletar, setUsuarioCompletar] = useState(null);
  const [formCompletar, setFormCompletar] = useState({ numeroColegiatura: "", idEspecialidad: "" });

  const [showEditar, setShowEditar] = useState(false);
  const [medicoEditar, setMedicoEditar] = useState(null);
  const [formEditar, setFormEditar] = useState({ idEspecialidad: "" });

  const [confirmAccion, setConfirmAccion] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const idSedeAdmin = perfil?.idSede;

  const medicosSede = medicos.filter((m) => m.idSede === idSedeAdmin);
  const pendientesSede = pendientes;

  const handleAbrirCompletar = (usuario) => {
    setUsuarioCompletar(usuario);
    setFormCompletar({ numeroColegiatura: "", idEspecialidad: "" });
    setShowCompletar(true);
  };

  const handleCerrarCompletar = () => {
    setShowCompletar(false);
    setUsuarioCompletar(null);
    setFormCompletar({ numeroColegiatura: "", idEspecialidad: "" });
  };

  const handleSubmitCompletar = async (e) => {
    e.preventDefault();
    if (!formCompletar.numeroColegiatura.trim() || !formCompletar.idEspecialidad) return;
    const ok = await completarDatos(usuarioCompletar.idUsuario, {
      numeroColegiatura: formCompletar.numeroColegiatura,
      idEspecialidad: Number(formCompletar.idEspecialidad),
      idSede: idSedeAdmin,
    });
    if (ok) handleCerrarCompletar();
  };

  const handleAbrirEditar = (medico) => {
    setMedicoEditar(medico);
    setFormEditar({ idEspecialidad: medico.idEspecialidad || "" });
    setShowEditar(true);
  };

  const handleCerrarEditar = () => {
    setShowEditar(false);
    setMedicoEditar(null);
    setFormEditar({ idEspecialidad: "" });
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    const ok = await actualizarEspecialidadYSede(
      medicoEditar.idMedico,
      formEditar.idEspecialidad ? Number(formEditar.idEspecialidad) : null,
      idSedeAdmin
    );
    if (ok) handleCerrarEditar();
  };

  const handlePedirConfirmacion = (tipo, medico) => setConfirmAccion({ tipo, medico });
  const handleCancelarConfirmacion = () => setConfirmAccion(null);

  const handleConfirmarAccion = async () => {
    if (!confirmAccion) return;
    const { tipo, medico } = confirmAccion;
    if (tipo === "activar") await activar(medico.idMedico);
    if (tipo === "inactivar") await inactivar(medico.idMedico);
    if (tipo === "disponible") await cambiarDisponibilidad(medico.idMedico, true);
    if (tipo === "no-disponible") await cambiarDisponibilidad(medico.idMedico, false);
    setConfirmAccion(null);
  };

  const confirmTextos = {
    activar: { titulo: "Activar médico", mensaje: "¿Deseas activar a este médico?", color: "#16a34a", bg: "#dcfce7", accion: "Activar" },
    inactivar: { titulo: "Inactivar médico", mensaje: "¿Deseas inactivar a este médico? No podrá ser asignado a nuevas citas.", color: "#dc2626", bg: "#fee2e2", accion: "Inactivar" },
    disponible: { titulo: "Marcar disponible", mensaje: "¿Deseas marcar a este médico como disponible?", color: "#16a34a", bg: "#dcfce7", accion: "Marcar disponible" },
    "no-disponible": { titulo: "Marcar no disponible", mensaje: "¿Deseas marcar a este médico como no disponible?", color: "#d97706", bg: "#fef3c7", accion: "Marcar no disponible" },
  };

  const medicosFiltrados = medicosSede.filter((m) => {
    const nombreCompleto = `${m.nombres} ${m.apellidoPaterno} ${m.apellidoMaterno}`.toLowerCase();
    return (
      nombreCompleto.includes(busqueda.trim().toLowerCase()) ||
      m.dni.includes(busqueda.trim()) ||
      (m.nombreEspecialidad || "").toLowerCase().includes(busqueda.trim().toLowerCase())
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
          .page-icon { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #16a34a, #15803d); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(22,163,74,0.35); flex-shrink: 0; }
          .search-bar { position: relative; max-width: 380px; margin-bottom: 1.6rem; }
          .search-bar svg { position: absolute; top: 50%; left: 14px; transform: translateY(-50%); width: 18px; height: 18px; }
          .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.6rem; border-radius: 12px; border: 1.5px solid #e2e8f0; font-size: 0.92rem; background: white; box-sizing: border-box; }
          .search-input:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.15); }

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
          table { width: 100%; border-collapse: collapse; min-width: 860px; }
          thead th { text-align: center; font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; padding: 1rem 1rem; border-bottom: 2px solid #f1f5f9; background: #fbfcfe; white-space: nowrap; }
          thead th:first-child { text-align: left; padding-left: 1.6rem; }
          thead th:last-child { padding-right: 1.6rem; }
          tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease; }
          tbody tr:hover { background: #fbfcfe; }
          tbody tr:last-child { border-bottom: none; }
          tbody td { padding: 0.9rem 1rem; font-size: 0.86rem; color: #334155; vertical-align: middle; text-align: center; }
          tbody td:first-child { text-align: left; padding-left: 1.6rem; }
          tbody td:last-child { padding-right: 1.6rem; }

          .medico-nombre-cell { display: flex; align-items: center; gap: 0.8rem; text-align: left; }
          .avatar-mini { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
          .avatar-mini-placeholder { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #16a34a, #15803d); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }
          .medico-nombre-info { display: flex; flex-direction: column; min-width: 0; }
          .medico-nombre-txt { font-weight: 700; color: #0f172a; line-height: 1.25; display: block; }
          .medico-nombre-linea2 { display: block; }
          .medico-dni-txt { font-size: 0.74rem; color: #94a3b8; margin-top: 0.2rem; }

          .especialidad-badge { font-size: 0.71rem; font-weight: 700; padding: 0.32rem 0.8rem; border-radius: 999px; background: #eff6ff; color: #2563eb; display: inline-block; white-space: nowrap; }

          .disp-badge { font-size: 0.71rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.35rem; text-transform: uppercase; letter-spacing: 0.02em; white-space: nowrap; cursor: pointer; border: none; }
          .disp-badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; }
          .disp-si { background: #dcfce7; color: #16a34a; }
          .disp-si::before { background: #16a34a; }
          .disp-no { background: #fef3c7; color: #d97706; }
          .disp-no::before { background: #d97706; }

          .estado-badge { font-size: 0.71rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.35rem; text-transform: uppercase; letter-spacing: 0.02em; white-space: nowrap; }
          .estado-badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; }
          .estado-activo { background: #dcfce7; color: #16a34a; }
          .estado-activo::before { background: #16a34a; }
          .estado-inactivo { background: #fee2e2; color: #dc2626; }
          .estado-inactivo::before { background: #dc2626; }

          .acciones-cell { display: flex; gap: 0.4rem; align-items: center; justify-content: center; }
          .action-btn { border: none; width: 34px; height: 34px; min-width: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; padding: 0; }
          .action-btn svg { display: block; width: 16px; height: 16px; }
          .action-btn.edit { background: #eff6ff; }
          .action-btn.edit:hover { background: #dbeafe; transform: scale(1.08); }
          .action-btn.activate { background: #dcfce7; }
          .action-btn.activate:hover { background: #bbf7d0; transform: scale(1.08); }
          .action-btn.inactivate { background: #fef2f2; }
          .action-btn.inactivate:hover { background: #fee2e2; transform: scale(1.08); }

          .empty-state { text-align: center; padding: 4rem 2rem; color: #64748b; background: white; border-radius: 18px; box-shadow: 0 2px 12px rgba(15,23,42,0.06); }

          .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); padding: 1rem; }
          .modal-box { background: white; border-radius: 20px; padding: 2rem; width: 100%; max-width: 460px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
          .modal-box.small { max-width: 420px; }
          .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.4rem; }
          .modal-title { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
          .close-btn { background: #f1f5f9; border: none; cursor: pointer; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 0; }
          .close-btn svg { width: 18px; height: 18px; display: block; }
          .close-btn:hover { background: #e2e8f0; }
          .modal-label { font-size: 0.85rem; font-weight: 700; color: #334155; display: block; margin-bottom: 0.5rem; }
          .modal-input { width: 100%; padding: 0.7rem 0.9rem; border-radius: 10px; border: 1.5px solid #e2e8f0; font-size: 0.95rem; margin-bottom: 1.2rem; box-sizing: border-box; }
          .modal-input:focus { outline: none; border-color: #16a34a; }
          .modal-actions { display: flex; justify-content: flex-end; gap: 0.7rem; margin-top: 0.4rem; }
          .btn-cancel { background: #f1f5f9; color: #334155; border: none; padding: 0.7rem 1.3rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
          .btn-cancel:hover { background: #e2e8f0; }
          .btn-save { background: linear-gradient(135deg, #16a34a, #15803d); color: white; border: none; padding: 0.7rem 1.3rem; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(22,163,74,0.3); }
          .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
          .btn-danger { background: #dc2626; color: white; border: none; padding: 0.7rem 1.3rem; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }
          .btn-danger:hover { background: #b91c1c; }
          .btn-success { background: #16a34a; color: white; border: none; padding: 0.7rem 1.3rem; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(22,163,74,0.3); }
          .btn-success:hover { background: #15803d; }
          .confirm-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.1rem; }
          .confirm-mensaje { font-size: 0.92rem; color: #475569; line-height: 1.5; margin-bottom: 0.4rem; }
        `}
      </style>

      <div className="page-header">
        <div className="header-left">
          <div className="page-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
            </svg>
          </div>
          <div>
            <div className="page-title">Médicos</div>
            <div className="page-subtitle">{medicosFiltrados.length} médicos en tu sede</div>
          </div>
        </div>
      </div>

      {pendientesSede.length > 0 && (
        <div className="pendientes-box">
          <div className="pendientes-titulo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {pendientesSede.length} médico(s) pendientes de completar datos profesionales
          </div>

          {pendientesSede.map((u) => (
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
          placeholder="Buscar por nombre, DNI o especialidad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {medicosFiltrados.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: "1.1rem" }}>No se encontraron médicos en tu sede</p>
        </div>
      ) : (
        <div className="tabla-wrap">
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>Médico</th>
                  <th>Colegiatura</th>
                  <th>Especialidad</th>
                  <th>Disponibilidad</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medicosFiltrados.map((m) => (
                  <tr key={m.idMedico}>
                    <td>
                      <div className="medico-nombre-cell">
                        {m.fotoPerfil ? (
                          <img src={m.fotoPerfil} alt={m.nombres} className="avatar-mini" />
                        ) : (
                          <div className="avatar-mini-placeholder">
                            {(m.nombres?.charAt(0) || "") + (m.apellidoPaterno?.charAt(0) || "")}
                          </div>
                        )}
                        <div className="medico-nombre-info">
                          <span className="medico-nombre-txt">
                            {m.nombres}
                            <span className="medico-nombre-linea2">{m.apellidoPaterno} {m.apellidoMaterno}</span>
                          </span>
                          <span className="medico-dni-txt">DNI: {m.dni}</span>
                        </div>
                      </div>
                    </td>
                    <td>{m.numeroColegiatura}</td>
                    <td>
                      <span className="especialidad-badge">{m.nombreEspecialidad || "Sin asignar"}</span>
                    </td>
                    <td>
                      <button
                        className={`disp-badge ${m.disponible ? "disp-si" : "disp-no"}`}
                        onClick={() => handlePedirConfirmacion(m.disponible ? "no-disponible" : "disponible", m)}
                      >
                        {m.disponible ? "Disponible" : "No disponible"}
                      </button>
                    </td>
                    <td>
                      <span className={`estado-badge ${m.estado === "ACTIVO" ? "estado-activo" : "estado-inactivo"}`}>
                        {m.estado === "ACTIVO" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <div className="acciones-cell">
                        <button className="action-btn edit" onClick={() => handleAbrirEditar(m)} title="Editar especialidad">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        {m.estado === "ACTIVO" ? (
                          <button className="action-btn inactivate" onClick={() => handlePedirConfirmacion("inactivar", m)} title="Inactivar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                              <line x1="12" y1="2" x2="12" y2="12" />
                            </svg>
                          </button>
                        ) : (
                          <button className="action-btn activate" onClick={() => handlePedirConfirmacion("activar", m)} title="Activar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </button>
                        )}
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
              <div className="modal-title">Completar datos profesionales</div>
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

            <form onSubmit={handleSubmitCompletar}>
              <label className="modal-label">Número de colegiatura</label>
              <input
                type="text"
                className="modal-input"
                value={formCompletar.numeroColegiatura}
                onChange={(e) => setFormCompletar((prev) => ({ ...prev, numeroColegiatura: e.target.value }))}
                placeholder="Ej: CMP123456"
                autoFocus
              />

              <label className="modal-label">Especialidad</label>
              <select
                className="modal-input"
                value={formCompletar.idEspecialidad}
                onChange={(e) => setFormCompletar((prev) => ({ ...prev, idEspecialidad: e.target.value }))}
              >
                <option value="">Selecciona una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.idEspecialidad} value={esp.idEspecialidad}>{esp.nombre}</option>
                ))}
              </select>

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

      {showEditar && medicoEditar && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Editar especialidad</div>
              <button className="close-btn" onClick={handleCerrarEditar}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="confirm-mensaje" style={{ marginBottom: "1.2rem" }}>
              {medicoEditar.nombres} {medicoEditar.apellidoPaterno} {medicoEditar.apellidoMaterno}
            </p>

            <form onSubmit={handleSubmitEditar}>
              <label className="modal-label">Especialidad</label>
              <select
                className="modal-input"
                value={formEditar.idEspecialidad}
                onChange={(e) => setFormEditar((prev) => ({ ...prev, idEspecialidad: e.target.value }))}
              >
                <option value="">Sin especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.idEspecialidad} value={esp.idEspecialidad}>{esp.nombre}</option>
                ))}
              </select>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCerrarEditar}>
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

      {confirmAccion && (
        <div className="modal-overlay">
          <div className="modal-box small">
            <div className="confirm-icon-wrap" style={{ background: confirmTextos[confirmAccion.tipo].bg }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={confirmTextos[confirmAccion.tipo].color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <div className="modal-title" style={{ marginBottom: "0.6rem" }}>
              {confirmTextos[confirmAccion.tipo].titulo}
            </div>

            <p className="confirm-mensaje">{confirmTextos[confirmAccion.tipo].mensaje}</p>

            <p className="confirm-mensaje" style={{ fontWeight: 700, color: "#0f172a" }}>
              {confirmAccion.medico.nombres} {confirmAccion.medico.apellidoPaterno} {confirmAccion.medico.apellidoMaterno}
            </p>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={handleCancelarConfirmacion}>
                Cancelar
              </button>
              <button
                type="button"
                className={confirmAccion.tipo === "inactivar" ? "btn-danger" : "btn-success"}
                onClick={handleConfirmarAccion}
              >
                {confirmTextos[confirmAccion.tipo].accion}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}