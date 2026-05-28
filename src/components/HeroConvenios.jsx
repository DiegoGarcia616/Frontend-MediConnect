import { Container, Row, Col, Image } from "react-bootstrap";
import imagenConvenios from "../images/convenios/imagenconvenios.png";

export default function HeroConvenios() {
    return (
        <Container className="my-5">
            <Row className="align-items-center">
                <Col md={6}>
                    <h1
                        className="fw-bold mb-4 text-start"
                        style={{ fontSize: "3rem" }}
                    >
                        Nuestros Convenios
                    </h1>

                    <p
                        className="text-start"
                        style={{
                            fontSize: "1.3rem",
                            lineHeight: "1.8",
                        }}
                    >
                        Accede a una amplia red de convenios con seguros,
                        autoseguro y aseguradoras internacionales para
                        recibir atención médica de calidad.
                    </p>
                </Col>

                {/* Esto es para la imagen de la sección convenioss */}
                <Col md={6}>
                    <Image
                        src={imagenConvenios} alt="Convenios Clínica"
                        fluid
                        style={{
                            width: "100%",
                            borderRadius: "30px",
                            objectFit: "cover",
                        }}
                    />
                </Col>

            </Row>
        </Container>
    );
}