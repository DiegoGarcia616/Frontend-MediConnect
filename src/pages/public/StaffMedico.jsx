import { useState, useMemo } from "react";
import Hero from "../../components/Hero";
import FilterBar from "../../components/staff/FilterBar";
import StaffGrid from "../../components/staff/StaffGrid";

const accentColor = "#0a2e5c";
const highlightColor = "#12b886";

const doctores = [
  {
    id: 1,
    nombre: "ABEL PAUL CARRANZA VASQUEZ",
    especialidad: "Neurocirugía",
    sede: "Jesús María",
    imagen: "https://i.pravatar.cc/300?img=11"
  },
  {
    id: 2,
    nombre: "ABELARDO HAMILL CAVERO GARAY",
    especialidad: "Neurocirugía",
    sede: "Jesús María",
    imagen: "https://i.pravatar.cc/300?img=32"
  },
  {
    id: 3,
    nombre: "DRA. MARÍA FERNANDA ROJAS",
    especialidad: "Cardiología",
    sede: "Lima Norte",
    imagen: "https://i.pravatar.cc/300?img=47"
  }
];

export default function StaffMedico() {
  const [busqueda, setBusqueda] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [sede, setSede] = useState("");

  const especialidades = useMemo(() => [...new Set(doctores.map((d) => d.especialidad))], []);
  const sedes = useMemo(() => [...new Set(doctores.map((d) => d.sede))], []);

  const doctoresFiltrados = doctores.filter((doc) => {
    const coincideNombre = doc.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEspecialidad = especialidad === "" || doc.especialidad === especialidad;
    const coincideSede = sede === "" || doc.sede === sede;
    return coincideNombre && coincideEspecialidad && coincideSede;
  });

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Hero
        title="Conoce a nuestros especialistas"
        subtitle="Profesionales altamente capacitados comprometidos con brindarte atención médica de calidad."
        backgroundColor={`linear-gradient(135deg, ${accentColor} 0%, #124b8a 100%)`}
        height="45vh"
      />

      <div className="container py-5">
        <FilterBar
          busqueda={busqueda}
          onBusquedaChange={(e) => setBusqueda(e.target.value)}
          especialidad={especialidad}
          onEspecialidadChange={setEspecialidad}
          sede={sede}
          onSedeChange={setSede}
          especialidades={especialidades}
          sedes={sedes}
          accentColor={accentColor}
          highlightColor={highlightColor}
        />

        <StaffGrid doctores={doctoresFiltrados} accentColor={accentColor} highlightColor={highlightColor} />
      </div>
    </div>
  );
}