import { Container, Row, Col } from "react-bootstrap";

function getYoutubeEmbed(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }

    const id = parsed.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;

    return null;
  } catch {
    return null;
  }
}

function ListaConImagen({
  features,
  image,
  videoUrl,
  imageAlt = "",
  imagePosition = "right",
  title = ""
}) {
  const embedVideo = getYoutubeEmbed(videoUrl);
  const hasMedia = embedVideo || image;

  return (
    <section className="py-5 lista">
      <Container>
        <Row className="align-items-center justify-content-center g-4">

          {hasMedia && imagePosition === "left" && (
            <Col md={6} className="anim d-flex justify-content-center">
              {embedVideo ? (
                <iframe
                  width="100%"
                  height="340"
                  src={embedVideo}
                  title="YouTube video"
                  allowFullScreen
                  className="rounded shadow"
                />
              ) : (
                <img
                  src={image}
                  alt={imageAlt}
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "90%" }}
                />
              )}
            </Col>
          )}

          <Col
            md={hasMedia ? 6 : 10}
            className="anim text-center d-flex flex-column align-items-center"
          >
            <h1 className="mb-4">{title}</h1>

            <ul className="list-unstyled feature-list text-start">
              {features.map((f, i) => (
                <li key={i} className="feature-item">
                  <i className={`bi ${f.icon} feature-icon`}></i>
                  <span className="feature-text">{f.text}</span>
                </li>
              ))}
            </ul>
          </Col>

          {hasMedia && imagePosition === "right" && (
            <Col md={6} className="anim d-flex justify-content-center">
              {embedVideo ? (
                <iframe
                  width="100%"
                  height="340"
                  src={embedVideo}
                  title="YouTube video"
                  allowFullScreen
                  className="rounded shadow"
                />
              ) : (
                <img
                  src={image}
                  alt={imageAlt}
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "90%" }}
                />
              )}
            </Col>
          )}

        </Row>
      </Container>

      <style>{`
        .anim{
          animation: fadeUp .8s ease both;
        }

        .feature-list{
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          padding: 0;
        }

        .feature-item{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 14px;
          padding: 12px 10px;
          margin: 6px 0;
          border-radius: 10px;
          background: rgba(0,0,0,0.02);
          transition: all .25s ease;
        }

        .feature-item:hover{
          transform: translateX(6px);
          background: rgba(59,130,246,0.08);
        }

        .feature-icon{
          color: #3B82F6;
          font-size: 1.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          flex-shrink: 0;
        }

        .feature-text{
          font-size: 1.05rem;
          color: #334155;
          line-height: 1.4;
        }

        @keyframes fadeUp{
          from{opacity:0; transform:translateY(18px);}
          to{opacity:1; transform:translateY(0);}
        }
      `}</style>
    </section>
  );
}

export default ListaConImagen;