import React, { useState } from 'react';
import Hero from '../../components/Hero';
import ImagenTerminos from '../../images/fondo-terminos.avif'; 

const regulaciones = [
  { id: 1, titulo: "1. Uso General del Portal", contenido: "Al utilizar el sitio web oficial de MediConnect, usted se compromete a ingresar información real, fidedigna y actualizada para sus programaciones de citas e historial médico. Este portal ha sido diseñado exclusivamente para facilitarle la gestión de sus consultas de salud de manera transparente, permitiéndole acceder a sus datos desde cualquier computadora o dispositivo móvil con total seguridad y confidencialidad." },
  { id: 2, titulo: "2. Programación de Citas", contenido: "Para asegurar una atención ordenada y justa para toda nuestra comunidad de pacientes en nuestra sede de Lima Norte, la gestión de turnos médicos se rige bajo las siguientes condiciones: Nuestro sistema valida al instante los horarios de los médicos especialistas antes de confirmar su cupo, evitando cruces de citas. Si presenta inconvenientes, debe cancelar su cita directamente desde su panel con la debida anticipación." },
  { id: 3, titulo: "3. Recetas y Órdenes", contenido: "Una vez concluida satisfactoriamente su consulta con el especialista, el sistema registrará una receta electrónica oficial que quedará permanentemente guardada dentro de su cuenta para futuras lecturas. Este sistema web no realiza envíos automáticos de datos a cadenas de farmacias externas ni a laboratorios ajenos a la organización." },
  { id: 4, titulo: "4. Aspectos Técnicos", contenido: "Dado que MediConnect almacena y procesa toda la información clínica de manera segura a través de internet (servicios en la nube), es un requisito indispensable que el usuario cuente con una conexión a red estable para navegar por el portal. La clínica no se hace responsable por caídas en el servicio visual provocadas por fallas directas en su proveedor de internet." }
];

export default function Terminos() {
  const [seccionActiva, setSeccionActiva] = useState(1);
  const contenidoActual = regulaciones.find(r => r.id === seccionActiva);

  return (
    <div className="bg-light pb-5">

      <Hero 
        title="Términos y Condiciones" 
        subtitle="Regulaciones para el uso seguro de nuestra plataforma de salud."
        background={ImagenTerminos} 
        height="60vh"
      />
      
      <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <div className="row g-4 justify-content-center">
          
          <div className="col-12 col-lg-3">
            <div className="nav flex-column nav-pills gap-2 p-3 bg-white shadow-sm rounded-4 border border-light">
              <p className="text-uppercase text-muted small fw-bold px-3 mb-2 mt-2 text-center text-lg-start">
                Navegación Legal
              </p>

              {regulaciones.map((regla) => (
                <button
                  key={regla.id}
                  onClick={() => setSeccionActiva(regla.id)}
                  className={`nav-link text-center text-lg-start py-3 px-3 rounded-3 fw-medium ${
                    seccionActiva === regla.id
                      ? 'active shadow-sm text-white'
                      : 'text-secondary bg-transparent'
                  }`}
                  style={seccionActiva === regla.id ? { backgroundColor: '#0a2e5c' } : {}}
                >
                  {regla.titulo}
                </button>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 p-md-5 bg-white">
              
              <div className="mb-4 pb-3 border-bottom d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start gap-3">
                <h3 className="fw-bold text-dark mb-0">{contenidoActual.titulo}</h3>
                <span className="badge bg-light text-muted border px-3 py-2">
                  Actualizado 2026
                </span>
              </div>
              
              <div className="text-secondary fs-6 lead lh-lg text-center text-md-start">
                {contenidoActual.contenido}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}