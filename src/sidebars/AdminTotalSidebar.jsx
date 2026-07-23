import SidebarLayout from "../components/SidebarLayout"
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiActivity,
  FiDatabase,
  FiShield,
  FiClipboard,
  FiUser,
} from "react-icons/fi"

const menuItems = [
  { section: "Panel" },
  { title: "Dashboard", path: "/admin", icon: <FiHome size={18} /> },
  { section: "Gestión" },
  { title: "Pacientes", path: "/admin/pacientes", icon: <FiUsers size={18} /> },
  { title: "Médicos", path: "/admin/medicos", icon: <FiActivity size={18} /> },
  { title: "Citas", path: "/admin/citas", icon: <FiCalendar size={18} /> },
  { section: "Configuración" },
  { title: "Sedes", path: "/admin/sedes", icon: <FiDatabase size={18} /> },
  { title: "Especialidades", path: "/admin/especialidades", icon: <FiClipboard size={18} /> },
  { title: "Usuarios", path: "/admin/usuarios", icon: <FiShield size={18} /> },
  { title: "Perfil", path: "/admin/perfil", icon: <FiUser size={18} /> },
]

export default function AdminTotalSidebar({ isOpen, setIsOpen }) {
  return (
    <SidebarLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      panelLabel="Admin General"
      accentColor="#f97316"
      accentLight="#ffedd5"
      accentDark="#c2410c"
      menuItems={menuItems}
    />
  )
}