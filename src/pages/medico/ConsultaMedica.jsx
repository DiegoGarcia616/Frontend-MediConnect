import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  registrarSignosVitales,
  registrarDiagnostico,
  registrarDetalleAtencion,
  registrarReceta,
  finalizarConsulta
} from "../../services/consultaService";



export default function ConsultaMedica() {


  const { id } = useParams();

  const navigate = useNavigate();



  const [signos, setSignos] = useState({

    presionArterial: "",
    frecuenciaCardiaca: "",
    frecuenciaRespiratoria: "",
    temperatura: "",
    saturacionOxigeno: "",
    peso: "",
    talla: ""

  });



  const [diagnostico, setDiagnostico] = useState({

    descripcionClinica: "",
    categoriaDiagnostica: ""

  });



  const [atencion, setAtencion] = useState({

    tratamiento: "",
    indicacionesMedicas: "",
    observaciones: "",
    recomendaciones: ""

  });



  const [receta, setReceta] = useState({

    medicamento: "",
    dosis: "",
    frecuencia: "",
    duracion: "",
    indicaciones: ""

  });




  const enviarSignos = async () => {

    await registrarSignosVitales(
      id,
      signos
    );

    alert(
      "Signos vitales guardados"
    );

  };




  const enviarDiagnostico = async () => {

    await registrarDiagnostico(
      id,
      diagnostico
    );

    alert(
      "Diagnóstico guardado"
    );

  };




  const enviarAtencion = async () => {

    await registrarDetalleAtencion(
      id,
      atencion
    );

    alert(
      "Detalle guardado"
    );

  };




  const enviarReceta = async () => {


    await registrarReceta(
      id,
      [
        receta
      ]
    );


    alert(
      "Receta guardada"
    );

  };





  const terminarConsulta = async () => {


    await finalizarConsulta(id);


    alert(
      "Consulta finalizada"
    );


    navigate("/medico/citas");


  };





  return (

    <div className="container mt-4">


      <h2>
        Consulta médica
      </h2>



      <hr />


      <h4>
        Signos vitales
      </h4>


      <input
        className="form-control mb-2"
        placeholder="Presión arterial"
        onChange={
          e => setSignos({
            ...signos,
            presionArterial: e.target.value
          })
        }
      />



      <input
        className="form-control mb-2"
        placeholder="Frecuencia cardíaca"
        type="number"
        onChange={
          e => setSignos({
            ...signos,
            frecuenciaCardiaca: e.target.value
          })
        }
      />



      <input
        className="form-control mb-2"
        placeholder="Temperatura"
        type="number"
        onChange={
          e => setSignos({
            ...signos,
            temperatura: e.target.value
          })
        }
      />


      <button
        className="btn btn-primary"
        onClick={enviarSignos}
      >
        Guardar signos
      </button>




      <hr />


      <h4>
        Diagnóstico
      </h4>


      <textarea
        className="form-control mb-2"
        placeholder="Descripción clínica"
        onChange={
          e => setDiagnostico({
            ...diagnostico,
            descripcionClinica: e.target.value
          })
        }
      />


      <input
        className="form-control mb-2"
        placeholder="Categoría diagnóstica"
        onChange={
          e => setDiagnostico({
            ...diagnostico,
            categoriaDiagnostica: e.target.value
          })
        }
      />


      <button
        className="btn btn-primary"
        onClick={enviarDiagnostico}
      >
        Guardar diagnóstico
      </button>




      <hr />

      <h4>
        Detalle de atención
      </h4>


      <textarea
        className="form-control mb-2"
        placeholder="Tratamiento"
        onChange={
          e => setAtencion({
            ...atencion,
            tratamiento: e.target.value
          })
        }
      />


      <textarea
        className="form-control mb-2"
        placeholder="Indicaciones médicas"
        onChange={
          e => setAtencion({
            ...atencion,
            indicacionesMedicas: e.target.value
          })
        }
      />


      <button
        className="btn btn-primary"
        onClick={enviarAtencion}
      >
        Guardar atención
      </button>




      <hr />


      <h4>
        Receta
      </h4>


      <input
        className="form-control mb-2"
        placeholder="Medicamento"
        onChange={
          e => setReceta({
            ...receta,
            medicamento: e.target.value
          })
        }
      />


      <input
        className="form-control mb-2"
        placeholder="Dosis"
        onChange={
          e => setReceta({
            ...receta,
            dosis: e.target.value
          })
        }
      />


      <input
        className="form-control mb-2"
        placeholder="Frecuencia"
        onChange={
          e => setReceta({
            ...receta,
            frecuencia: e.target.value
          })
        }
      />


      <button
        className="btn btn-primary"
        onClick={enviarReceta}
      >
        Guardar receta
      </button>



      <hr />


      <button
        className="btn btn-danger"
        onClick={terminarConsulta}
      >

        Finalizar consulta

      </button>



    </div>

  );


}