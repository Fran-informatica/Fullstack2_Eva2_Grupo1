// Pruebas de los formularios: estado de los campos, mensajes de error condicionales y envío.
import { fireEvent, screen } from '@testing-library/react';

import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { crearAuthMock, renderizar } from './helpers';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

describe('Contacto', () => {
  it('actualiza el estado del campo al escribir', () => {
    renderizar(<Contact />);
    escribir('Nombre Completo', 'Ana Pérez');
    expect(screen.getByLabelText('Nombre Completo').value).toBe('Ana Pérez');
  });

  it('muestra los errores solo después de enviar con campos vacíos', () => {
    renderizar(<Contact />);
    expect(screen.queryByText('El mensaje es obligatorio.')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Enviar Mensaje' }));
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeTruthy();
    expect(screen.getByText('El mensaje es obligatorio.')).toBeTruthy();
  });

  it('confirma el envío y limpia el formulario cuando los datos son válidos', () => {
    renderizar(<Contact />);
    escribir('Nombre Completo', 'Ana Pérez');
    escribir('Correo Electrónico', 'ana@gmail.com');
    escribir('Mensaje o Comentario', '¿Tienen stock del Playmat?');
    fireEvent.click(screen.getByRole('button', { name: 'Enviar Mensaje' }));
    expect(screen.getByText('Su mensaje se mandó con éxito.')).toBeTruthy();
    expect(screen.getByLabelText('Mensaje o Comentario').value).toBe('');
  });
});

describe('Login', () => {
  it('no llama a login (mock) si el correo no es válido', () => {
    const { auth } = renderizar(<Login />, { ruta: '/login', path: '/login' });
    escribir('Correo Electrónico', 'ana@hotmail.com');
    escribir('Contraseña', '12345678');
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(auth.login).not.toHaveBeenCalled();
    expect(screen.getByText('Ingresa un correo electrónico con formato válido.')).toBeTruthy();
  });

  it('llama a login con los datos y redirige al inicio si es correcto', () => {
    const { auth } = renderizar(<Login />, { ruta: '/login', path: '/login' });
    escribir('Correo Electrónico', ' ana@duoc.cl ');
    escribir('Contraseña', 'Secreta123');
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(auth.login).toHaveBeenCalledWith('ana@duoc.cl', 'Secreta123');
    expect(screen.getByTestId('ubicacion').textContent).toBe('/');
  });

  it('muestra el error que devuelve login cuando las credenciales no existen', () => {
    const auth = crearAuthMock({
      login: jasmine.createSpy('login').and.returnValue({ ok: false, error: 'Correo o contraseña incorrectos.' }),
    });
    renderizar(<Login />, { auth, ruta: '/login', path: '/login' });
    escribir('Correo Electrónico', 'ana@duoc.cl');
    escribir('Contraseña', 'Secreta123');
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByText('Correo o contraseña incorrectos.')).toBeTruthy();
  });
});

describe('Registro', () => {
  it('avisa cuando las contraseñas no coinciden', () => {
    renderizar(<Register />);
    escribir('Contraseña', 'Secreta123');
    escribir('Confirmar Contraseña', 'Secreta124');
    expect(screen.getByText('Las contraseñas no coinciden.')).toBeTruthy();
  });

  it('registra al usuario (mock) y redirige a login', () => {
    const { auth } = renderizar(<Register />, { ruta: '/registro', path: '/registro' });
    escribir('Nombre Completo', 'Ana Pérez');
    escribir('Correo Electrónico', 'ana@duoc.cl');
    escribir('Contraseña', 'Secreta123');
    escribir('Confirmar Contraseña', 'Secreta123');
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    expect(auth.registrar).toHaveBeenCalledOnceWith({ nombre: 'Ana Pérez', email: 'ana@duoc.cl', password: 'Secreta123' });
    expect(screen.getByTestId('ubicacion').textContent).toBe('/login');
  });
});
