import { useState } from 'react';
import { Button } from 'react-bootstrap';

// Carrusel de imágenes del detalle de producto; el índice visible es estado interno
export default function Carousel({ images = [], alt = '' }) {
  const [indice, setIndice] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  const anterior = () => setIndice((i) => (i - 1 + total) % total);
  const siguiente = () => setIndice((i) => (i + 1) % total);

  return (
    <section className="carrusel" aria-label={`Imágenes de ${alt}`}>
      <Button variant="light" className="carrusel-flecha" onClick={anterior} aria-label="Imagen anterior">
        &#8249;
      </Button>
      <div className="carrusel-imagenes">
        <img
          className="carrusel-imagen"
          src={images[indice]}
          alt={`${alt} (imagen ${indice + 1} de ${total})`}
        />
      </div>
      <Button variant="light" className="carrusel-flecha" onClick={siguiente} aria-label="Imagen siguiente">
        &#8250;
      </Button>
    </section>
  );
}
