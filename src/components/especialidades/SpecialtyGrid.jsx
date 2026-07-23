import { Row, Col } from 'react-bootstrap';
import CardEspecialidad from './CardEspecialidad';

const SpecialtyGrid = ({ items = [], accentColor = '#0a2e5c', highlightColor = '#12b886' }) => {
  return (
    <Row className="g-3">
      {items.map((esp) => (
        <Col key={esp.id} xs={12} md={6}>
          <CardEspecialidad
            nombre={esp.nombre}
            descripcion={esp.descripcion}
            imagen={esp.imagen}
            accentColor={accentColor}
            highlightColor={highlightColor}
          />
        </Col>
      ))}
    </Row>
  );
};

export default SpecialtyGrid;