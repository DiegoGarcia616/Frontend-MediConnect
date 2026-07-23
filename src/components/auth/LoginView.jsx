import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function LoginView({ setView }) {
  const {
    dni,
    setDni,
    password,
    setPassword,
    loading,
    handleLogin,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
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

      <form onSubmit={onSubmit}>
        <div className="mb-4-fluid">
          <label className="auth-label">Documento</label>

          <div className="d-flex gap-2">
            <div className="doc-fixed">DNI</div>

            <input
              type="text"
              className="form-control auth-input"
              placeholder="Nro de documento"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
              maxLength={8}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mb-4-fluid">
          <label className="auth-label">Contraseña</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control auth-input pr-icon"
              placeholder="Ingrese su contraseña"
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

        <div className="text-end mb-4-fluid">
          <button type="button" className="auth-link" onClick={() => setShowForgotModal(true)}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button type="submit" className="btn-portal" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <div className="text-center mt-4-fluid">
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>¿No tienes cuenta?</span>
          <button type="button" className="auth-link ms-1" onClick={() => setView("register")}>
            Crear cuenta
          </button>
        </div>
      </form>

      <ForgotPasswordModal open={showForgotModal} onClose={() => setShowForgotModal(false)} />
    </div>
  );
}