import { Container, Row, Col, Image } from "react-bootstrap";
import { FaShieldAlt, FaGlobeAmericas } from "react-icons/fa";
import imagenConvenios from "../images/convenios/imagenconvenios.png";

export default function HeroConvenios() {
    return (
        <Container className="my-5">
            <div
                className="rounded-5 overflow-hidden shadow-lg px-4 px-lg-5 py-5 mx-2 mx-md-0"
                style={{
                    background: "linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)",
                }}
            >
                <Row className="align-items-center text-white">
                    <Col md={6}>
                        <span
                            className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-semibold"
                        >
                            Convenios Médicos
                        </span>

                        <h1
                            className="fw-bold mb-4 text-start"
                            style={{ fontSize: "3rem" }}
                        >
                            Nuestros Convenios
                        </h1>

                        <p
                            className="text-start opacity-90"
                            style={{
                                fontSize: "1.15rem",
                                lineHeight: "1.8",
                            }}
                        >
                            Accede a una amplia red de convenios con seguros,
                            autoseguro y aseguradoras internacionales para
                            recibir atención médica de calidad.
                        </p>

                        <div className="d-flex flex-wrap gap-4 mt-4">
                            <div className="d-flex align-items-center gap-2">
                                <FaShieldAlt />
                                <span className="small">
                                    Cobertura confiable
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <FaGlobeAmericas />
                                <span className="small">
                                    Convenios internacionales
                                </span>
                            </div>
                        </div>
                    </Col>

                    {/* Esto es para la imagen de la sección convenioss */}
                    <Col md={6} className="mt-4 mt-md-0">
                        <Image
                            src={imagenConvenios}
                            alt="Convenios Clínica"
                            fluid
                            style={{
                                width: "100%",
                                borderRadius: "30px",
                                objectFit: "cover",
                                boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
                            }}
                        />
                    </Col>

                </Row>
            </div>
        </Container>
    );
}