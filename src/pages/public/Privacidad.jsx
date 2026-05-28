import React from 'react';
import Hero from '../../components/Hero';
import InfoCard from '../../components/InfoCard'; 
import ImagenPrivacidad from '../../images/privacidad.avif';

export default function Privacidad() {
  return (
    <div className="bg-light pb-5" style={{ minHeight: '100vh' }}>
      <Hero 
        title="Privacidad y Confidencialidad" 
        subtitle="Tu salud es personal. Tus datos también lo son."
        background={ImagenPrivacidad} 
        height="40vh"
      />
      
      <div className="container mt-5">
        
        {/* REUTILIZANDO TU COMPONENTE INFOCARD */}
        <div className="row justify-content-center mb-5">
          <InfoCard 
            icon="bi-shield-lock-fill" 
            title="Máxima Seguridad" 
            description="Tus datos médicos se almacenan en servidores encriptados en la nube, inaccesibles para extraños." 
          />
          <InfoCard 
            icon="bi-person-badge-fill" 
            title="Acceso Restringido" 
            description="Solo tú y tu médico tratante en nuestra sede de Lima Norte pueden ver tu historial y recetas." 
          />
          <InfoCard 
            icon="bi-person-check-fill" 
            title="Control Total" 
            description="Tú decides. Tienes derecho a solicitar, modificar o eliminar tu información en cualquier momento." 
          />
        </div>

        {/* Textos Legales */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 bg-white">
              <div className="card-body p-4 p-md-5 text-secondary text-center text-md-start" style={{ lineHeight: '1.9' }}>
                <h3 className="fw-bold mb-4 border-bottom pb-3 text-dark">Detalle de nuestras Políticas</h3>
                
                <div className="mb-5">
                  <h5 className="fw-bold mb-3" style={{ color: '#0a2e5c' }}>1. Fines del Tratamiento de Datos</h5>
                  <p>Los datos que nos proporciona solo se usan para actividades estrictamente médicas y asistenciales:</p>
                  <ul className="list-group list-group-flush border rounded-3 bg-light text-start">
                    <li className="list-group-item bg-transparent"><strong>Gestión de turnos:</strong> Separar, cambiar o cancelar sus citas de manera ordenada.</li>
                    <li className="list-group-item bg-transparent"><strong>Ficha Médica Digital:</strong> Mantener su historial organizado para que el especialista evite errores médicos.</li>
                  </ul>
                </div>
                
                <div className="mb-5">
                  <h5 className="fw-bold mb-3" style={{ color: '#0a2e5c' }}>2. Nuestros Candados Digitales</h5>
                  <p>Hemos incorporado herramientas de protección digital rigurosas (sistemas basados en JWT). Cuando usted o un médico inician sesión, el sistema genera un pase de seguridad temporal único.</p>
                </div>
                
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: '#0a2e5c' }}>3. Derechos ARCO</h5>
                  <p>De acuerdo con las leyes peruanas, usted tiene el derecho pleno de ingresar a nuestro portal para revisar qué datos tenemos guardados, corregir algún número si ha cambiado, o solicitar el cierre de su cuenta.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}