import { useState, useEffect, useRef } from "react";
import usePerfil from "../../hooks/usePerfil";

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

const iniciales = (nombres, apellidoPaterno) => {
  const n = nombres ? nombres.charAt(0) : "";
  const a = apellidoPaterno ? apellidoPaterno.charAt(0) : "";
  return `${n}${a}`.toUpperCase() || "U";
};

export default function AdminTotalProfile() {
  const { perfil, loading, saving, uploadingFoto, guardarPerfil, subirFoto, eliminarFoto } = usePerfil();

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ direccion: "", estadoCivil: "", correo: "" });
  const inputFotoRef = useRef(null);

  useEffect(() => {
    if (perfil) {
      setForm({
        direccion: perfil.direccion || "",
        estadoCivil: perfil.estadoCivil || "",
        correo: perfil.correo || "",
      });
    }
  }, [perfil]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await guardarPerfil(form);
    if (ok) setEditando(false);
  };

  const handleCancelar = () => {
    setForm({
      direccion: perfil.direccion || "",
      estadoCivil: perfil.estadoCivil || "",
      correo: perfil.correo || "",
    });
    setEditando(false);
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await subirFoto(file);
    }
  };

  const handleEliminarFoto = async () => {
    if (window.confirm("¿Deseas eliminar tu foto de perfil?")) {
      await eliminarFoto();
    }
  };

  if (loading || !perfil) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const activo = perfil.estado === "ACTIVO";
  const nombreCompleto = `${perfil.nombres || ""} ${perfil.apellidoPaterno || ""} ${perfil.apellidoMaterno || ""}`.trim();

  return (
    <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>
      <style>
        {`
          .perfil-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.6rem;
          }

          .perfil-title {
            font-size: 1.9rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
          }

          .perfil-subtitle {
            font-size: 0.9rem;
            color: #64748b;
            margin-top: 0.15rem;
          }

          .perfil-icon {
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

          .perfil-layout {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 1.4rem;
          }

          .perfil-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            border: 1px solid #eef2f6;
            padding: 1.8rem;
          }

          .avatar-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .avatar-img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #fff7ed;
          }

          .avatar-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316, #ea580c);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.2rem;
            font-weight: 800;
            border: 4px solid #fff7ed;
          }

          .avatar-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
          }

          .btn-avatar {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            border: none;
            padding: 0.55rem 0.9rem;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-avatar svg { width: 14px; height: 14px; }

          .btn-avatar.subir { background: #eff6ff; color: #2563eb; }
          .btn-avatar.subir:hover { background: #dbeafe; }
          .btn-avatar.quitar { background: #fef2f2; color: #dc2626; }
          .btn-avatar.quitar:hover { background: #fee2e2; }
          .btn-avatar:disabled { opacity: 0.6; cursor: not-allowed; }

          .perfil-nombre {
            font-size: 1.15rem;
            font-weight: 800;
            color: #0f172a;
            margin-top: 1.1rem;
          }

          .perfil-rol {
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 600;
            margin-top: 0.2rem;
          }

          .estado-badge {
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.28rem 0.75rem;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            margin-top: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }

          .estado-badge::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }

          .estado-activo { background: #dcfce7; color: #16a34a; }
          .estado-activo::before { background: #16a34a; }
          .estado-inactivo { background: #fee2e2; color: #dc2626; }
          .estado-inactivo::before { background: #dc2626; }

          .dni-box {
            margin-top: 1.3rem;
            padding-top: 1.1rem;
            border-top: 1px solid #f1f5f9;
            width: 100%;
          }

          .dni-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.82rem;
            color: #64748b;
            margin-top: 0.55rem;
          }

          .dni-row svg { flex-shrink: 0; }

          .section-title {
            font-size: 1.05rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .btn-editar {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            background: #eff6ff;
            color: #2563eb;
            border: none;
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
          }

          .btn-editar svg { width: 14px; height: 14px; }
          .btn-editar:hover { background: #dbeafe; }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1.1rem;
          }

          .info-item {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
          }

          .info-label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }

          .info-value {
            font-size: 0.95rem;
            font-weight: 600;
            color: #0f172a;
          }

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

          .form-actions {
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

          .audit-box {
            margin-top: 1.6rem;
            padding: 0.9rem 1rem;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px dashed #e2e8f0;
          }

          .audit-row {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.75rem;
            color: #94a3b8;
            margin-top: 0.4rem;
          }

          .audit-row:first-child { margin-top: 0; }
          .audit-row svg { flex-shrink: 0; }

          @media (max-width: 900px) {
            .perfil-layout { grid-template-columns: 1fr; }
          }
        `}
      </style>

      <div className="perfil-header">
        <div className="perfil-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <div className="perfil-title">Mi Perfil</div>
          <div className="perfil-subtitle">Gestiona tu información personal y de contacto</div>
        </div>
      </div>

      <div className="perfil-layout">
        <div className="perfil-card">
          <div className="avatar-wrap">
            {perfil.fotoPerfil ? (
              <img src={perfil.fotoPerfil} alt="Foto de perfil" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">{iniciales(perfil.nombres, perfil.apellidoPaterno)}</div>
            )}

            <div className="avatar-actions">
              <input
                type="file"
                accept="image/*"
                ref={inputFotoRef}
                style={{ display: "none" }}
                onChange={handleFotoChange}
              />
              <button className="btn-avatar subir" onClick={() => inputFotoRef.current.click()} disabled={uploadingFoto}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {uploadingFoto ? "Subiendo..." : "Cambiar foto"}
              </button>

              {perfil.fotoPerfil && (
                <button className="btn-avatar quitar" onClick={handleEliminarFoto} disabled={uploadingFoto}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  </svg>
                  Quitar
                </button>
              )}
            </div>

            <div className="perfil-nombre">{nombreCompleto || "Usuario"}</div>
            <div className="perfil-rol">{perfil.nombreRol}</div>

            <span className={`estado-badge ${activo ? "estado-activo" : "estado-inactivo"}`}>
              {activo ? "Activo" : "Inactivo"}
            </span>

            <div className="dni-box">
              <div className="dni-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                DNI: {perfil.dni}
              </div>
              <div className="dni-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Nacimiento: {perfil.fechaNacimiento || "N/A"}
              </div>
              <div className="dni-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Sexo: {perfil.sexo || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="perfil-card">
          <div className="section-title">
            Información de contacto
            {!editando && (
              <button className="btn-editar" onClick={() => setEditando(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Editar
              </button>
            )}
          </div>

          {editando ? (
            <form onSubmit={handleSubmit}>
              <label className="modal-label">Correo electrónico</label>
              <input
                type="email"
                className="modal-input"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
              />

              <label className="modal-label">Dirección</label>
              <input
                type="text"
                className="modal-input"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Ej: Jr. Los Álamos 123, San Isidro"
              />

              <label className="modal-label">Estado civil</label>
              <select
                className="modal-input"
                name="estadoCivil"
                value={form.estadoCivil}
                onChange={handleChange}
              >
                <option value="">Selecciona una opción</option>
                <option value="SOLTERO">Soltero(a)</option>
                <option value="CASADO">Casado(a)</option>
                <option value="DIVORCIADO">Divorciado(a)</option>
                <option value="VIUDO">Viudo(a)</option>
                <option value="CONVIVIENTE">Conviviente</option>
              </select>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancelar}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          ) : (
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Correo electrónico</div>
                <div className="info-value">{perfil.correo || "No registrado"}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Dirección</div>
                <div className="info-value">{perfil.direccion || "No registrada"}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Estado civil</div>
                <div className="info-value">{perfil.estadoCivil || "No registrado"}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Departamento</div>
                <div className="info-value">{perfil.departamento || "No registrado"}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Provincia</div>
                <div className="info-value">{perfil.provincia || "No registrada"}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Distrito</div>
                <div className="info-value">{perfil.distrito || "No registrado"}</div>
              </div>
            </div>
          )}

          <div className="audit-box">
            <div className="audit-row">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Cuenta creada: {formatearFecha(perfil.fechaCreacion)}
            </div>
            <div className="audit-row">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Última modificación: {formatearFecha(perfil.fechaModificacion)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}