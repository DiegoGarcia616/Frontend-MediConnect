import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminLocalCitas() {
  // Estados para manejar los datos
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // NOTA: Asumo que tienes un endpoint para listar horarios. 
  // Si lo haces a través del médico, ajusta esta URL.
  const fetchHorarios = async () => {
    try {
      setLoading(true);
      // Reemplaza esta URL con la ruta GET real que uses para traer los horarios de la sede
      const response = await axios.get('http://localhost:8080/api/admin-local/horarios'); 
      setHorarios(response.data);
    } catch (err) {
      setError('Error al cargar los horarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  // Función para consumir tu endpoint de INACTIVAR (RF1)
  const handleInactivar = async (idHorario) => {
    if (!window.confirm('¿Estás seguro de inactivar este horario?')) return;
    
    try {
      await axios.put(`http://localhost:8080/api/admin-local/horario/${idHorario}/inactivar`);
      alert('Horario inactivado con éxito');
      fetchHorarios(); // Refrescar la tabla
    } catch (err) {
      alert('Error al inactivar el horario');
      console.error(err);
    }
  };

  // Función para consumir tu endpoint de ACTUALIZAR (RF1)
  const handleActualizar = async (idHorario, datosActualizados) => {
    try {
      // datosActualizados debe ser un objeto: { diaSemana, horaInicio, horaFin, intervaloMinutos }
      await axios.put(`http://localhost:8080/api/admin-local/horario/${idHorario}`, datosActualizados);
      alert('Horario actualizado correctamente');
      fetchHorarios();
    } catch (err) {
      alert('Error al actualizar el horario');
      console.error(err);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Citas y Horarios (Admin Local)</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médico</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Día</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {horarios.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No hay horarios registrados</td>
              </tr>
            ) : (
              horarios.map((horario) => (
                <tr key={horario.idHorario}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{horario.idHorario}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dr. {horario.medico?.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{horario.diaSemana}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{horario.horaInicio} - {horario.horaFin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      horario.estado === 'ACTIVO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {horario.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {/* Ejemplo de botón de Inactivar */}
                    <button 
                      onClick={() => handleInactivar(horario.idHorario)}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                    >
                      Inactivar
                    </button>
                    
                    {/* Botón de Editar (Aquí deberías abrir un modal con un formulario) */}
                    <button 
                      onClick={() => {
                        // Ejemplo estático, aquí abrirías tu modal y pasarías los datos del form al handleActualizar
                        const nuevosDatos = {
                          diaSemana: "LUNES",
                          horaInicio: "08:00:00",
                          horaFin: "14:00:00",
                          intervaloMinutos: 30
                        };
                        handleActualizar(horario.idHorario, nuevosDatos);
                      }}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}