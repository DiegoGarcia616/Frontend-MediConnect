import StaffCard from "../../components/StaffCard"

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
  }
]


export default function StaffMedico() {

  return (

    <div className="container mt-5 py-5">

      {/* BUSCADOR */}
      <div className="mt-4">

        <div className="bg-primary rounded-4 p-4 mb-4">

          <div className="row align-items-center">

            <div className="col-md-4 text-white fw-bold fs-4">
              Busca a tu médico o especialidad
            </div>

            <div className="col-md-8">

              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                placeholder="Ingrese nombre o especialidad"
              />

            </div>

          </div>

        </div>

        {/* CARDS */}
        {doctores.map((doctor) => (

          <StaffCard
            key={doctor.id}
            nombre={doctor.nombre}
            especialidad={doctor.especialidad}
            sede={doctor.sede}
            imagen={doctor.imagen}
          />

        ))}

      </div>

    </div>

  )
}