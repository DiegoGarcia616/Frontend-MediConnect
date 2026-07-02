import { Link } from "react-router-dom"
import logo2 from "../images/MediconnectLogo.png"

export default function Navbar2() {

  return (
    <Link to="/inicio">

      <img
        src={logo2}
        alt="logo"
        style={{
          height: "150px",
          objectFit: "contain"
        }}
      />

    </Link>
  )
}