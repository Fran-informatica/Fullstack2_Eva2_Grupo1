import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ProductGrid from '../components/ProductGrid';
import { useCart } from '../context/CartContext';
import { listarDestacados } from '../data/productos';

const Home = () => {
  const { addToCart } = useCart();
  const destacados = listarDestacados();

  return (
    <div>
      <section className="hero-pp text-center mb-5 shadow">
        <h1 className="display-5 fw-bold">Pixel &amp; Play</h1>
        <p className="lead">Juegos de mesa y accesorios para tu escritorio.</p>
        <Button as={Link} to="/productos" variant="info">Ver catálogo</Button>
      </section>

      <h2 className="mb-4 text-center">Productos Destacados</h2>
      <ProductGrid items={destacados} onAdd={addToCart} />
    </div>
  );
};

export default Home;
