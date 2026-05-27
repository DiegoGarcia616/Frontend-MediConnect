// NO USAR ESTO AUN , SERA PARA INTERFAZ LOGIN

import { Outlet } from "react-router-dom"
import WhatsappBoton from "../components/WhatsappBoton"
import Navbar2 from "../components/NavbarLogin"

export default function LoginLayout() {
  return (
    <>
      <Navbar2 />

      <main>
        <Outlet />
      </main>

      <WhatsappBoton />
    </>
  )
}