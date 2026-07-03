import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiCalendar, FiFileText, FiUser, FiActivity } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPaciente() {

  const statsCards = [
    { label: "Próxima Cita", value: "12 Jul", icon: FiCalendar, color: "#f97316" },
    { label: "Citas Totales", value: "14", icon: FiActivity, color: "#2563eb" },
    { label: "Resultados Disponibles", value: "3", icon: FiFileText, color: "#16a34a" },
    { label: "Médico Asignado", value: "Dr. Torres", icon: FiUser, color: "#dc2626" },
  ];

  const historialCitas = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Citas",
        data: [1, 2, 1, 3, 2, 2],
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const especialidadesVisitadas = {
    labels: ["Cardiología", "Medicina General", "Dermatología"],
    datasets: [
      {
        data: [5, 6, 3],
        backgroundColor: ["#f97316", "#2563eb", "#16a34a"],
        borderWidth: 0,
      },
    ],
  };

  const proximasCitas = [
    { fecha: "12 Jul, 2026", hora: "10:00 AM", medico: "Dr. Torres", especialidad: "Cardiología" },
    { fecha: "20 Jul, 2026", hora: "03:30 PM", medico: "Dra. Ramos", especialidad: "Medicina General" },
  ];

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>
      <style>
        {`
          .dashboard-title {
            font-size: 1.9rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 0.3rem;
          }

          .dashboard-subtitle {
            font-size: 0.9rem;
            color: #64748b;
            margin-bottom: 2rem;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.25rem;
            margin-bottom: 2rem;
          }

          .stat-card {
            background: white;
            border-radius: 16px;
            padding: 1.4rem;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            border: 1px solid #eef2f6;
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .stat-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .stat-value {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0f172a;
          }

          .stat-label {
            font-size: 0.85rem;
            color: #64748b;
            font-weight: 500;
          }

          .charts-row {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .chart-card {
            background: white;
            border-radius: 18px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            border: 1px solid #eef2f6;
          }

          .chart-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 1.2rem;
          }

          .citas-list {
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
          }

          .cita-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.8rem 1rem;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #eef2f6;
          }

          .cita-fecha {
            font-size: 0.85rem;
            font-weight: 700;
            color: #f97316;
          }

          .cita-hora {
            font-size: 0.78rem;
            color: #94a3b8;
          }

          .cita-medico {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0f172a;
            text-align: right;
          }

          .cita-especialidad {
            font-size: 0.8rem;
            color: #64748b;
            text-align: right;
          }

          @media (max-width: 900px) {
            .charts-row {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="dashboard-title">Dashboard del Paciente</div>
      <div className="dashboard-subtitle">Resumen de tu actividad médica</div>

      <div className="stats-grid">
        {statsCards.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon" style={{ background: `${stat.color}1a`, color: stat.color }}>
              <stat.icon size={26} color={stat.color} />
            </div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-title">Historial de Citas por Mes</div>
          <Line data={historialCitas} options={lineOptions} />
        </div>

        <div className="chart-card">
          <div className="chart-title">Especialidades Visitadas</div>
          <Doughnut data={especialidadesVisitadas} options={doughnutOptions} />
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-title">Próximas Citas</div>
        <div className="citas-list">
          {proximasCitas.map((cita, idx) => (
            <div key={idx} className="cita-item">
              <div>
                <div className="cita-fecha">{cita.fecha}</div>
                <div className="cita-hora">{cita.hora}</div>
              </div>
              <div>
                <div className="cita-medico">{cita.medico}</div>
                <div className="cita-especialidad">{cita.especialidad}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}