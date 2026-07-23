export default function RegisterSuccessAnimation({ nombres, onLogin, onHome }) {
    const primerNombre = nombres.split(" ")[0] || "";
  
    return (
      <div className="success-overlay">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <svg className="success-icon" viewBox="0 0 52 52">
              <circle className="success-icon-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="success-icon-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
  
          <h2 className="success-title">
            ¡{primerNombre}, tu cuenta se creó con éxito!
          </h2>
  
          <p className="success-subtitle">
            Reserva citas para ti y tu familia, paga en línea, revisa las coberturas de tus programas y mucho más...
          </p>
  
          <button type="button" className="btn-portal success-btn-primary" onClick={onLogin}>
            Iniciar sesión
          </button>
  
          <button type="button" className="auth-link success-btn-secondary" onClick={onHome}>
            Ir a Inicio
          </button>
        </div>
  
        <style>
          {`
            .success-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 23, 42, 0.45);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeInOverlay 0.3s ease;
            }
  
            .success-card {
                background: #ffffff;
                border-radius: 24px;
                padding: clamp(30px, 5vh, 50px) clamp(24px, 5vw, 50px);
                max-width: 460px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
  
            .success-icon-wrapper {
                display: flex;
                justify-content: center;
                margin-bottom: 20px;
            }
  
            .success-icon {
                width: 72px;
                height: 72px;
            }
  
            .success-icon-circle {
                stroke: #35b6e0;
                stroke-width: 3;
                stroke-miterlimit: 10;
                fill: #35b6e0;
                animation: circleFill 0.5s ease forwards;
            }
  
            .success-icon-check {
                stroke: #ffffff;
                stroke-width: 4;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: checkDraw 0.4s 0.35s ease forwards;
            }
  
            .success-title {
                font-size: clamp(1.4rem, 3.5vh, 1.9rem);
                font-weight: 700;
                color: #0d2c4b;
                margin-bottom: 16px;
                line-height: 1.3;
            }
  
            .success-subtitle {
                color: #64748b;
                font-size: clamp(0.85rem, 1.8vh, 1rem);
                margin-bottom: 30px;
                line-height: 1.5;
            }
  
            .success-btn-primary {
                margin-bottom: 16px;
            }
  
            .success-btn-secondary {
                display: block;
                width: 100%;
                text-align: center;
            }
  
            @keyframes fadeInOverlay {
                from { opacity: 0; }
                to { opacity: 1; }
            }
  
            @keyframes popIn {
                from { transform: scale(0.85); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
  
            @keyframes circleFill {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
  
            @keyframes checkDraw {
                to { stroke-dashoffset: 0; }
            }
          `}
        </style>
      </div>
    );
  }