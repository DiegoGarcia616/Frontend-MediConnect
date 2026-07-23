import SidebarLayout from "../components/SidebarLayout"
import { FiHome, FiCalendar, FiUserPlus, FiUsers } from "react-icons/fi"

const menuItems = [
  { section: "Panel" },
  { title: "Dashboard", path: "/recepcionista", icon: <FiHome size={18} /> },
  { section: "Gestión" },
  { title: "Citas", path: "/recepcionista/citas", icon: <FiCalendar size={18} /> },
  { title: "Registrar paciente", path: "/recepcionista/registrar", icon: <FiUserPlus size={18} /> },
  { title: "Pacientes", path: "/recepcionista/pacientes", icon: <FiUsers size={18} /> },
]

export default function RecepcionistaSidebar({ isOpen, setIsOpen }) {
  return (
    <SidebarLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      panelLabel="Recepción"
      accentColor="#ec4899"
      accentLight="#fce7f3"
      accentDark="#9d174d"
      menuItems={menuItems}
    />
  )
}