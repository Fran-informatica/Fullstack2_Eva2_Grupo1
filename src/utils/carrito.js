// Cálculos del carrito como funciones puras, separadas del contexto para poder probarlas.

export function calcularSubtotal(item) {
  return item.price * item.quantity;
}

export function calcularTotal(items) {
  return items.reduce((total, item) => total + calcularSubtotal(item), 0);
}

export function contarUnidades(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function agregarItem(items, producto) {
  const existente = items.find((i) => i.id === producto.id);
  if (existente) {
    return items.map((i) => (i.id === producto.id ? { ...i, quantity: i.quantity + 1 } : i));
  }
  const { id, title, price, image } = producto;
  return [...items, { id, title, price, image, quantity: 1 }];
}

// Una cantidad menor a 1 elimina el producto del carrito
export function cambiarCantidad(items, id, quantity) {
  if (quantity < 1) return quitarItem(items, id);
  return items.map((i) => (i.id === id ? { ...i, quantity } : i));
}

export function quitarItem(items, id) {
  return items.filter((i) => i.id !== id);
}

export function formatearPrecio(valor) {
  return `$${Number(valor).toLocaleString('es-CL')}`;
}
