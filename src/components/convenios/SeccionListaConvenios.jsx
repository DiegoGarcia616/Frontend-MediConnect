import { Container, Row, Col } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

export default function SeccionListaConvenios({ titulo, items, icono, accentColor = "#0a2e5c", highlightColor = "#12b886" }) {
  const getColumns = (arr, numCols) => {
    const cols = Array.from({ length: numCols }, () => []);
    arr.forEach((item, i) => {
      cols[i % numCols].push(item);
    });
    return cols;
  };

  const columns = getColumns(items, 3);

  return (
    <Container className="my-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        {icono && (
          <div
            className="d-flex align-items-center justify-content-center rounded-4 flex-shrink-0"
            style={{
              width: "64px",
              height: "64px",
              background: `linear-gradient(135deg, ${accentColor}12, ${highlightColor}12)`
            }}
          >
            <img src={icono} alt={titulo} style={{ width: "36px" }} />
          </div>
        )}

        <div>
          <h2 className="fw-bold mb-1" style={{ color: accentColor, fontSize: "1.6rem" }}>
            {titulo}
          </h2>
          <div
            style={{ width: "48px", height: "3px", backgroundColor: highlightColor, borderRadius: "2px" }}
          />
        </div>
      </div>

      <Row className="g-3">
        {columns.map((col, colIndex) => (
          <Col key={colIndex} xs={12} sm={6} lg={4}>
            {col.map((item, itemIndex) => (
              <div key={itemIndex} className="convenio-item d-flex align-items-center gap-3 bg-white rounded-4 px-4 py-3 mb-3">
                <FaCheckCircle color={highlightColor} size={18} className="flex-shrink-0" />
                <span className="fw-semibold" style={{ color: accentColor, fontSize: "0.95rem" }}>
                  {item}
                </span>
              </div>
            ))}
          </Col>
        ))}
      </Row>

      <style>{`
        .convenio-item {
          border: 1px solid #eef1f5;
          box-shadow: 0 3px 12px rgba(10, 46, 92, 0.06);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .convenio-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 30px rgba(10, 46, 92, 0.14);
          border-color: ${accentColor}40;
        }
      `}</style>
    </Container>
  );
}