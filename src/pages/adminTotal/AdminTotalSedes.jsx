import { useState } from "react";
import useSedes from "../../hooks/useSedes";
import { FiMapPin, FiPlus, FiEdit2, FiPower, FiX, FiPhone } from "react-icons/fi";

export default function AdminTotalSedes() {

  const { sedes, loading, saving, guardarSede, cambiarEstado } = useSedes();

  const [showModal, setShowModal] = useState(false);

  const [sedeEditar, setSedeEditar] = useState(null);

  const initialForm = { nombreSede: "", ubicacion: "", telefono: "" };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAbrirNueva = () => {
    setSedeEditar(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const handleAbrirEditar = (sede) => {
    setSedeEditar(sede);
    setForm({
      nombreSede: sede.nombreSede,
      ubicacion: sede.ubicacion,
      telefono: sede.telefono || "",
    });
    setShowModal(true);
  };

  const handleCerrar = () => {
    setShowModal(false);
    setSedeEditar(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombreSede.trim() || !form.ubicacion.trim()) return;

    const ok = await guardarSede(
      sedeEditar ? sedeEditar.idSede : null,
      form
    );

    if (ok) handleCerrar();
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
            margin-bottom: 2rem;
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
            color: white;
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

          .sedes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.25rem;
          }

          .sede-card {
            background: white;
            border-radius: 18px;
            padding: 1.4rem;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            border: 1px solid #eef2f6;
            transition: all 0.25s ease;
            position: relative;
            overflow: hidden;
          }

          .sede-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: linear-gradient(180deg, #f97316, #ea580c);
          }

          .sede-card.inactiva::before {
            background: #cbd5e1;
          }

          .sede-card.inactiva {
            opacity: 0.65;
          }

          .sede-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 28px rgba(15,23,42,0.1);
          }

          .card-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.75rem;
          }

          .card-main {
            display: flex;
            align-items: center;
            gap: 0.9rem;
          }

          .sede-icon {
            width: 52px;
            height: 52px;
            background: linear-gradient(135deg, #fff7ed, #ffedd5);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ea580c;
            flex-shrink: 0;
          }

          .sede-card.inactiva .sede-icon {
            background: #f1f5f9;
            color: #94a3b8;
          }

          .sede-name {
            font-size: 1.05rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.2;
          }

          .sede-id {
            font-size: 0.78rem;
            color: #94a3b8;
            margin-top: 0.2rem;
            font-weight: 500;
          }

          .card-actions {
            display: flex;
            gap: 0.5rem;
            flex-shrink: 0;
          }

          .action-btn {
            border: 1px solid transparent;
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 0;
          }

          .action-btn.edit {
            background: #eff6ff;
          }

          .action-btn.edit:hover {
            background: #dbeafe;
            transform: scale(1.08);
          }

          .action-btn.power-on {
            background: #f0fdf4;
          }

          .action-btn.power-on:hover {
            background: #dcfce7;
            transform: scale(1.08);
          }

          .action-btn.power-off {
            background: #fef2f2;
          }

          .action-btn.power-off:hover {
            background: #fee2e2;
            transform: scale(1.08);
          }

          .card-bottom {
            margin-top: 1rem;
            padding-top: 0.9rem;
            border-top: 1px solid #f1f5f9;
          }

          .sede-info-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            color: #64748b;
            margin-top: 0.4rem;
          }

          .estado-badge {
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.25rem 0.7rem;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            margin-top: 0.6rem;
          }

          .estado-badge::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }

          .estado-activo {
            background: #dcfce7;
            color: #16a34a;
          }

          .estado-activo::before {
            background: #16a34a;
          }

          .estado-inactivo {
            background: #fee2e2;
            color: #dc2626;
          }

          .estado-inactivo::before {
            background: #dc2626;
          }

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
          }

          .modal-box {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            width: 90%;
            max-width: 440px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.4rem;
          }

          .modal-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #0f172a;
          }

          .close-btn {
            background: #f1f5f9;
            border: none;
            cursor: pointer;
            color: #64748b;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .close-btn:hover {
            background: #e2e8f0;
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
          }

          .modal-input:focus {
            outline: none;
            border-color: #f97316;
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

          .btn-cancel:hover {
            background: #e2e8f0;
          }

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

          .btn-save:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          @media (max-width: 768px) {
            .sedes-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="page-header">
        <div className="header-left">
          <div className="page-icon">
            <FiMapPin size={26} color="#ffffff" />
          </div>
          <div>
            <div className="page-title">Sedes</div>
            <div className="page-subtitle">{sedes.length} sedes registradas</div>
          </div>
        </div>

        <button className="btn-add" onClick={handleAbrirNueva}>
          <FiPlus size={18} color="#ffffff" />
          Agregar Sede
        </button>
      </div>

      {sedes.length === 0 ? (
        <div className="empty-state">
          <FiMapPin size={48} color="#cbd5e1" />
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>No hay sedes registradas</p>
        </div>
      ) : (
        <div className="sedes-grid">
          {sedes.map((sede) => (
            <div
              key={sede.idSede}
              className={`sede-card ${sede.activo ? "" : "inactiva"}`}
            >
              <div className="card-top">
                <div className="card-main">
                  <div className="sede-icon">
                    <FiMapPin size={24} color={sede.activo ? "#ea580c" : "#94a3b8"} />
                  </div>

                  <div>
                    <div className="sede-name">{sede.nombreSede}</div>
                    <div className="sede-id">ID: {sede.idSede}</div>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="action-btn edit" onClick={() => handleAbrirEditar(sede)} title="Editar">
                    <FiEdit2 size={16} color="#2563eb" />
                  </button>
                  <button
                    className={`action-btn ${sede.activo ? "power-off" : "power-on"}`}
                    onClick={() => cambiarEstado(sede)}
                    title={sede.activo ? "Inactivar" : "Activar"}
                  >
                    <FiPower size={16} color={sede.activo ? "#dc2626" : "#16a34a"} />
                  </button>
                </div>
              </div>

              <div className="card-bottom">
                <div className="sede-info-row">
                  <FiMapPin size={14} />
                  {sede.ubicacion}
                </div>

                {sede.telefono && (
                  <div className="sede-info-row">
                    <FiPhone size={14} />
                    {sede.telefono}
                  </div>
                )}

                <span className={`estado-badge ${sede.activo ? "estado-activo" : "estado-inactivo"}`}>
                  {sede.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">
                {sedeEditar ? "Editar Sede" : "Nueva Sede"}
              </div>
              <button className="close-btn" onClick={handleCerrar}>
                <FiX size={18} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="modal-label">Nombre de la sede</label>
              <input
                type="text"
                className="modal-input"
                name="nombreSede"
                value={form.nombreSede}
                onChange={handleChange}
                placeholder="Ej: Sede Comas"
                autoFocus
              />

              <label className="modal-label">Ubicación</label>
              <input
                type="text"
                className="modal-input"
                name="ubicacion"
                value={form.ubicacion}
                onChange={handleChange}
                placeholder="Ej: Av. Túpac Amaru 5421, Comas, Lima"
              />

              <label className="modal-label">Teléfono</label>
              <input
                type="text"
                className="modal-input"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ej: 987654321"
              />

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