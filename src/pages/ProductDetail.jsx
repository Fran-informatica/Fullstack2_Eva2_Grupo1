import { Badge, Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Carousel from '../components/Carousel';
import { useCart } from '../context/CartContext';
import { obtenerProducto } from '../data/productos';
import { formatearPrecio } from '../utils/carrito';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = obtenerProducto(id);

  if (!product) {
    return (
      <div className="text-center py-5">
        <h2>Producto no encontrado</h2>
        <Button as={Link} to="/productos" variant="dark" className="mt-3">Volver al catálogo</Button>
      </div>
    );
  }

  const { title, price, category, description, images, video } = product;

  return (
    <div className="py-2">
      <Row className="g-4 align-items-center">
        <Col xs={12} md={6}>
          <Carousel images={images} alt={title} />
        </Col>
        <Col xs={12} md={6} className="text-center text-md-start">
          <h2 className="mb-2">{title}</h2>
          <Badge bg="secondary" className="mb-3">{category}</Badge>
          <p className="producto-precio">{formatearPrecio(price)}</p>
          <p className="lead">{description}</p>
          <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
            <Button variant="dark" size="lg" onClick={() => addToCart(product)}>
              Agregar al carrito
            </Button>
            <Button as={Link} to="/productos" variant="outline-secondary" size="lg">
              Volver
            </Button>
          </div>
        </Col>
      </Row>

      {video && (
        <section className="producto-video text-center">
          <h3 className="h5">Video del producto</h3>
          <video controls data-testid="video-producto">
            <source src={video} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
