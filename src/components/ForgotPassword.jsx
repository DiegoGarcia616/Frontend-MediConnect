import { useState } from "react"

function ForgotPasswordModal({ open, onClose }) {
  const [correo, setCorreo] = useState("")
  const [sent, setSent] = useState(false)

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2, 6, 23, 0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: "fadeBg 0.25s ease",
        padding: "20px"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 35px 90px rgba(0,0,0,0.35)",
          transform: "translateY(0)",
          animation: "modalPop 0.28s cubic-bezier(.2,.9,.2,1)"
        }}
      >
        <h2
          style={{
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "6px",
            fontSize: "1.4rem",
            letterSpacing: "-0.3px"
          }}
        >
          Recuperar acceso
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: "0.92rem",
            marginBottom: "22px",
            lineHeight: "1.5"
          }}
        >
          Ingresa tu correo registrado y te enviaremos un enlace seguro para restablecer tu contraseña.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#334155",
                  display: "block",
                  marginBottom: "6px"
                }}
              >
                Correo electrónico
              </label>

              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="ejemplo@urbankpark.com"
                required
                style={{
                  width: "100%",
                  padding: "14px 14px",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  outline: "none",
                  fontSize: "0.95rem",
                  transition: "all 0.25s ease",
                  background: "#f8fafc"
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgb(52,151,195)"
                  e.target.style.boxShadow = "0 0 0 4px rgba(52,151,195,0.15)"
                  e.target.style.background = "#ffffff"
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid #e2e8f0"
                  e.target.style.boxShadow = "none"
                  e.target.style.background = "#f8fafc"
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(90deg, rgb(52,151,195), rgb(37,117,152))",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(52,151,195,0.25)",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(52,151,195,0.35)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(52,151,195,0.25)"
              }}
            >
              Enviar enlace
            </button>
          </form>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "10px 0",
              animation: "fadeIn 0.3s ease"
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                background: "rgba(52,151,195,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px auto"
              }}
            >
              <i
                className="bi bi-envelope-check"
                style={{ fontSize: "1.5rem", color: "rgb(52,151,195)" }}
              />
            </div>

            <p
              style={{
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "6px"
              }}
            >
              Correo enviado
            </p>

            <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
              Si el correo existe en nuestro sistema, recibirás un enlace de recuperación en breve.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            width: "100%",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "12px",
            color: "#475569",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e2e8f0"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f1f5f9"
          }}
        >
          Cerrar
        </button>

        <style>{`
          @keyframes fadeBg {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes modalPop {
            from { opacity: 0; transform: translateY(18px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default ForgotPasswordModal