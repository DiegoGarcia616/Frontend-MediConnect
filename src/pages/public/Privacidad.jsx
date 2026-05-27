import React from 'react';
import Hero from '../../components/Hero';

export default function Privacidad() {
  return (
    <div className="bg-light pb-5">
      <Hero 
        title="Política de Privacidad y Confidencialidad" 
        subtitle="Explicamos detalladamente y sin términos complejos cómo cuidamos su información médica."
        background="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
        height="40vh"
      />
      
      <div className="container mt-5">
        <div className="row">
          
          {/* Índice lateral */}
          <div className="col-lg-4 d-none d-lg-block">
            <div className="card border-0 shadow-sm rounded-4 position-sticky" style={{ top: '2rem' }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3 text-dark">Secciones de Interés</h5>
                <nav className="nav flex-column gap-2">
                  <a className="nav-link text-secondary ps-0 py-1" href="#responsable">Quién cuida sus datos</a>
                  <a className="nav-link text-secondary ps-0 py-1" href="#uso">Para qué usamos su información</a>
                  <a className="nav-link text-secondary ps-0 py-1" href="#proteccion">Nuestros candados de seguridad</a>
                  <a className="nav-link text-secondary ps-0 py-1" href="#control">Cómo actualizar sus datos</a>
                </nav>
              </div>
            </div>
          </div>

          {/* Contenido comprensible para todo usuario */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5 text-secondary" style={{ lineHeight: '1.9' }}>
                
                <section id="responsable" className="mb-5">
                  <h4 className="fw-bold text-dark mb-3">¿Quién es el responsable de cuidar sus datos?</h4>
                  <p>
                    La clínica privada <strong>MediConnect</strong> (ubicada en Lima Norte) es la encargada de recibir, organizar y proteger la información personal que usted nos brinda al registrarse. Consideramos que la reserva sobre su estado de salud es un derecho fundamental y lo tratamos con el máximo cuidado ético y profesional.
                  </p>
                </section>

                <section id="uso" className="mb-5">
                  <h4 className="fw-bold text-dark mb-3">¿Para qué fines utilizamos su información?</h4>
                  <p>Los datos que nos proporciona solo se usan para actividades estrictamente médicas y de atención asistencial, tales como:</p>
                  <ul className="list-group list-group-flush mb-3 mt-2 border-start border-primary border-3 ps-1">
                    <li className="list-group-item bg-transparent py-2">Separar, cambiar o cancelar sus citas de manera ordenada en medicina general, pediatría o cardiología.</li>
                    <li className="list-group-item bg-transparent py-2">Mantener organizada su <strong>Ficha Médica Digital</strong>, de modo que cuando lo atienda un especialista, este pueda ver al instante sus consultas pasadas, diagnósticos y alergias, evitando errores médicos.</li>
                    <li className="list-group-item bg-transparent py-2">Generar sus recetas digitales para que pueda verlas en su pantalla cuando las necesite y enviarle avisos automáticos recordándole sus citas confirmadas.</li>
                  </ul>
                </section>

                <section id="proteccion" className="mb-5">
                  <h4 className="fw-bold text-dark mb-3">Nuestros candados digitales de seguridad</h4>
                  <p>
                    Para asegurar que sus datos de salud no sean vistos por extraños, hemos incorporado herramientas de protección digital sumamente rigurosas que funcionan como <strong>llaves de acceso inteligentes</strong>. 
                  </p>
                  <p>
                    Cuando usted o un médico inician sesión, el sistema genera un pase de seguridad único para ese momento. Este pase identifica exactamente si quien ingresa es usted, el médico encargado de atenderlo o el administrador de la clínica. Un médico de una especialidad no puede ver las recetas de pacientes que no están a su cargo, y ningún usuario externo puede ingresar a su cuenta.
                  </p>
                  <p>
                    Además, toda esta información se guarda de manera centralizada en servidores remotos de alta seguridad en internet (la nube), lo que garantiza que sus historias clínicas estén resguardadas contra pérdidas físicas, incendios o deterioros de papel que comúnmente ocurrían en los archivos tradicionales.
                  </p>
                </section>

                <section id="control">
                  <h4 className="fw-bold text-dark mb-3">Usted tiene el control sobre sus datos</h4>
                  <p>
                    De acuerdo con las leyes peruanas de protección de datos personales, usted es el único dueño de su información. Esto significa que tiene el derecho pleno de ingresar a nuestro portal para revisar qué datos tenemos guardados, corregir algún número telefónico o correo si ha cambiado, o solicitar el cierre de su cuenta si lo considera conveniente.
                  </p>
                </section>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}