// Fuente de datos simulada de Pixel & Play, con operaciones CRUD persistidas en localStorage.
import { guardar, leer } from './almacenamiento';

export const CATEGORIAS = ['Juegos de mesa', 'Accesorios de escritorio'];

export const PRODUCTOS_INICIALES = [
  {
    id: 1,
    title: 'Global Warning',
    price: 15990,
    category: 'Juegos de mesa',
    featured: true,
    description: 'Disfruta con tus amigos colaborando por un mundo más sano',
    image: '/assets/img/JuegoTabla3.jpg',
    images: [
      '/assets/img/JuegoTabla1.jpg',
      '/assets/img/JuegoTabla2.jpg',
      '/assets/img/JuegoTabla3.jpg',
    ],
  },
  {
    id: 2,
    title: 'Playmat',
    price: 12990,
    category: 'Accesorios de escritorio',
    featured: true,
    description: 'Maximiza la precisión de tu ratón y protege tu escritorio',
    image: '/assets/img/Playmat1.png',
    images: [
      '/assets/img/Playmat1.png',
      '/assets/img/Playmat2.png',
      '/assets/img/Playmat3.png',
    ],
    video: '/assets/vid/PlaymatVideo1.mp4',
  },
  {
    id: 3,
    title: 'Porta Lápices',
    price: 5990,
    category: 'Accesorios de escritorio',
    featured: false,
    description: 'Mantén ordenado tu escritorio, y luce a la moda',
    image: '/assets/img/Portalapices1.png',
    images: [
      '/assets/img/Portalapices1.png',
      '/assets/img/Portalapices2.png',
      '/assets/img/Portalapices3.png',
    ],
  },
];

export const CLAVE_PRODUCTOS = 'pp_productos';

// Leer
export function listarProductos() {
  const guardados = leer(CLAVE_PRODUCTOS, null);
  if (guardados) return guardados;
  guardar(CLAVE_PRODUCTOS, PRODUCTOS_INICIALES);
  return PRODUCTOS_INICIALES;
}

export function obtenerProducto(id) {
  return listarProductos().find((p) => p.id === Number(id)) ?? null;
}

export function listarDestacados() {
  return listarProductos().filter((p) => p.featured);
}

export function filtrarPorCategoria(productos, categoria) {
  if (categoria === 'todas') return productos;
  return productos.filter((p) => p.category === categoria);
}

// Crear
export function crearProducto(datos) {
  const productos = listarProductos();
  const id = productos.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const nuevo = { featured: false, images: [], ...datos, id };
  guardar(CLAVE_PRODUCTOS, [...productos, nuevo]);
  return nuevo;
}

// Actualizar
export function actualizarProducto(id, cambios) {
  const productos = listarProductos();
  const actual = productos.find((p) => p.id === Number(id));
  if (!actual) return null;
  const actualizado = { ...actual, ...cambios, id: actual.id };
  guardar(
    CLAVE_PRODUCTOS,
    productos.map((p) => (p.id === actual.id ? actualizado : p)),
  );
  return actualizado;
}

// Eliminar
export function eliminarProducto(id) {
  const productos = listarProductos();
  const restantes = productos.filter((p) => p.id !== Number(id));
  if (restantes.length === productos.length) return false;
  guardar(CLAVE_PRODUCTOS, restantes);
  return true;
}

export function restablecerProductos() {
  guardar(CLAVE_PRODUCTOS, PRODUCTOS_INICIALES);
}
