import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavbarBS from "react-bootstrap/Navbar"
import { FaPhone } from "react-icons/fa"
import logo from "../images/MediconnectLogo.png"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { to: "/servicios", label: "Servicios" },
    { to: "/sedes", label: "Sedes" },
    { to: "/convenios", label: "Convenios" },
    { to: "/contacto", label: "Contacto" }
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .mediconnect-navbar {
          background-color: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          padding-top: 14px !important;
          padding-bottom: 14px !important;
          font-family: 'Poppins', sans-serif;
          z-index: 1030;
        }

        .mediconnect-navbar.scrolled {
          box-shadow: 0 6px 22px rgba(0,0,0,0.08);
        }

        .nav-link-custom {
          font-size: 1rem;
          font-weight: 500;
          color: #1e3a5f !important;
          padding: 10px 16px !important;
          border-radius: 10px;
          transition: all 0.25s ease;
          letter-spacing: 0.3px;
        }

        .nav-link-custom:hover {
          background-color: #f0f6ff;
          color: #1a73e8 !important;
        }

        .phone-static {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 1.05rem;
          color: #1e3a5f;
        }

        .phone-icon {
          background-color: #e8f0fe;
          padding: 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(100deg);
        }

        .btn-portal {
          background: linear-gradient(135deg, #1a73e8, #00c2a8);
          color: #ffffff !important;
          border: none;
          border-radius: 12px;
          padding: 11px 22px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.25s ease;
          box-shadow: 0 6px 14px rgba(0, 194, 168, 0.25);
          position: relative;
          overflow: hidden;
        }

        .btn-portal::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transition: all 0.6s ease;
        }

        .btn-portal:hover::before {
          left: 100%;
        }

        .btn-portal:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(26, 115, 232, 0.25);
          filter: brightness(1.05);
        }

        .brand-logo {
          height: 72px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .brand-logo:hover {
          transform: scale(1.05);
        }

        .navbar-toggler {
          border: none !important;
          box-shadow: none !important;
        }

        .mobile-phone {
          display: none;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        @media (max-width: 991px) {
          .mobile-phone {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
            font-size: 1.05rem;
            color: #1e3a5f;
          }

          .mobile-phone .phone-icon {
            background-color: #e8f0fe;
            padding: 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(100deg);
          }

          .right-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
            margin-top: 15px;
          }

          .phone-static {
            justify-content: center;
          }

          .brand-logo {
            height: 60px;
          }
        }
      `}</style>

      <NavbarBS
        expand="lg"
        sticky="top"
        className={`mediconnect-navbar ${scrolled ? "scrolled" : ""}`}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container className="d-flex align-items-center justify-content-between">

          <NavbarBS.Brand
            as={Link}
            to="/inicio"
            onClick={() => setExpanded(false)}
            className="d-flex align-items-center"
          >
            <img src={logo} alt="Mediconnect" className="brand-logo" />
          </NavbarBS.Brand>

          <div className="mobile-phone d-lg-none">
            <span className="phone-icon">
              <FaPhone size={14} color="#1a73e8" />
            </span>
            599 2000
          </div>

          <NavbarBS.Toggle aria-controls="main-nav" />

          <NavbarBS.Collapse id="main-nav">
            <Nav className="mx-auto align-items-lg-center gap-2">
              {links.map(({ to, label }) => (
                <Nav.Link
                  key={to}
                  as={Link}
                  to={to}
                  className="nav-link-custom"
                  onClick={() => setExpanded(false)}
                >
                  {label}
                </Nav.Link>
              ))}
            </Nav>

            <div className="right-section">

              <div className="phone-static d-none d-lg-flex">
                <span className="phone-icon">
                  <FaPhone size={14} color="#1a73e8" />
                </span>
                599 2000
              </div>

              <Link
                to="/portal-web"
                className="btn-portal"
                onClick={() => {
                  console.log("CLICK PORTAL WEB")
                  setExpanded(false)
                }}
              >
                Portal Web
              </Link>

            </div>
          </NavbarBS.Collapse>

        </Container>
      </NavbarBS>
    </>
  )
}

export default Navbar