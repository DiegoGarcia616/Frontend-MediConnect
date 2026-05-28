import HeroConvenios from "../../components/HeroConvenios";
import SeccionLista from "../../components/SeccionListaConvenios";

import iconoCompanias from "../../images/convenios/companias.png";
import iconoAutoseguros from "../../images/convenios/autoseguros.png";
import iconoInternacional from "../../images/convenios/internacional.png";

export default function Convenios() {

  const seguros = [
    "RIMAC Seguros",
    "Sanitas",
    "Interseguro SOAT",
    "Protecta Security",
    "Pacífico Seguros",
    "La Positiva Seguros",
    "MAPFRE",
    "Crecer Seguros",
    "Vivir Seguros",
  ];

  const autoseguros = [
    "Autoseguros",
    "Sedapal - Minicetur - Sima",
    "Cobertura Médica",
    "Fondo de Empleados del BCRP",
    "Fesalud",
  ];

  const internacionales = [
    "United Healthcare",
    "Cigna",
    "Prestige International",
    "VUMI",
    "Best Doctors Insurance",
    "Redbridge Insurance Company, Ltd.",
    "Allianz Worldwide Care",
    "Henner",
  ];

  return (
    <>
      <HeroConvenios />

      <SeccionLista
        titulo="Compañías de Seguros"
        items={seguros}
        icono={iconoCompanias}
      />

      <SeccionLista
        titulo="Autoseguros y Convenios Especiales"
        items={autoseguros}
        icono={iconoAutoseguros}
      />

      <SeccionLista
        titulo="Internacionales"
        items={internacionales}
        icono={iconoInternacional}
      />
    </>
  );
}