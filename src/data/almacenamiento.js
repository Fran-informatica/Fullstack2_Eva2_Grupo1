// Acceso a localStorage y sessionStorage en un solo lugar, para poder simularlo en las pruebas.

export function leer(clave, porDefecto, almacen = window.localStorage) {
  try {
    const valor = almacen.getItem(clave);
    return valor ? JSON.parse(valor) : porDefecto;
  } catch {
    return porDefecto;
  }
}

export function guardar(clave, valor, almacen = window.localStorage) {
  almacen.setItem(clave, JSON.stringify(valor));
}

export function borrar(clave, almacen = window.localStorage) {
  almacen.removeItem(clave);
}
