import { useState, useRef } from "react";

function FAQ({ items = [], title = "Preguntas Frecuentes", subtitle = "Resuelve tus dudas", primaryColor = "#0a2e5c", accentColor = "#12b886", accentBg = "#e6f7f1" }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-5" style={{ background: "linear-gradient(180deg, #f4f8fb 0%, #ffffff 100%)" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2" style={{ color: primaryColor, fontSize: "2.2rem" }}>
            {title}
          </h2>
          <p style={{ color: accentColor }}>{subtitle}</p>
        </div>

        <div className="mx-auto" style={{ maxWidth: "820px" }}>
          {items.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="mb-3"
                style={{
                  borderRadius: "16px",
                  border: `1px solid ${accentBg}`,
                  background: "#ffffff",
                  boxShadow: isOpen ? `0 10px 25px ${primaryColor}26` : "0 4px 10px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease"
                }}
              >
                <div
                  onClick={() => toggle(index)}
                  className="d-flex justify-content-between align-items-center px-4 py-3"
                  style={{ cursor: "pointer" }}
                >
                  <h6 className="mb-0 fw-semibold" style={{ color: primaryColor, fontSize: "1rem" }}>
                    {item.pregunta}
                  </h6>

                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: accentBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accentColor,
                      fontSize: "1.2rem",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    +
                  </div>
                </div>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{
                    maxHeight: isOpen ? contentRefs.current[index]?.scrollHeight + "px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease"
                  }}
                >
                  <div className="px-4 pb-4 pt-1">
                    <p className="mb-0" style={{ color: "#5b6b79", lineHeight: "1.6" }}>
                      {item.respuesta}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;