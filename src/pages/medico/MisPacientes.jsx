import usePacientesMedico from "../../hooks/usePacientesMedico";
import { FiUser, FiFileText, FiPhone } from "react-icons/fi";


export default function MisPacientes(){

    const {
        pacientes,
        loading
    } = usePacientesMedico();



    if(loading){

        return (
            <div style={{padding:"2rem"}}>
                Cargando pacientes...
            </div>
        );

    }


    return (

        <div style={{
            padding:"2rem",
            background:"#f8fafc",
            minHeight:"100vh"
        }}>


            <h1 style={{
                fontSize:"1.8rem",
                fontWeight:"800",
                color:"#0f172a"
            }}>
                Mis Pacientes
            </h1>


            <p style={{
                color:"#64748b",
                marginBottom:"2rem"
            }}>
                Pacientes que tienen citas registradas contigo.
            </p>



            {
            pacientes.length === 0 ?

            (

                <div style={{
                    background:"white",
                    padding:"2rem",
                    borderRadius:"16px"
                }}>
                    No tienes pacientes registrados.
                </div>

            )

            :

            (

            <div style={{
                display:"grid",
                gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
                gap:"1.5rem"
            }}>


            {
            pacientes.map((paciente)=>(

                <div
                key={paciente.idPaciente}
                style={{
                    background:"white",
                    padding:"1.5rem",
                    borderRadius:"18px",
                    boxShadow:
                    "0 2px 12px rgba(0,0,0,0.06)"
                }}
                >


                    <div style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"1rem"
                    }}>


                        <div style={{
                            width:"55px",
                            height:"55px",
                            borderRadius:"50%",
                            background:"#d1fae5",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            color:"#065f46"
                        }}>

                            <FiUser size={25}/>

                        </div>



                        <div>

                            <h3 style={{
                                margin:0,
                                color:"#0f172a"
                            }}>
                                {paciente.nombres}
                                {" "}
                                {paciente.apellidoPaterno}
                            </h3>


                            <small>
                                DNI:
                                {" "}
                                {paciente.dni}
                            </small>

                        </div>


                    </div>



                    <hr
                    style={{
                        margin:"1rem 0",
                        borderColor:"#eef2f6"
                    }}
                    />



                    <p>
                        <FiFileText/>
                        {" "}
                        Historia:
                        {" "}
                        {paciente.codigoHistoriaClinica}
                    </p>



                    <p>
                        <FiPhone/>
                        {" "}
                        {paciente.telefono || "Sin teléfono"}
                    </p>


                </div>

            ))
            }


            </div>

            )

            }


        </div>

    );

}