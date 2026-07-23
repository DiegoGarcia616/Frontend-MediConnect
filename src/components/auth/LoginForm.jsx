import { useState } from "react"
import LoginView from "./LoginView"
import RegisterView from "./RegisterView"

export default function LoginForm() {
  const [view, setView] = useState("login")

  return (
    <>
      <style>
        {`
          .auth-wrapper {
              width: 100%;
              max-width: 660px;
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
          }

          .auth-card {
              background: #ffffff;
              width: 100%;
              border-radius: clamp(16px, 2vh, 28px);
              padding: clamp(18px, 4vh, 45px) clamp(16px, 3vw, 45px);
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
              margin-bottom: clamp(6px, 1vh, 10px);
          }

          .auth-badge {
              width: clamp(40px, 6vh, 60px);
              height: clamp(40px, 6vh, 60px);
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
              font-size: clamp(1.1rem, 2.5vh, 1.6rem);
          }

          .auth-title {
              font-size: clamp(1.5rem, 4.5vh, 2.6rem);
              font-weight: 700;
              color: #0f172a;
              margin: 0;
          }

          .auth-subtitle {
              color: #64748b;
              font-size: clamp(0.8rem, 1.8vh, 1rem);
              margin-bottom: clamp(14px, 3vh, 35px);
          }

          .auth-label {
              font-weight: 600;
              margin-bottom: clamp(4px, 1vh, 8px);
              color: #334155;
              text-align: left;
              display: block;
              font-size: clamp(0.82rem, 1.7vh, 0.95rem);
          }

          .auth-input,
          .form-control,
          .form-select {
              height: clamp(38px, 6.5vh, 56px) !important;
              border-radius: 12px;
              border: 1px solid #dbe3ec;
              padding-left: 16px;
              transition: all .25s ease;
              font-size: clamp(0.82rem, 1.6vh, 0.95rem);
              width: 100%;
          }

          .auth-input.pr-icon {
              padding-right: 50px;
          }

          .auth-input:focus,
          .form-control:focus,
          .form-select:focus {
              border-color: #00c2a8;
              box-shadow: 0 0 0 4px rgba(0,194,168,0.12);
          }

          .doc-fixed {
              height: clamp(38px, 6.5vh, 56px);
              border-radius: 12px;
              border: 1px solid #dbe3ec;
              background: #f1f5f9;
              color: #334155;
              font-weight: 700;
              font-size: clamp(0.82rem, 1.6vh, 0.95rem);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 16px;
              max-width: 100px;
              flex-shrink: 0;
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
              font-size: clamp(1rem, 2vh, 1.2rem);
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
              border-radius: 12px;
              padding: clamp(9px, 1.8vh, 14px) 22px;
              font-weight: 600;
              font-size: clamp(0.85rem, 1.8vh, 1rem);
              width: 100%;
              transition: all 0.3s ease;
              box-shadow: 0 8px 20px rgba(0, 194, 168, 0.28);
          }

          .btn-portal:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 24px rgba(0, 194, 168, 0.38);
              color: #ffffff !important;
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
              text-decoration: none;
              transition: 0.2s ease;
              font-size: clamp(0.8rem, 1.6vh, 0.95rem);
          }

          .auth-link:hover {
              color: #00a896;
          }

          .form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: clamp(8px, 1.8vh, 15px);
          }

          .full {
              grid-column: 1 / -1;
          }

          .mb-4-fluid {
              margin-bottom: clamp(10px, 2.2vh, 24px);
          }

          .mb-3-fluid {
              margin-bottom: clamp(8px, 1.8vh, 18px);
          }

          .mt-4-fluid {
              margin-top: clamp(10px, 2.2vh, 24px);
          }

          @media (max-width: 992px) {
              .auth-card {
                  border-radius: 20px;
              }
          }

          @media (max-width: 480px) {
              .auth-wrapper {
                  padding: 0 10px;
              }

              .doc-fixed {
                  max-width: 80px;
              }
          }
        `}
      </style>

      <div className="auth-wrapper">
        {view === "login" && <LoginView setView={setView} />}
        {view === "register" && <RegisterView setView={setView} />}
      </div>
    </>
  )
}