import DerechosCard from "./DerechosCard";

function DerechosPacienteComponent() {

  const derechos = [
    {
      titulo: "Derecho a la información",
      descripcion:
        "El paciente tiene derecho a recibir información clara sobre su diagnóstico y tratamiento."
    },
    {
      titulo: "Derecho a la privacidad",
      descripcion:
        "Toda la información médica del paciente debe mantenerse confidencial."
    },
    {
      titulo: "Deber de respeto",
      descripcion:
        "El paciente debe mantener un trato respetuoso con el personal médico."
    },
    {
      titulo: "Derecho a una atención digna",
      descripcion:
        "Todo paciente debe recibir atención médica con respeto y sin discriminación."
    }
  ];

  return (

    <div className="container py-5">

      <div
        className="rounded-5 shadow-lg text-center text-white mb-5 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)",
          padding: "70px 20px"
        }}
      >

        <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-semibold">
          Información del Paciente
        </span>

        <h1 className="fw-bold display-5 mb-3">
          Derechos y Deberes del Paciente
        </h1>

        <p className="opacity-90 mx-auto" style={{ maxWidth: "750px" }}>
          Conoce los principales derechos y responsabilidades durante tu atención médica,
          garantizando una experiencia segura y respetuosa.
        </p>

      </div>

      <div className="row g-4 justify-content-center">

        {derechos.map((item, index) => (

          <div className="col-12 col-md-6 col-lg-5" key={index}>

            <DerechosCard
              titulo={item.titulo}
              descripcion={item.descripcion}
            />

          </div>

        ))}

      </div>

    </div>

  );
}

export default DerechosPacienteComponent;