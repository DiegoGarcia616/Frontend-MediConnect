import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import RegisterSuccessAnimation from "./RegisterSuccessAnimation";

export default function RegisterView({ setView }) {
  const {
    dni,
    setDni,
    correo,
    setCorreo,
    password,
    setPassword,
    loading,
    handleRegister,
    successData,
    closeSuccess,
  } = useRegister(() => setView("login"));

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  const goToLogin = () => {
    closeSuccess();
    setView("login");
  };

  const goToHome = () => {
    closeSuccess();
    window.location.href = "/";
  };

  return (
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
          <div className="full">
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
                className="form-control auth-input pr-icon"
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

        <button type="submit" className="btn-portal mt-4-fluid" disabled={loading}>
          {loading ? "Registrando..." : "Registrarme"}
        </button>

        <div className="text-center mt-4-fluid">
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>¿Ya tienes cuenta?</span>
          <button type="button" className="auth-link ms-1" onClick={() => setView("login")}>
            Iniciar sesión
          </button>
        </div>
      </form>

      {successData && (
        <RegisterSuccessAnimation
          nombres={successData.nombres}
          apellidoPaterno={successData.apellidoPaterno}
          apellidoMaterno={successData.apellidoMaterno}
          onLogin={goToLogin}
          onHome={goToHome}
        />
      )}
    </div>
  );
}