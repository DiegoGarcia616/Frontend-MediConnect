import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { motion } from "framer-motion";

function CarruselCard({ features }) {
  const groupSize = 4;

  const groups = features.reduce((acc, _, i) => {
    if (i % groupSize === 0) acc.push(features.slice(i, i + groupSize));
    return acc;
  }, []);

  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.06,
      y: -10,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  return (
    <>
      <div className="d-none d-md-block">
        <Carousel interval={2500} indicators={false}>
          {groups.map((group, i) => (
            <Carousel.Item key={i}>
              <div className="container py-3">
                <div className="row g-3">
                  {group.map((f, idx) => (
                    <div className="col-md-3" key={idx}>
                      <motion.div
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        variants={cardVariants}
                      >
                        <Card className="card-custom">
                          <i className={`bi ${f.icon} icon`} />
                          <Card.Body className="p-3">
                            <Card.Title className="title">
                              {f.title}
                            </Card.Title>
                            <Card.Text className="text">
                              {f.text}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="d-block d-md-none">
        <Carousel interval={2500} indicators={false}>
          {features.map((f, i) => (
            <Carousel.Item key={i}>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardVariants}
              >
                <Card className="card-custom">
                  <i className={`bi ${f.icon} icon`} />
                  <Card.Body className="p-3">
                    <Card.Title className="title">{f.title}</Card.Title>
                    <Card.Text className="text">{f.text}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <style>{`
        .card-custom{
          text-align:center;
          border:none;
          margin:6px;
          padding:12px 10px;
          border-radius:16px;
          background: #ffffff;
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
          min-height:190px;
          cursor:pointer;
        }

        .icon{
          font-size:2.3rem;
          color:#3B82F6;
          margin-top:10px;
        }

        .title{
          font-size:1rem;
          font-weight:600;
          margin-top:8px;
        }

        .text{
          font-size:0.9rem;
          color:#475569;
        }
      `}</style>
    </>
  );
}

export default CarruselCard;