import { useEffect, useState } from "react"

import img1 from "../../images/hero/Login1.jpg"
import img2 from "../../images/hero/Login2.webp"
import img3 from "../../images/hero/Login3.jpg"

const slides = [
  {
    img: img1,
    title: "Más que una cirugía, es recuperar tu calidad de vida",
    subtitle: "Programa de cirugía bariátrica"
  },
  {
    img: img2,
    title: "Atención médica moderna y segura",
    subtitle: "Especialistas a tu alcance"
  },
  {
    img: img3,
    title: "Tu salud en manos expertas",
    subtitle: "Tecnología y cuidado humano"
  }
]

export default function AuthCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="position-relative w-100 h-100 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            opacity: current === index ? 1 : 0,
            transform: current === index ? "scale(1.05)" : "scale(1)",
            transition: "opacity 1s ease, transform 6s ease"
          }}
        >
          <img
            src={slide.img}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.65), rgba(0,194,168,0.25))"
        }}
      />

      <div
        className="position-absolute top-50 start-50 translate-middle text-white text-center"
        style={{
          zIndex: 10,
          maxWidth: "700px",
          padding: "0 20px"
        }}
      >
        <h1
          style={{
            fontSize: "3.4rem",
            fontWeight: "800",
            lineHeight: "1.1"
          }}
        >
          {slides[current].title}
        </h1>

        <p
          style={{
            marginTop: "18px",
            fontSize: "1.3rem",
            opacity: 0.9
          }}
        >
          {slides[current].subtitle}
        </p>
      </div>

      <div
        className="position-absolute start-50 translate-middle-x d-flex gap-2"
        style={{
          bottom: "40px",
          zIndex: 10
        }}
      >
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: current === index ? "28px" : "10px",
              height: "10px",
              borderRadius: "20px",
              background:
                current === index ? "#00c2a8" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </div>
    </div>
  )
}