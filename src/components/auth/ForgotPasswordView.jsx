export default function ForgotPasswordView({ setView }) {
  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-badge">
          <i className="bi bi-shield-lock-fill"></i>
        </div>
        <h1 className="auth-title">Recuperar</h1>
      </div>

      <p className="auth-subtitle">
        Recupera el acceso a tu cuenta usando tu DNI.
      </p>

      <div className="mb-4-fluid">
        <label className="auth-label">DNI</label>
        <input type="text" className="form-control auth-input" placeholder="Ingrese su DNI" />
      </div>

      <button className="btn-portal">Recuperar contraseña</button>

      <div className="text-center mt-4-fluid">
        <button className="auth-link" onClick={() => setView("login")}>
          Volver al login
        </button>
      </div>
    </div>
  );
}