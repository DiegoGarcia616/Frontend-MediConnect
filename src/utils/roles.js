export const ROLES = {
    ADMINISTRADOR_TOTAL: {
      id: 1,
      nombre: "Administrador Total",
      color: "#7c3aed",
      bg: "#f3e8ff",
    },
    ADMINISTRADOR_LOCAL: {
      id: 2,
      nombre: "Administrador Local",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    RECEPCIONISTA: {
      id: 3,
      nombre: "Recepcionista",
      color: "#0891b2",
      bg: "#ecfeff",
    },
    MEDICO: {
      id: 4,
      nombre: "Médico",
      color: "#16a34a",
      bg: "#f0fdf4",
    },
    PACIENTE: {
      id: 5,
      nombre: "Paciente",
      color: "#ea580c",
      bg: "#fff7ed",
    },
  };
  
  export const ROLES_LISTA = Object.values(ROLES);
  
  export const getRolPorId = (idRol) => {
    return ROLES_LISTA.find((r) => r.id === idRol) || null;
  };
  
  export const getRolStyle = (idRol) => {
    const rol = getRolPorId(idRol);
    return rol ? { color: rol.color, bg: rol.bg } : { color: "#64748b", bg: "#f1f5f9" };
  };
  
  export const rolesRequierenSede = [2, 3, 4];