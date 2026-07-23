import Hero from "../../components/Hero";
import DerechosGrid from "../../components/legal/DerechosGrid";

const derechos = [
  {
    titulo: "Derecho a la información",
    descripcion: "El paciente tiene derecho a recibir información clara sobre su diagnóstico y tratamiento."
  },
  {
    titulo: "Derecho a la privacidad",
    descripcion: "Toda la información médica del paciente debe mantenerse confidencial."
  },
  {
    titulo: "Deber de respeto",
    descripcion: "El paciente debe mantener un trato respetuoso con el personal médico."
  },
  {
    titulo: "Derecho a una atención digna",
    descripcion: "Todo paciente debe recibir atención médica con respeto y sin discriminación."
  }
];

export default function DerechosPaciente() {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Hero
        title="Derechos y Deberes del Paciente"
        subtitle="Conoce los principales derechos y responsabilidades durante tu atención médica, garantizando una experiencia segura y respetuosa."
        backgroundColor="linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)"
        height="45vh"
      />

      <div className="container py-5">
        <DerechosGrid items={derechos} accentColor="#0a2e5c" highlightColor="#12b886" />
      </div>
    </div>
  );
}