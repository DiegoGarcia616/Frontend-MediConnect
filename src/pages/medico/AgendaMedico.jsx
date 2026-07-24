import { useEffect, useState } from "react";
import { obtenerMisCitas } from "../../services/citaService";
import { iniciarConsulta } from "../../services/consultaService";
import { useNavigate } from "react-router-dom";


export default function AgendaMedico(){


    const [citas,setCitas] = useState([]);

    const navigate = useNavigate();



    useEffect(()=>{

        cargarCitas();

    },[]);



    const cargarCitas = async()=>{

        try{

            const response = await obtenerMisCitas();


            setCitas(
                response.data.data
            );


        }catch(error){

            console.error(
                "Error cargando citas",
                error
            );

        }

    };




    const comenzarConsulta = async(idCita)=>{


        try{

            const response =
                await iniciarConsulta(idCita);



            const idConsulta =
                response.data.data.idConsulta;



            navigate(
                `/medico/consulta/${idConsulta}`
            );


        }catch(error){

            console.error(
                "Error iniciando consulta",
                error
            );

        }


    };




    return (

        <div className="container mt-4">


            <h2>
                Agenda médica
            </h2>



            <div className="card mt-3">

                <div className="card-body">


                    <table className="table">


                        <thead>

                            <tr>

                                <th>
                                    Paciente
                                </th>


                                <th>
                                    Fecha
                                </th>


                                <th>
                                    Hora
                                </th>


                                <th>
                                    Modalidad
                                </th>


                                <th>
                                    Estado
                                </th>


                                <th>
                                    Acción
                                </th>


                            </tr>

                        </thead>



                        <tbody>


                        {
                            citas.map((cita)=>(

                                <tr key={cita.idCita}>


                                    <td>
                                        {cita.nombrePaciente}
                                    </td>


                                    <td>
                                        {cita.fechaCita}
                                    </td>


                                    <td>
                                        {cita.horaInicio}
                                    </td>


                                    <td>
                                        {cita.modalidad}
                                    </td>


                                    <td>
                                        {cita.estado}
                                    </td>


                                    <td>


                                        <button

                                            className="btn btn-success"

                                            onClick={()=>
                                                comenzarConsulta(
                                                    cita.idCita
                                                )
                                            }

                                        >

                                            Empezar consulta

                                        </button>


                                    </td>


                                </tr>


                            ))
                        }


                        </tbody>



                    </table>


                </div>


            </div>



        </div>

    );


}