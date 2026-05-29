import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AppLayout({ Sidebar }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : isOpen ? "240px" : "72px",
          marginBottom: isMobile ? "72px" : 0,
          transition: "margin-left 0.35s cubic-bezier(0.22,1,0.36,1)",
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}