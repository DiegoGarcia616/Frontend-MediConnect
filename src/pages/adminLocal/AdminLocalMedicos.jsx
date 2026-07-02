import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { buscarMedicos, listarEspecialidades, listarSedes } from "../../services/api";
import { FiSearch, FiRefreshCw, FiUser } from "react-icons/fi";

const DIAS = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];

export default function AdminLocalMedicos() {
  const [medicos, setMedicos]           = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [sedes, setSedes]               = useState([]);
  const [loading, setLoading]           = useState(false);

  const [filtros, setFiltros] = useState({
    nombre: "",
    idEspecialidad: "",
    idSede: "",
    modalidad: "",
    diaSemana: "",
  });

  // Cargar combos al montar
  useEffect(() => {
    listarEspecialidades().then(setEspecialidades).catch(() => {});
    listarSedes().then(setSedes).catch(() => {});
    fetchMedicos({});
  }, []);

  const fetchMedicos = useCallback(async (f) => {
    setLoading(true);
    try {
      const data = await buscarMedicos(f);
      setMedicos(data);
    } catch {
      toast.error("Error al cargar médicos");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) =>
    setFiltros((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBuscar = (e) => {
    e.preventDefault();
    fetchMedicos(filtros);
  };

  const handleLimpiar = () => {
    const vacio = { nombre: "", idEspecialidad: "", idSede: "", modalidad: "", diaSemana: "" };
    setFiltros(vacio);
    fetchMedicos({});
  };

  return (
    <div className="p-4">
      {/* Encabezado */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          style={{
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg,#0d6efd,#6ea8fe)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <FiUser size={22} color="#fff" />
        </div>
        <div>
          <h2 className="mb-0 fw-bold" style={{ color: "#1e293b" }}>Médicos Disponibles</h2>
          <small className="text-muted">Busca y filtra médicos por nombre, especialidad, sede, modalidad y día</small>
        </div>
      </div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: 16 }}
      >
        <div className="card-body p-4">
          <form onSubmit={handleBuscar}>
            <div className="row g-3">
              {/* Nombre */}
              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold text-secondary small">Nombre del médico</label>
                <input
                  type="text" name="nombre" value={filtros.nombre}
                  onChange={handleChange} placeholder="Ej: García, Juan..."
                  className="form-control rounded-3"
                />
              </div>

              {/* Especialidad */}
              <div className="col-6 col-md-2">
                <label className="form-label fw-semibold text-secondary small">Especialidad</label>
                <select name="idEspecialidad" value={filtros.idEspecialidad}
                  onChange={handleChange} className="form-select rounded-3">
                  <option value="">Todas</option>
                  {especialidades.map((e) => (
                    <option key={e.idEspecialidad} value={e.idEspecialidad}>
                      {e.nombreEspecialidad}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sede */}
              <div className="col-6 col-md-2">
                <label className="form-label fw-semibold text-secondary small">Sede</label>
                <select name="idSede" value={filtros.idSede}
                  onChange={handleChange} className="form-select rounded-3">
                  <option value="">Todas</option>
                  {sedes.filter((s) => s.activa).map((s) => (
                    <option key={s.idSede} value={s.idSede}>{s.nombreSede}</option>
                  ))}
                </select>
              </div>

              {/* Modalidad */}
              <div className="col-6 col-md-2">
                <label className="form-label fw-semibold text-secondary small">Modalidad</label>
                <select name="modalidad" value={filtros.modalidad}
                  onChange={handleChange} className="form-select rounded-3">
                  <option value="">Ambas</option>
                  <option value="PRESENCIAL">Presencial</option>
                  <option value="VIRTUAL">Virtual</option>
                </select>
              </div>

              {/* Día */}
              <div className="col-6 col-md-2">
                <label className="form-label fw-semibold text-secondary small">Día de atención</label>
                <select name="diaSemana" value={filtros.diaSemana}
                  onChange={handleChange} className="form-select rounded-3">
                  <option value="">Todos</option>
                  {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-primary rounded-3 px-4" disabled={loading}>
                <FiSearch className="me-2" />
                {loading ? "Buscando..." : "Buscar"}
              </button>
              <button type="button" onClick={handleLimpiar}
                className="btn btn-outline-secondary rounded-3 px-4">
                <FiRefreshCw className="me-2" />Limpiar
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Resultados */}
      <p className="text-muted small mb-3">
        {loading ? "Cargando..." : `${medicos.length} médico(s) encontrado(s)`}
      </p>

      <AnimatePresence>
        <div className="row g-3">
          {medicos.map((m, i) => (
            <motion.div
              key={m.idMedico}
              className="col-12 col-md-6 col-xl-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="card border-0 shadow-sm h-100"
                style={{ borderRadius: 16, transition: "transform .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div className="card-body p-4">
                  {/* Disponibilidad */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: "linear-gradient(135deg,#0d6efd22,#6ea8fe44)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.3rem",
                      }}
                    >
                      👨‍⚕️
                    </div>
                    <span className={`badge rounded-pill ${m.disponible ? "bg-success" : "bg-danger"}`}
                      style={{ fontSize: "0.75rem" }}>
                      {m.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </div>

                  {/* Nombre */}
                  <h6 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
                    {m.primerNombre} {m.primerApellido}
                  </h6>
                  <p className="text-muted small mb-2">DNI: {m.dni}</p>

                  {/* Especialidades */}
                  {m.especialidades?.length > 0 && (
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {m.especialidades.map((e) => (
                        <span key={e} className="badge rounded-pill"
                          style={{ background: "#e7f1ff", color: "#0d6efd", fontSize: "0.72rem" }}>
                          {e}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Info */}
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <span className={`badge rounded-pill ${m.modalidad === "VIRTUAL" ? "bg-info" : "bg-secondary"} bg-opacity-10 text-dark`}
                      style={{ fontSize: "0.72rem", border: "1px solid #dee2e6" }}>
                      {m.modalidad === "VIRTUAL" ? "🖥 Virtual" : "🏥 Presencial"}
                    </span>
                    {m.sedes?.map((s) => (
                      <span key={s} className="badge rounded-pill"
                        style={{ background: "#f0fff4", color: "#198754", fontSize: "0.72rem", border: "1px solid #badbcc" }}>
                        📍 {s}
                      </span>
                    ))}
                  </div>

                  {/* Inasistencia */}
                  {!m.disponible && m.inasistenciaInicio && (
                    <div className="alert alert-warning py-2 px-3 mt-3 mb-0 rounded-3"
                      style={{ fontSize: "0.78rem" }}>
                      <strong>Inasistencia:</strong> {m.inasistenciaInicio} → {m.inasistenciaFin}<br />
                      <span className="text-muted">{m.motivoInasistencia}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {!loading && medicos.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-12 text-center py-5">
              <div style={{ fontSize: "3rem" }}>🔍</div>
              <p className="text-muted mt-2">No se encontraron médicos con esos filtros</p>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}