import { createContext, useContext, useState } from 'react';

import {
  agregarItem,
  calcularTotal,
  cambiarCantidad,
  contarUnidades,
  quitarItem,
} from '../utils/carrito';

export const CartContext = createContext(null);

// El carrito vive en memoria y se reinicia al recargar la página.
// initialCart permite partir con productos en las pruebas.
export function CartProvider({ children, initialCart = [] }) {
  const [cart, setCart] = useState(initialCart);
  // Último producto agregado, para el aviso. El id cambia en cada agregado
  // y reinicia el aviso aunque se agregue el mismo producto dos veces.
  const [aviso, setAviso] = useState(null);

  const addToCart = (producto) => {
    setCart((items) => agregarItem(items, producto));
    setAviso((anterior) => ({ id: (anterior?.id ?? 0) + 1, title: producto.title }));
  };
  const cerrarAviso = () => setAviso(null);
  const updateQuantity = (id, quantity) => setCart((items) => cambiarCantidad(items, id, quantity));
  const removeFromCart = (id) => setCart((items) => quitarItem(items, id));
  const clearCart = () => setCart([]);

  const value = {
    cart,
    cartCount: contarUnidades(cart),
    cartTotal: calcularTotal(cart),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    aviso,
    cerrarAviso,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
