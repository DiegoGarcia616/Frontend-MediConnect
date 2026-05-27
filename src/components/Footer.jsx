import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa"
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"
import logo from "../images/MediconnectLogo.png"

function Footer() {

  const institucional = [
    { to: "/nosotros", label: "Nosotros" },
    { to: "/especialidades", label: "Especialidades" },
    { to: "/staff-medico", label: "Staff Médico" }
  ]

  const pacientes = [
    { to: "/derechos-y-deberes-del-paciente", label: "Derechos y deberes del paciente" },
    { to: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
    { to: "/libro-de-reclamaciones", label: "Libro de reclamaciones" }
  ]

  const legales = [
    { to: "/politica-de-privacidad", label: "Política de privacidad" },
    { to: "/terminos-y-condiciones", label: "Términos y condiciones" }
  ]

  const socials = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaYoutube />, href: "https://youtube.com" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com" }
  ]

  return (
    <footer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .footer {
          background: linear-gradient(180deg, #0f2f5f 0%, #144a8b 100%);
          color: #fff;
          font-family: 'Poppins', sans-serif;
          padding: 50px 0 0;
          position: relative;
          overflow: hidden;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: left;
        }

        .footer-logo {
          height: 60px;
          margin-bottom: 15px;
          filter: brightness(0) invert(1);
          display: block;
          margin-left: auto;
          margin-right: auto;
          transform: translateX(6px);
        }

        .footer-desc {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
        }

        .footer-col h5 {
          font-size: 0.95rem;
          margin-bottom: 14px;
          font-weight: 600;
          color: #fff;
          display: inline-block;
          position: relative;
          padding-bottom: 6px;
        }

        .footer-col h5::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #fff;
          opacity: 0.8;
          border-radius: 2px;
        }

        .footer-col a {
          display: block;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 0.9rem;
          padding: 5px 0;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-col a::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 0%;
          height: 1px;
          background: #fff;
          transition: width 0.3s ease;
          opacity: 0.6;
        }

        .footer-col a:hover {
          color: #fff;
          transform: translateX(6px);
        }

        .footer-col a:hover::before {
          width: 60%;
        }

        .footer-contact {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
          margin: 35px 0 25px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.75);
        }

        .footer-contact div {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-socials {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 25px;
        }

        .footer-socials a {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: all 0.35s ease;
          text-decoration: none;
        }

        .footer-socials a:hover {
          background: #fff;
          color: #144a8b;
          transform: translateY(-6px) scale(1.1);
          box-shadow: 0 12px 25px rgba(0,0,0,0.25);
        }

        .footer-bottom {
          background: rgba(0,0,0,0.25);
          padding: 14px 0;
          text-align: center;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
        }

        .footer-bottom span {
          color: #fff;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 18px;
          }

          .footer-logo {
            margin-left: auto;
            margin-right: auto;
            transform: none;
          }

          .footer-col {
            margin-bottom: 10px;
          }

          .footer-col h5 {
            margin-bottom: 8px;
          }

          .footer-col a {
            padding: 3px 0;
          }

          .footer-contact {
            gap: 10px;
            margin: 20px 0;
          }

          .footer-socials {
            margin-bottom: 18px;
          }
        }
      `}</style>

      <div className="footer">
        <Container>
          <div className="footer-top">

            <div>
              <img src={logo} alt="Mediconnect" className="footer-logo" />
              <p className="footer-desc">
                Plataforma de salud digital que conecta pacientes con especialistas de forma rápida, segura y confiable.
              </p>
            </div>

            <div className="footer-col">
              <h5>Institucional</h5>
              {institucional.map((l) => (
                <Link key={l.to} to={l.to}>{l.label}</Link>
              ))}
            </div>

            <div className="footer-col">
              <h5>Pacientes</h5>
              {pacientes.map((l) => (
                <Link key={l.to} to={l.to}>{l.label}</Link>
              ))}
            </div>

            <div className="footer-col">
              <h5>Legal</h5>
              {legales.map((l) => (
                <Link key={l.to} to={l.to}>{l.label}</Link>
              ))}
            </div>

          </div>

          <div className="footer-contact">
            <div><FiPhone /> 599 2000</div>
            <div><FiMail /> contacto@mediconnect.pe</div>
            <div><FiMapPin /> San Isidro, Lima</div>
          </div>

          <div className="footer-socials">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </Container>

        <div className="footer-bottom">
          © 2026 <span>Mediconnect</span>. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer