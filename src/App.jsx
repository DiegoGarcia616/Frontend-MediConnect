import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import ScrollToTop from "./components/ScrollTop"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import PublicLayout from "./layouts/PublicLayout"

// Navbar
import Inicio from "./pages/public/Inicio"
import Servicios from "./pages/public/Servicios"
import Sedes from "./pages/public/Sedes"
import Convenios from "./pages/public/Convenios"
import Contacto from "./pages/public/Contacto"
import PortalWeb from "./pages/public/PortalWeb"

// Institucional
import Nosotros from "./pages/public/Nosotros"
import Especialidades from "./pages/public/Especialidades"
import StaffMedico from "./pages/public/StaffMedico"

// Pacientes
import DerechosPaciente from "./pages/public/DerechosPaciente"
import PreguntasFrecuentes from "./pages/public/PreguntasFrecuentes"
import LibroReclamaciones from "./pages/public/LibroReclamaciones"

// Legales
import Privacidad from "./pages/public/Privacidad"
import Terminos from "./pages/public/Terminos"

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/sedes" element={<Sedes />} />
          <Route path="/convenios" element={<Convenios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/portal-web" element={<PortalWeb />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/staff-medico" element={<StaffMedico />} />
          <Route path="/derechos-y-deberes-del-paciente" element={<DerechosPaciente />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/libro-de-reclamaciones" element={<LibroReclamaciones />} />
          <Route path="/politica-de-privacidad" element={<Privacidad />} />
          <Route path="/terminos-y-condiciones" element={<Terminos />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Router>
  )
}

export default App