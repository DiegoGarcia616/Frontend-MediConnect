import React, { useState } from 'react';
import Hero from '../../components/Hero';
import LegalNav from '../../components/legal/LegalNav';
import LegalContent from '../../components/legal/LegalContent';
import ImagenTerminos from '../../images/fondo-terminos.avif';

const regulaciones = [
  {
    id: 1,
    titulo: "1. Uso General del Portal",
    contenido: "Al utilizar el sitio web oficial de MediConnect, usted se compromete a ingresar información real, fidedigna y actualizada para sus programaciones de citas e historial médico. Este portal fue diseñado exclusivamente para facilitarle la gestión de sus consultas de salud de manera transparente, permitiéndole acceder a sus datos desde cualquier computadora o dispositivo móvil con total seguridad, respaldo técnico y absoluta confidencialidad."
  },
  {
    id: 2,
    titulo: "2. Programación de Citas",
    contenido: "Para garantizar una atención ordenada y justa para toda nuestra comunidad de pacientes en nuestra sede de Lima Norte, la gestión de turnos médicos se rige bajo condiciones claras: nuestro sistema valida al instante los horarios de los especialistas antes de confirmar su cupo, evitando cruces de citas. Si presenta inconvenientes, cancele su cita desde su panel con la debida anticipación."
  },
  {
    id: 3,
    titulo: "3. Recetas y Órdenes",
    contenido: "Una vez concluida satisfactoriamente su consulta con el especialista, el sistema registrará una receta electrónica oficial que quedará permanentemente guardada dentro de su cuenta para futuras lecturas. Este sistema web no realiza envíos automáticos de datos a cadenas de farmacias externas ni a laboratorios ajenos a nuestra organización, garantizando así el resguardo total de su información médica."
  },
  {
    id: 4,
    titulo: "4. Aspectos Técnicos",
    contenido: "Dado que MediConnect almacena y procesa toda la información clínica de manera segura a través de servicios en la nube, es un requisito indispensable que el usuario cuente con una conexión a red estable para navegar por el portal. La clínica no se hace responsable por caídas en el servicio visual provocadas por fallas directas en su proveedor de internet."
  }
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
            <LegalNav
              items={regulaciones}
              activeId={seccionActiva}
              onSelect={setSeccionActiva}
              activeColor="#0a2e5c"
              accentColor="#12b886"
              label="Navegación Legal"
            />
          </div>

          <div className="col-12 col-lg-8">
            <LegalContent
              titulo={contenidoActual.titulo}
              contenido={contenidoActual.contenido}
              badgeText="Actualizado 2026"
              accentColor="#12b886"
            />
          </div>

        </div>
      </div>
    </div>
  );
}