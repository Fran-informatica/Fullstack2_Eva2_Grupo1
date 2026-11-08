import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartIcon from './CartIcon';
import UserIcon from './UserIcon';

const NavbarUI = () => {
  const { cartCount, aviso } = useCart();
  const { usuario, logout } = useAuth();

  return (
    <Navbar expand="md" variant="dark" sticky="top" className="navbar-pp shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-pp">
          Pixel &amp; Play
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" aria-label="Abrir menú" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav className="align-items-md-center gap-md-2">
            {usuario ? (
              <>
                <Navbar.Text>Hola, {usuario.nombre}</Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={logout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-light" size="sm" className="my-1">
                  Ingresar
                </Button>
                <Button as={Link} to="/registro" variant="info" size="sm" className="my-1">
                  Registrarse
                </Button>
              </>
            )}
            <Nav.Link as={NavLink} to="/perfil" aria-label="Mi perfil" title="Mi perfil">
              <UserIcon />
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/carrito"
              aria-label={`Carrito (${cartCount} ${cartCount === 1 ? 'producto' : 'productos'})`}
            >
              <CartIcon />{' '}
              {/* key cambia en cada agregado y vuelve a ejecutar la animación de pulso */}
              <Badge
                key={aviso?.id ?? 0}
                bg="info"
                pill
                data-testid="cart-badge"
                className={aviso ? 'carrito-pulso' : undefined}
              >
                {cartCount}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUI;
