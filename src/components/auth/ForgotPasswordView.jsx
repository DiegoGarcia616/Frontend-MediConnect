export default function ForgotPasswordView({ setView }) {
  return (
    <div className="position-relative forgot-wrapper">
      <style>
        {`
          .forgot-wrapper {
              width: 100%;
              max-width: 660px;
              margin: 0 auto;
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
          }

          .auth-header {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 14px;
              margin-bottom: 12px;
              text-align: center;
          }

          .auth-badge {
              width: 62px;
              height: 62px;
              border-radius: 18px;
              background: linear-gradient(135deg, #1a73e8, #00c2a8);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 25px rgba(0,194,168,0.25);
              flex-shrink: 0;
          }

          .auth-badge i {
              color: white;
              font-size: 1.5rem;
          }

          .auth-title {
              font-size: 2.4rem;
              font-weight: 700;
              color: #0f172a;
              margin: 0;
          }

          .auth-subtitle {
              color: #64748b;
              font-size: 1rem;
              margin-bottom: 35px;
              text-align: center;
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
              transition: 0.2s ease;
          }

          @media (max-width: 768px) {
              .auth-card {
                  border-radius: 20px;
                  padding: 30px 22px;
              }

              .auth-title {
                  font-size: 1.9rem;
              }

              .auth-subtitle {
                  margin-bottom: 24px;
              }

              .auth-input {
                  height: 50px;
                  font-size: 0.9rem;
              }
          }

          @media (max-width: 480px) {
              .forgot-wrapper {
                  padding: 0 10px;
              }

              .auth-card {
                  padding: 24px 16px;
              }

              .auth-title {
                  font-size: 1.6rem;
              }

              .auth-header {
                  flex-direction: column;
                  gap: 8px;
              }

              .auth-badge {
                  width: 48px;
                  height: 48px;
                  border-radius: 14px;
              }

              .auth-badge i {
                  font-size: 1.3rem;
              }
          }
        `}
      </style>

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

        <div className="mb-4">
          <label className="auth-label">DNI</label>
          <input type="text" className="form-control auth-input" placeholder="Ingrese su DNI" />
        </div>

        <button className="btn-portal">Recuperar contraseña</button>

        <div className="text-center mt-4">
          <button className="auth-link" onClick={() => setView("login")}>
            Volver al login
          </button>
        </div>
      </div>
    </div>
  );
}