import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (dni, password) => {
  const response = await api.post("/api/auth/login", { dni, password });
  return response.data;
};

export const registerPaciente = async (dni, correo, telefono, password) => {
  const response = await api.post("/api/auth/registro/paciente", {
    dni,
    correo,
    telefono,
    password,
  });
  return response.data;
};

export const getPacientePerfil = async () => {
  const response = await api.get("/api/paciente/perfil");
  return response.data;
};

export const updatePacienteContacto = async (correo, telefono, ubigeo) => {
  const response = await api.put("/api/paciente/contacto", {
    correo,
    telefono,
    ubigeo,
  });
  return response.data;
};

export const getSedes = async () => {
  const response = await api.get("/api/sedes");
  return response.data;
};

export const getSedeById = async (id) => {
  const response = await api.get(`/api/sedes/${id}`);
  return response.data;
};

export const getAdminLocales = async () => {
  const response = await api.get("/api/admin-total/admin-locales");
  return response.data;
};

export const createAdminLocal = async (data) => {
  const response = await api.post("/api/admin-total/admin-local", data);
  return response.data;
};

export const updateAdminLocal = async (id, data) => {
  const response = await api.put(`/api/admin-total/admin-local/${id}`, data);
  return response.data;
};

export const deleteAdminLocal = async (id) => {
  const response = await api.delete(`/api/admin-total/admin-local/${id}`);
  return response.data;
};

export const consultarReniec = async (dni) => {
  const response = await api.get(`/api/reniec/consultar/${dni}`);
  return response.data;
};

export const getEspecialidades = async () => {
  const response = await api.get("/api/especialidades");
  return response.data;
};

// ── RF1: Buscar médicos con filtros ────────────────────────────────────────
export const listarMedicos = async () => {
  const res = await api.get("/api/admin-local/medicos");
  return res.data;
};

export const buscarMedicos = async (filtros = {}) => {
  const params = new URLSearchParams();
  if (filtros.nombre)         params.append("nombre",         filtros.nombre);
  if (filtros.idEspecialidad) params.append("idEspecialidad", filtros.idEspecialidad);
  if (filtros.idSede)         params.append("idSede",         filtros.idSede);
  if (filtros.modalidad)      params.append("modalidad",      filtros.modalidad);
  if (filtros.diaSemana)      params.append("diaSemana",      filtros.diaSemana);
  const res = await api.get(`/api/admin-local/medicos/buscar?${params}`);
  return res.data;
};

// ── RF2: Especialidades ────────────────────────────────────────────────────
export const listarEspecialidades = async () => {
  const res = await api.get("/api/admin-local/especialidades");
  return res.data;
};

export const crearEspecialidad = async (data) => {
  const res = await api.post("/api/admin-local/especialidades", data);
  return res.data;
};

export const actualizarEspecialidad = async (id, data) => {
  const res = await api.put(`/api/admin-local/especialidades/${id}`, data);
  return res.data;
};

// ── RF3: Sedes ─────────────────────────────────────────────────────────────
export const listarSedes = async () => {
  const res = await api.get("/api/admin-local/sedes");
  return res.data;
};

export const crearSede = async (data) => {
  const res = await api.post("/api/admin-local/sedes", data);
  return res.data;
};

export const actualizarSede = async (id, data) => {
  const res = await api.put(`/api/admin-local/sedes/${id}`, data);
  return res.data;
};

export const cambiarEstadoSede = async (id, activa) => {
  const res = await api.patch(`/api/admin-local/sedes/${id}/estado`, { activa });
  return res.data;
};

// ── RF4: Inasistencia ──────────────────────────────────────────────────────
export const listarMedicosConEstado = async () => {
  const res = await api.get("/api/admin-local/medicos/estado");
  return res.data;
};

export const registrarInasistencia = async (data) => {
  // data: { idMedico, fechaInicio, fechaFin, motivo }
  const res = await api.post("/api/admin-local/medicos/inasistencia", data);
  return res.data;
};

export const reactivarMedico = async (idMedico) => {
  const res = await api.put(`/api/admin-local/medicos/${idMedico}/reactivar`);
  return res.data;
};

export default api;