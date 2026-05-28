import PreguntaItem from "./PreguntaItem"

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
  ]

  return (

    <div
      className="container py-15"
      style={{
        paddingTop: "140px",
        paddingBottom: "100px"
      }}
    >

      {/* TITULO */}
      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Preguntas Frecuentes
        </h1>

        <p className="text-muted mt-3">
          Resolvemos las dudas más comunes de nuestros pacientes.
        </p>

      </div>

      {/* ACCORDION */}
      <div
        className="accordion"
        id="faqAccordion"
      >

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

  )
}

export default PreguntasFrecuentesComponent