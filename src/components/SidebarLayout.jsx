// NO USAR

import { NavLink } from "react-router-dom"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import logo2 from "../images/MediconnectLogo.png"

export default function SidebarLayout({
  isOpen,
  setIsOpen,
  panelLabel,
  accentColor,
  accentLight,
  accentDark,
  menuItems,
}) {
  return (
    <div
      style={{
        width: isOpen ? "240px" : "72px",
        height: "100vh",
        backgroundColor: "#f8fafc",
        position: "fixed",
        left: 0,
        top: 0,
        transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 20px rgba(0,0,0,0.07)",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: isOpen ? "1.25rem 1rem" : "1.25rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `2px solid ${accentLight}`,
          minHeight: "90px",
          backgroundColor: "#fff",
          transition: "padding 0.35s ease",
        }}
      >
        <img
          src={logo2}
          alt="Logo"
          style={{
            width: isOpen ? "130px" : "42px",
            height: "auto",
            objectFit: "contain",
            transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)",
            borderRadius: "8px",
          }}
        />

        <div
          style={{
            overflow: "hidden",
            maxHeight: isOpen ? "30px" : "0px",
            opacity: isOpen ? 1 : 0,
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}
        >
          <p
            style={{
              margin: "0.5rem 0 0",
              fontSize: "0.82rem",
              color: accentColor,
              fontWeight: 700,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {panelLabel}
          </p>
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          padding: "0.75rem 0",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        {menuItems.map((item, index) =>
          item.section ? (
            <div
              key={index}
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? "28px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition: "max-height 0.3s ease, opacity 0.25s ease",
                padding: "0 1.1rem",
                marginTop: "0.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0.4rem 0 0.2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {item.section}
              </p>
            </div>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              title={!isOpen ? item.title : ""}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                padding: isOpen ? "0.75rem 1.1rem" : "0.75rem 0",
                justifyContent: isOpen ? "flex-start" : "center",
                color: isActive ? accentColor : "#475569",
                backgroundColor: isActive ? accentLight : "transparent",
                textDecoration: "none",
                transition: "all 0.2s ease",
                borderLeft: isActive
                  ? `4px solid ${accentColor}`
                  : "4px solid transparent",
                marginBottom: "0.1rem",
                borderRadius: isOpen ? "0 10px 10px 0" : "0",
                marginRight: isOpen ? "0.5rem" : "0",
              })}
              onMouseEnter={(e) => {
                const active = e.currentTarget.getAttribute("aria-current")

                if (!active) {
                  e.currentTarget.style.backgroundColor = accentLight
                  e.currentTarget.style.color = accentColor
                }
              }}
              onMouseLeave={(e) => {
                const active = e.currentTarget.getAttribute("aria-current")

                if (!active) {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#475569"
                }
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "20px",
                }}
              >
                {item.icon}
              </span>

              <span
                style={{
                  marginLeft: "0.85rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: isOpen ? "160px" : "0px",
                  opacity: isOpen ? 1 : 0,
                  transition:
                    "max-width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
                }}
              >
                {item.title}
              </span>
            </NavLink>
          )
        )}
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "0.85rem",
          backgroundColor: accentLight,
          border: "none",
          borderTop: `2px solid ${accentLight}`,
          color: accentDark,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s ease",
          fontWeight: 600,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = accentColor
            .replace(")", ", 0.15)")
            .replace("rgb", "rgba"))
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = accentLight)
        }
      >
        {isOpen ? (
          <FiChevronLeft size={20} />
        ) : (
          <FiChevronRight size={20} />
        )}
      </button>
    </div>
  )
}