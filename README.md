# Fullstack2_Eva2_Grupo1 — Pixel & Play (P&P)

Tienda de juegos de mesa y accesorios de escritorio, desarrollada con React, React Router y Bootstrap.
Proyecto de la Evaluación Parcial N° 2 de DSY1104 Desarrollo Fullstack II (Duoc UC).

Grupo 1: Francisco Figueroa, Jose Salas, Benjamin Jorquera y Santiago Vega.

## Tecnologías

| Uso | Herramienta |
|---|---|
| Framework de frontend | React 19 + Vite |
| Navegación | React Router 7 |
| Diseño responsivo | Bootstrap 5 + React Bootstrap |
| Pruebas unitarias | Jasmine (con React Testing Library) |
| Ejecución de pruebas | Karma en Chrome |
| Cobertura | karma-coverage + babel-plugin-istanbul |

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Pruebas

```bash
npm test
```

Abre Chrome con Karma y muestra los resultados de Jasmine en la ventana. Queda atento a los cambios; se detiene con `Ctrl + C`.

```bash
npm run test:ci
```

Ejecuta una sola vez en Chrome sin ventana (headless) y muestra el resumen en la terminal.

En ambos casos el reporte de cobertura queda en `coverage/index.html`.

## Estructura

```
src/
├── App.jsx              Rutas y proveedores de contexto
├── App.test.jsx         Pruebas originales del grupo, adaptadas a Jasmine
├── main.jsx             Punto de entrada
├── assets/style.css     Paleta y estilos propios
├── components/          Navbar, Footer, ProductCard, ProductGrid, Filters, Carousel, UserIcon
├── context/             CartContext (carrito) y AuthContext (sesión)
├── data/                Fuente de datos simulada con CRUD y persistencia en localStorage
├── pages/               Home, Products, ProductDetail, Cart, Contact, Login, Register, Profile, NotFound
├── utils/               Funciones puras: carrito, boleta y validaciones
└── tests/               Pruebas unitarias (*.test.js / *.test.jsx) y helpers.jsx
karma.conf.cjs           Configuración de Karma, Jasmine, Webpack y cobertura
public/assets/           Imágenes y video de los productos
```

## Rutas

| Ruta | Vista |
|---|---|
| `/` | Inicio con productos destacados |
| `/productos` | Catálogo con filtro por categoría |
| `/producto/:id` | Detalle con carrusel de imágenes y video |
| `/carrito` | Carrito con cantidades, total y compra |
| `/perfil` | Perfil e historial de boletas |
| `/registro`, `/login` | Registro e inicio de sesión con validaciones |
| `/contacto` | Formulario de contacto con validaciones |

## Persistencia simulada

- Productos: `localStorage.pp_productos` (CRUD en `src/data/productos.js`).
- Usuarios: `localStorage.usuarios`. Sesión activa: `sessionStorage.usuarioActivo`.
- Compras: `localStorage.compras`.
- El carrito vive en memoria y se reinicia al recargar.

## Entrega

Comprimir el proyecto **sin** las carpetas `node_modules`, `dist` ni `coverage`.
