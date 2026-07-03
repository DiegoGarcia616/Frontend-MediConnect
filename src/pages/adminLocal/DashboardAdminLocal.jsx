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
import { FiUsers, FiActivity, FiCalendar, FiUserCheck } from "react-icons/fi";

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

export default function DashboardAdminLocal() {

  const statsCards = [
    { label: "Pacientes en Sede", value: "312", icon: FiUsers, color: "#2563eb" },
    { label: "Médicos Activos", value: "18", icon: FiUserCheck, color: "#f97316" },
    { label: "Citas Hoy", value: "24", icon: FiCalendar, color: "#16a34a" },
    { label: "Especialidades", value: "9", icon: FiActivity, color: "#dc2626" },
  ];

  const citasPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Citas Atendidas",
        data: [95, 120, 110, 135, 150, 128],
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
        data: [22, 28, 19, 34, 40, 30],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const medicosPorEspecialidad = {
    labels: ["Cardiología", "Pediatría", "Medicina General", "Dermatología", "Otras"],
    datasets: [
      {
        data: [4, 3, 5, 2, 4],
        backgroundColor: ["#f97316", "#2563eb", "#16a34a", "#dc2626", "#94a3b8"],
        borderWidth: 0,
      },
    ],
  };

  const citasRecientes = [
    { paciente: "Rosa Medina", medico: "Dr. Torres", hora: "09:00 AM", estado: "Confirmada" },
    { paciente: "Luis Fernández", medico: "Dra. Ramos", hora: "10:15 AM", estado: "Pendiente" },
    { paciente: "Elena Castro", medico: "Dr. Vargas", hora: "11:30 AM", estado: "Confirmada" },
    { paciente: "Jorge Salas", medico: "Dra. Quispe", hora: "01:00 PM", estado: "Confirmada" },
  ];

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

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
            font-size: 1.5rem;
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

          .charts-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
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

          .cita-paciente {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0f172a;
          }

          .cita-medico {
            font-size: 0.8rem;
            color: #64748b;
          }

          .cita-hora {
            font-size: 0.85rem;
            font-weight: 700;
            color: #f97316;
          }

          .estado-badge {
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            display: inline-block;
            margin-top: 0.2rem;
          }

          .estado-confirmada {
            background: #dcfce7;
            color: #16a34a;
          }

          .estado-pendiente {
            background: #fef3c7;
            color: #b45309;
          }

          @media (max-width: 900px) {
            .charts-row {
              grid-template-columns: 1fr;
            }

            .charts-row-2 {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="dashboard-title">Dashboard Administrador Local</div>
      <div className="dashboard-subtitle">Resumen de actividad de tu sede</div>

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
          <div className="chart-title">Médicos por Especialidad</div>
          <Doughnut data={medicosPorEspecialidad} options={doughnutOptions} />
        </div>
      </div>

      <div className="charts-row-2">
        <div className="chart-card">
          <div className="chart-title">Pacientes Nuevos por Mes</div>
          <Line data={pacientesPorMes} options={lineOptions} />
        </div>

        <div className="chart-card">
          <div className="chart-title">Citas de Hoy</div>
          <div className="citas-list">
            {citasRecientes.map((cita, idx) => (
              <div key={idx} className="cita-item">
                <div>
                  <div className="cita-paciente">{cita.paciente}</div>
                  <div className="cita-medico">{cita.medico}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="cita-hora">{cita.hora}</div>
                  <span className={`estado-badge ${cita.estado === "Confirmada" ? "estado-confirmada" : "estado-pendiente"}`}>
                    {cita.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}