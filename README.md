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
| Ejecución de pruebas | Karma en Chrome, Chromium o Firefox |
| Cobertura | karma-coverage + babel-plugin-istanbul |

## Requisitos

| Requisito | Versión | Motivo |
|---|---|---|
| Node.js | **20.19 o superior** (en la rama 20), o **22.12 o superior** | Mínimo que exige Vite 7. El proyecto se probó con Node 24.22 |
| npm | 10 o superior | Viene incluido con Node.js. Se probó con npm 11.19 |
| Navegador para las pruebas | Una versión actual de Chrome, Chromium (incluido Ungoogled Chromium) o Firefox | Karma ejecuta las pruebas en un navegador real. Se probó con Chrome 156 y Firefox 159 |
| Git | Cualquier versión reciente | Solo para clonar el repositorio |

Para revisar las versiones instaladas:

```bash
node -v
npm -v
```

Versiones principales del proyecto (las exactas quedan fijadas en `package-lock.json`):

| Paquete | Versión |
|---|---|
| React / React DOM | 19.3 |
| Vite / @vitejs/plugin-react | 7.3 / 5.2 |
| React Router DOM | 7.18 |
| Bootstrap / React Bootstrap | 5.3 / 2.10 |
| Karma | 6.4 |
| Jasmine (`jasmine-core` / `karma-jasmine`) | 4.6 / 5.1 |
| React Testing Library | 16.3 |
| webpack / babel-loader (solo para las pruebas) | 5.112 / 9.2 |

## Instalación y ejecución

```bash
git clone https://github.com/Fran-informatica/Fullstack2_Eva2_Grupo1.git
cd Fullstack2_Eva2_Grupo1
npm ci
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`. Se detiene con `Ctrl + C`.

`npm ci` instala exactamente las versiones de `package-lock.json`; `npm install` también funciona. La instalación se hace una sola vez, o de nuevo si cambian las dependencias.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Versión de producción en `dist/` |
| `npm run preview` | Sirve lo que quedó en `dist/` |
| `npm test` | Pruebas con la ventana del navegador visible; quedan atentas a los cambios |
| `npm run test:ci` | Pruebas una sola vez, sin ventana, con el resumen en la terminal |

## Pruebas

```bash
npm test
```

Abre el navegador con Karma y muestra los resultados de Jasmine en la ventana (botón **DEBUG** para verlos en detalle). Queda atento a los cambios; se detiene con `Ctrl + C`.

```bash
npm run test:ci
```

Ejecuta una sola vez sin ventana (headless) y muestra el resumen en la terminal.

En ambos casos el reporte de cobertura queda en `coverage/index.html`.

### Elegir el navegador

Por defecto se usa **Google Chrome**. El navegador se cambia con la variable de entorno `KARMA_BROWSER` (`Chrome`, `Chromium` o `Firefox`), y la ruta de un Chrome o Chromium que no esté en la ubicación habitual se indica con `CHROME_BIN`.

**Firefox**

```bash
# Linux / macOS / Git Bash
KARMA_BROWSER=Firefox npm test
```

```powershell
# Windows PowerShell
$env:KARMA_BROWSER = "Firefox"; npm test
```

**Chromium o Ungoogled Chromium**: se usa el lanzador de Chrome indicando la ruta del ejecutable.

```bash
# Linux (el ejecutable puede llamarse chromium, chromium-browser o ungoogled-chromium)
CHROME_BIN=$(which chromium) npm test
```

```powershell
# Windows PowerShell
$env:CHROME_BIN = "C:\ruta\a\ungoogled-chromium\chrome.exe"; npm test
```

Lo mismo sirve con `npm run test:ci`, que usa la versión sin ventana del navegador elegido.

En PowerShell la variable queda definida hasta cerrar la terminal; se quita con `Remove-Item Env:KARMA_BROWSER` o `Remove-Item Env:CHROME_BIN`.

Si Chromium está instalado como **Flatpak** en Linux, Karma no puede abrirlo directamente; en ese caso conviene instalarlo desde el gestor de paquetes de la distribución o usar Firefox.

## Estructura

```
src/
├── App.jsx              Rutas y proveedores de contexto
├── App.test.jsx         Pruebas originales del grupo, adaptadas a Jasmine
├── main.jsx             Punto de entrada
├── assets/style.css     Paleta y estilos propios
├── components/          Navbar, Footer, ProductCard, ProductGrid, Filters, Carousel,
│                        CartToast (aviso al agregar), CartIcon y UserIcon (íconos SVG)
├── context/             CartContext (carrito) y AuthContext (sesión)
├── data/                Fuente de datos simulada con CRUD y persistencia en localStorage
├── pages/               Home, Products, ProductDetail, Cart, Contact, Login, Register, Profile, NotFound
├── utils/               Funciones puras: carrito, boleta y validaciones
└── tests/               Pruebas unitarias (*.test.js / *.test.jsx) y helpers.jsx
karma.conf.cjs           Configuración de Karma, Jasmine, webpack, cobertura y navegador
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
