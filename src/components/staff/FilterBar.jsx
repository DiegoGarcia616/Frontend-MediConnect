import { FaSearch, FaStethoscope, FaMapMarkerAlt } from "react-icons/fa";
import SelectDropdown from "./SelectDropdown";

function FilterBar({ busqueda, onBusquedaChange, especialidad, onEspecialidadChange, sede, onSedeChange, especialidades = [], sedes = [], accentColor = "#0a2e5c", highlightColor = "#12b886" }) {
  return (
    <div className="bg-white shadow-sm rounded-4 p-4 border mb-5">
      <div className="row g-3 align-items-start">
        <div className="col-md-5">
          <label className="form-label small text-muted fw-bold">Buscar por nombre</label>
          <div className="input-group">
            <span className="input-group-text bg-light border-0 rounded-start-pill">
              <FaSearch color={highlightColor} size={14} />
            </span>
            <input
              type="text"
              className="form-control bg-light border-0 py-2 rounded-end-pill"
              placeholder="Ej: Dr. Juan Pérez"
              value={busqueda}
              onChange={onBusquedaChange}
            />
          </div>
        </div>

        <div className="col-md-4">
          <SelectDropdown
            label="Especialidad"
            icon={FaStethoscope}
            options={especialidades}
            value={especialidad}
            onChange={onEspecialidadChange}
            accentColor={accentColor}
            highlightColor={highlightColor}
          />
        </div>

        <div className="col-md-3">
          <SelectDropdown
            label="Sede"
            icon={FaMapMarkerAlt}
            options={sedes}
            value={sede}
            onChange={onSedeChange}
            accentColor={accentColor}
            highlightColor={highlightColor}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;