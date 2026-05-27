import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import WhatsappBoton from "../components/WhatsappBoton"
import { Outlet } from "react-router-dom"

export default function PublicLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <WhatsappBoton />

      <Footer />
    </div>
  )
}