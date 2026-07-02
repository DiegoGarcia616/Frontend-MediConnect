import StaffCard from "../../components/StaffCard";

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
  return (
    <div className="container py-5">

      <div
        className="rounded-5 shadow-lg text-center text-white mb-5 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)",
          padding: "60px 20px"
        }}
      >
        <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-semibold">
          Equipo Médico
        </span>

        <h1 className="fw-bold display-5 mb-3">
          Conoce a nuestros especialistas
        </h1>

        <p className="opacity-90 mx-auto" style={{ maxWidth: "700px" }}>
          Profesionales altamente capacitados comprometidos con brindarte atención médica de calidad.
        </p>
      </div>

      <div className="mb-5">
        <div className="bg-white shadow-sm rounded-4 p-4 border">

          <div className="row align-items-center g-3">

            <div className="col-md-4 fw-bold text-primary fs-5 text-center text-md-start">
              Buscar médico o especialidad
            </div>

            <div className="col-md-8">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill px-4"
                placeholder="Ej: Cardiología, Neurología, Dr. Juan..."
              />
            </div>

          </div>

        </div>
      </div>

      <div className="row g-4">

        {doctores.map((doctor) => (

          <div className="col-12 col-md-6 col-lg-4" key={doctor.id}>
            <StaffCard
              nombre={doctor.nombre}
              especialidad={doctor.especialidad}
              sede={doctor.sede}
              imagen={doctor.imagen}
            />
          </div>

        ))}

      </div>

    </div>
  );
}