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

export default api;