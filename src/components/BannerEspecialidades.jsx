import { Container } from 'react-bootstrap';

const BannerEspecialidades = () => {
    return (
        <div
            className="mb-4 rounded-5 shadow-lg overflow-hidden mx-auto"
            style={{
                maxWidth: '1200px',
                background: 'linear-gradient(135deg, #0a2e5c 0%, #124b8a 100%)'
            }}
        >
            <div
                className="text-center text-white py-4 px-3 px-md-5"
            >

                <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 text-uppercase fw-semibold">
                    Área Médica
                </span>

                <h1 className="fw-bold mb-3 display-5">
                    Especialidades Médicas
                </h1>

                <p
                    className="opacity-90 mx-auto mb-0"
                    style={{
                        maxWidth: '700px',
                        lineHeight: '1.8'
                    }}
                >
                    Contamos con un equipo de especialistas en diversas áreas de la medicina
                    para brindarte la mejor atención integral.
                </p>

            </div>
        </div>
    );
};

export default BannerEspecialidades;