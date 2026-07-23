import DerechosCard from "./DerechosCard";

function DerechosGrid({ items = [], accentColor = "#0a2e5c", highlightColor = "#12b886" }) {
  return (
    <div className="row g-4">
      {items.map((item, index) => (
        <div className="col-12 col-md-6" key={index}>
          <DerechosCard
            titulo={item.titulo}
            descripcion={item.descripcion}
            index={index}
            accentColor={accentColor}
            highlightColor={highlightColor}
          />
        </div>
      ))}
    </div>
  );
}

export default DerechosGrid;