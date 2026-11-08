import { useState } from 'react';
import { Alert, Button, ButtonGroup, Card, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { registrarCompra } from '../data/compras';
import { calcularSubtotal, formatearPrecio } from '../utils/carrito';

const Cart = () => {
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const comprar = () => {
    if (!usuario) {
      setError('Debes iniciar sesión para comprar.');
      return;
    }
    const compra = registrarCompra(usuario, cart);
    clearCart();
    navigate('/perfil', { state: { compraNumero: compra.numero } });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>Tu carrito está vacío</h2>
        <p className="text-muted">Agrega productos desde el catálogo.</p>
        <Button as={Link} to="/productos" variant="dark" className="mt-3">Ver productos</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Carrito de compras</h2>
      <Row className="g-4">
        <Col xs={12} lg={8}>
          <Table responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Subtotal</th>
                <th><span className="visually-hidden">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.image} alt={`Imagen de ${item.title}`} className="carrito-imagen" />
                      <div>
                        <div className="fw-semibold">{item.title}</div>
                        <small className="text-muted">{formatearPrecio(item.price)} c/u</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <ButtonGroup size="sm" aria-label={`Cantidad de ${item.title}`}>
                      <Button
                        variant="outline-dark"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Disminuir cantidad de ${item.title}`}
                      >
                        −
                      </Button>
                      <span className="carrito-cantidad" data-testid={`cantidad-${item.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline-dark"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Aumentar cantidad de ${item.title}`}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td className="text-end fw-semibold" data-testid={`subtotal-${item.id}`}>
                    {formatearPrecio(calcularSubtotal(item))}
                  </td>
                  <td className="text-end">
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Quitar ${item.title} del carrito`}
                    >
                      Quitar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="outline-danger" size="sm" onClick={clearCart}>Vaciar carrito</Button>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h3" className="h5">Resumen</Card.Title>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})</span>
                <span>{formatearPrecio(cartTotal)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5" data-testid="carrito-total">
                <span>Total</span>
                <span>{formatearPrecio(cartTotal)}</span>
              </div>
              {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}
              <Button variant="dark" className="w-100 mt-3" onClick={comprar} disabled={!usuario}>
                Comprar
              </Button>
              {!usuario && (
                <small className="d-block text-muted mt-2 text-center">
                  <Link to="/login">Inicia sesión</Link> para comprar.
                </small>
              )}
              <Button as={Link} to="/productos" variant="outline-dark" className="w-100 mt-2">
                Seguir comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
