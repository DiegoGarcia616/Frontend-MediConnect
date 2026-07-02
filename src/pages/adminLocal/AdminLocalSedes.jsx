import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  listarSedes,
  crearSede,
  actualizarSede,
  cambiarEstadoSede,
} from "../../services/api";
import { FiMapPin, FiPlus, FiEdit2, FiX, FiCheck, FiToggleLeft, FiToggleRight } from "react-icons/fi";

export default function AdminLocalSedes() {
  const [sedes, setSedes]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal]   = useState(false);
  const [editando, setEditando]     = useState(null);
  const [form, setForm]             = useState({ nombreSede: "", ubicacion: "" });
  const [saving, setSaving]         = useState(false);
  const [toggling, setToggling]     = useState(null); // id de la sede que se está toggling

  const cargar = async () => {
    setLoading(true);
    try {
      setSedes(await listarSedes());
    } catch {
      toast.error("Error al cargar sedes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const abrirCrear = () => {
    setEditando(null);
    setForm({ nombreSede: "", ubicacion: "" });
    setShowModal(true);
  };

  const abrirEditar = (s) => {
    setEditando(s);
    setForm({ nombreSede: s.nombreSede, ubicacion: s.ubicacion });
    setShowModal(true);
  };

  const cerrar = () => { setShowModal(false); setSaving(false); };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!form.nombreSede.trim()) { toast.warning("El nombre es requerido"); return; }
    setSaving(true);
    try {
      if (editando) {
        await actualizarSede(editando.idSede, form);
        toast.success("Sede actualizada ✓");
      } else {
        await crearSede(form);
        toast.success("Sede creada ✓");
      }
      cerrar();
      cargar();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleEstado = async (sede) => {
    const nueva = !sede.activa;
    const accion = nueva ? "activar" : "inactivar";
    if (!window.confirm(`¿Deseas ${accion} la sede "${sede.nombreSede}"?`)) return;
    setToggling(sede.idSede);
    try {
      await cambiarEstadoSede(sede.idSede, nueva);
      toast.success(`Sede ${nueva ? "activada" : "inactivada"} ✓`);
      cargar();
    } catch {
      toast.error("Error al cambiar estado");
    } finally {
      setToggling(null);
    }
  };

  const activas   = sedes.filter((s) => s.activa).length;
  const inactivas = sedes.filter((s) => !s.activa).length;

  return (
    <div className="p-4">
      {/* Encabezado */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg,#198754,#34d399)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FiMapPin size={22} color="#fff" />
          </div>
          <div>
            <h2 className="mb-0 fw-bold" style={{ color: "#1e293b" }}>Sedes</h2>
            <small className="text-muted">
              {activas} activa(s) · {inactivas} inactiva(s)
            </small>
          </div>
        </div>
        <button onClick={abrirCrear}
          className="btn btn-success rounded-3 px-4 d-flex align-items-center gap-2">
          <FiPlus size={16} /> Nueva Sede
        </button>
      </div>

      {/* Cards de sedes */}
      {loading ? (
        <div className="text-center py-5 text-muted">Cargando...</div>
      ) : (
        <div className="row g-3">
          <AnimatePresence>
            {sedes.map((s, i) => (
              <motion.div key={s.idSede} className="col-12 col-md-6 col-xl-4"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    borderLeft: `4px solid ${s.activa ? "#198754" : "#dc3545"}`,
                    opacity: s.activa ? 1 : 0.7,
                  }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
                        📍 {s.nombreSede}
                      </h6>
                      <span className={`badge rounded-pill ${s.activa ? "bg-success" : "bg-danger"}`}
                        style={{ fontSize: "0.72rem" }}>
                        {s.activa ? "Activa" : "Inactiva"}
                      </span>
                    </div>

                    <p className="text-muted small mb-3" style={{ minHeight: 40 }}>
                      📌 {s.ubicacion || "Sin ubicación registrada"}
                    </p>

                    <div className="d-flex gap-2">
                      <button onClick={() => abrirEditar(s)}
                        className="btn btn-sm btn-outline-primary rounded-3 flex-grow-1"
                        style={{ fontSize: "0.8rem" }}>
                        <FiEdit2 size={12} className="me-1" /> Editar
                      </button>
                      <button
                        onClick={() => handleToggleEstado(s)}
                        disabled={toggling === s.idSede}
                        className={`btn btn-sm rounded-3 flex-grow-1 ${s.activa ? "btn-outline-danger" : "btn-outline-success"}`}
                        style={{ fontSize: "0.8rem" }}>
                        {s.activa
                          ? <><FiToggleLeft size={13} className="me-1" />Inactivar</>
                          : <><FiToggleRight size={13} className="me-1" />Activar</>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sedes.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">
              <div style={{ fontSize: "3rem" }}>🏥</div>
              <p className="mt-2">No hay sedes registradas. ¡Crea la primera!</p>
            </div>
          )}
        </div>
      )}

      {/* Modal Crear / Editar */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            }}
            onClick={(e) => e.target === e.currentTarget && cerrar()}
          >
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480 }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
                  {editando ? "Editar Sede" : "Nueva Sede"}
                </h5>
                <button onClick={cerrar} className="btn btn-sm btn-light rounded-circle"
                  style={{ width: 32, height: 32 }}><FiX size={16} /></button>
              </div>

              <form onSubmit={handleGuardar}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small">
                    Nombre de la sede *
                  </label>
                  <input type="text" name="nombreSede" value={form.nombreSede}
                    onChange={handleChange} required autoFocus
                    className="form-control rounded-3"
                    placeholder="Ej: Sede Centro, Sede Norte..." />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary small">
                    Dirección / Ubicación
                  </label>
                  <input type="text" name="ubicacion" value={form.ubicacion}
                    onChange={handleChange}
                    className="form-control rounded-3"
                    placeholder="Ej: Av. Arequipa 1234, Lima" />
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" onClick={cerrar}
                    className="btn btn-outline-secondary rounded-3 px-4">Cancelar</button>
                  <button type="submit" disabled={saving}
                    className="btn btn-success rounded-3 px-4 d-flex align-items-center gap-2">
                    <FiCheck size={16} />{saving ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
