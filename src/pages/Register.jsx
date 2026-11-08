import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import {
  hayErrores,
  validarConfirmPassword,
  validarEmail,
  validarNombre,
  validarPassword,
} from '../utils/validaciones';

const VACIO = { nombre: '', email: '', password: '', confirmPassword: '' };

function validarTodo(v) {
  return {
    nombre: validarNombre(v.nombre),
    email: validarEmail(v.email),
    password: validarPassword(v.password),
    confirmPassword: validarConfirmPassword(v.confirmPassword, v.password),
  };
}

const Register = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [valores, setValores] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    const nuevos = { ...valores, [name]: value };
    setValores(nuevos);
    const todos = validarTodo(nuevos);
    // confirmPassword se revalida al cambiar password porque depende de ella
    setErrores((err) => ({
      ...err,
      [name]: todos[name],
      ...(name === 'password' && nuevos.confirmPassword ? { confirmPassword: todos.confirmPassword } : {}),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validarTodo(valores);
    setErrores(errs);
    if (hayErrores(errs)) return;

    const resultado = registrar({
      nombre: valores.nombre.trim(),
      email: valores.email.trim(),
      password: valores.password,
    });
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate('/login', { state: { registrado: true } });
  };

  const campo = (name, label, type = 'text', autoComplete) => (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={valores[name]}
        onChange={onChange}
        isInvalid={!!errores[name]}
      />
      <Form.Control.Feedback type="invalid">{errores[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-5">
        <h2>Crear una Cuenta</h2>
        {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

        <Form onSubmit={onSubmit} noValidate>
          {campo('nombre', 'Nombre Completo', 'text', 'name')}
          {campo('email', 'Correo Electrónico', 'email', 'email')}
          <Form.Text className="d-block mb-2 text-muted">
            Dominios permitidos: duoc.cl, profesor.duoc.cl y gmail.com.
          </Form.Text>
          {campo('password', 'Contraseña', 'password', 'new-password')}
          {campo('confirmPassword', 'Confirmar Contraseña', 'password', 'new-password')}
          <Button type="submit" variant="dark" className="w-100">Registrarse</Button>
        </Form>
        <p className="mt-3">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
};

export default Register;
