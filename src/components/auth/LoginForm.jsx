import { useState } from "react"
import LoginView from "./LoginView"
import RegisterView from "./RegisterView"
import ForgotPasswordView from "./ForgotPasswordView"

export default function LoginForm() {

  const [view, setView] = useState("login")

  return (
    <>
      <style>
        {`
          .btn-portal {
              background: linear-gradient(135deg, #1a73e8, #00c2a8);
              color: #ffffff !important;
              border: none;
              border-radius: 12px;
              padding: 11px 22px;
              font-weight: 600;
              font-size: 0.95rem;
              text-decoration: none;
              display: inline-block;
              transition: all 0.25s ease;
              box-shadow: 0 6px 14px rgba(0, 194, 168, 0.25);
              position: relative;
              overflow: hidden;
          }

          .btn-portal:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 18px rgba(0, 194, 168, 0.35);
              color: #ffffff !important;
          }

          .form-control,
          .form-select {
              height: 58px;
              border-radius: 12px;
          }
        `}
      </style>

      {
        view === "login" &&
        <LoginView setView={setView} />
      }

      {
        view === "register" &&
        <RegisterView setView={setView} />
      }

      {
        view === "forgot" &&
        <ForgotPasswordView setView={setView} />
      }
    </>
  )
}