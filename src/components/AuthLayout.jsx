// NO USAR

import "bootstrap-icons/font/bootstrap-icons.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import fondoParking from "../images/FondoParking.png"
import ForgotPasswordModal from "./ForgotPassword"

function AuthLayout({
  title,
  description,
  heroImage,
  accentColor,
  accentColorDark,
  onSubmit,
  submitLabel,
  extraButtons,
  leftCards,
  demoCredentials
}) {
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [openForgot, setOpenForgot] = useState(false)
  const [phase, setPhase] = useState(0)
  const navigate = useNavigate()

  const dark = accentColorDark || accentColor

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 50)
    const t2 = setTimeout(() => setPhase(2), 250)
    const t3 = setTimeout(() => setPhase(3), 450)
    const t4 = setTimeout(() => setPhase(4), 620)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ correo, password })
  }

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)"

  const fadeUp = (show, delay = "0s") => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0px)" : "translateY(24px)",
    transition: `opacity 0.5s ${ease} ${delay}, transform 0.5s ${ease} ${delay}`
  })

  const cardStyle = {
    background: "rgba(255,255,255,0.14)",
    borderRadius: "14px",
    padding: "14px",
    color: "#fff",
    backdropFilter: "blur(8px)",
    transition: "all 0.22s ease",
    cursor: "default"
  }

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"
    e.currentTarget.style.background = "rgba(255,255,255,0.22)"
  }

  const cardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px) scale(1)"
    e.currentTarget.style.background = "rgba(255,255,255,0.14)"
  }

  const buttonPrimary = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: `linear-gradient(90deg, ${accentColor}, ${dark})`,
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease"
  }

  const fillCredential = (cred) => {
    setCorreo(cred.correo)
    setPassword(cred.password)
  }

  return (
    <div className="container-fluid vh-100 p-0 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="row h-100 g-0">

        <div
          className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center position-relative"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${dark})`,
            overflow: "hidden",
            padding: "40px"
          }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.8 }} />

          <div style={{ zIndex: 2, textAlign: "center", color: "#fff", marginBottom: "20px", ...fadeUp(phase >= 1) }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.7rem", marginBottom: "6px" }}>
              Control inteligente de accesos
            </h2>
            <p style={{ opacity: 0.9, fontSize: "0.95rem" }}>
              Plataforma segura para administración de estacionamientos
            </p>
          </div>

          <img
            src={heroImage}
            alt="login-visual"
            style={{
              width: "85%",
              maxWidth: "520px",
              zIndex: 2,
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
              transition: `opacity 0.55s ${ease}, transform 0.55s ${ease}`
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              width: "100%",
              maxWidth: "520px",
              zIndex: 2,
              marginTop: "25px"
            }}
          >
            {leftCards.map((card, i) => (
              <div
                key={i}
                style={{
                  ...cardStyle,
                  opacity: phase >= 3 ? 1 : 0,
                  transform: phase >= 3 ? "translateY(0px)" : "translateY(18px)",
                  transition: `opacity 0.4s ${ease} ${i * 0.07}s, transform 0.4s ${ease} ${i * 0.07}s, background 0.22s ease, box-shadow 0.22s ease`
                }}
                onMouseEnter={cardHover}
                onMouseLeave={cardLeave}
              >
                <i className={`bi ${card.icon}`} style={{ fontSize: "1.3rem" }} />
                <p style={{ margin: "6px 0 0", fontSize: "0.85rem" }}>{card.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="col-md-6 d-flex align-items-center justify-content-center position-relative"
          style={{ background: "#ffffff", padding: "40px", overflow: "hidden", overflowY: "auto" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${fondoParking})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.60,
              zIndex: 0
            }}
          />

          <div style={{ width: "100%", maxWidth: "420px", zIndex: 2 }}>
            <div style={fadeUp(phase >= 1)}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b" }}>
                {title}
              </h2>
              <p style={{ color: "#64748b", marginBottom: "30px", fontWeight: 700 }}>
                {description}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={fadeUp(phase >= 2, "0.04s")}>
                <input
                  type="email"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "14px",
                    outline: "none"
                  }}
                />
              </div>

              <div style={fadeUp(phase >= 2, "0.1s")}>
                <div style={{ position: "relative", marginBottom: "14px" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      outline: "none"
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                  </span>
                </div>
              </div>

              <div style={{ ...fadeUp(phase >= 3, "0.05s"), textAlign: "right", marginBottom: "20px" }}>
                <span
                  onClick={() => setOpenForgot(true)}
                  style={{
                    fontSize: "0.85rem",
                    color: accentColor,
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </div>

              <div style={fadeUp(phase >= 4)}>
                <button
                  type="submit"
                  style={buttonPrimary}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"
                    e.currentTarget.style.filter = "brightness(1.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px) scale(1)"
                    e.currentTarget.style.filter = "brightness(1)"
                  }}
                >
                  {submitLabel}
                </button>

                <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {extraButtons.map((btn, i) => (
                    <button
                      key={i}
                      type="button"
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "12px",
                        border: `1px solid ${btn.color}`,
                        background: "transparent",
                        color: btn.color,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onClick={() => navigate(btn.route)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)"
                        e.currentTarget.style.background = btn.color
                        e.currentTarget.style.color = "#fff"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0px)"
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = btn.color
                      }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {demoCredentials && demoCredentials.length > 0 && (
                  <div
                    style={{
                      marginTop: "24px",
                      borderRadius: "14px",
                      border: "1px dashed #cbd5e1",
                      padding: "16px",
                      background: "rgba(255,255,255,0.75)",
                      backdropFilter: "blur(6px)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                      <i className="bi bi-info-circle" style={{ color: accentColor, fontSize: "1rem" }} />
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Credenciales Demo
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {demoCredentials.map((cred, i) => (
                        <div
                          key={i}
                          onClick={() => fillCredential(cred)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "10px",
                            padding: "10px 12px",
                            cursor: "pointer",
                            transition: "all 0.18s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `rgba(${accentColor.replace("rgb(", "").replace(")", "")}, 0.08)`
                            e.currentTarget.style.borderColor = accentColor
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#f8fafc"
                            e.currentTarget.style.borderColor = "#e2e8f0"
                          }}
                        >
                          <div>
                            <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 700, color: "#1e293b" }}>
                              {cred.rol}
                            </p>
                            <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>
                              {cred.correo}
                            </p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <code style={{ fontSize: "0.75rem", background: "#e2e8f0", padding: "2px 8px", borderRadius: "6px", color: "#475569" }}>
                              {cred.password}
                            </code>
                            <i className="bi bi-box-arrow-in-right" style={{ color: accentColor, fontSize: "0.9rem" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <ForgotPasswordModal open={openForgot} onClose={() => setOpenForgot(false)} />
    </div>
  )
}

export default AuthLayout