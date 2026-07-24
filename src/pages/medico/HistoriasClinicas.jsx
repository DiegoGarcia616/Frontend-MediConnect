import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
 getExpedientePaciente
} from "../../services/api";


export default function HistoriasClinicas(){

 const {idPaciente}=useParams();

 const [expediente,setExpediente]=useState(null);


 useEffect(()=>{

   if(idPaciente){
      cargarHistoria();
   }

 },[idPaciente]);



 const cargarHistoria=async()=>{

    try{

      const response=
        await getExpedientePaciente(idPaciente);


      setExpediente(response.data);

    }
    catch(error){
      console.log(error);
    }

 };


 return(
   <div>

   <h1>
    Historia clínica
   </h1>


   {
    expediente &&
    <>
      <h2>
       Paciente:
       {expediente.nombrePaciente}
      </h2>


      <p>
       Estado:
       {expediente.estado}
      </p>


      <hr/>


      <h3>
       Consultas anteriores
      </h3>


      {
       expediente.consultas.map(c=>(
          <div key={c.idConsulta}>

            <p>
            Médico:
            {c.nombreMedico}
            </p>


            <p>
            Estado:
            {c.estado}
            </p>

          </div>
       ))
      }

    </>
   }


   </div>
 )

}