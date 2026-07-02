import PreguntaItem from "./PreguntaItem";

function PreguntasFrecuentesComponent() {

  const preguntas = [
    {
      pregunta: "¿Cómo puedo reservar una cita?",
      respuesta:
        "Puedes reservar una cita desde el Portal Web o contactándonos telefónicamente."
    },
    {
      pregunta: "¿Qué seguros aceptan?",
      respuesta:
        "Trabajamos con diversos seguros y convenios médicos nacionales."
    },
    {
      pregunta: "¿Cuál es el horario de atención?",
      respuesta:
        "Atendemos de lunes a sábado de 8:00 AM a 8:00 PM."
    },
    {
      pregunta: "¿Cómo puedo ver mis resultados médicos?",
      respuesta:
        "Puedes visualizar tus resultados desde el Portal Web del paciente."
    }
  ];

  return (

    <div className="container py-5">

      <div
        className="rounded-5 shadow-lg text-center text-white mb-5 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)",
          padding: "70px 20px"
        }}
      >

        <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-semibold">
          Centro de Ayuda
        </span>

        <h1 className="fw-bold display-5 mb-3">
          Preguntas Frecuentes
        </h1>

        <p className="opacity-90 mx-auto" style={{ maxWidth: "750px" }}>
          Resolvemos las dudas más comunes de nuestros pacientes para brindarte una experiencia clara y sin complicaciones.
        </p>

      </div>

      <div className="accordion shadow-sm rounded-4 overflow-hidden" id="faqAccordion">

        {preguntas.map((item, index) => (

          <PreguntaItem
            key={index}
            index={index}
            pregunta={item.pregunta}
            respuesta={item.respuesta}
          />

        ))}

      </div>

    </div>

  );
}

export default PreguntasFrecuentesComponent;