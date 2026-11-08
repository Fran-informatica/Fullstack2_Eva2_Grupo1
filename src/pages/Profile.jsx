import { Alert, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import UserIcon from '../components/UserIcon';
import { useAuth } from '../context/AuthContext';
import { listarComprasDe } from '../data/compras';
import { formatearNumeroBoleta, generarBoletaTexto } from '../utils/boleta';

const Profile = () => {
  const { usuario } = useAuth();
  const location = useLocation();
  const compraNumero = location.state?.compraNumero;

  if (!usuario) {
    return (
      <div className="text-center py-5">
        <h2>Mi perfil</h2>
        <p className="text-muted">
          <Link to="/login">Inicia sesión</Link> para ver tu perfil y tu historial de compras.
        </p>
      </div>
    );
  }

  // La compra más reciente aparece primero
  const historial = [...listarComprasDe(usuario.email)].reverse();

  return (
    <div className="perfil-pp mx-auto">
      <h2>Mi perfil</h2>

      <div className="d-flex align-items-center gap-3 mb-4">
        <span className="perfil-icono"><UserIcon size={48} /></span>
        <div>
          <div className="fw-semibold">{usuario.nombre}</div>
          <div className="text-muted">{usuario.email}</div>
        </div>
      </div>

      {compraNumero && (
        <Alert variant="success">
          Compra realizada. Boleta N° {formatearNumeroBoleta(compraNumero)}.
        </Alert>
      )}

      <h3 className="h5 mb-3">Historial de compras</h3>
      {historial.length === 0 ? (
        <p className="text-muted">Aún no tienes compras.</p>
      ) : (
        historial.map((compra) => (
          <Card key={compra.numero} className="mb-3 shadow-sm">
            <Card.Body>
              <pre className="boleta mb-0" aria-label={`Boleta N° ${formatearNumeroBoleta(compra.numero)}`}>
                {generarBoletaTexto(compra)}
              </pre>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Profile;
