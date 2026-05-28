import { Card, Button } from 'react-bootstrap';

const CardEspecialidad = ({ nombre, descripcion, imagen, color }) => {
    return (
        <Card className="h-100 shadow-sm text-center border-primary" style={{ borderWidth: '2px' }}>
            <Card.Body>

                <div className="mb-3 text-center">
                    <img 
                        src={imagen}   
                        alt={nombre}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        className="rounded-circle"
                    />
                </div>
                <Card.Title className="mb-3">{nombre}</Card.Title>
                <Card.Text className="text-muted">
                    {descripcion}
                </Card.Text>
                <Button variant={color} size="sm">
                    Ver más
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CardEspecialidad;