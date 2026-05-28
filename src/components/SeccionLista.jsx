import { Container, Row, Col } from "react-bootstrap";

export default function SeccionLista({ titulo, items }) {
    // Dividir items en 3 grupos para desktop
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
            <h2 className="text-start mb-4 pb-3">
                {titulo}
            </h2>

            <Row className="g-4">
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
                                className="border-bottom pb-3 mb-3"
                                style={{ textAlign: "left" }}
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