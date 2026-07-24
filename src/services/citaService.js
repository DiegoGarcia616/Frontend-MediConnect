import api from "./api";


export const obtenerMisCitas = ()=>{

    return api.get(
        "/citas/mis-citas"
    );

};