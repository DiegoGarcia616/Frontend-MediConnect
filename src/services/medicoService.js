import api from "./api";


export const obtenerPerfilMedico = () => {
    return api.get("/medicos/mi-perfil");
};


export const obtenerPacientes = () => {
    return api.get("/pacientes/mis-pacientes");
};