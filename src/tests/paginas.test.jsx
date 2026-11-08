// Pruebas de páginas que combinan componentes, contexto y datos.
import { fireEvent, render, screen } from '@testing-library/react';

import NavbarUI from '../components/Navbar';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { listarCompras, registrarCompra } from '../data/compras';
import Cart from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import { USUARIO_MOCK, crearAuthMock, limpiarAlmacenamiento, renderizar } from './helpers';

const ITEM = { id: 1, title: 'Global Warning', price: 15990, image: '/assets/img/JuegoTabla3.jpg', quantity: 1 };

describe('Navbar', () => {
  it('muestra la cantidad de unidades del carrito en el contador', () => {
    renderizar(<NavbarUI />, { carrito: [{ ...ITEM, quantity: 3 }] });
    expect(screen.getByTestId('cart-badge').textContent).toBe('3');
  });

  it('sin sesión muestra Ingresar y Registrarse', () => {
    renderizar(<NavbarUI />);
    expect(screen.getByText('Ingresar')).toBeTruthy();
    expect(screen.queryByText('Cerrar sesión')).toBeNull();
  });

  it('con sesión saluda al usuario y llama a logout (mock) al cerrar sesión', () => {
    const { auth } = renderizar(<NavbarUI />, { auth: crearAuthMock({ usuario: USUARIO_MOCK }) });
    expect(screen.getByText('Hola, Ana Pérez')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));
    expect(auth.logout).toHaveBeenCalledTimes(1);
  });
});

describe('Catálogo y detalle', () => {
  beforeEach(limpiarAlmacenamiento);

  it('filtra el catálogo por categoría al elegir un filtro', () => {
    renderizar(<Products />);
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(3);
    fireEvent.click(screen.getByRole('button', { name: 'Juegos de mesa' }));
    const titulos = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titulos).toEqual(['Global Warning']);
  });

  it('muestra el detalle con el video solo si el producto lo tiene', () => {
    renderizar(<ProductDetail />, { ruta: '/producto/2', path: '/producto/:id' });
    expect(screen.getByRole('heading', { name: 'Playmat' })).toBeTruthy();
    expect(screen.getByText('$12.990')).toBeTruthy();
    expect(screen.getByTestId('video-producto')).toBeTruthy();
  });

  it('muestra "Producto no encontrado" con un id inexistente', () => {
    renderizar(<ProductDetail />, { ruta: '/producto/99', path: '/producto/:id' });
    expect(screen.getByText('Producto no encontrado')).toBeTruthy();
    expect(screen.queryByTestId('video-producto')).toBeNull();
  });
});

describe('Carrito', () => {
  beforeEach(limpiarAlmacenamiento);

  it('muestra un aviso cuando el carrito está vacío', () => {
    renderizar(<Cart />);
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
  });

  it('aumenta la cantidad y recalcula subtotal y total', () => {
    renderizar(<Cart />, { carrito: [ITEM] });
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad de Global Warning' }));
    expect(screen.getByTestId('cantidad-1').textContent).toBe('2');
    expect(screen.getByTestId('subtotal-1').textContent).toBe('$31.980');
    expect(screen.getByTestId('carrito-total').textContent).toContain('$31.980');
  });

  it('quita el producto al bajar la cantidad a 0', () => {
    renderizar(<Cart />, { carrito: [ITEM] });
    fireEvent.click(screen.getByRole('button', { name: 'Disminuir cantidad de Global Warning' }));
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
  });

  it('deshabilita Comprar si no hay sesión', () => {
    renderizar(<Cart />, { carrito: [ITEM] });
    expect(screen.getByRole('button', { name: 'Comprar' }).disabled).toBeTrue();
    expect(screen.getByText('Inicia sesión')).toBeTruthy();
  });

  it('con sesión registra la compra, vacía el carrito y redirige al perfil', () => {
    renderizar(<Cart />, {
      auth: crearAuthMock({ usuario: USUARIO_MOCK }),
      carrito: [ITEM],
      ruta: '/carrito',
      path: '/carrito',
    });
    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));
    const compras = listarCompras();
    expect(compras.length).toBe(1);
    expect(compras[0].total).toBe(15990);
    expect(compras[0].cliente.email).toBe('ana@duoc.cl');
    expect(screen.getByTestId('ubicacion').textContent).toBe('/perfil');
  });
});

describe('Perfil', () => {
  beforeEach(limpiarAlmacenamiento);

  it('sin sesión invita a iniciar sesión', () => {
    renderizar(<Profile />);
    expect(screen.getByText('Inicia sesión')).toBeTruthy();
    expect(screen.queryByText('Historial de compras')).toBeNull();
  });

  it('con sesión muestra solo las boletas del usuario', () => {
    registrarCompra(USUARIO_MOCK, [ITEM]);
    registrarCompra({ nombre: 'Luis', email: 'luis@gmail.com' }, [ITEM]);
    renderizar(<Profile />, { auth: crearAuthMock({ usuario: USUARIO_MOCK }) });
    expect(screen.getByLabelText('Boleta N° 000001')).toBeTruthy();
    expect(screen.queryByLabelText('Boleta N° 000002')).toBeNull();
  });
});

describe('AuthProvider (integración con localStorage y sessionStorage)', () => {
  beforeEach(limpiarAlmacenamiento);

  // Componente de apoyo que usa el contexto real
  const Sesion = () => {
    const { usuario, registrar, login, logout } = useAuth();
    return (
      <div>
        <span data-testid="usuario">{usuario ? usuario.nombre : 'sin sesión'}</span>
        <button onClick={() => registrar({ nombre: 'Ana', email: 'ana@duoc.cl', password: 'Secreta123' })}>registrar</button>
        <button onClick={() => login('ana@duoc.cl', 'Secreta123')}>login</button>
        <button onClick={logout}>logout</button>
      </div>
    );
  };

  it('registra, inicia sesión guardándola en sessionStorage y la cierra', () => {
    render(
      <AuthProvider>
        <Sesion />
      </AuthProvider>,
    );
    fireEvent.click(screen.getByText('registrar'));
    fireEvent.click(screen.getByText('login'));
    expect(screen.getByTestId('usuario').textContent).toBe('Ana');
    expect(JSON.parse(sessionStorage.getItem('usuarioActivo')).email).toBe('ana@duoc.cl');

    fireEvent.click(screen.getByText('logout'));
    expect(screen.getByTestId('usuario').textContent).toBe('sin sesión');
    expect(sessionStorage.getItem('usuarioActivo')).toBeNull();
  });
});
