import React from "react"
import { FaWhatsapp } from "react-icons/fa"

const WhatsappBoton = () => {
  const phone = "51914022597"

  const message =
    "Hola, quisiera hacer una consulta con la Clínica MedicoConnect. ¿Podrían brindarme información por favor?"

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title="Contactar por WhatsApp"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "65px",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
        zIndex: 1500,
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.12)"
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.45)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.35)"
      }}
    >
      <FaWhatsapp size={32} />
    </a>
  )
}

export default WhatsappBoton