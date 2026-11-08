import { calcularSubtotal, calcularTotal, contarUnidades, formatearPrecio } from './carrito';

// 40 columnas para que la boleta quepa sin desplazamiento en un celular
const ANCHO = 40;

export function crearCompra({ numero, fecha, usuario, items }) {
  return {
    numero,
    fecha: fecha.toISOString(),
    cliente: { nombre: usuario.nombre, email: usuario.email },
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      subtotal: calcularSubtotal(item),
    })),
    unidades: contarUnidades(items),
    total: calcularTotal(items),
  };
}

export function formatearNumeroBoleta(numero) {
  return String(numero).padStart(6, '0');
}

export function formatearFecha(iso) {
  const f = new Date(iso);
  const dos = (n) => String(n).padStart(2, '0');
  return `${dos(f.getDate())}-${dos(f.getMonth() + 1)}-${f.getFullYear()} ${dos(f.getHours())}:${dos(f.getMinutes())}`;
}

function centrar(texto) {
  const margen = Math.max(0, Math.floor((ANCHO - texto.length) / 2));
  return ' '.repeat(margen) + texto;
}

function fila(izquierda, derecha) {
  return izquierda + String(derecha).padStart(Math.max(1, ANCHO - izquierda.length));
}

export function generarBoletaTexto(compra) {
  const separador = '-'.repeat(ANCHO);
  const lineasItems = compra.items.flatMap((item) => [
    item.title,
    fila(`  ${item.quantity} x ${formatearPrecio(item.price)}`, formatearPrecio(item.subtotal)),
  ]);

  return [
    centrar('PIXEL & PLAY'),
    centrar('Juegos de mesa y accesorios'),
    separador,
    `Boleta N° ${formatearNumeroBoleta(compra.numero)}`,
    `Fecha: ${formatearFecha(compra.fecha)}`,
    `Cliente: ${compra.cliente.nombre}`,
    `Correo: ${compra.cliente.email}`,
    separador,
    ...lineasItems,
    separador,
    fila('Unidades', compra.unidades),
    fila('TOTAL', formatearPrecio(compra.total)),
    separador,
    centrar('Gracias por su compra'),
  ].join('\n');
}
