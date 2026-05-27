import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CardDescrip({ titulo, descripcion, imagen, botonLink }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      style={{ height: "100%" }}
    >
      <Card className="h-100 border-0 shadow-lg rounded-4 overflow-hidden card-anim">
        <div className="img-wrapper">
          <Card.Img variant="top" src={imagen} alt={titulo} />
        </div>

        <Card.Body className="d-flex flex-column p-4">
          <Card.Title className="fw-bold fs-5 mb-2">{titulo}</Card.Title>
          <Card.Text className="text-muted flex-grow-1">{descripcion}</Card.Text>

          {botonLink &&
            (botonLink.startsWith("http") ? (
              <a
                href={botonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark w-100 mt-3 btn-anim"
              >
                Más información
              </a>
            ) : (
              <Link to={botonLink} className="btn btn-dark w-100 mt-3 btn-anim">
                Más información
              </Link>
            ))}
        </Card.Body>
      </Card>

      <style>{`
        .card-anim {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .card-anim:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .img-wrapper {
          overflow: hidden;
        }

        .img-wrapper img {
          transition: transform 0.5s ease;
          object-fit: cover;
          height: 220px;
        }

        .card-anim:hover .img-wrapper img {
          transform: scale(1.08);
        }

        .btn-anim {
          transition: all 0.3s ease;
          border-radius: 12px;
        }

        .btn-anim:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
}