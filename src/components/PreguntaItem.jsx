function PreguntaItem({
    pregunta,
    respuesta,
    index
}) {

    return (

        <div className="accordion-item bg-white border-0 mb-3 rounded-4 shadow-sm overflow-hidden">

            <h2 className="accordion-header">

                <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq-${index}`}
                >
                    {pregunta}
                </button>

            </h2>

            <div
                id={`faq-${index}`}
                className="accordion-collapse collapse bg-white"
                data-bs-parent="#faqAccordion"
            >

                <div className="accordion-body bg-white text-dark">
                    {respuesta}
                </div>

            </div>

        </div>

    )
}

export default PreguntaItem