// Utilidades compartidas por las pruebas: proveedores, mocks y datos de ejemplo.
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

export const PRODUCTO_MOCK = {
  id: 1,
  title: 'Global Warning',
  price: 15990,
  category: 'Juegos de mesa',
  description: 'Disfruta con tus amigos colaborando por un mundo más sano',
  image: '/assets/img/JuegoTabla3.jpg',
};

export const USUARIO_MOCK = { nombre: 'Ana Pérez', email: 'ana@duoc.cl' };

// Mock del contexto de autenticación: cada función es un espía de Jasmine
export function crearAuthMock(cambios = {}) {
  return {
    usuario: null,
    registrar: jasmine.createSpy('registrar').and.returnValue({ ok: true }),
    login: jasmine.createSpy('login').and.returnValue({ ok: true }),
    logout: jasmine.createSpy('logout'),
    ...cambios,
  };
}

// Muestra la ruta actual para comprobar redirecciones
function UbicacionActual() {
  const location = useLocation();
  return <div data-testid="ubicacion">{location.pathname}</div>;
}

// Renderiza un componente con el carrito real, la autenticación simulada y un router en memoria.
// Si se indica `path`, el componente se monta en esa ruta y cualquier otra muestra la ubicación.
export function renderizar(ui, { auth = crearAuthMock(), carrito = [], ruta = '/', path } = {}) {
  const contenido = path ? (
    <Routes>
      <Route path={path} element={ui} />
      <Route path="*" element={<UbicacionActual />} />
    </Routes>
  ) : (
    ui
  );

  const resultado = render(
    <AuthContext.Provider value={auth}>
      <CartProvider initialCart={carrito}>
        <MemoryRouter initialEntries={[ruta]}>{contenido}</MemoryRouter>
      </CartProvider>
    </AuthContext.Provider>,
  );
  return { auth, ...resultado };
}

export function limpiarAlmacenamiento() {
  window.localStorage.clear();
  window.sessionStorage.clear();
}
