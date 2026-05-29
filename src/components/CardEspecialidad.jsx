import { Card, Button } from 'react-bootstrap';

const CardEspecialidad = ({ nombre, descripcion, imagen, color }) => {
    return (
        <Card
            className="h-100 border-0 shadow-sm text-center specialty-card"
            style={{
                borderRadius: '18px'
            }}
        >
            <Card.Body className="p-4">

                <div className="mb-3">
                    <img
                        src={imagen}
                        alt={nombre}
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover'
                        }}
                        className="rounded-circle shadow-sm"
                    />
                </div>

                <Card.Title className="fw-bold mb-2">
                    {nombre}
                </Card.Title>

                <Card.Text className="text-muted small">
                    {descripcion}
                </Card.Text>

                <Button className="btn-portal mt-2">
                    Ver más
                </Button>

            </Card.Body>

            <style>{`
                .specialty-card {
                    transition: all 0.25s ease;
                }

                .specialty-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
                }

                .btn-portal {
                    background: linear-gradient(135deg, #1a73e8, #00c2a8);
                    color: #ffffff !important;
                    border: none;
                    border-radius: 12px;
                    padding: 11px 22px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-decoration: none;
                    display: inline-block;
                    transition: all 0.25s ease;
                    box-shadow: 0 6px 14px rgba(0, 194, 168, 0.25);
                    position: relative;
                    overflow: hidden;
                }

                .btn-portal:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 194, 168, 0.35);
                }
            `}</style>

        </Card>
    );
};

export default CardEspecialidad;