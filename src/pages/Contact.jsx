import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

import { hayErrores, validarEmail, validarMensaje, validarNombre } from '../utils/validaciones';

const VACIO = { nombre: '', email: '', mensaje: '' };

const VALIDADORES = {
  nombre: validarNombre,
  email: validarEmail,
  mensaje: validarMensaje,
};

const Contact = () => {
  const [valores, setValores] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValores((v) => ({ ...v, [name]: value }));
    setErrores((err) => ({ ...err, [name]: VALIDADORES[name](value) }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = {
      nombre: validarNombre(valores.nombre),
      email: validarEmail(valores.email),
      mensaje: validarMensaje(valores.mensaje),
    };
    setErrores(errs);
    if (hayErrores(errs)) {
      setExito('');
      return;
    }
    setExito('Su mensaje se mandó con éxito.');
    setValores(VACIO);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h2>Formulario de Contacto</h2>
        {exito && <Alert variant="success">{exito}</Alert>}

        <Form onSubmit={onSubmit} noValidate>
          <Form.Group className="mb-3" controlId="nombreContacto">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control name="nombre" maxLength={100} value={valores.nombre} onChange={onChange} isInvalid={!!errores.nombre} />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="emailContacto">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" name="email" maxLength={100} value={valores.email} onChange={onChange} isInvalid={!!errores.email} />
            <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="mensajeContacto">
            <Form.Label>Mensaje o Comentario</Form.Label>
            <Form.Control as="textarea" rows={5} name="mensaje" maxLength={500} value={valores.mensaje} onChange={onChange} isInvalid={!!errores.mensaje} />
            <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">Enviar Mensaje</Button>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
