import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center py-5">
    <h2>Página no encontrada</h2>
    <p className="text-muted">La dirección que buscas no existe.</p>
    <Button as={Link} to="/" variant="dark">Volver al inicio</Button>
  </div>
);

export default NotFound;
