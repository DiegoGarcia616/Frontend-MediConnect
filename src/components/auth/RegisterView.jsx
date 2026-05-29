export default function RegisterView({ setView }) {
  return (
    <div
      className="position-relative register-wrapper"
    >
      <style>
        {`
          .register-wrapper {
              width: 100%;
              max-width: 660px;
              margin: 0 auto;
              /* que nunca sea más alta que la pantalla menos un margen */
              max-height: calc(100vh - 140px);
          }

          .auth-card {
              background: #ffffff;
              border-radius: 28px;
              padding: 45px;
              box-shadow:
                0 10px 40px rgba(0,0,0,0.06),
                0 2px 10px rgba(0,0,0,0.04);
              border: 1px solid rgba(230,230,230,0.7);
              backdrop-filter: blur(10px);
              text-align: center;

              /* CLAVE: que la card misma maneje el scroll */
              max-height: 100%;
              overflow-y: auto;
          }

          .auth-header {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              margin-bottom: 10px;
          }

          .auth-title {
              font-size: 2.6rem;
              font-weight: 700;
              color: #0f172a;
              margin: 0;
          }

          .auth-subtitle {
              color: #64748b;
              font-size: 1rem;
              margin-bottom: 35px;
          }

          .auth-label {
              font-weight: 600;
              margin-bottom: 8px;
              color: #334155;
              text-align: left;
              display: block;
          }

          .auth-input {
              height: 56px;
              border-radius: 14px;
              border: 1px solid #dbe3ec;
              padding-left: 16px;
              transition: all .25s ease;
              font-size: 0.95rem;
              width: 100%;
          }

          .auth-input:focus {
              border-color: #00c2a8;
              box-shadow: 0 0 0 4px rgba(0,194,168,0.12);
          }

          .btn-portal {
              background: linear-gradient(135deg, #1a73e8, #00c2a8);
              color: #ffffff !important;
              border: none;
              border-radius: 14px;
              padding: 14px 22px;
              font-weight: 600;
              font-size: 1rem;
              width: 100%;
              transition: all 0.3s ease;
              box-shadow: 0 8px 20px rgba(0, 194, 168, 0.28);
          }

          .btn-portal:hover {
              transform: translateY(-3px);
              box-shadow: 0 12px 24px rgba(0, 194, 168, 0.38);
          }

          .auth-link {
              border: none;
              background: transparent;
              color: #1a73e8;
              font-weight: 600;
          }

          .form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
          }

          .full {
              grid-column: 1 / -1;
          }

          .auth-badge {
              width: 60px;
              height: 60px;
              border-radius: 18px;
              background: linear-gradient(135deg, #1a73e8, #00c2a8);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 25px rgba(0,194,168,0.25);
          }

          .auth-badge i {
              color: white;
              font-size: 1.6rem;
          }

          /* MOBILE: card más compacta y scroll cómodo */
          @media (max-width: 576px) {
              .register-wrapper {
                  max-width: 100%;
                  max-height: calc(100vh - 120px);
                  padding: 0 12px;
              }

              .auth-card {
                  border-radius: 20px;
                  padding: 24px 18px;
              }

              .auth-title {
                  font-size: 2rem;
              }

              .auth-subtitle {
                  margin-bottom: 20px;
              }
          }
        `}
      </style>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-badge">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h1 className="auth-title">Registro</h1>
        </div>

        <p className="auth-subtitle">
          Crea tu cuenta para acceder a tu portal médico.
        </p>

        <div className="form-grid">
          <div>
            <label className="auth-label">Nombres completos</label>
            <input
              type="text"
              className="form-control auth-input"
              placeholder="Ingrese sus nombres"
            />
          </div>

          <div>
            <label className="auth-label">DNI</label>
            <input
              type="text"
              className="form-control auth-input"
              placeholder="Ingrese su DNI"
            />
          </div>

          <div className="full">
            <label className="auth-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control auth-input"
              placeholder="Ingrese su correo"
            />
          </div>

          <div className="full">
            <label className="auth-label">Contraseña</label>
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Cree una contraseña"
            />
          </div>
        </div>

        <button className="btn-portal mt-4">Registrarme</button>

        <div className="text-center mt-4">
          <span className="text-muted">¿Ya tienes cuenta?</span>
          <button className="auth-link ms-1" onClick={() => setView("login")}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}