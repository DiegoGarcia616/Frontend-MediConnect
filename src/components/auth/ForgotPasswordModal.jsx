import { useState } from "react";

export default function ForgotPasswordModal({ open, onClose }) {
  const [dni, setDni] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  const handleClose = () => {
    setSent(false);
    setDni("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-badge">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h2 className="modal-title">Recuperar acceso</h2>
        </div>

        <p className="modal-subtitle">
          Ingresa tu DNI registrado y te enviaremos un enlace seguro para restablecer tu contraseña.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <label className="modal-label">DNI</label>
            <input
              type="text"
              className="modal-input"
              placeholder="Ingrese su DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
              maxLength={8}
              disabled={loading}
              required
            />

            <button type="submit" className="btn-portal mt-4-fluid" disabled={loading}>
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        ) : (
          <div className="modal-success">
            <div className="modal-success-icon">
              <i className="bi bi-envelope-check-fill"></i>
            </div>
            <p className="modal-success-title">Correo enviado</p>
            <p className="modal-success-text">
              Si el DNI existe en nuestro sistema, recibirás un enlace de recuperación en breve.
            </p>
          </div>
        )}

        <button type="button" className="modal-close-btn" onClick={handleClose}>
          Cerrar
        </button>
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

        .modal-input:focus {
          border-color: #00c2a8;
          box-shadow: 0 0 0 4px rgba(0,194,168,0.12);
          background: #ffffff;
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

        .modal-close-btn {
          margin-top: 18px;
          width: 100%;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px;
          color: #475569;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .modal-close-btn:hover {
          background: #e2e8f0;
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