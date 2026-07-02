import { useState, useEffect } from "react";
import { getSedes } from "../../services/api";
import { toast } from "react-toastify";
import { FiMapPin } from "react-icons/fi";

export default function AdminTotalSedes() {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSedes = async () => {
    setLoading(true);
    try {
      const data = await getSedes();
      setSedes(data);
    } catch (err) {
      console.error("Error al cargar sedes:", err);
      toast.error("Error al cargar las sedes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <style>
        {`
          .page-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 2rem;
          }

          .page-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #0f172a;
          }

          .page-icon {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }

          .sedes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .sede-card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
          }

          .sede-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          }

          .sede-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 0.5rem;
          }

          .sede-location {
            color: #64748b;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .empty-state {
            text-align: center;
            padding: 3rem;
            color: #64748b;
          }
        `}
      </style>

      <div className="page-header">
        <div className="page-icon">
          <FiMapPin size={24} />
        </div>
        <div className="page-title">Sedes</div>
      </div>

      {sedes.length === 0 ? (
        <div className="empty-state">
          <FiMapPin size={48} />
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>No hay sedes registradas</p>
        </div>
      ) : (
        <div className="sedes-grid">
          {sedes.map((sede) => (
            <div key={sede.idSede} className="sede-card">
              <div className="sede-name">{sede.nombreSede}</div>
              <div className="sede-location">
                <FiMapPin size={16} />
                {sede.ubicacion}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}