import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiUsers, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardMedico() {

  const statsCards = [
    { label: "Citas Hoy", value: "8", icon: FiCalendar, color: "#f97316" },
    { label: "Pacientes Atendidos", value: "142", icon: FiUsers, color: "#2563eb" },
    { label: "Consultas Pendientes", value: "3", icon: FiClock, color: "#dc2626" },
    { label: "Consultas Finalizadas", value: "139", icon: FiCheckCircle, color: "#16a34a" },
  ];

  const consultasPorDia = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    datasets: [
      {
        label: "Consultas",
        data: [6, 9, 7, 10, 8, 4],
        backgroundColor: "#f97316",
        borderRadius: 8,
      },
    ],
  };

  const pacientesPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Pacientes Atendidos",
        data: [18, 22, 20, 25, 28, 26],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const proximasCitas = [
    { hora: "09:00 AM", paciente: "Juan Pérez", motivo: "Control" },
    { hora: "10:30 AM", paciente: "María López", motivo: "Consulta general" },
    { hora: "12:00 PM", paciente: "Carlos Ruiz", motivo: "Seguimiento" },
    { hora: "03:00 PM", paciente: "Ana Torres", motivo: "Primera vez" },
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
            grid-template-columns: 1fr 1fr;
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

          .cita-hora {
            font-size: 0.85rem;
            font-weight: 700;
            color: #f97316;
            min-width: 80px;
          }

          .cita-paciente {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0f172a;
          }

          .cita-motivo {
            font-size: 0.8rem;
            color: #64748b;
          }

          @media (max-width: 900px) {
            .charts-row {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="dashboard-title">Dashboard del Médico</div>
      <div className="dashboard-subtitle">Resumen de tu actividad clínica</div>

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
          <div className="chart-title">Consultas por Día (Esta Semana)</div>
          <Bar data={consultasPorDia} options={barOptions} />
        </div>

        <div className="chart-card">
          <div className="chart-title">Pacientes Atendidos por Mes</div>
          <Line data={pacientesPorMes} options={lineOptions} />
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-title">Próximas Citas de Hoy</div>
        <div className="citas-list">
          {proximasCitas.map((cita, idx) => (
            <div key={idx} className="cita-item">
              <div className="cita-hora">{cita.hora}</div>
              <div>
                <div className="cita-paciente">{cita.paciente}</div>
                <div className="cita-motivo">{cita.motivo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}