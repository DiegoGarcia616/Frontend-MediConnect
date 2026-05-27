function Hero({
    title,
    subtitle,
    description,
    background,
    video,
    height = "90vh",
    align = "center"
  }) {
    const alignment =
      align === "left"
        ? "align-items-start text-start ps-5"
        : align === "right"
        ? "align-items-end text-end pe-5"
        : "align-items-center text-center";
  
    return (
      <section
        className={`d-flex flex-column justify-content-center ${alignment} text-white hero`}
        style={{
          height,
          position: "relative",
          overflow: "hidden"
        }}
      >
  
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div
            className="hero-bg"
            style={{
              backgroundImage: `url(${background})`
            }}
          />
        )}
  
        <div className="overlay" />
  
        <div className="position-relative hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="lead">{subtitle}</p>}
          {description && <p>{description}</p>}
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
          }
  
          .hero-title{
            font-size: 3.8rem;
            font-weight: 800;
            letter-spacing: 2px;
            animation: fadeUp 1.2s ease forwards;
          }
  
          .hero-content p{
            opacity:0;
            animation: fadeUp 1.5s ease forwards;
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