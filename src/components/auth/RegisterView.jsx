import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";

export default function RegisterView({ setView }) {
  const {
    dni,
    setDni,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    password,
    setPassword,
    loading,
    handleRegister,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="position-relative register-wrapper">
      <style>
        {`
          .register-wrapper {
              width: 100%;
              max-width: 660px;
              margin: 0 auto;
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
              padding-right: 50px;
              transition: all .25s ease;
              font-size: 0.95rem;
              width: 100%;
          }

          .auth-input:focus {
              border-color: #00c2a8;
              box-shadow: 0 0 0 4px rgba(0,194,168,0.12);
          }

          .password-wrapper {
              position: relative;
          }

          .password-toggle {
              position: absolute;
              right: 16px;
              top: 50%;
              transform: translateY(-50%);
              background: transparent;
              border: none;
              color: #64748b;
              cursor: pointer;
              font-size: 1.2rem;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: color 0.2s ease;
          }

          .password-toggle:hover {
              color: #00c2a8;
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

          .btn-portal:disabled {
              opacity: 0.6;
              cursor: not-allowed;
              transform: none;
          }

          .auth-link {
              border: none;
              background: transparent;
              color: #1a73e8;
              font-weight: 600;
              transition: 0.2s ease;
          }

          .auth-link:hover {
              color: #00a896;
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
            <i className="bi bi-person-plus-fill"></i>
          </div>
          <h1 className="auth-title">Registro</h1>
        </div>

        <p className="auth-subtitle">
          Crea tu cuenta para acceder a tu portal médico.
        </p>

        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div>
              <label className="auth-label">DNI</label>
              <input
                type="text"
                className="form-control auth-input"
                placeholder="Ingrese su DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                disabled={loading}
                maxLength={8}
              />
            </div>

            <div>
              <label className="auth-label">Teléfono</label>
              <input
                type="text"
                className="form-control auth-input"
                placeholder="Ingrese su teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 9))}
                disabled={loading}
                maxLength={9}
              />
            </div>

            <div className="full">
              <label className="auth-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control auth-input"
                placeholder="Ingrese su correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="full">
              <label className="auth-label">Contraseña</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control auth-input"
                  placeholder="Cree una contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-portal mt-4" disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </button>

          <div className="text-center mt-4">
            <span className="text-muted">¿Ya tienes cuenta?</span>
            <button
              type="button"
              className="auth-link ms-1"
              onClick={() => setView("login")}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}