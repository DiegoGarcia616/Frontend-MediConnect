import SidebarLayout from "../components/SidebarLayout";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiActivity,
  FiMapPin,
  FiTag,
  FiUserX,
} from "react-icons/fi";

const menuItems = [
  { section: "Panel" },
  { title: "Dashboard", path: "/admin-local", icon: <FiHome size={18} /> },

  { section: "Gestión Clínica" },
  { title: "Médicos",      path: "/admin-local/medicos",      icon: <FiActivity size={18} /> },
  { title: "Pacientes",    path: "/admin-local/pacientes",    icon: <FiUsers    size={18} /> },
  { title: "Citas",        path: "/admin-local/citas",        icon: <FiCalendar size={18} /> },

  { section: "Administración" },
  { title: "Especialidades", path: "/admin-local/especialidades", icon: <FiTag     size={18} /> },
  { title: "Sedes",          path: "/admin-local/sedes",          icon: <FiMapPin  size={18} /> },
  { title: "Inasistencias",  path: "/admin-local/inasistencias",  icon: <FiUserX   size={18} /> },
];

export default function AdminLocalSidebar({ isOpen, setIsOpen }) {
  return (
    <SidebarLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      panelLabel="Admin Local"
      accentColor="#0d6efd"
      accentLight="#e7f1ff"
      accentDark="#0a58ca"
      menuItems={menuItems}
    />
  );
}