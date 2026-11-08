import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { hayErrores, validarEmail, validarPasswordLogin } from '../utils/validaciones';

const VALIDADORES = {
  email: validarEmail,
  password: validarPasswordLogin,
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [valores, setValores] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValores((v) => ({ ...v, [name]: value }));
    setErrores((err) => ({ ...err, [name]: VALIDADORES[name](value) }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = {
      email: validarEmail(valores.email),
      password: validarPasswordLogin(valores.password),
    };
    setErrores(errs);
    if (hayErrores(errs)) return;

    const resultado = login(valores.email.trim(), valores.password);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-5">
        <h2>Iniciar Sesión</h2>
        {location.state?.registrado && (
          <Alert variant="success">Registro exitoso. Ahora puedes iniciar sesión.</Alert>
        )}
        {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

        <Form onSubmit={onSubmit} noValidate>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" name="email" autoComplete="username" value={valores.email} onChange={onChange} isInvalid={!!errores.email} />
            <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="password" autoComplete="current-password" value={valores.password} onChange={onChange} isInvalid={!!errores.password} />
            <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">Ingresar</Button>
        </Form>
        <p className="mt-3">¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      </div>
    </div>
  );
};

export default Login;
