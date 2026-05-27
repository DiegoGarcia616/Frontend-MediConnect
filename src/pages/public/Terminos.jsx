import React, { useState } from 'react';
import Hero from '../../components/Hero';

export default function Terminos() {
  // Controlamos la navegación con un estado simple
  const [seccionActiva, setSeccionActiva] = useState(1);

  const regulaciones = [
    {
      id: 1,
      titulo: "1. Uso General del Portal",
      contenido: (
        <>
          <p>Al utilizar el sitio web oficial de <strong>MediConnect</strong>, usted como paciente se compromete a ingresar información real, fidedigna y actualizada para sus programaciones de citas e historial médico.</p>
          <p>Este portal ha sido diseñado exclusivamente para facilitarle la gestión de sus consultas de salud de manera transparente, permitiéndole acceder a sus datos desde cualquier computadora o dispositivo móvil con total seguridad y confidencialidad.</p>
        </>
      )
    },
    {
      id: 2,
      titulo: "2. Programación de Citas",
      contenido: (
        <>
          <p>Para asegurar una atención ordenada y justa para toda nuestra comunidad de pacientes en nuestra sede de San Isidro, la gestión de turnos médicos se rige bajo las siguientes condiciones:</p>
          <ul className="list-group list-group-flush border rounded-3 bg-light mt-3">
            <li className="list-group-item bg-transparent py-3"><strong>Verificación en Tiempo Real:</strong> Nuestro sistema valida al instante los horarios de los médicos especialistas antes de confirmar su cupo, evitando cruces de citas.</li>
            <li className="list-group-item bg-transparent py-3"><strong>Modificaciones del Usuario:</strong> Si presenta inconvenientes, debe cancelar su cita directamente desde su panel con la debida anticipación.</li>
            <li className="list-group-item bg-transparent py-3"><strong>Estados de los Turnos:</strong> Su solicitud médica pasará por controles visibles: Pendiente, Confirmada, Reprogramada o Cancelada.</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      titulo: "3. Recetas y Órdenes",
      contenido: (
        <>
          <p>Una vez concluida satisfactoriamente su consulta con el especialista, el sistema registrará una receta electrónica oficial que quedará permanentemente guardada dentro de su cuenta para futuras lecturas.</p>
          <div className="alert bg-primary bg-opacity-10 border-0 mt-3 text-dark">
            <strong>Aclaración importante:</strong> Este sistema web no realiza envíos de datos automáticos a cadenas de farmacias externas ni a laboratorios ajenos a la organización. Todo proceso adicional se maneja internamente.
          </div>
        </>
      )
    },
    {
      id: 4,
      titulo: "4. Aspectos Técnicos",
      contenido: (
        <>
          <p>Dado que MediConnect almacena y procesa toda la información clínica de manera segura a través de internet (servicios en la nube), es un requisito indispensable que el usuario cuente con una conexión a red estable para navegar por el portal.</p>
          <p>La clínica no se hace responsable por caídas en el servicio visual o problemas de carga provocados por fallas directas en el proveedor de internet del paciente o por utilizar dispositivos desactualizados.</p>
        </>
      )
    }
  ];

  const contenidoActual = regulaciones.find(r => r.id === seccionActiva);

  return (
    <div className="bg-light pb-5" style={{ minHeight: '100vh' }}>
      <Hero 
        title="Términos y Condiciones" 
        subtitle="Regulaciones para el uso seguro de nuestra plataforma de salud."
        background="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
        height="35vh"
      />
      
      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          
          {/* Menú Lateral (Sidebar Navigation) */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3">
              <h5 className="fw-bold text-dark mb-4 px-2">Índice de Contenidos</h5>
              <div className="d-flex flex-column gap-2">
                {regulaciones.map((regla) => (
                  <button
                    key={regla.id}
                    onClick={() => setSeccionActiva(regla.id)}
                    className={`btn text-start py-3 px-3 fw-medium border-0 rounded-3 ${
                      seccionActiva === regla.id 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-secondary bg-transparent hover-bg-light'
                    }`}
                  >
                    {regla.titulo}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Área de Lectura */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
              <div className="card-body p-4 p-md-5">
                <div className="mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
                  <h3 className="fw-bold text-dark mb-0">
                    {contenidoActual.titulo}
                  </h3>
                  <span className="badge bg-light text-muted border">Actualizado 2026</span>
                </div>
                
                <div className="text-secondary fs-6" style={{ lineHeight: '1.8' }}>
                  {contenidoActual.contenido}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}