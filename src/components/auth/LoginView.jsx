export default function LoginView({ setView }) {
  return (
    <div
      className="position-relative"
      style={{
        width: "100%",
        maxWidth: "660px",
        margin: "0 auto"
      }}
    >
      <style>
        {`
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
              text-decoration: none;
              transition: 0.2s ease;
          }

          .auth-link:hover {
              color: #00a896;
          }

          .auth-check {
              accent-color: #00c2a8;
              width: 18px;
              height: 18px;
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
        `}
      </style>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-badge">
            <i className="bi bi-shield-lock-fill"></i>
          </div>

          <h1 className="auth-title">Bienvenido</h1>
        </div>

        <p className="auth-subtitle">
          Accede a tu portal médico de manera segura.
        </p>

        <div className="mb-4">
          <label className="auth-label">Documento</label>

          <div className="d-flex gap-2">
            <select
              className="form-select auth-input"
              style={{ maxWidth: "110px" }}
            >
              <option>DNI</option>
            </select>

            <input
              type="text"
              className="form-control auth-input"
              placeholder="Nro de documento"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="auth-label">Contraseña</label>

          <input
            type="password"
            className="form-control auth-input"
            placeholder="Ingrese su contraseña"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <input type="checkbox" className="auth-check" id="remember" />
            <label htmlFor="remember" className="text-muted" style={{ fontSize: ".92rem" }}>
              Recordarme
            </label>
          </div>

          <button className="auth-link" onClick={() => setView("forgot")}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button className="btn-portal">Ingresar</button>

        <div className="text-center mt-4">
          <span className="text-muted">¿No tienes cuenta?</span>

          <button className="auth-link ms-1" onClick={() => setView("register")}>
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  )
}