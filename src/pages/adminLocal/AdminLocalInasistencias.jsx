import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  listarMedicosConEstado,
  registrarInasistencia,
  reactivarMedico,
} from "../../services/api";
import { FiUserX, FiX, FiCheck, FiAlertCircle, FiUserCheck } from "react-icons/fi";

export default function AdminLocalInasistencias() {
  const [medicos, setMedicos]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [medicoSel, setMedicoSel] = useState(null);
  const [form, setForm]           = useState({
    fechaInicio: "",
    fechaFin: "",
    motivo: "",
  });
  const [saving, setSaving]     = useState(false);
  const [reactivando, setReactivando] = useState(null);

  const [filtro, setFiltro] = useState("TODOS"); // TODOS | EN_INASISTENCIA | DISPONIBLES

  const cargar = async () => {
    setLoading(true);
    try {
      setMedicos(await listarMedicosConEstado());
    } catch {
      toast.error("Error al cargar médicos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const medicosFiltrados = medicos.filter((m) => {
    if (filtro === "EN_INASISTENCIA") return !m.disponible;
    if (filtro === "DISPONIBLES")     return m.disponible;
    return true;
  });

  const abrirModal = (medico) => {
    setMedicoSel(medico);
    setForm({ fechaInicio: "", fechaFin: "", motivo: "" });
    setShowModal(true);
  };

  const cerrar = () => { setShowModal(false); setSaving(false); setMedicoSel(null); };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegistrar = async (e) => {
    e.preventDefault();
    if (!form.fechaInicio) { toast.warning("La fecha de inicio es requerida"); return; }
    if (!form.fechaFin)    { toast.warning("La fecha de fin es requerida");    return; }
    if (form.fechaFin < form.fechaInicio) {
      toast.warning("La fecha de fin debe ser posterior al inicio");
      return;
    }
    if (!form.motivo.trim()) { toast.warning("El motivo es requerido"); return; }

    setSaving(true);
    try {
      await registrarInasistencia({
        idMedico:    medicoSel.idMedico,
        fechaInicio: form.fechaInicio,
        fechaFin:    form.fechaFin,
        motivo:      form.motivo,
      });
      toast.success(`Inasistencia registrada para Dr. ${medicoSel.primerApellido} ✓`);
      cerrar();
      cargar();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error al registrar inasistencia");
    } finally {
      setSaving(false);
    }
  };

  const handleReactivar = async (medico) => {
    if (!window.confirm(
      `¿Reactivar al Dr. ${medico.primerNombre} ${medico.primerApellido}?`
    )) return;
    setReactivando(medico.idMedico);
    try {
      await reactivarMedico(medico.idMedico);
      toast.success("Médico reactivado ✓");
      cargar();
    } catch {
      toast.error("Error al reactivar");
    } finally {
      setReactivando(null);
    }
  };

  const enInasistencia = medicos.filter((m) => !m.disponible).length;

  return (
    <div className="p-4">
      {/* Encabezado */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: "linear-gradient(135deg,#dc3545,#f87171)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <FiUserX size={22} color="#fff" />
        </div>
        <div>
          <h2 className="mb-0 fw-bold" style={{ color: "#1e293b" }}>Inasistencias</h2>
          <small className="text-muted">
            {enInasistencia > 0
              ? <><span className="text-danger fw-bold">{enInasistencia}</span> médico(s) en inasistencia</>
              : "Todos los médicos están disponibles"}
          </small>
        </div>
      </div>

      {/* Alerta si hay médicos en inasistencia */}
      {enInasistencia > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="alert alert-warning d-flex align-items-center gap-2 rounded-3 mb-4"
          style={{ border: "1px solid #ffc107" }}>
          <FiAlertCircle size={18} />
          <strong>{enInasistencia} médico(s)</strong> con inasistencia temporal registrada.
        </motion.div>
      )}

      {/* Filtro tabs */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {[
          { key: "TODOS",           label: `Todos (${medicos.length})` },
          { key: "EN_INASISTENCIA", label: `En inasistencia (${enInasistencia})` },
          { key: "DISPONIBLES",     label: `Disponibles (${medicos.length - enInasistencia})` },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setFiltro(key)}
            className={`btn btn-sm rounded-pill px-3 ${filtro === key ? "btn-primary" : "btn-outline-secondary"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Lista de médicos */}
      {loading ? (
        <div className="text-center py-5 text-muted">Cargando...</div>
      ) : (
        <div className="row g-3">
          <AnimatePresence>
            {medicosFiltrados.map((m, i) => (
              <motion.div key={m.idMedico} className="col-12 col-md-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}>
                <div className="card border-0 shadow-sm"
                  style={{
                    borderRadius: 16,
                    borderLeft: `4px solid ${m.disponible ? "#198754" : "#dc3545"}`,
                  }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
                          Dr. {m.primerNombre} {m.primerApellido}
                        </h6>
                        <p className="text-muted small mb-0">DNI: {m.dni}</p>
                      </div>
                      <span className={`badge rounded-pill ${m.disponible ? "bg-success" : "bg-danger"}`}>
                        {m.disponible ? "Disponible" : "En inasistencia"}
                      </span>
                    </div>

                    {/* Especialidades */}
                    {m.especialidades?.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 my-2">
                        {m.especialidades.map((e) => (
                          <span key={e} className="badge rounded-pill"
                            style={{ background: "#f3f0ff", color: "#6f42c1", fontSize: "0.72rem" }}>
                            {e}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Info inasistencia */}
                    {!m.disponible && m.inasistenciaInicio && (
                      <div className="alert alert-danger py-2 px-3 rounded-3 mt-2 mb-3"
                        style={{ fontSize: "0.8rem" }}>
                        <strong>Período:</strong> {m.inasistenciaInicio} → {m.inasistenciaFin}<br />
                        <strong>Motivo:</strong> {m.motivoInasistencia}
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="d-flex gap-2 mt-3">
                      {m.disponible ? (
                        <button onClick={() => abrirModal(m)}
                          className="btn btn-sm btn-outline-danger rounded-3 w-100"
                          style={{ fontSize: "0.8rem" }}>
                          <FiUserX size={13} className="me-1" /> Registrar Inasistencia
                        </button>
                      ) : (
                        <button onClick={() => handleReactivar(m)}
                          disabled={reactivando === m.idMedico}
                          className="btn btn-sm btn-success rounded-3 w-100"
                          style={{ fontSize: "0.8rem" }}>
                          <FiUserCheck size={13} className="me-1" />
                          {reactivando === m.idMedico ? "Reactivando..." : "Reactivar"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {medicosFiltrados.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">
              <div style={{ fontSize: "3rem" }}>✅</div>
              <p className="mt-2">No hay médicos en esta categoría</p>
            </div>
          )}
        </div>
      )}

      {/* Modal registrar inasistencia */}
      <AnimatePresence>
        {showModal && medicoSel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            }}
            onClick={(e) => e.target === e.currentTarget && cerrar()}
          >
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 500 }}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
                  Registrar Inasistencia
                </h5>
                <button onClick={cerrar} className="btn btn-sm btn-light rounded-circle"
                  style={{ width: 32, height: 32 }}><FiX size={16} /></button>
              </div>
              <p className="text-muted small mb-4">
                Dr. {medicoSel.primerNombre} {medicoSel.primerApellido}
              </p>

              <form onSubmit={handleRegistrar}>
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold text-secondary small">
                      Fecha de inicio *
                    </label>
                    <input type="date" name="fechaInicio" value={form.fechaInicio}
                      onChange={handleChange} required className="form-control rounded-3" />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold text-secondary small">
                      Fecha de fin *
                    </label>
                    <input type="date" name="fechaFin" value={form.fechaFin}
                      onChange={handleChange} required className="form-control rounded-3"
                      min={form.fechaInicio} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary small">
                    Motivo de la inasistencia *
                  </label>
                  <textarea name="motivo" value={form.motivo} onChange={handleChange}
                    required rows={3} className="form-control rounded-3"
                    placeholder="Ej: Licencia médica, viaje, capacitación..." />
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" onClick={cerrar}
                    className="btn btn-outline-secondary rounded-3 px-4">Cancelar</button>
                  <button type="submit" disabled={saving}
                    className="btn btn-danger rounded-3 px-4 d-flex align-items-center gap-2">
                    <FiCheck size={16} />{saving ? "Guardando..." : "Registrar"}
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
