import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import ScrollToTop from "./components/ScrollTop"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import PublicLayout from "./layouts/PublicLayout"
import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

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

// Pacientes (público)
import DerechosPaciente from "./pages/public/DerechosPaciente"
import PreguntasFrecuentes from "./pages/public/PreguntasFrecuentes"
import LibroReclamaciones from "./pages/public/LibroReclamaciones"

// Legales
import Privacidad from "./pages/public/Privacidad"
import Terminos from "./pages/public/Terminos"

// Sidebars privados (uno por rol)
import PacienteSidebar from "./sidebars/PacienteSidebar"
import MedicoSidebar from "./sidebars/MedicoSidebar"
import AdminLocalSidebar from "./sidebars/AdminLocalSidebar"
import AdminTotalSidebar from "./sidebars/AdminTotalSidebar"

// Páginas privadas - Paciente
import DashboardPaciente from "./pages/paciente/DashboardPaciente"
import MisCitas from "./pages/paciente/MisCitas"
import MisResultados from "./pages/paciente/MisResultados"
import MiPerfil from "./pages/paciente/MiPerfil"

// Páginas privadas - Médico
import DashboardMedico from "./pages/medico/DashboardMedico"
import AgendaMedico from "./pages/medico/AgendaMedico"
import MisPacientes from "./pages/medico/MisPacientes"
import HistoriasClinicas from "./pages/medico/HistoriasClinicas"
import ConsultaMedica from "./pages/medico/ConsultaMedica"
import ProfileMedico from "./pages/medico/ProfileMedico"

// Páginas privadas - Admin Local
import DashboardAdminLocal from "./pages/adminLocal/DashboardAdminLocal"
import AdminLocalPacientes from "./pages/adminLocal/AdminLocalPacientes"
import AdminLocalMedicos from "./pages/adminLocal/AdminLocalMedicos"
import AdminLocalCitas from "./pages/adminLocal/AdminLocalCitas"
import AdminLocalProfile from "./pages/adminLocal/AdminLocalProfile"

// Páginas privadas - Admin Total
import DashboardAdminTotal from "./pages/adminTotal/DashboardAdminTotal"
import AdminTotalPacientes from "./pages/adminTotal/AdminTotalPacientes"
import AdminTotalMedicos from "./pages/adminTotal/AdminTotalMedicos"
import AdminTotalCitas from "./pages/adminTotal/AdminTotalCitas"
import AdminTotalSedes from "./pages/adminTotal/AdminTotalSedes"
import AdminTotalUsuarios from "./pages/adminTotal/AdminTotalUsuarios"
import AdminTotalEspecialidades from "./pages/adminTotal/AdminTotalEspecialidades"
import AdminTotalProfile from "./pages/adminTotal/AdminTotalProfile"

function App() {
  return (
    <Router>
      <ScrollToTop />

      <style>
        {`
          @media (max-width: 576px) {
            .Toastify__toast-container {
              width: auto !important;
              max-width: 85vw !important;
              right: 1rem !important;
              left: auto !important;
              top: 1rem !important;
              padding: 0 !important;
            }

            .Toastify__toast {
              margin-bottom: 0.5rem !important;
              border-radius: 12px !important;
              font-size: 0.88rem !important;
              padding: 12px 16px !important;
              min-height: auto !important;
              word-wrap: break-word !important;
              white-space: normal !important;
            }

            .Toastify__toast-body {
              padding: 0 !important;
              line-height: 1.4 !important;
            }
          }
        `}
      </style>

      <Routes>
        {/* Público */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/sedes" element={<Sedes />} />
          <Route path="/convenios" element={<Convenios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/staff-medico" element={<StaffMedico />} />
          <Route path="/derechos-y-deberes-del-paciente" element={<DerechosPaciente />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/libro-de-reclamaciones" element={<LibroReclamaciones />} />
          <Route path="/politica-de-privacidad" element={<Privacidad />} />
          <Route path="/terminos-y-condiciones" element={<Terminos />} />
        </Route>

        {/* Login / acceso */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/portal-web" element={<PortalWeb />} />
          </Route>
        </Route>

        {/* Portal Paciente */}
        <Route element={<ProtectedRoute allowedRoles={["PACIENTE"]} />}>
          <Route element={<AppLayout Sidebar={PacienteSidebar} />}>
            <Route path="/paciente" element={<DashboardPaciente />} />
            <Route path="/paciente/citas" element={<MisCitas />} />
            <Route path="/paciente/resultados" element={<MisResultados />} />
            <Route path="/paciente/perfil" element={<MiPerfil />} />
          </Route>
        </Route>

        {/* Portal Médico */}
        <Route element={<ProtectedRoute allowedRoles={["MEDICO"]} />}>
          <Route element={<AppLayout Sidebar={MedicoSidebar} />}>
            <Route path="/medico" element={<DashboardMedico />} />
            <Route path="/medico/citas" element={<AgendaMedico />} />
            <Route path="/medico/pacientes" element={<MisPacientes />} />
            <Route path="/medico/historias" element={<HistoriasClinicas />} />
            <Route path="/medico/consulta/:id" element={<ConsultaMedica />} />
            <Route path="/medico/perfil" element={<ProfileMedico />} />
          </Route>
        </Route>

        {/* Portal Admin Local */}
        <Route element={<ProtectedRoute allowedRoles={["ADMINISTRADOR_LOCAL"]} />}>
          <Route element={<AppLayout Sidebar={AdminLocalSidebar} />}>
            <Route path="/admin-local" element={<DashboardAdminLocal />} />
            <Route path="/admin-local/pacientes" element={<AdminLocalPacientes />} />
            <Route path="/admin-local/medicos" element={<AdminLocalMedicos />} />
            <Route path="/admin-local/citas" element={<AdminLocalCitas />} />
            <Route path="/admin-local/perfil" element={<AdminLocalProfile />} />
          </Route>
        </Route>

        {/* Portal Admin Total */}
        <Route element={<ProtectedRoute allowedRoles={["ADMINISTRADOR_TOTAL"]} />}>
          <Route element={<AppLayout Sidebar={AdminTotalSidebar} />}>
            <Route path="/admin" element={<DashboardAdminTotal />} />
            <Route path="/admin/pacientes" element={<AdminTotalPacientes />} />
            <Route path="/admin/medicos" element={<AdminTotalMedicos />} />
            <Route path="/admin/citas" element={<AdminTotalCitas />} />
            <Route path="/admin/sedes" element={<AdminTotalSedes />} />
            <Route path="/admin/especialidades" element={<AdminTotalEspecialidades />} />
            <Route path="/admin/usuarios" element={<AdminTotalUsuarios />} />
            <Route path="/admin/perfil" element={<AdminTotalProfile />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  )
}

export default App