import { Link } from "react-router-dom"
import logo2 from "../images/MediconnectLogo.png"

export default function Navbar2() {
  return (
    <Link to="/inicio" className="navbar-logo-link">
      <img
        src={logo2}
        alt="logo"
        className="navbar-logo"
      />

      <style>{`
        .navbar-logo-link {
          display: inline-flex;
          max-width: 100%;
        }

        .navbar-logo {
          height: clamp(42px, 10vw, 56px);
          max-width: 100%;
          width: auto;
          object-fit: contain;
        }

        @media (max-width: 360px) {
          .navbar-logo {
            height: 38px;
          }
        }

        @media (min-width: 992px) and (max-width: 1600px) {
          .navbar-logo {
            height: clamp(35px, 9vw, 60px);
          }
        }

        @media (min-width: 1601px) {
          .navbar-logo {
            height: clamp(38px, 9vw, 150px);
          }
        }
      `}</style>
    </Link>
  )
}