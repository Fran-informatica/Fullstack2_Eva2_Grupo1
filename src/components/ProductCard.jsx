import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { formatearPrecio } from '../utils/carrito';

// Componente de presentación: recibe el producto y la acción de agregar por props
const ProductCard = ({ product, onAdd }) => {
  const { id, title, price, category, description, image } = product;

  return (
    <Card className="h-100 shadow-sm card-hover">
      {image && (
        <Card.Img
          variant="top"
          src={image}
          alt={`Imagen de ${title}`}
          loading="lazy"
          className="producto-miniatura"
        />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Card.Title as="h3" className="h6 mb-0">{title}</Card.Title>
          {category && <Badge bg="secondary">{category}</Badge>}
        </div>

        {description && <Card.Text className="small">{description}</Card.Text>}

        <Card.Text className="fw-bold fs-5 mb-3">{formatearPrecio(price)}</Card.Text>

        <div className="mt-auto d-flex gap-2">
          <Button
            as={Link}
            to={`/producto/${id}`}
            variant="outline-dark"
            className="w-50"
            aria-label={`Ver detalle de ${title}`}
          >
            Ver detalle
          </Button>
          <Button
            variant="dark"
            className="w-50"
            onClick={() => onAdd?.(product)}
            aria-label={`Agregar ${title} al carrito`}
          >
            Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
