import DerechosCard from "./DerechosCard"

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
  ]

  return (

    <div
      className="container py-15"
      style={{
        paddingTop: "140px",
        paddingBottom: "100px"
      }}
    >

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Derechos y Deberes del Paciente
        </h1>

        <p className="text-muted mt-3">
          Conoce los principales derechos y responsabilidades
          durante tu atención médica.
        </p>

      </div>

      <div
        className="row g-4 justify-content-center"
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >

        {derechos.map((item, index) => (

          <div
            className="col-12 col-md-6"
            key={index}
          >

            <DerechosCard
              titulo={item.titulo}
              descripcion={item.descripcion}
            />

          </div>

        ))}

      </div>

    </div>

  )
}

export default DerechosPacienteComponent