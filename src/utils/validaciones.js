// Reglas tomadas de registro.js, login.js y contactos.js de la Sumativa 1.
// Cada función devuelve '' si el valor es válido o el mensaje de error.

const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
const REGEX_EMAIL = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export function validarNombre(valor = '') {
    if (!valor.trim()) return 'El nombre es obligatorio.';
    if (!REGEX_NOMBRE.test(valor.trim())) return 'Ingresa un nombre válido (solo letras, mínimo 3 caracteres).';
    return '';
}

export function validarEmail(valor = '') {
    if (!valor.trim()) return 'El correo electrónico es obligatorio.';
    if (!REGEX_EMAIL.test(valor.trim())) return 'Ingresa un correo electrónico con formato válido.';
    return '';
}

export function validarPassword(valor = '') {
    if (!valor) return 'La contraseña es obligatoria.';
    if (!REGEX_PASSWORD.test(valor)) return 'Debe tener 8+ caracteres, una mayúscula y un número.';
    return '';
}

export function validarConfirmPassword(valor = '', password = '') {
    if (!valor) return 'Debes confirmar la contraseña.';
    if (valor !== password) return 'Las contraseñas no coinciden.';
    return '';
}

export function validarPasswordLogin(valor = '') {
    if (!valor) return 'La contraseña es obligatoria.';
    if (valor.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    return '';
}

export function validarMensaje(valor = '') {
    if (!valor.trim()) return 'El mensaje es obligatorio.';
    return '';
}

export function hayErrores(errores) {
    return Object.values(errores).some(Boolean);
}
