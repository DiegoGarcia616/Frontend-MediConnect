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

export default api;