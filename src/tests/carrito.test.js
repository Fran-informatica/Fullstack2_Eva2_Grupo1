import {
  agregarItem,
  calcularSubtotal,
  calcularTotal,
  cambiarCantidad,
  contarUnidades,
  formatearPrecio,
  quitarItem,
} from '../utils/carrito';
import { PRODUCTO_MOCK } from './helpers';

describe('Lógica del carrito (funciones puras)', () => {
  it('agrega un producto nuevo con cantidad 1 y sin modificar el arreglo original', () => {
    const original = [];
    const items = agregarItem(original, PRODUCTO_MOCK);
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(jasmine.objectContaining({ id: 1, title: 'Global Warning', quantity: 1 }));
    expect(original.length).toBe(0);
  });

  it('suma una unidad si el producto ya está en el carrito', () => {
    const items = agregarItem(agregarItem([], PRODUCTO_MOCK), PRODUCTO_MOCK);
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it('cambia la cantidad y elimina el producto si queda en 0', () => {
    const items = agregarItem([], PRODUCTO_MOCK);
    expect(cambiarCantidad(items, 1, 5)[0].quantity).toBe(5);
    expect(cambiarCantidad(items, 1, 0)).toEqual([]);
    expect(quitarItem(items, 1)).toEqual([]);
  });

  it('calcula subtotal, total y unidades', () => {
    const items = [
      { id: 1, price: 15990, quantity: 2 },
      { id: 2, price: 12990, quantity: 1 },
    ];
    expect(calcularSubtotal(items[0])).toBe(31980);
    expect(calcularTotal(items)).toBe(44970);
    expect(contarUnidades(items)).toBe(3);
    expect(calcularTotal([])).toBe(0);
  });

  it('formatea precios en pesos chilenos', () => {
    expect(formatearPrecio(15990)).toBe('$15.990');
    expect(formatearPrecio(0)).toBe('$0');
  });
});
