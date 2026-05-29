import { Container, Row, Col } from "react-bootstrap";

export default function SeccionLista({ titulo, items, icono }) {

    // Se divide los items en 3 grupos para el desktop
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
            <h2 className="text-start mb-5 pb-2 fw-bold d-flex align-items-center">
                {icono && (
                    <img
                        src={icono}
                        alt="convenios"
                        style={{
                            width: "60px",
                            marginRight: "15px",
                        }}
                    />
                )}

                {titulo}
            </h2>

            <Row className="g-4 fw-bold pb-4">
                {columns.map((col, colIndex) => (
                    <Col
                        key={colIndex}
                        xs={12}
                        sm={6}
                        lg={4}
                    >
                        {col.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="border rounded-4 px-4 py-4 mb-3 bg-white shadow-sm"
                                style={{
                                    textAlign: "left",
                                    transition: "0.3s ease",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-6px)";
                                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.12)";
                                    e.currentTarget.style.borderColor = "#0a2e5c";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "";
                                    e.currentTarget.style.borderColor = "";
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}