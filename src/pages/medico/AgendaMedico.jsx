import { useCitasMedico } from "../../hooks/useCitasMedico";

export default function AgendaMedico() {
  const { citas, enEspera, comenzar } = useCitasMedico();

  return (
    <div>
      <h2>Agenda Médico</h2>

      {citas.map((c) => (
        <div key={c.idCita} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
          
          <p><strong>Paciente:</strong> {c.nombrePaciente}</p>
          <p><strong>DNI:</strong> {c.dniPaciente}</p>
          <p><strong>Hora:</strong> {c.hora}</p>
          <p><strong>Especialidad:</strong> {c.especialidad}</p>
          <p><strong>Estado:</strong> {c.estado}</p>

          <button onClick={() => enEspera(c.idCita)}>
            En espera
          </button>

          <button onClick={() => comenzar(c.idCita)}>
            Comenzar consulta
          </button>
        </div>
      ))}
    </div>
  );
}