function Hero({
  title,
  subtitle,
  description,
  background,
  backgroundColor,
  video,
  height = "90vh",
  align = "center"
}) {
  const alignment =
    align === "left"
      ? "align-items-start text-start ps-5 ps-md-5"
      : align === "right"
      ? "align-items-end text-end pe-5 pe-md-5"
      : "align-items-center text-center";

  return (
    <section
      className={`d-flex flex-column justify-content-center ${alignment} text-white hero`}
      style={{
        height,
        position: "relative",
        overflow: "hidden",
        background: !background && !video ? backgroundColor : undefined
      }}
    >
      {video ? (
        <video autoPlay muted loop playsInline className="hero-video">
          <source src={video} type="video/mp4" />
        </video>
      ) : background ? (
        <div className="hero-bg" style={{ backgroundImage: `url(${background})` }} />
      ) : null}

      {(background || video) && <div className="overlay" />}

      <div className="position-relative hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="lead hero-subtitle">{subtitle}</p>}
        {description && <p className="hero-description">{description}</p>}
      </div>

      <style>{`
        .hero-bg{
          position:absolute;
          inset:0;
          background-size:cover;
          background-position:center;
          transform: scale(1.05);
        }

        .hero-video{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .overlay{
          position:absolute;
          inset:0;
          background: rgba(0,0,0,0.55);
          z-index:1;
        }

        .hero-content{
          z-index:2;
          max-width: 850px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .hero-title {
          font-size: clamp(1.5rem, 4.2vw, 3rem);
          font-weight: 800;
          letter-spacing: 1px;
          line-height: 1.25;
          animation: fadeUp 1.2s ease forwards;
          word-wrap: break-word;
          overflow-wrap: break-word;
          padding: 0 12px;
          margin: 0;
        }

        .hero-subtitle,
        .hero-description {
          font-size: clamp(0.82rem, 2vw, 1.05rem);
          line-height: 1.55;
          opacity: 0;
          animation: fadeUp 1.5s ease forwards;
          word-wrap: break-word;
          overflow-wrap: break-word;
          padding: 0 12px;
          margin-top: 0.6rem;
        }

        @media (max-width: 991px) {
          .hero {
            height: 55vh !important;
          }
        }

        @media (max-width: 767px) {
          .hero {
            height: 42vh !important;
          }

          .hero-title {
            letter-spacing: 0.5px;
            padding: 0 8px;
          }

          .hero-subtitle,
          .hero-description {
            padding: 0 8px;
          }
        }

        @media (max-width: 480px) {
          .hero {
            height: 34vh !important;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-title {
            font-size: clamp(1.25rem, 6vw, 2rem);
          }
        }

        @media (max-width: 360px) {
          .hero {
            height: 30vh !important;
          }
        }

        @keyframes fadeUp{
          from{
            opacity:0;
            transform: translateY(30px);
          }
          to{
            opacity:1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;