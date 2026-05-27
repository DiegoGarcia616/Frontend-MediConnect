import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logo2 from "../images/logo.png"

function Navbar2() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        background: "transparent",
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        backgroundColor: scrolled ? "rgba(255,255,255,0.65)" : "transparent",
        boxShadow: scrolled ? "0 6px 20px rgba(0,0,0,0.08)" : "none",
        flexWrap: "wrap"
      }}
    >

      <Link to="/inicio" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo2}
          alt="logo"
          style={{
            height: "56px",
            width: "auto",
            objectFit: "contain",
            transition: "transform 0.3s ease, filter 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)"
            e.currentTarget.style.filter = "drop-shadow(0px 6px 10px rgba(0,0,0,0.15))"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.filter = "none"
          }}
        />
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap"
        }}
      >

        <span
          style={{
            fontSize: "0.85rem",
            color: "#1f2937",
            fontWeight: 500,
            opacity: 0.8,
            whiteSpace: "nowrap"
          }}
        >
          ¿Aún no eres cliente?
        </span>

        <Link to="/precios" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(90deg, rgb(52,151,195), rgb(37,117,152))",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Ver planes
          </button>
        </Link>

      </div>

      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 12px 16px !important;
          }

          nav div span {
            font-size: 0.75rem;
          }

          nav button {
            padding: 7px 12px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>

    </nav>
  )
}

export default Navbar2