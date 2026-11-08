import {
  hayErrores,
  validarConfirmPassword,
  validarEmail,
  validarMensaje,
  validarNombre,
  validarPassword,
  validarPasswordLogin,
} from '../utils/validaciones';

describe('Validaciones de formularios', () => {
  it('acepta un nombre con letras y tildes, y rechaza vacíos o con números', () => {
    expect(validarNombre('José Pérez')).toBe('');
    expect(validarNombre('   ')).toBe('El nombre es obligatorio.');
    expect(validarNombre('Ana123')).toContain('nombre válido');
    expect(validarNombre('Al')).toContain('mínimo 3');
  });

  it('solo acepta correos de duoc.cl, profesor.duoc.cl y gmail.com', () => {
    expect(validarEmail('ana@duoc.cl')).toBe('');
    expect(validarEmail('profe@profesor.duoc.cl')).toBe('');
    expect(validarEmail('ana@gmail.com')).toBe('');
    expect(validarEmail('ana@hotmail.com')).toContain('formato válido');
    expect(validarEmail('')).toBe('El correo electrónico es obligatorio.');
  });

  it('exige contraseña de registro con 8+ caracteres, una mayúscula y un número', () => {
    expect(validarPassword('Secreta123')).toBe('');
    expect(validarPassword('secreta123')).not.toBe('');
    expect(validarPassword('Secretas')).not.toBe('');
    expect(validarPassword('Ab1')).not.toBe('');
  });

  it('compara la confirmación con la contraseña', () => {
    expect(validarConfirmPassword('Secreta123', 'Secreta123')).toBe('');
    expect(validarConfirmPassword('Otra1234', 'Secreta123')).toBe('Las contraseñas no coinciden.');
    expect(validarConfirmPassword('', 'Secreta123')).toBe('Debes confirmar la contraseña.');
  });

  it('pide al menos 8 caracteres en la contraseña de login', () => {
    expect(validarPasswordLogin('12345678')).toBe('');
    expect(validarPasswordLogin('1234')).toContain('al menos 8');
  });

  it('exige el mensaje de contacto y detecta si hay errores', () => {
    expect(validarMensaje('Hola')).toBe('');
    expect(validarMensaje('  ')).toBe('El mensaje es obligatorio.');
    expect(hayErrores({ nombre: '', email: '' })).toBeFalse();
    expect(hayErrores({ nombre: '', email: 'Error' })).toBeTrue();
  });
});
