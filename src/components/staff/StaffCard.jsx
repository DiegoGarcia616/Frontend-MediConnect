export default function StaffCard({ nombre, especialidad, sede, imagen, accentColor = "#0a2e5c", highlightColor = "#12b886" }) {
  return (
    <div className="bg-white border-0 shadow-sm rounded-4 p-3 staff-card d-flex align-items-center gap-3">
      <img
        src={imagen}
        alt={nombre}
        className="rounded-circle shadow-sm flex-shrink-0"
        style={{ width: "72px", height: "72px", objectFit: "cover", border: `2px solid ${highlightColor}30` }}
      />

      <div className="flex-grow-1 text-start">
        <h6 className="fw-bold mb-1" style={{ color: accentColor, fontSize: "0.98rem" }}>
          {nombre}
        </h6>
        <p className="text-muted small mb-2">{especialidad}</p>
        <span
          className="badge rounded-pill px-3 py-1 small"
          style={{ backgroundColor: `${highlightColor}15`, color: highlightColor }}
        >
          {sede}
        </span>
      </div>

      <style>{`
        .staff-card {
          transition: all 0.3s ease;
          border: 1px solid #eef1f5;
        }

        .staff-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 34px rgba(10, 46, 92, 0.14) !important;
          border-color: ${accentColor}30;
        }
      `}</style>
    </div>
  );
}