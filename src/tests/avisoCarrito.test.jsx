// Pruebas del aviso al agregar al carrito: toast con el nombre del producto y pulso del contador.
import { act, fireEvent, screen } from '@testing-library/react';

import CartToast, { DURACION_AVISO } from '../components/CartToast';
import NavbarUI from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { PRODUCTO_MOCK, renderizar } from './helpers';

// Escenario como en la tienda: barra, una tarjeta de producto y el aviso
const Escenario = () => {
  const { addToCart } = useCart();
  return (
    <>
      <NavbarUI />
      <ProductCard product={PRODUCTO_MOCK} onAdd={addToCart} />
      <CartToast />
    </>
  );
};

const agregar = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Agregar Global Warning al carrito' }));

describe('Aviso al agregar al carrito', () => {
  it('no muestra aviso ni pulso antes de agregar productos', () => {
    renderizar(<Escenario />);
    expect(screen.queryByTestId('aviso-carrito')).toBeNull();
    expect(screen.getByTestId('cart-badge').classList.contains('carrito-pulso')).toBeFalse();
  });

  it('muestra el nombre del producto, un enlace al carrito y hace pulsar el contador', () => {
    renderizar(<Escenario />);
    agregar();
    expect(screen.getByTestId('aviso-carrito').textContent).toBe('Global Warning se agregó al carrito.');
    expect(screen.getByRole('link', { name: 'Ver carrito' }).getAttribute('href')).toBe('/carrito');
    const badge = screen.getByTestId('cart-badge');
    expect(badge.textContent).toBe('1');
    expect(badge.classList.contains('carrito-pulso')).toBeTrue();
  });

  it('mantiene un solo aviso al agregar varias veces', () => {
    renderizar(<Escenario />);
    agregar();
    agregar();
    expect(screen.getAllByTestId('aviso-carrito').length).toBe(1);
    expect(screen.getByTestId('cart-badge').textContent).toBe('2');
  });

  it('se cierra con el botón de cerrar', () => {
    renderizar(<Escenario />);
    agregar();
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar aviso' }));
    expect(screen.queryByTestId('aviso-carrito')).toBeNull();
  });

  describe('con el reloj simulado de Jasmine', () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it('se cierra solo después de DURACION_AVISO (5 segundos)', () => {
      renderizar(<Escenario />);
      agregar();
      act(() => jasmine.clock().tick(DURACION_AVISO - 500));
      expect(screen.getByTestId('aviso-carrito')).toBeTruthy();
      act(() => jasmine.clock().tick(1000));
      expect(screen.queryByTestId('aviso-carrito')).toBeNull();
    });
  });
});
