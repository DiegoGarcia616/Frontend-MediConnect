import { Container } from 'react-bootstrap';

const BannerEspecialidades = () => {
    return (
        <div className="bg-primary text-white py-5 mb-4">
            <Container className="text-center">
                <h1 className="display-4">Especialidades Médicas</h1>
                <p className="lead">
                    Contamos con un equipo de especialistas en diversas áreas de la medicina
                    para brindarte la mejor atención integral.
                </p>
            </Container>
        </div>
    );
};

export default BannerEspecialidades;