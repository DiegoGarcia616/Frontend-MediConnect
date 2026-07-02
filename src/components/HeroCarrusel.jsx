import { useEffect, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function HeroCarrusel({ slides = [] }) {
  const [index, setIndex] = useState(0)
  const [contentIndex, setContentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  const timer = useRef(null)

  useEffect(() => {
    if (!slides.length) return
    timer.current = setInterval(() => goNext(), 6500)
    return () => clearInterval(timer.current)
  }, [index, slides.length])

  const animate = (newIndex, dir) => {
    if (animating || newIndex === index) return
    setDirection(dir)
    setNextIndex(newIndex)
    setAnimating(true)
    setContentIndex(newIndex)

    setTimeout(() => {
      setIndex(newIndex)
      setNextIndex(null)
      setAnimating(false)
    }, 700)
  }

  const goNext = () => animate((index + 1) % slides.length, "next")
  const goPrev = () => animate(index === 0 ? slides.length - 1 : index - 1, "prev")
  const goTo = (i) => animate(i, i > index ? "next" : "prev")

  const current = slides[index]
  const content = slides[contentIndex]
  const next = nextIndex !== null ? slides[nextIndex] : null

  return (
    <section className="hero">
      <div
        key={`base-${index}`}
        className={`bg base ${animating ? "base-exit" : "base-enter"}`}
        style={{ backgroundImage: `url(${current.bg})` }}
      />

      {next && (
        <div
          key={`overlay-${nextIndex}`}
          className={`bg overlay ${direction}`}
          style={{ backgroundImage: `url(${next.bg})` }}
        />
      )}

      <div className="dark-overlay" />

      <div key={`content-${contentIndex}`} className="content text-center text-white content-enter">
        <div className="icon">{content.icon}</div>
        <h1>{content.title}</h1>
        <p>{content.text}</p>

        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => goTo(i)}
              className={`dot ${i === contentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      <button className="nav left" onClick={goPrev}><FaChevronLeft /></button>
      <button className="nav right" onClick={goNext}><FaChevronRight /></button>

      <style>{`
        .hero {
          position: relative;
          height: 90vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1);
          will-change: opacity;
        }

        .base {
          z-index: 1;
        }

        .base-enter {
          opacity: 1;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .base-exit {
          opacity: 0.15;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .overlay {
          z-index: 2;
        }

        .overlay.next {
          animation: enterFromRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .overlay.prev {
          animation: enterFromLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes enterFromRight {
          from {
            transform: translateX(80px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes enterFromLeft {
          from {
            transform: translateX(-80px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .dark-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 46, 92, 0.52);
          z-index: 3;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 4;
          max-width: 800px;
          padding: 0 20px;
        }

        .content-enter {
          animation: contentReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes contentReveal {
          from {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        .icon {
          font-size: 3.5rem;
          margin-bottom: 15px;
          animation: float 3.5s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        h1 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.15;
        }

        p {
          opacity: 0.88;
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          margin-top: 10px;
        }

        .dots {
          margin-top: 22px;
          display: flex;
          justify-content: center;
          gap: 8px;
          align-items: center;
        }

        .dot {
          height: 8px;
          border-radius: 999px;
          background: white;
          opacity: 0.35;
          cursor: pointer;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.4s ease;
          width: 8px;
        }

        .dot.active {
          width: 28px;
          opacity: 1;
        }

        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.25s ease,
                      border-color 0.25s ease;
        }

        .nav:hover {
          transform: translateY(-50%) scale(1.14);
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .nav:active {
          transform: translateY(-50%) scale(0.93);
        }

        .left  { left: 20px; }
        .right { right: 20px; }
      `}</style>
    </section>
  )
}