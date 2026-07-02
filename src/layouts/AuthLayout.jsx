// AuthLayout.jsx
import { Outlet } from "react-router-dom"

import Navbar2 from "../components/NavbarLogin"
import WhatsappBoton from "../components/WhatsappBoton"
import AuthCarousel from "../components/auth/AuthCarousel"

export default function AuthLayout() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0 vh-100">
        {/* IZQUIERDA */}
        <div className="col-lg-6 d-none d-lg-block vh-100">
          <AuthCarousel />
        </div>

        {/* DERECHA */}
        <div
          className="col-12 col-lg-6 d-flex flex-column vh-100"
          style={{ backgroundColor: "#e8f4fd" }}
        >
          {/* NAVBAR (arriba, altura fija) */}
          <div
            className="px-4 px-lg-5"
            style={{
              paddingTop: "18px",
              paddingBottom: "0",
              flex: "0 0 auto"
            }}
          >
            <Navbar2 />
          </div>

          {/* CONTENIDO*/}
          <div
            className="px-4 px-lg-5 d-flex justify-content-center"
            style={{
              marginTop: "24px",  
              alignItems: "flex-start",
              flex: "1 1 auto"     
            }}
          >
            <Outlet />
          </div>

          <WhatsappBoton />
        </div>
      </div>
    </div>
  )
}