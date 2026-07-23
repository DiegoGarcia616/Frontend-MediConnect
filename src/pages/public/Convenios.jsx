import Hero from "../../components/Hero";
import SeccionListaConvenios from "../../components/convenios/SeccionListaConvenios";

import iconoCompanias from "../../images/convenios/companias.png";
import iconoAutoseguros from "../../images/convenios/autoseguros.png";
import iconoInternacional from "../../images/convenios/internacional.png";

const accentColor = "#0a2e5c";
const highlightColor = "#12b886";

const seguros = [
  "RIMAC Seguros",
  "Sanitas",
  "Interseguro SOAT",
  "Protecta Security",
  "Pacífico Seguros",
  "La Positiva Seguros",
  "MAPFRE",
  "Crecer Seguros",
  "Vivir Seguros"
];

const autoseguros = [
  "Autoseguros",
  "Sedapal - Minicetur - Sima",
  "Cobertura Médica",
  "Fondo de Empleados del BCRP",
  "Fesalud"
];

const internacionales = [
  "United Healthcare",
  "Cigna",
  "Prestige International",
  "VUMI",
  "Best Doctors Insurance",
  "Redbridge Insurance Company, Ltd.",
  "Allianz Worldwide Care",
  "Henner"
];

export default function Convenios() {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Hero
        title="Convenios y Seguros"
        subtitle="Trabajamos con las principales compañías de seguros y convenios para brindarte facilidades en tu atención médica."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="40vh"
      />

      <SeccionListaConvenios
        titulo="Compañías de Seguros"
        items={seguros}
        icono={iconoCompanias}
        accentColor={accentColor}
        highlightColor={highlightColor}
      />

      <SeccionListaConvenios
        titulo="Autoseguros y Convenios Especiales"
        items={autoseguros}
        icono={iconoAutoseguros}
        accentColor={accentColor}
        highlightColor={highlightColor}
      />

      <SeccionListaConvenios
        titulo="Internacionales"
        items={internacionales}
        icono={iconoInternacional}
        accentColor={accentColor}
        highlightColor={highlightColor}
      />
    </div>
  );
}