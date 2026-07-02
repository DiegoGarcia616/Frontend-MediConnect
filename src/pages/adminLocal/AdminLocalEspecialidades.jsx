import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  listarEspecialidades,
  crearEspecialidad,
  actualizarEspecialidad,
} from "../../services/api";
import { FiTag, FiPlus, FiEdit2, FiX, FiCheck } from "react-icons/fi";

export default function AdminLocalEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading]               = useState(false);
  const [showModal, setShowModal]           = useState(false);
  const [editando, setEditando]             = useState(null); // null = crear, objeto = editar
  const [form, setForm]                     = useState({ nombreEspecialidad: "" });
  const [saving, setSaving]                 = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await listarEspecialidades();
      setEspecialidades(data);
    } catch {
      toast.error("Error al cargar especialidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const abrirCrear = () => {
    setEditando(null);
    setForm({ nombreEspecialidad: "" });
    setShowModal(true);
  };

  const abrirEditar = (esp) => {
    setEditando(esp);
    setForm({ nombreEspecialidad: esp.nombreEspecialidad });
    setShowModal(true);
  };

  const cerrar = () => { setShowModal(false); setSaving(false); };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!form.nombreEspecialidad.trim()) {
      toast.warning("El nombre no puede estar vacío");
      return;
    }
    setSaving(true);
    try {
      if (editando) {
        await actualizarEspecialidad(editando.idEspecialidad, form);
        toast.success("Especialidad actualizada ✓");
      } else {
        await crearEspecialidad(form);
        toast.success("Especialidad creada ✓");
      }
      cerrar();
      cargar();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4">
      {/* Encabezado */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg,#6f42c1,#a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FiTag size={22} color="#fff" />
          </div>
          <div>
            <h2 className="mb-0 fw-bold" style={{ color: "#1e293b" }}>Especialidades</h2>
            <small className="text-muted">{especialidades.length} especialidades registradas</small>
          </div>
        </div>
        <button onClick={abrirCrear}
          className="btn btn-primary rounded-3 px-4 d-flex align-items-center gap-2">
          <FiPlus size={16} /> Nueva Especialidad
        </button>
      </div>

      {/* Tabla */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">Cargando...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ background: "#f8fafc" }}>
                  <tr>
                    <th className="ps-4 py-3 fw-semibold text-secondary border-0">#</th>
                    <th className="py-3 fw-semibold text-secondary border-0">Especialidad</th>
                    <th className="py-3 fw-semibold text-secondary border-0 text-end pe-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {especialidades.map((e, i) => (
                      <motion.tr key={e.idEspecialidad}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}>
                        <td className="ps-4 text-muted small">{i + 1}</td>
                        <td>
                          <span className="badge rounded-pill px-3 py-2"
                            style={{ background: "#f3f0ff", color: "#6f42c1", fontSize: "0.85rem" }}>
                            {e.nombreEspecialidad}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <button onClick={() => abrirEditar(e)}
                            className="btn btn-sm btn-outline-primary rounded-3"
                            style={{ fontSize: "0.8rem" }}>
                            <FiEdit2 size={13} className="me-1" /> Editar
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {especialidades.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-5 text-muted">
                        Sin especialidades registradas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
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
              exit={{ scale: 0.9, y: 20 }}
              style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 440 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
                  {editando ? "Editar Especialidad" : "Nueva Especialidad"}
                </h5>
                <button onClick={cerrar} className="btn btn-sm btn-light rounded-circle"
                  style={{ width: 32, height: 32 }}>
                  <FiX size={16} />
                </button>
              </div>

              <form onSubmit={handleGuardar}>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary small">
                    Nombre de la especialidad *
                  </label>
                  <input
                    type="text"
                    value={form.nombreEspecialidad}
                    onChange={(e) => setForm({ nombreEspecialidad: e.target.value })}
                    className="form-control form-control-lg rounded-3"
                    placeholder="Ej: Cardiología, Pediatría..."
                    autoFocus
                    required
                  />
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" onClick={cerrar}
                    className="btn btn-outline-secondary rounded-3 px-4">
                    Cancelar
                  </button>
                  <button type="submit" disabled={saving}
                    className="btn btn-primary rounded-3 px-4 d-flex align-items-center gap-2">
                    <FiCheck size={16} />
                    {saving ? "Guardando..." : "Guardar"}
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
