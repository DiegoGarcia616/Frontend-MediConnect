import React from 'react';
import Hero from '../../components/Hero';
import InfoCard from '../../components/InfoCard';
import PolicySection from '../../components/legal/PolicySection';
import ImagenPrivacidad from '../../images/privacidad.avif';

const accentColor = '#0a2e5c';

const infoCards = [
  {
    icon: 'bi-shield-lock-fill',
    title: 'Máxima Seguridad',
    description: 'Tus datos médicos se almacenan en servidores encriptados en la nube, inaccesibles para extraños.'
  },
  {
    icon: 'bi-person-badge-fill',
    title: 'Acceso Restringido',
    description: 'Solo tú y tu médico tratante en nuestra sede de Lima Norte pueden ver tu historial y recetas.'
  },
  {
    icon: 'bi-person-check-fill',
    title: 'Control Total',
    description: 'Tú decides. Tienes derecho a solicitar, modificar o eliminar tu información en cualquier momento.'
  }
];

const politicas = [
  {
    titulo: '1. Fines del Tratamiento de Datos',
    descripcion: 'Los datos que nos proporciona solo se usan para actividades estrictamente médicas y asistenciales:',
    items: [
      { label: 'Gestión de turnos', text: 'Separar, cambiar o cancelar sus citas de manera ordenada.' },
      { label: 'Ficha Médica Digital', text: 'Mantener su historial organizado para que el especialista evite errores médicos.' }
    ]
  },
  {
    titulo: '2. Nuestros Candados Digitales',
    descripcion: 'Hemos incorporado herramientas de protección digital rigurosas (sistemas basados en JWT). Cuando usted o un médico inician sesión, el sistema genera un pase de seguridad temporal único.'
  },
  {
    titulo: '3. Derechos ARCO',
    descripcion: 'De acuerdo con las leyes peruanas, usted tiene el derecho pleno de ingresar a nuestro portal para revisar qué datos tenemos guardados, corregir algún número si ha cambiado, o solicitar el cierre de su cuenta.'
  }
];

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
        <div className="row justify-content-center mb-5">
          {infoCards.map((card, i) => (
            <InfoCard key={i} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </div>

        <PolicySection titulo="Detalle de nuestras Políticas" politicas={politicas} accentColor={accentColor} />
      </div>
    </div>
  );
}