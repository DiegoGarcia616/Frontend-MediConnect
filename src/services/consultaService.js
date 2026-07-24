import api from "./api";


export const iniciarConsulta = (idCita) => {

    return api.post(
        `/consultas/iniciar/${idCita}`
    );

};



export const registrarSignosVitales = (idConsulta, datos)=>{

    return api.post(
        `/consultas/${idConsulta}/signos-vitales`,
        datos
    );

};



export const registrarDiagnostico = (idConsulta, datos)=>{

    return api.post(
        `/consultas/${idConsulta}/diagnostico`,
        datos
    );

};



export const registrarDetalleAtencion = (idConsulta, datos)=>{

    return api.post(
        `/consultas/${idConsulta}/detalle-atencion`,
        datos
    );

};



export const registrarReceta = (idConsulta, datos)=>{

    return api.post(
        `/consultas/${idConsulta}/receta`,
        datos
    );

};



export const finalizarConsulta = (idConsulta)=>{

    return api.patch(
        `/consultas/${idConsulta}/finalizar`
    );

};