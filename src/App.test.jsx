// Pruebas originales del grupo (EVA2), adaptadas de Vitest a Jasmine.
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ProductCard from './components/ProductCard';
import { CartProvider, useCart } from './context/CartContext';

// Componente de apoyo que expone el carrito para probarlo de forma aislada
const MockComponent = () => {
  const { cart, addToCart } = useCart();
  return (
    <div>
      <span data-testid="cart-count">{cart.length}</span>
      <button
        data-testid="add-mock-btn"
        onClick={() => addToCart({ id: 99, title: 'Producto Test', price: 1000 })}
      >
        Añadir Mock
      </button>
    </div>
  );
};

describe('Suite de Pruebas Unitarias - Frontend Tienda', () => {
  it('1. El carrito debe iniciar vacío', () => {
    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>,
    );
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });

  it('2. Debe incrementar la cantidad de ítems al añadir un producto', () => {
    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>,
    );
    fireEvent.click(screen.getByTestId('add-mock-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
  });

  it('3. ProductCard debe renderizar correctamente el título recibido por props', () => {
    const mockProduct = { id: 10, title: 'Caja de Dados', price: 4990, image: '/test.png' };
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Caja de Dados')).toBeTruthy();
  });

  it('4. useCart lanza un error si se usa fuera de CartProvider', () => {
    // Se silencia el error que React escribe en consola al fallar el renderizado
    spyOn(console, 'error');
    expect(() => render(<MockComponent />)).toThrowError(/CartProvider/);
  });
});
