import { Badge, Button, ButtonGroup } from 'react-bootstrap';

const Filters = ({ current, onChange, options, total }) => {
  const todasActiva = current === 'todas';

  return (
    <ButtonGroup className="flex-wrap mb-4" aria-label="Filtrar por categoría">
      <Button
        variant={todasActiva ? 'dark' : 'outline-dark'}
        aria-pressed={todasActiva}
        onClick={() => onChange('todas')}
      >
        Todos{' '}
        <Badge bg={todasActiva ? 'light' : 'dark'} text={todasActiva ? 'dark' : 'light'}>
          {total}
        </Badge>
      </Button>
      {options.map((opcion) => {
        const activa = current === opcion;
        return (
          <Button
            key={opcion}
            variant={activa ? 'dark' : 'outline-dark'}
            aria-pressed={activa}
            onClick={() => onChange(opcion)}
          >
            {opcion}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default Filters;
