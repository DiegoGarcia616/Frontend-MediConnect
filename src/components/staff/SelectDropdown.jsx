import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

function SelectDropdown({ label, icon: Icon, options = [], value, onChange, placeholder = "Todas", accentColor = "#0a2e5c", highlightColor = "#12b886" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="position-relative">
      <label className="form-label small text-muted fw-bold">{label}</label>

      <div
        className="select-trigger d-flex align-items-center gap-2 bg-light rounded-pill px-3 py-2"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", border: open ? `1.5px solid ${accentColor}` : "1.5px solid transparent" }}
      >
        {Icon && <Icon color={highlightColor} size={14} />}
        <span className="flex-grow-1 text-truncate" style={{ color: value ? "#212529" : "#6c757d", fontSize: "0.92rem" }}>
          {value || placeholder}
        </span>
        <FaChevronDown size={11} color="#6c757d" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
      </div>

      {open && (
        <div className="select-menu bg-white rounded-4 shadow-lg mt-2 position-absolute w-100 overflow-hidden">
          <div
            className="select-option d-flex align-items-center justify-content-between px-3 py-2"
            onClick={() => handleSelect("")}
            style={{ color: value === "" ? accentColor : "#495057", fontWeight: value === "" ? 700 : 500 }}
          >
            {placeholder}
            {value === "" && <FaCheck size={11} color={highlightColor} />}
          </div>

          {options.map((option, i) => (
            <div
              key={i}
              className="select-option d-flex align-items-center justify-content-between px-3 py-2"
              onClick={() => handleSelect(option)}
              style={{ color: value === option ? accentColor : "#495057", fontWeight: value === option ? 700 : 500 }}
            >
              {option}
              {value === option && <FaCheck size={11} color={highlightColor} />}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .select-trigger {
          transition: all 0.2s ease;
        }

        .select-menu {
          z-index: 50;
          border: 1px solid #eef1f5;
          max-height: 220px;
          overflow-y: auto;
        }

        .select-option {
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .select-option:hover {
          background-color: ${highlightColor}12;
        }
      `}</style>
    </div>
  );
}

export default SelectDropdown;