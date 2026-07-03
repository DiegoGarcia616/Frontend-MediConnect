// AuthLayout.jsx
import { Outlet } from "react-router-dom"

import Navbar2 from "../components/NavbarLogin"
import WhatsappBoton from "../components/WhatsappBoton"
import AuthCarousel from "../components/auth/AuthCarousel"

export default function AuthLayout() {
  return (
    <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        <div className="col-lg-6 d-none d-lg-block" style={{ minHeight: "100vh" }}>
          <AuthCarousel />
        </div>

        <div
          className="col-12 col-lg-6 d-flex flex-column"
          style={{
            backgroundColor: "#e8f4fd",
            minHeight: "100vh",
            maxHeight: "100vh",
            overflowY: "auto"
          }}
        >
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

          <div
            className="px-4 px-lg-5 d-flex justify-content-center auth-content"
            style={{
              alignItems: "flex-start",
              flex: "1 1 auto"
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>

      <WhatsappBoton />

      <style>
        {`
          .auth-content {
              margin-top: 24px;
              padding-bottom: 40px;
          }

          @media (max-width: 992px) {
              .auth-content {
                  margin-top: 16px;
                  padding-bottom: 90px;
              }
          }
        `}
      </style>
    </div>
  )
}