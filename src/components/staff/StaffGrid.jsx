import StaffCard from "./StaffCard";

function StaffGrid({ doctores = [], accentColor = "#0a2e5c", highlightColor = "#12b886" }) {
  return (
    <div className="row g-3">
      {doctores.map((doctor) => (
        <div className="col-12 col-md-6" key={doctor.id}>
          <StaffCard
            nombre={doctor.nombre}
            especialidad={doctor.especialidad}
            sede={doctor.sede}
            imagen={doctor.imagen}
            accentColor={accentColor}
            highlightColor={highlightColor}
          />
        </div>
      ))}
    </div>
  );
}

export default StaffGrid;