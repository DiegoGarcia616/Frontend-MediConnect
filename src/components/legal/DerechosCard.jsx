import { FiInfo, FiLock, FiHeart, FiShield } from "react-icons/fi";

const ICONOS = [FiInfo, FiLock, FiHeart, FiShield];

function DerechosCard({ titulo, descripcion, index = 0, accentColor = "#0a2e5c", highlightColor = "#12b886" }) {
  const Icon = ICONOS[index % ICONOS.length];

  return (
    <div
      className="card h-100 border-0 rounded-4 p-4 bg-white position-relative"
      style={{
        boxShadow: "0 4px 20px rgba(10, 46, 92, 0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(10, 46, 92, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(10, 46, 92, 0.08)";
      }}
    >
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
        style={{ width: "56px", height: "56px", backgroundColor: `${accentColor}12` }}
      >
        <Icon size={26} color={accentColor} />
      </div>

      <span
        className="position-absolute top-0 end-0 me-4 mt-4 fw-bold"
        style={{ color: `${accentColor}20`, fontSize: "2.5rem", lineHeight: 1 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h5 className="fw-bold mb-2" style={{ color: accentColor }}>
        {titulo}
      </h5>

      <div style={{ width: "36px", height: "4px", backgroundColor: highlightColor, borderRadius: "2px", marginBottom: "12px" }} />

      <p className="text-secondary mb-0" style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
        {descripcion}
      </p>
    </div>
  );
}

export default DerechosCard;