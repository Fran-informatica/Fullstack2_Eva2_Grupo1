import { Col, Row } from 'react-bootstrap';

import ProductCard from './ProductCard';

// Grilla responsiva: 1 columna en celular, 2 en tablet y 3 en escritorio
const ProductGrid = ({ items, onAdd }) => {
  if (items.length === 0) {
    return <p className="text-muted">No hay productos en esta categoría.</p>;
  }

  return (
    <Row xs={1} sm={2} lg={3} className="g-4">
      {items.map((p) => (
        <Col key={p.id}>
          <ProductCard product={p} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
