import SidebarLayout from "../components/SidebarLayout"
import { FiHome, FiCalendar, FiUsers, FiClipboard, FiUser } from "react-icons/fi"

const menuItems = [
  { section: "Atención" },
  { title: "Dashboard", path: "/medico", icon: <FiHome size={18} /> },
  { title: "Agenda", path: "/medico/citas", icon: <FiCalendar size={18} /> },
  { title: "Mis pacientes", path: "/medico/pacientes", icon: <FiUsers size={18} /> },
  { title: "Historias clínicas", path: "/medico/historias", icon: <FiClipboard size={18} /> },
  { section: "Cuenta" },
  { title: "Mi perfil", path: "/medico/perfil", icon: <FiUser size={18} /> },
]

export default function MedicoSidebar({ isOpen, setIsOpen }) {
  return (
    <SidebarLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      panelLabel="Portal Médico"
      accentColor="#10b981"
      accentLight="#d1fae5"
      accentDark="#065f46"
      menuItems={menuItems}
    />
  )
}