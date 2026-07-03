import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function ConsultaMedica() {
  const [contexto, setContexto] = useState(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [loading, setLoading] = useState(false);

  const consultaId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchContexto = async () => {
      try {
        const res = await api.get(`/api/consultas/${consultaId}/contexto`);
        setContexto(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContexto();
  }, [consultaId]);

  const guardarDiagnostico = async () => {
    try {
      setLoading(true);

      await api.post(`/api/diagnosticos/consulta/${consultaId}`, {
        descripcion: diagnostico,
      });

      toast.success("Diagnóstico guardado");
    } catch (err) {
      toast.error("Error al guardar diagnóstico");
    } finally {
      setLoading(false);
    }
  };

  const finalizarConsulta = async () => {
    try {
      await api.put(`/api/consultas/finalizar/${consultaId}`);
      toast.success("Consulta finalizada");

      window.location.href = "/medico/citas";
    } catch (err) {
      toast.error("Error al finalizar consulta");
    }
  };

  if (!contexto) {
    return <div className="p-4">Cargando consulta...</div>;
  }

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4">Consulta Médica</h3>

      <div className="row g-4">

        {/* IZQUIERDA - CITA + PACIENTE */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              Datos de la cita
            </div>
            <div className="card-body">
              <p><b>Paciente:</b> {contexto.nombrePaciente}</p>
              <p><b>DNI:</b> {contexto.dni}</p>
              <p><b>Edad:</b> {contexto.edad}</p>
              <p><b>Hora:</b> {contexto.hora}</p>
              <p><b>Especialidad:</b> {contexto.especialidad}</p>
              <p><b>Médico:</b> {contexto.medico}</p>
            </div>
          </div>
        </div>

        {/* DERECHA - HISTORIAL */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              Historial clínico
            </div>
            <div className="card-body">
              <p className="text-muted">
                Sin historial clinico
              </p>
            </div>
          </div>
        </div>

        {/* ABAJO - DIAGNÓSTICO */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              Diagnóstico
            </div>
            <div className="card-body">

              <textarea
                className="form-control mb-3"
                rows="5"
                placeholder="Escribe el diagnóstico..."
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
              />

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={guardarDiagnostico}
                  disabled={loading}
                >
                  Guardar diagnóstico
                </button>

                <button
                  className="btn btn-danger"
                  onClick={finalizarConsulta}
                >
                  Finalizar consulta
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}