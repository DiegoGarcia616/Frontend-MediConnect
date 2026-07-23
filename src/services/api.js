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

export const registerMedico = async (data) => {
  const response = await api.post("/api/auth/registro/medico", data);
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

export const getConsultaContexto = async (idConsulta) => {
  const res = await api.get(`/api/consultas/${idConsulta}/contexto`);
  return res.data;
};

export const terminarConsulta = async (idConsulta) => {
  const res = await api.put(`/api/consultas/finalizar/${idConsulta}`);
  return res.data;
};

export const registrarDiagnostico = async (consultaId, descripcion) => {
  const res = await api.post(`/api/diagnosticos/consulta/${consultaId}`, {
    descripcion,
  });
  return res.data;
};

export const getHistorialPaciente = async (idPaciente) => {
  const res = await api.get(`/api/pacientes/${idPaciente}/historial`);
  return res.data;
};

export const comenzarConsulta = async (idCita) => {
  const res = await api.post(`/api/medico/consultas/comenzar/${idCita}`);
  return res.data;
};

export const getMedicos = async () => {
  const response = await api.get("/api/auth/medicos");
  return response.data;
};

export const getPacientes = async () => {
  const response = await api.get("/api/auth/pacientes");
  return response.data;
};

export default api;