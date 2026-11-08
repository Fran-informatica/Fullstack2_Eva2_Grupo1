// Historial de compras de todas las cuentas; cada compra guarda el correo de su cliente.
import { crearCompra } from '../utils/boleta';
import { guardar, leer } from './almacenamiento';

export const CLAVE_COMPRAS = 'compras';

export function listarCompras() {
  return leer(CLAVE_COMPRAS, []);
}

export function listarComprasDe(email) {
  return listarCompras().filter((c) => c.cliente.email === email);
}

// El número de boleta es correlativo entre todas las cuentas
export function registrarCompra(usuario, items, fecha = new Date()) {
  const compras = listarCompras();
  const compra = crearCompra({ numero: compras.length + 1, fecha, usuario, items });
  guardar(CLAVE_COMPRAS, [...compras, compra]);
  return compra;
}
