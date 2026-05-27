import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SeccionConImg = ({
  title,
  text,
  image,
  imageAlt,
  imagePosition = "left",
  bgColor = "#ffffff",
  textColor = "#000000",
}) => {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <section className="py-5 section-anim" style={{ backgroundColor: bgColor }}>
      <Container>
        <Row
          className={`align-items-center ${
            imagePosition === "right" ? "flex-md-row-reverse" : ""
          }`}
        >
          <Col md={6} className="img-col">
            <div className="img-wrapper">
              <img src={image} alt={imageAlt} className="img-fluid img-anim" />
            </div>
          </Col>

          <Col md={6} className="text-col">
            <h1 className="title-anim" style={{ color: textColor }}>
              {title}
            </h1>

            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-anim" style={{ color: textColor }}>
                {p}
              </p>
            ))}
          </Col>
        </Row>
      </Container>

      <style>{`
        .section-anim {
          overflow: hidden;
        }

        .img-wrapper {
          overflow: hidden;
          border-radius: 14px;
        }

        .img-anim {
          transition: transform 0.6s ease, filter 0.6s ease;
          animation: fadeLeft 0.9s ease both;
        }

        .img-anim:hover {
          transform: scale(1.06);
          filter: brightness(1.05);
        }

        .title-anim {
          animation: fadeUp 0.8s ease both;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .text-anim {
          animation: fadeUp 1s ease both;
          line-height: 1.6;
          opacity: 0.95;
        }

        .img-col {
          animation: fadeLeft 0.9s ease both;
        }

        .text-col {
          animation: fadeRight 0.9s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default SeccionConImg;