import {
  CLAVE_PRODUCTOS,
  PRODUCTOS_INICIALES,
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  filtrarPorCategoria,
  listarDestacados,
  listarProductos,
  obtenerProducto,
  restablecerProductos,
} from '../data/productos';
import { limpiarAlmacenamiento } from './helpers';

describe('Fuente de datos de productos (CRUD)', () => {
  beforeEach(limpiarAlmacenamiento);

  it('carga los 3 productos iniciales con los precios nuevos y los guarda en localStorage', () => {
    const productos = listarProductos();
    expect(productos.map((p) => p.title)).toEqual(['Global Warning', 'Playmat', 'Porta Lápices']);
    expect(productos.map((p) => p.price)).toEqual([15990, 12990, 5990]);
    expect(JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)).length).toBe(3);
  });

  it('obtiene un producto por id (también como texto) y devuelve null si no existe', () => {
    expect(obtenerProducto('2').title).toBe('Playmat');
    expect(obtenerProducto(99)).toBeNull();
  });

  it('crea un producto con un id nuevo y lo persiste', () => {
    const nuevo = crearProducto({ title: 'Dados', price: 2990, category: 'Juegos de mesa' });
    expect(nuevo.id).toBe(4);
    expect(obtenerProducto(4).title).toBe('Dados');
    expect(listarProductos().length).toBe(4);
  });

  it('actualiza un producto sin cambiar su id', () => {
    const actualizado = actualizarProducto(3, { price: 4990, id: 50 });
    expect(actualizado.id).toBe(3);
    expect(obtenerProducto(3).price).toBe(4990);
    expect(actualizarProducto(99, { price: 1 })).toBeNull();
  });

  it('elimina un producto y avisa si no existía', () => {
    expect(eliminarProducto(1)).toBeTrue();
    expect(obtenerProducto(1)).toBeNull();
    expect(eliminarProducto(1)).toBeFalse();
    restablecerProductos();
    expect(listarProductos().length).toBe(PRODUCTOS_INICIALES.length);
  });

  it('filtra por categoría y lista los destacados', () => {
    const productos = listarProductos();
    expect(filtrarPorCategoria(productos, 'todas').length).toBe(3);
    expect(filtrarPorCategoria(productos, 'Accesorios de escritorio').map((p) => p.id)).toEqual([2, 3]);
    expect(listarDestacados().map((p) => p.title)).toEqual(['Global Warning', 'Playmat']);
  });

  it('vuelve a los datos iniciales si localStorage tiene datos corruptos (mock de Storage)', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{esto no es JSON');
    const productos = listarProductos();
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(CLAVE_PRODUCTOS);
    expect(productos).toEqual(PRODUCTOS_INICIALES);
  });
});
