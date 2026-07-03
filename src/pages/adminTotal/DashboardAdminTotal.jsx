import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiUsers, FiActivity, FiMapPin, FiCalendar } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardAdminTotal() {

  const statsCards = [
    { label: "Total Pacientes", value: "1,248", icon: FiUsers, color: "#2563eb" },
    { label: "Total Médicos", value: "86", icon: FiUsers, color: "#f97316" },
    { label: "Especialidades", value: "11", icon: FiActivity, color: "#16a34a" },
    { label: "Sedes Activas", value: "3", icon: FiMapPin, color: "#dc2626" },
  ];

  const citasPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Citas Atendidas",
        data: [320, 410, 380, 460, 510, 470],
        backgroundColor: "#f97316",
        borderRadius: 8,
      },
    ],
  };

  const pacientesPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Pacientes Nuevos",
        data: [80, 95, 70, 120, 140, 110],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const especialidadesData = {
    labels: ["Cardiología", "Pediatría", "Neurología", "Ginecología", "Otras"],
    datasets: [
      {
        data: [30, 25, 18, 15, 12],
        backgroundColor: ["#f97316", "#2563eb", "#16a34a", "#dc2626", "#94a3b8"],
        borderWidth: 0,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
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
            font-size: 1.5rem;
            font-weight: 800;
            color: #0f172a;
          }

          .stat-label {
            font-size: 0.85rem;
            color: #64748b;
            font-weight: 500;
          }

          .charts-grid {
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

          .charts-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          @media (max-width: 900px) {
            .charts-grid {
              grid-template-columns: 1fr;
            }

            .charts-row {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="dashboard-title">Dashboard Administrador General</div>
      <div className="dashboard-subtitle">Resumen general de la clínica</div>

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
          <div className="chart-title">Citas Atendidas por Mes</div>
          <Bar data={citasPorMes} options={barOptions} />
        </div>

        <div className="chart-card">
          <div className="chart-title">Distribución por Especialidad</div>
          <Doughnut data={especialidadesData} options={doughnutOptions} />
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: "1.5rem" }}>
        <div className="chart-title">Pacientes Nuevos por Mes</div>
        <Line data={pacientesPorMes} options={lineOptions} />
      </div>
    </div>
  );
}