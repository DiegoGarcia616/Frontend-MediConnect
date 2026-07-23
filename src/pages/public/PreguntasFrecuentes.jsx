import Hero from "../../components/Hero";
import FAQ from "../../components/FAQ";

const preguntas = [
  {
    pregunta: "¿Cómo puedo reservar una cita?",
    respuesta: "Puedes reservar una cita desde el Portal Web o contactándonos telefónicamente."
  },
  {
    pregunta: "¿Qué seguros aceptan?",
    respuesta: "Trabajamos con diversos seguros y convenios médicos nacionales."
  },
  {
    pregunta: "¿Cuál es el horario de atención?",
    respuesta: "Atendemos de lunes a sábado de 8:00 AM a 8:00 PM."
  },
  {
    pregunta: "¿Cómo puedo ver mis resultados médicos?",
    respuesta: "Puedes visualizar tus resultados desde el Portal Web del paciente."
  }
];

export default function PreguntasFrecuentes() {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Hero
        title="Preguntas Frecuentes"
        subtitle="Resolvemos las dudas más comunes de nuestros pacientes para brindarte una experiencia clara y sin complicaciones."
        backgroundColor="linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)"
        height="45vh"
      />

      <FAQ
        items={preguntas}
        title="Centro de Ayuda"
        subtitle="Resuelve tus dudas"
        primaryColor="#0a2e5c"
        accentColor="#12b886"
        accentBg="#e6f7f1"
      />
    </div>
  );
}