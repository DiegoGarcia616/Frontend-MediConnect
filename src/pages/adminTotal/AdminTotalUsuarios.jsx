import { useState } from "react";
import useUsuarios from "../../hooks/useUsuarios";
import useSedes from "../../hooks/useSedes";
import { ROLES_LISTA, getRolStyle, rolesRequierenSede } from "../../utils/roles";

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

const initialFormCrear = { correo: "", contrasena: "", idRol: "", idSede: "", dni: "" };

const initialFormEditar = {
  correo: "",
  idSede: "",
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  fechaNacimiento: "",
  sexo: "",
  estadoCivil: "",
  direccion: "",
  ubigeo: "",
  departamento: "",
  provincia: "",
  distrito: "",
};

export default function AdminTotalUsuarios() {
  const { usuarios, loading, saving, guardarUsuario, bloquear, inactivar, eliminarUsuarioCompleto } = useUsuarios();
  const { sedes } = useSedes();

  const [showModal, setShowModal] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [usuarioDetalle, setUsuarioDetalle] = useState(null);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [formCrear, setFormCrear] = useState(initialFormCrear);
  const [formEditar, setFormEditar] = useState(initialFormEditar);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("");

  const [confirmAccion, setConfirmAccion] = useState(null);

  const handleChangeCrear = (e) => {
    const { name, value } = e.target;
    setFormCrear((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeEditar = (e) => {
    const { name, value } = e.target;
    setFormEditar((prev) => ({ ...prev, [name]: value }));
  };

  const handleAbrirNuevo = () => {
    setUsuarioEditar(null);
    setFormCrear(initialFormCrear);
    setShowModal(true);
  };

  const handleAbrirEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setFormEditar({
      correo: usuario.correo || "",
      idSede: usuario.idSede || "",
      nombres: usuario.nombres || "",
      apellidoPaterno: usuario.apellidoPaterno || "",
      apellidoMaterno: usuario.apellidoMaterno || "",
      fechaNacimiento: usuario.fechaNacimiento || "",
      sexo: usuario.sexo || "",
      estadoCivil: usuario.estadoCivil || "",
      direccion: usuario.direccion || "",
      ubigeo: usuario.ubigeo || "",
      departamento: usuario.departamento || "",
      provincia: usuario.provincia || "",
      distrito: usuario.distrito || "",
    });
    setShowModal(true);
  };

  const handleAbrirDetalle = (usuario) => {
    setUsuarioDetalle(usuario);
    setShowDetalle(true);
  };

  const handleCerrar = () => {
    setShowModal(false);
    setUsuarioEditar(null);
    setFormCrear(initialFormCrear);
    setFormEditar(initialFormEditar);
  };

  const handleCerrarDetalle = () => {
    setShowDetalle(false);
    setUsuarioDetalle(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuarioEditar) {
      const payload = {
        correo: formEditar.correo,
        idSede: formEditar.idSede ? Number(formEditar.idSede) : null,
        nombres: formEditar.nombres,
        apellidoPaterno: formEditar.apellidoPaterno,
        apellidoMaterno: formEditar.apellidoMaterno,
        fechaNacimiento: formEditar.fechaNacimiento,
        sexo: formEditar.sexo,
        estadoCivil: formEditar.estadoCivil,
        direccion: formEditar.direccion,
        ubigeo: formEditar.ubigeo,
        departamento: formEditar.departamento,
        provincia: formEditar.provincia,
        distrito: formEditar.distrito,
      };
      const ok = await guardarUsuario(usuarioEditar.idUsuario, payload);
      if (ok) handleCerrar();
    } else {
      if (!formCrear.correo.trim() || !formCrear.contrasena.trim() || !formCrear.idRol || !formCrear.dni.trim()) return;

      const payload = {
        correo: formCrear.correo,
        contrasena: formCrear.contrasena,
        idRol: Number(formCrear.idRol),
        idSede: formCrear.idSede ? Number(formCrear.idSede) : null,
        dni: formCrear.dni,
      };
      const ok = await guardarUsuario(null, payload);
      if (ok) handleCerrar();
    }
  };

  const handlePedirConfirmacion = (tipo, usuario) => {
    setConfirmAccion({ tipo, usuario });
  };

  const handleCancelarConfirmacion = () => {
    setConfirmAccion(null);
  };

  const handleConfirmarAccion = async () => {
    if (!confirmAccion) return;
    const { tipo, usuario } = confirmAccion;

    if (tipo === "bloquear") await bloquear(usuario.idUsuario);
    if (tipo === "inactivar") await inactivar(usuario.idUsuario);
    if (tipo === "eliminar") await eliminarUsuarioCompleto(usuario.idUsuario);

    setConfirmAccion(null);
  };

  const requiereSede = rolesRequierenSede.includes(Number(formCrear.idRol));

  const usuariosFiltrados = usuarios.filter((u) => {
    const nombreCompleto = `${u.nombres} ${u.apellidoPaterno} ${u.apellidoMaterno}`.toLowerCase();
    const coincideBusqueda =
      nombreCompleto.includes(busqueda.trim().toLowerCase()) ||
      u.dni.includes(busqueda.trim()) ||
      u.correo.toLowerCase().includes(busqueda.trim().toLowerCase());
    const coincideRol = filtroRol ? u.idRol === Number(filtroRol) : true;
    return coincideBusqueda && coincideRol;
  });

  const confirmTextos = {
    bloquear: {
      titulo: "Bloquear usuario",
      mensaje: "¿Seguro que deseas bloquear a este usuario? No podrá iniciar sesión hasta ser desbloqueado.",
      color: "#d97706",
      bg: "#fef3c7",
      accion: "Bloquear",
    },
    inactivar: {
      titulo: "Inactivar usuario",
      mensaje: "¿Seguro que deseas inactivar a este usuario? Su acceso quedará suspendido.",
      color: "#dc2626",
      bg: "#fee2e2",
      accion: "Inactivar",
    },
    eliminar: {
      titulo: "Eliminar usuario",
      mensaje: "¿Seguro que deseas eliminar este usuario? Esta acción no se puede revertir.",
      color: "#dc2626",
      bg: "#fee2e2",
      accion: "Eliminar",
    },
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
          .page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .header-left { display: flex; align-items: center; gap: 1rem; }

          .page-title {
            font-size: 1.9rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
          }

          .page-subtitle { font-size: 0.9rem; color: #64748b; margin-top: 0.15rem; }

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

          .btn-add:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(249,115,22,0.4); }

          .filters-row {
            display: flex;
            gap: 0.8rem;
            margin-bottom: 1.6rem;
            flex-wrap: wrap;
          }

          .search-bar {
            position: relative;
            max-width: 380px;
            flex: 1;
            min-width: 220px;
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

          .search-input:focus { outline: none; border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.15); }

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

          .search-clear svg { position: static; transform: none; width: 13px; height: 13px; }
          .search-clear:hover { background: #e2e8f0; }

          .filtro-rol-select {
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1.5px solid #e2e8f0;
            font-size: 0.88rem;
            background: white;
            font-weight: 600;
            color: #334155;
            cursor: pointer;
            min-width: 200px;
          }

          .filtro-rol-select:focus { outline: none; border-color: #f97316; }

          .tabla-wrap {
            background: white;
            border-radius: 20px;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            border: 1px solid #eef2f6;
            overflow: hidden;
          }

          .tabla-scroll { overflow-x: auto; }

          table { width: 100%; border-collapse: collapse; min-width: 900px; }

          thead th {
            text-align: center;
            font-size: 0.7rem;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 1rem 1rem;
            border-bottom: 2px solid #f1f5f9;
            background: #fbfcfe;
            white-space: nowrap;
          }

          thead th:first-child { text-align: left; padding-left: 1.6rem; }
          thead th:last-child { padding-right: 1.6rem; }

          tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease; }
          tbody tr:hover { background: #fbfcfe; }
          tbody tr:last-child { border-bottom: none; }

          tbody td {
            padding: 0.9rem 1rem;
            font-size: 0.86rem;
            color: #334155;
            vertical-align: middle;
            text-align: center;
          }

          tbody td:first-child { text-align: left; padding-left: 1.6rem; }
          tbody td:last-child { padding-right: 1.6rem; }

          .usuario-nombre-cell {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            text-align: left;
          }

          .avatar-mini {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
          }

          .avatar-mini-placeholder {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.8rem;
            flex-shrink: 0;
          }

          .usuario-nombre-info { display: flex; flex-direction: column; min-width: 0; }

          .usuario-nombre-txt {
            font-weight: 700;
            color: #0f172a;
            line-height: 1.25;
            display: block;
          }

          .usuario-nombre-linea2 { display: block; }

          .usuario-dni-txt { font-size: 0.74rem; color: #94a3b8; margin-top: 0.2rem; }

          .col-correo {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .rol-badge {
            font-size: 0.71rem;
            font-weight: 700;
            padding: 0.32rem 0.8rem;
            border-radius: 999px;
            display: inline-block;
            white-space: nowrap;
          }

          .sede-txt { color: #64748b; font-size: 0.84rem; }

          .estado-badge {
            font-size: 0.71rem;
            font-weight: 700;
            padding: 0.3rem 0.8rem;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            white-space: nowrap;
          }

          .estado-badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; }
          .estado-activo { background: #dcfce7; color: #16a34a; }
          .estado-activo::before { background: #16a34a; }
          .estado-inactivo { background: #fee2e2; color: #dc2626; }
          .estado-inactivo::before { background: #dc2626; }
          .estado-bloqueado { background: #fef3c7; color: #d97706; }
          .estado-bloqueado::before { background: #d97706; }

          .acciones-cell { display: flex; gap: 0.4rem; align-items: center; justify-content: center; }

          .action-btn {
            border: none;
            width: 34px;
            height: 34px;
            min-width: 34px;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 0;
          }

          .action-btn svg { display: block; width: 16px; height: 16px; }

          .action-btn.view { background: #f1f5f9; }
          .action-btn.view:hover { background: #e2e8f0; transform: scale(1.08); }
          .action-btn.edit { background: #eff6ff; }
          .action-btn.edit:hover { background: #dbeafe; transform: scale(1.08); }
          .action-btn.block { background: #fef3c7; }
          .action-btn.block:hover { background: #fde68a; transform: scale(1.08); }
          .action-btn.inactivate { background: #fef2f2; }
          .action-btn.inactivate:hover { background: #fee2e2; transform: scale(1.08); }
          .action-btn.delete { background: #fef2f2; }
          .action-btn.delete:hover { background: #fecaca; transform: scale(1.08); }

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
            max-width: 560px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          }

          .modal-box.small { max-width: 420px; }

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

          .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1rem; }
          .form-grid .full { grid-column: 1 / -1; }

          .modal-label {
            font-size: 0.82rem;
            font-weight: 700;
            color: #334155;
            display: block;
            margin-bottom: 0.4rem;
          }

          .modal-input {
            width: 100%;
            padding: 0.65rem 0.85rem;
            border-radius: 10px;
            border: 1.5px solid #e2e8f0;
            font-size: 0.9rem;
            margin-bottom: 1.1rem;
            transition: border-color 0.2s ease;
            box-sizing: border-box;
          }

          .modal-input:focus { outline: none; border-color: #f97316; }
          .modal-input:disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }

          .section-divider {
            font-size: 0.72rem;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin: 0.3rem 0 0.9rem;
            padding-top: 0.6rem;
            border-top: 1px dashed #e2e8f0;
          }

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

          .btn-danger {
            background: #dc2626;
            color: white;
            border: none;
            padding: 0.7rem 1.3rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(220,38,38,0.3);
          }

          .btn-danger:hover { background: #b91c1c; }

          .btn-warning {
            background: #d97706;
            color: white;
            border: none;
            padding: 0.7rem 1.3rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(217,119,6,0.3);
          }

          .btn-warning:hover { background: #b45309; }

          .confirm-icon-wrap {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.1rem;
          }

          .confirm-mensaje { font-size: 0.92rem; color: #475569; line-height: 1.5; margin-bottom: 0.4rem; }

          .detalle-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.1rem;
          }

          .detalle-item { display: flex; flex-direction: column; gap: 0.3rem; }

          .detalle-label {
            font-size: 0.72rem;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }

          .detalle-value { font-size: 0.92rem; font-weight: 600; color: #0f172a; }

          .detalle-header-user {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.4rem;
            padding-bottom: 1.2rem;
            border-bottom: 1px solid #f1f5f9;
          }

          .detalle-avatar-img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }

          .detalle-avatar-placeholder {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.3rem;
          }

          .detalle-header-nombre { font-size: 1.1rem; font-weight: 800; color: #0f172a; }
          .detalle-header-correo { font-size: 0.84rem; color: #64748b; margin-top: 0.15rem; }

          @media (max-width: 768px) {
            .filters-row { flex-direction: column; }
            .search-bar { max-width: 100%; }
            .form-grid { grid-template-columns: 1fr; }
            .detalle-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>

      <div className="page-header">
        <div className="header-left">
          <div className="page-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="page-title">Usuarios</div>
            <div className="page-subtitle">{usuariosFiltrados.length} de {usuarios.length} usuarios</div>
          </div>
        </div>

        <button className="btn-add" onClick={handleAbrirNuevo}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Agregar Usuario
        </button>
      </div>

      <div className="filters-row">
        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre, DNI o correo..."
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

        <select className="filtro-rol-select" value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
          <option value="">Todos los roles</option>
          {ROLES_LISTA.map((rol) => (
            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
          ))}
        </select>
      </div>

      {usuariosFiltrados.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
            {busqueda || filtroRol ? "No se encontraron usuarios con esos filtros" : "No hay usuarios registrados"}
          </p>
        </div>
      ) : (
        <div className="tabla-wrap">
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Sede</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u) => {
                  const rolStyle = getRolStyle(u.idRol);
                  const sedeNombre = sedes.find((s) => s.idSede === u.idSede)?.nombre || "Sin sede";
                  const bloqueado = u.fechaBloqueo !== null;
                  const estadoClase = bloqueado ? "estado-bloqueado" : u.estado === "ACTIVO" ? "estado-activo" : "estado-inactivo";
                  const estadoTexto = bloqueado ? "Bloqueado" : u.estado === "ACTIVO" ? "Activo" : "Inactivo";

                  return (
                    <tr key={u.idUsuario}>
                      <td>
                        <div className="usuario-nombre-cell">
                          {u.fotoPerfil ? (
                            <img src={u.fotoPerfil} alt={u.nombres} className="avatar-mini" />
                          ) : (
                            <div className="avatar-mini-placeholder">
                              {(u.nombres?.charAt(0) || "") + (u.apellidoPaterno?.charAt(0) || "")}
                            </div>
                          )}
                          <div className="usuario-nombre-info">
                            <span className="usuario-nombre-txt">
                              {u.nombres}
                              <span className="usuario-nombre-linea2">{u.apellidoPaterno} {u.apellidoMaterno}</span>
                            </span>
                            <span className="usuario-dni-txt">DNI: {u.dni}</span>
                          </div>
                        </div>
                      </td>
                      <td className="col-correo" title={u.correo}>{u.correo}</td>
                      <td>
                        <span className="rol-badge" style={{ background: rolStyle.bg, color: rolStyle.color }}>
                          {u.nombreRol}
                        </span>
                      </td>
                      <td className="sede-txt">{sedeNombre}</td>
                      <td>
                        <span className={`estado-badge ${estadoClase}`}>{estadoTexto}</span>
                      </td>
                      <td>
                        <div className="acciones-cell">
                          <button className="action-btn view" onClick={() => handleAbrirDetalle(u)} title="Ver más">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>
                          <button className="action-btn edit" onClick={() => handleAbrirEditar(u)} title="Editar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button className="action-btn block" onClick={() => handlePedirConfirmacion("bloquear", u)} title="Bloquear">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </button>
                          <button className="action-btn inactivate" onClick={() => handlePedirConfirmacion("inactivar", u)} title="Inactivar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                              <line x1="12" y1="2" x2="12" y2="12" />
                            </svg>
                          </button>
                          <button className="action-btn delete" onClick={() => handlePedirConfirmacion("eliminar", u)} title="Eliminar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDetalle && usuarioDetalle && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Detalle del usuario</div>
              <button className="close-btn" onClick={handleCerrarDetalle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="detalle-header-user">
              {usuarioDetalle.fotoPerfil ? (
                <img src={usuarioDetalle.fotoPerfil} alt={usuarioDetalle.nombres} className="detalle-avatar-img" />
              ) : (
                <div className="detalle-avatar-placeholder">
                  {(usuarioDetalle.nombres?.charAt(0) || "") + (usuarioDetalle.apellidoPaterno?.charAt(0) || "")}
                </div>
              )}
              <div>
                <div className="detalle-header-nombre">
                  {usuarioDetalle.nombres} {usuarioDetalle.apellidoPaterno} {usuarioDetalle.apellidoMaterno}
                </div>
                <div className="detalle-header-correo">{usuarioDetalle.correo}</div>
              </div>
            </div>

            <div className="detalle-grid">
              <div className="detalle-item">
                <span className="detalle-label">DNI</span>
                <span className="detalle-value">{usuarioDetalle.dni}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Rol</span>
                <span className="detalle-value">{usuarioDetalle.nombreRol}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Fecha de nacimiento</span>
                <span className="detalle-value">{usuarioDetalle.fechaNacimiento || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Sexo</span>
                <span className="detalle-value">{usuarioDetalle.sexo || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Estado civil</span>
                <span className="detalle-value">{usuarioDetalle.estadoCivil || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Dirección</span>
                <span className="detalle-value">{usuarioDetalle.direccion || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Departamento</span>
                <span className="detalle-value">{usuarioDetalle.departamento || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Provincia</span>
                <span className="detalle-value">{usuarioDetalle.provincia || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Distrito</span>
                <span className="detalle-value">{usuarioDetalle.distrito || "N/A"}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Intentos fallidos</span>
                <span className="detalle-value">{usuarioDetalle.intentosFallidos}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Fecha de bloqueo</span>
                <span className="detalle-value">{formatearFecha(usuarioDetalle.fechaBloqueo)}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Fecha de creación</span>
                <span className="detalle-value">{formatearFecha(usuarioDetalle.fechaCreacion)}</span>
              </div>
              <div className="detalle-item">
                <span className="detalle-label">Última modificación</span>
                <span className="detalle-value">{formatearFecha(usuarioDetalle.fechaModificacion)}</span>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">{usuarioEditar ? "Editar Usuario" : "Nuevo Usuario"}</div>
              <button className="close-btn" onClick={handleCerrar}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {usuarioEditar ? (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="full">
                    <label className="modal-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="modal-input"
                      name="correo"
                      value={formEditar.correo}
                      onChange={handleChangeEditar}
                      placeholder="correo@ejemplo.com"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="modal-label">Nombres</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="nombres"
                      value={formEditar.nombres}
                      onChange={handleChangeEditar}
                      placeholder="Nombres"
                    />
                  </div>

                  <div>
                    <label className="modal-label">Apellido paterno</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="apellidoPaterno"
                      value={formEditar.apellidoPaterno}
                      onChange={handleChangeEditar}
                      placeholder="Apellido paterno"
                    />
                  </div>

                  <div>
                    <label className="modal-label">Apellido materno</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="apellidoMaterno"
                      value={formEditar.apellidoMaterno}
                      onChange={handleChangeEditar}
                      placeholder="Apellido materno"
                    />
                  </div>

                  <div>
                    <label className="modal-label">Fecha de nacimiento</label>
                    <input
                      type="date"
                      className="modal-input"
                      name="fechaNacimiento"
                      value={formEditar.fechaNacimiento}
                      onChange={handleChangeEditar}
                    />
                  </div>

                  <div>
                    <label className="modal-label">Sexo</label>
                    <select className="modal-input" name="sexo" value={formEditar.sexo} onChange={handleChangeEditar}>
                      <option value="">Selecciona</option>
                      <option value="MASCULINO">Masculino</option>
                      <option value="FEMENINO">Femenino</option>
                    </select>
                  </div>

                  <div>
                    <label className="modal-label">Estado civil</label>
                    <select className="modal-input" name="estadoCivil" value={formEditar.estadoCivil} onChange={handleChangeEditar}>
                      <option value="">Selecciona</option>
                      <option value="SOLTERO">Soltero(a)</option>
                      <option value="CASADO">Casado(a)</option>
                      <option value="DIVORCIADO">Divorciado(a)</option>
                      <option value="VIUDO">Viudo(a)</option>
                      <option value="CONVIVIENTE">Conviviente</option>
                    </select>
                  </div>

                  <div>
                    <label className="modal-label">Sede</label>
                    <select className="modal-input" name="idSede" value={formEditar.idSede} onChange={handleChangeEditar}>
                      <option value="">Sin sede</option>
                      {sedes.map((sede) => (
                        <option key={sede.idSede} value={sede.idSede}>{sede.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="full section-divider">Ubicación y dirección</div>

                  <div className="full">
                    <label className="modal-label">Dirección</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="direccion"
                      value={formEditar.direccion}
                      onChange={handleChangeEditar}
                      placeholder="Ej: Calle 71 190"
                    />
                  </div>

                  <div>
                    <label className="modal-label">Departamento</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="departamento"
                      value={formEditar.departamento}
                      onChange={handleChangeEditar}
                      placeholder="Ej: Lima"
                    />
                  </div>

                  <div>
                    <label className="modal-label">Provincia</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="provincia"
                      value={formEditar.provincia}
                      onChange={handleChangeEditar}
                      placeholder="Ej: Lima"
                    />
                  </div>

                  <div>
                    <label className="modal-label">Distrito</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="distrito"
                      value={formEditar.distrito}
                      onChange={handleChangeEditar}
                      placeholder="Ej: Comas"
                    />
                  </div>

                  <div>
                    <label className="modal-label">Ubigeo</label>
                    <input
                      type="text"
                      className="modal-input"
                      name="ubigeo"
                      value={formEditar.ubigeo}
                      onChange={handleChangeEditar}
                      placeholder="Ej: 150110"
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={handleCerrar}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save" disabled={saving}>
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="modal-label">DNI</label>
                <input
                  type="text"
                  className="modal-input"
                  name="dni"
                  value={formCrear.dni}
                  onChange={handleChangeCrear}
                  placeholder="Ej: 72317167"
                  autoFocus
                />

                <label className="modal-label">Correo electrónico</label>
                <input
                  type="email"
                  className="modal-input"
                  name="correo"
                  value={formCrear.correo}
                  onChange={handleChangeCrear}
                  placeholder="correo@ejemplo.com"
                />

                <label className="modal-label">Contraseña</label>
                <input
                  type="password"
                  className="modal-input"
                  name="contrasena"
                  value={formCrear.contrasena}
                  onChange={handleChangeCrear}
                  placeholder="Contraseña temporal"
                />

                <label className="modal-label">Rol</label>
                <select className="modal-input" name="idRol" value={formCrear.idRol} onChange={handleChangeCrear}>
                  <option value="">Selecciona un rol</option>
                  {ROLES_LISTA.map((rol) => (
                    <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                  ))}
                </select>

                {requiereSede && (
                  <>
                    <label className="modal-label">Sede</label>
                    <select className="modal-input" name="idSede" value={formCrear.idSede} onChange={handleChangeCrear}>
                      <option value="">Sin sede</option>
                      {sedes.map((sede) => (
                        <option key={sede.idSede} value={sede.idSede}>{sede.nombre}</option>
                      ))}
                    </select>
                  </>
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
            )}
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
              {confirmAccion.usuario.nombres} {confirmAccion.usuario.apellidoPaterno} {confirmAccion.usuario.apellidoMaterno}
            </p>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={handleCancelarConfirmacion}>
                Cancelar
              </button>
              <button
                type="button"
                className={confirmAccion.tipo === "bloquear" ? "btn-warning" : "btn-danger"}
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