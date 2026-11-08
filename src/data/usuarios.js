// Usuarios registrados, persistidos en localStorage como en la Sumativa 1.
import { guardar, leer } from './almacenamiento';

export const CLAVE_USUARIOS = 'usuarios';

export function listarUsuarios() {
  return leer(CLAVE_USUARIOS, []);
}

export function registrarUsuario({ nombre, email, password }) {
  const usuarios = listarUsuarios();
  if (usuarios.some((u) => u.email === email)) {
    return { ok: false, error: 'Ya existe una cuenta registrada con este correo.' };
  }
  guardar(CLAVE_USUARIOS, [...usuarios, { nombre, email, password }]);
  return { ok: true, usuario: { nombre, email } };
}

export function autenticarUsuario(email, password) {
  const encontrado = listarUsuarios().find(
    (u) => u.email === email && u.password === password,
  );
  if (!encontrado) return { ok: false, error: 'Correo o contraseña incorrectos.' };
  return { ok: true, usuario: { nombre: encontrado.nombre, email: encontrado.email } };
}
