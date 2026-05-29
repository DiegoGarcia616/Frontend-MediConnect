import SidebarLayout from "../components/SidebarLayout"
import { FiHome, FiCalendar, FiFileText, FiUser } from "react-icons/fi"

const menuItems = [
  { section: "Principal" },
  { title: "Inicio", path: "/paciente", icon: <FiHome size={18} /> },
  { title: "Mis citas", path: "/paciente/citas", icon: <FiCalendar size={18} /> },
  { title: "Resultados", path: "/paciente/resultados", icon: <FiFileText size={18} /> },
  { section: "Cuenta" },
  { title: "Mi perfil", path: "/paciente/perfil", icon: <FiUser size={18} /> },
]

export default function PacienteSidebar({ isOpen, setIsOpen }) {
  return (
    <SidebarLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      panelLabel="Portal Paciente"
      accentColor="#0ea5e9"
      accentLight="#e0f2fe"
      accentDark="#0369a1"
      menuItems={menuItems}
    />
  )
}