import usePacientes from "../../hooks/usePacientes";
import { FiUsers, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

export default function AdminLocalPacientes() {

  const { pacientes, loading } = usePacientes();

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
    <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>
      <style>
        {`
          .page-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .page-icon {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 6px 16px rgba(37,99,235,0.35);
            flex-shrink: 0;
          }

          .page-title {
            font-size: 1.9rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
          }

          .page-subtitle {
            font-size: 0.9rem;
            color: #64748b;
            margin-top: 0.15rem;
          }

          .table-wrapper {
            background: white;
            border-radius: 18px;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            border: 1px solid #eef2f6;
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          thead {
            background: #f8fafc;
          }

          th {
            text-align: center;
            vertical-align: middle;
            padding: 1rem 1.2rem;
            font-size: 0.8rem;
            font-weight: 700;
            color: #334155;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            border-bottom: 1px solid #eef2f6;
          }

          td {
            text-align: center;
            vertical-align: middle;
            padding: 1rem 1.2rem;
            font-size: 0.9rem;
            color: #0f172a;
            border-bottom: 1px solid #f1f5f9;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background: #f8fafc;
          }

          .paciente-nombre {
            font-weight: 700;
            color: #0f172a;
          }

          .paciente-dni {
            font-size: 0.78rem;
            color: #94a3b8;
            margin-top: 0.1rem;
          }

          .info-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            color: #475569;
            font-size: 0.85rem;
          }

          .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: #64748b;
            background: white;
            border-radius: 18px;
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
          }
        `}
      </style>

      <div className="page-header">
        <div className="page-icon">
          <FiUsers size={26} color="#ffffff" />
        </div>
        <div>
          <div className="page-title">Pacientes</div>
          <div className="page-subtitle">{pacientes.length} pacientes registrados</div>
        </div>
      </div>

      {pacientes.length === 0 ? (
        <div className="empty-state">
          <FiUsers size={48} color="#cbd5e1" />
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>No hay pacientes registrados</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Fecha de Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="paciente-nombre">
                      {p.primerNombre} {p.segundoNombre} {p.primerApellido} {p.segundoApellido}
                    </div>
                    <div className="paciente-dni">DNI: {p.dni}</div>
                  </td>
                  <td>
                    <div className="info-row">
                      <FiMail size={14} />
                      {p.correo || "-"}
                    </div>
                  </td>
                  <td>
                    <div className="info-row">
                      <FiPhone size={14} />
                      {p.telefono || "-"}
                    </div>
                  </td>
                  <td>
                    <div className="info-row">
                      <FiCalendar size={14} />
                      {p.fechaNacimiento || "-"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}