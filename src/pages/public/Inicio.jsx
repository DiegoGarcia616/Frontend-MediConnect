import HeroCarousel from "../../components/HeroCarrusel"

import {
  FaUserMd,
  FaCalendarCheck,
  FaLaptopMedical,
  FaHeartbeat,
  FaHospital
} from "react-icons/fa"

import img1 from "../../images/hero/hero1.webp"
import img2 from "../../images/hero/hero2.webp"
import img3 from "../../images/hero/hero3.webp"
import img4 from "../../images/hero/hero4.webp"
import img5 from "../../images/hero/hero5.webp"

const slides = [
  {
    title: "Atención médica moderna y humana",
    text: "Especialistas conectados contigo en una plataforma segura.",
    icon: <FaUserMd />,
    bg: img1
  },
  {
    title: "Agenda tu cita en segundos",
    text: "Reserva sin llamadas ni esperas.",
    icon: <FaCalendarCheck />,
    bg: img2
  },
  {
    title: "Historia clínica digital",
    text: "Accede a tu información desde cualquier lugar.",
    icon: <FaLaptopMedical />,
    bg: img3
  },
  {
    title: "Cuidado integral",
    text: "Especialistas para toda la familia.",
    icon: <FaHeartbeat />,
    bg: img4
  },
  {
    title: "Red médica confiable",
    text: "Atención en múltiples sedes.",
    icon: <FaHospital />,
    bg: img5
  }
]

export default function Inicio() {
  return <HeroCarousel slides={slides} />
}