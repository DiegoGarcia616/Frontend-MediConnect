import SidebarLayout from "../components/SidebarLayout"
import { FiHome, FiUsers, FiCalendar, FiActivity } from "react-icons/fi"

const menuItems = [
  { section: "Panel" },
  { title: "Dashboard", path: "/admin-local", icon: <FiHome size={18} /> },
  { section: "Gestión" },
  { title: "Pacientes", path: "/admin-local/pacientes", icon: <FiUsers size={18} /> },
  { title: "Médicos", path: "/admin-local/medicos", icon: <FiActivity size={18} /> },
  { title: "Citas", path: "/admin-local/citas", icon: <FiCalendar size={18} /> },
]

export default function AdminLocalSidebar({ isOpen, setIsOpen }) {
  return (
    <SidebarLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      panelLabel="Admin Local"
      accentColor="#6366f1"
      accentLight="#e0e7ff"
      accentDark="#3730a3"
      menuItems={menuItems}
    />
  )
}