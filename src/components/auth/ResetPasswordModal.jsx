import { useState } from "react";
import { useResetPassword } from "../../hooks/useResetPassword";

export default function ResetPasswordModal({ open, token, onClose, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const {
    nuevaContrasena,
    setNuevaContrasena,
    confirmarContrasena,
    setConfirmarContrasena,
    loading,
    handleConfirmar,
  } = useResetPassword(() => {
    setDone(true);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirmar(token);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-badge">
            <i className="bi bi-key-fill"></i>
          </div>
          <h2 className="modal-title">Nueva contraseña</h2>
        </div>

        <p className="modal-subtitle">
          Ingresa y confirma tu nueva contraseña para completar el restablecimiento de tu cuenta.
        </p>

        {!done ? (
          <form onSubmit={handleSubmit}>
            <label className="modal-label">Nueva contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="modal-input pr-icon"
                placeholder="Ingrese su nueva contraseña"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                disabled={loading}
                required
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

            <label className="modal-label mt-3-fluid">Confirmar contraseña</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                className="modal-input pr-icon"
                placeholder="Repita su nueva contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
                disabled={loading}
              >
                <i className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>

            <button type="submit" className="btn-portal mt-4-fluid" disabled={loading}>
              {loading ? "Guardando..." : "Restablecer contraseña"}
            </button>
          </form>
        ) : (
          <div className="modal-success">
            <div className="modal-success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <p className="modal-success-title">Contraseña actualizada</p>
            <p className="modal-success-text">
              Ya puedes iniciar sesión con tu nueva contraseña.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeBg 0.25s ease;
        }

        .modal-box {
          width: 100%;
          max-width: 460px;
          background: #ffffff;
          border-radius: 24px;
          padding: clamp(24px, 4vh, 36px) clamp(20px, 3vw, 32px);
          box-shadow: 0 35px 90px rgba(0,0,0,0.35);
          animation: modalPop 0.28s cubic-bezier(.2,.9,.2,1);
          text-align: center;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .modal-badge {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: linear-gradient(135deg, #1a73e8, #00c2a8);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0,194,168,0.25);
          flex-shrink: 0;
        }

        .modal-badge i {
          color: white;
          font-size: 1.3rem;
        }

        .modal-title {
          font-weight: 800;
          color: #0f172a;
          font-size: 1.5rem;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .modal-subtitle {
          color: #64748b;
          font-size: 0.92rem;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .modal-label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #334155;
          text-align: left;
          display: block;
          font-size: 0.85rem;
        }

        .mt-3-fluid {
          margin-top: 16px;
        }

        .password-wrapper {
          position: relative;
        }

        .modal-input {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid #dbe3ec;
          outline: none;
          font-size: 0.95rem;
          background: #f8fafc;
          transition: all 0.25s ease;
        }

        .modal-input.pr-icon {
          padding-right: 46px;
        }

        .modal-input:focus {
          border-color: #00c2a8;
          box-shadow: 0 0 0 4px rgba(0,194,168,0.12);
          background: #ffffff;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: #00c2a8;
        }

        .mt-4-fluid {
          margin-top: 20px;
        }

        .btn-portal {
          background: linear-gradient(135deg, #1a73e8, #00c2a8);
          color: #ffffff !important;
          border: none;
          border-radius: 14px;
          padding: 14px;
          font-weight: 700;
          font-size: 0.95rem;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,194,168,0.28);
        }

        .btn-portal:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(0,194,168,0.38);
        }

        .btn-portal:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .modal-success {
          text-align: center;
          padding: 10px 0;
          animation: fadeIn 0.3s ease;
        }

        .modal-success-icon {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          background: rgba(0,194,168,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px auto;
        }

        .modal-success-icon i {
          font-size: 1.6rem;
          color: #00a896;
        }

        .modal-success-title {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
          font-size: 1.05rem;
        }

        .modal-success-text {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.5;
        }

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
  );
}