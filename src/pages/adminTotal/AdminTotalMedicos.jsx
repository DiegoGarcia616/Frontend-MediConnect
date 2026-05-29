import { useState, useEffect } from "react";
import { getEspecialidades } from "../../services/api";
import { toast } from "react-toastify";
import { FiUsers, FiActivity } from "react-icons/fi";

export default function AdminTotalMedicos() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEspecialidades = async () => {
    setLoading(true);
    try {
      const data = await getEspecialidades();
      setEspecialidades(data);
    } catch (err) {
      console.error("Error al cargar especialidades:", err);
      toast.error("Error al cargar especialidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
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

          .especialidades-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .especialidad-card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .especialidad-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            border-color: #f97316;
          }

          .especialidad-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            flex-shrink: 0;
          }

          .especialidad-info {
            flex: 1;
          }

          .especialidad-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0f172a;
          }

          .especialidad-id {
            font-size: 0.85rem;
            color: #64748b;
            margin-top: 0.25rem;
          }

          .empty-state {
            text-align: center;
            padding: 3rem;
            color: #64748b;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          }

          @media (max-width: 768px) {
            .especialidades-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="page-header">
        <div className="page-icon">
          <FiUsers size={24} />
        </div>
        <div className="page-title">Especialidades Médicas</div>
      </div>

      {especialidades.length === 0 ? (
        <div className="empty-state">
          <FiActivity size={48} />
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>No hay especialidades disponibles</p>
        </div>
      ) : (
        <div className="especialidades-grid">
          {especialidades.map((esp) => (
            <div key={esp.idEspecialidad} className="especialidad-card">
              <div className="especialidad-icon">
                <FiActivity size={28} />
              </div>
              <div className="especialidad-info">
                <div className="especialidad-name">{esp.nombreEspecialidad}</div>
                <div className="especialidad-id">ID: {esp.idEspecialidad}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}