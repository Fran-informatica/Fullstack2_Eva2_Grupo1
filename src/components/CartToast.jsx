import { Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import CartIcon from './CartIcon';

// Aviso flotante al agregar un producto; se cierra solo a los 5 segundos
export const DURACION_AVISO = 5000;

const CartToast = () => {
  const { aviso, cerrarAviso } = useCart();

  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed toast-pp">
      {aviso && (
        // key reinicia el temporizador cada vez que se agrega un producto
        <Toast key={aviso.id} onClose={cerrarAviso} delay={DURACION_AVISO} autohide role="status">
          <Toast.Header closeLabel="Cerrar aviso">
            <CartIcon size={16} />
            <strong className="ms-2 me-auto">Carrito</strong>
          </Toast.Header>
          <Toast.Body>
            <span data-testid="aviso-carrito">
              <strong>{aviso.title}</strong> se agregó al carrito.
            </span>{' '}
            <Link to="/carrito" onClick={cerrarAviso}>Ver carrito</Link>
          </Toast.Body>
        </Toast>
      )}
    </ToastContainer>
  );
};

export default CartToast;
