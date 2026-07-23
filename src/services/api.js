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

export const loginUser = async (dni, contrasena) => {
  const response = await api.post("/api/auth/login", { dni, contrasena });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const registerPaciente = async (dni, correo, contrasena) => {
  const response = await api.post("/api/auth/registro-paciente", {
    dni,
    correo,
    contrasena,
  });
  return response.data;
};

export const solicitarResetPassword = async (dni) => {
  const response = await api.post("/api/auth/reset-password/solicitar", { dni });
  return response.data;
};

export const confirmarResetPassword = async (token, nuevaContrasena) => {
  const response = await api.post("/api/auth/reset-password/confirmar", {
    token,
    nuevaContrasena,
  });
  return response.data;
};

export const getPacientePerfil = async () => {
  const response = await api.get("/api/paciente/perfil");
  return response.data;
};

export const getPerfil = async () => {
  const response = await api.get("/api/perfil");
  return response.data;
};

export const actualizarPerfil = async (data) => {
  const response = await api.put("/api/perfil", data);
  return response.data;
};

export const subirMiFotoPerfil = async (archivo) => {
  const formData = new FormData();
  formData.append("archivo", archivo);
  const response = await api.put("/api/foto-perfil/mi-foto", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const eliminarMiFotoPerfil = async () => {
  const response = await api.delete("/api/foto-perfil/mi-foto");
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

export const getSedesAdmin = async () => {
  const response = await api.get("/api/sedes/detalle");
  return response.data;
};

export const getSedeByIdAdmin = async (id) => {
  const response = await api.get(`/api/sedes/${id}/detalle`);
  return response.data;
};

export const createSede = async (data) => {
  const response = await api.post("/api/sedes", data);
  return response.data;
};

export const updateSede = async (id, data) => {
  const response = await api.put(`/api/sedes/${id}`, data);
  return response.data;
};

export const subirFotoSede = async (id, archivo) => {
  const formData = new FormData();
  formData.append("archivo", archivo);
  const response = await api.put(`/api/sedes/${id}/foto`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const eliminarFotoSede = async (id) => {
  const response = await api.delete(`/api/sedes/${id}/foto`);
  return response.data;
};

export const activarSede = async (id) => {
  const response = await api.patch(`/api/sedes/${id}/activar`);
  return response.data;
};

export const inactivarSede = async (id) => {
  const response = await api.patch(`/api/sedes/${id}/inactivar`);
  return response.data;
};

export const eliminarSede = async (id) => {
  const response = await api.delete(`/api/sedes/${id}`);
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

export const getEspecialidadesAdmin = async () => {
  const response = await api.get("/api/especialidades/detalle");
  return response.data;
};

export const getEspecialidadByIdAdmin = async (id) => {
  const response = await api.get(`/api/especialidades/${id}/detalle`);
  return response.data;
};

export const createEspecialidad = async (data) => {
  const response = await api.post("/api/especialidades", data);
  return response.data;
};

export const updateEspecialidad = async (id, data) => {
  const response = await api.put(`/api/especialidades/${id}`, data);
  return response.data;
};

export const subirFotoEspecialidad = async (id, archivo) => {
  const formData = new FormData();
  formData.append("archivo", archivo);
  const response = await api.put(`/api/especialidades/${id}/foto`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const eliminarFotoEspecialidad = async (id) => {
  const response = await api.delete(`/api/especialidades/${id}/foto`);
  return response.data;
};

export const activarEspecialidad = async (id) => {
  const response = await api.patch(`/api/especialidades/${id}/activar`);
  return response.data;
};

export const inactivarEspecialidad = async (id) => {
  const response = await api.patch(`/api/especialidades/${id}/inactivar`);
  return response.data;
};

export const eliminarEspecialidad = async (id) => {
  const response = await api.delete(`/api/especialidades/${id}`);
  return response.data;
};

export const getEspecialidades = async () => {
  const response = await api.get("/api/especialidades");
  return response.data;
};

export const getEspecialidadById = async (id) => {
  const response = await api.get(`/api/especialidades/${id}`);
  return response.data;
};

export const getUsuarios = async () => {
  const response = await api.get("/api/usuarios");
  return response.data;
};

export const getUsuarioById = async (id) => {
  const response = await api.get(`/api/usuarios/${id}`);
  return response.data;
};

export const createUsuario = async (data) => {
  const response = await api.post("/api/usuarios", data);
  return response.data;
};

export const updateUsuario = async (id, data) => {
  const response = await api.put(`/api/usuarios/${id}`, data);
  return response.data;
};

export const bloquearUsuario = async (id) => {
  const response = await api.patch(`/api/usuarios/${id}/bloquear`);
  return response.data;
};

export const inactivarUsuario = async (id) => {
  const response = await api.patch(`/api/usuarios/${id}/inactivar`);
  return response.data;
};

export const eliminarUsuario = async (id) => {
  const response = await api.delete(`/api/usuarios/${id}`);
  return response.data;
};

export const getMedicosAdmin = async () => {
  const response = await api.get("/api/medicos");
  return response.data;
};

export const getMedicoById = async (id) => {
  const response = await api.get(`/api/medicos/${id}`);
  return response.data;
};

export const completarDatosMedico = async (idUsuario, data) => {
  const response = await api.post(`/api/medicos/${idUsuario}/completar-datos`, data);
  return response.data;
};

export const actualizarEspecialidadSedeMedico = async (id, idEspecialidad, idSede) => {
  const params = new URLSearchParams();
  if (idEspecialidad) params.append("idEspecialidad", idEspecialidad);
  if (idSede) params.append("idSede", idSede);
  const response = await api.patch(`/api/medicos/${id}/especialidad-sede?${params.toString()}`);
  return response.data;
};

export const actualizarDisponibilidadMedico = async (id, disponible) => {
  const response = await api.patch(`/api/medicos/${id}/disponibilidad?disponible=${disponible}`);
  return response.data;
};

export const activarMedico = async (id) => {
  const response = await api.patch(`/api/medicos/${id}/activar`);
  return response.data;
};

export const inactivarMedico = async (id) => {
  const response = await api.patch(`/api/medicos/${id}/inactivar`);
  return response.data;
};

export const completarDatosPaciente = async (idUsuario, data) => {
  const response = await api.post(`/api/pacientes/${idUsuario}/completar-datos`, data);
  return response.data;
};

export const buscarPacientesAdmin = async (termino) => {
  const response = await api.get(`/api/pacientes/buscar?termino=${encodeURIComponent(termino)}`);
  return response.data;
};

export const getMiContactoPaciente = async () => {
  const response = await api.get("/api/pacientes/mi-contacto");
  return response.data;
};

export const actualizarMiContactoPaciente = async (data) => {
  const response = await api.put("/api/pacientes/mi-contacto", data);
  return response.data;
};

export const getMiPerfilMedico = async () => {
  const response = await api.get("/api/medicos/mi-perfil");
  return response.data;
};

export default api;