// Pruebas de componentes de presentación: renderizado, props, estado y eventos.
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Carousel from '../components/Carousel';
import CartIcon from '../components/CartIcon';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTOS_INICIALES } from '../data/productos';
import { PRODUCTO_MOCK } from './helpers';

const conRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('CartIcon', () => {
  it('usa 22 px por defecto, acepta otro tamaño por props y toma el color del texto', () => {
    const { rerender } = render(<CartIcon />);
    const icono = screen.getByTestId('cart-icon');
    expect(icono.getAttribute('width')).toBe('22');
    expect(icono.getAttribute('fill')).toBe('currentColor');
    expect(icono.getAttribute('aria-hidden')).toBe('true');

    rerender(<CartIcon size={16} />);
    expect(screen.getByTestId('cart-icon').getAttribute('height')).toBe('16');
  });
});

describe('ProductCard', () => {
  it('muestra título, categoría, descripción, precio e imagen recibidos por props', () => {
    conRouter(<ProductCard product={PRODUCTO_MOCK} />);
    expect(screen.getByText('Global Warning')).toBeTruthy();
    expect(screen.getByText('Juegos de mesa')).toBeTruthy();
    expect(screen.getByText(PRODUCTO_MOCK.description)).toBeTruthy();
    expect(screen.getByText('$15.990')).toBeTruthy();
    expect(screen.getByAltText('Imagen de Global Warning').getAttribute('src')).toBe(PRODUCTO_MOCK.image);
  });

  it('enlaza al detalle del producto', () => {
    conRouter(<ProductCard product={PRODUCTO_MOCK} />);
    expect(screen.getByText('Ver detalle').closest('a').getAttribute('href')).toBe('/producto/1');
  });

  it('llama a la función onAdd (mock) con el producto al hacer clic en Agregar', () => {
    const onAdd = jasmine.createSpy('onAdd');
    conRouter(<ProductCard product={PRODUCTO_MOCK} onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar Global Warning al carrito' }));
    expect(onAdd).toHaveBeenCalledOnceWith(PRODUCTO_MOCK);
  });
});

describe('ProductGrid', () => {
  it('renderiza una tarjeta por cada producto de la lista', () => {
    conRouter(<ProductGrid items={PRODUCTOS_INICIALES} onAdd={() => {}} />);
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(3);
    expect(screen.getByText('Porta Lápices')).toBeTruthy();
  });

  it('muestra un aviso cuando la lista está vacía', () => {
    conRouter(<ProductGrid items={[]} onAdd={() => {}} />);
    expect(screen.getByText('No hay productos en esta categoría.')).toBeTruthy();
  });
});

describe('Filters', () => {
  const opciones = ['Juegos de mesa', 'Accesorios de escritorio'];

  it('marca como activa la categoría actual', () => {
    render(<Filters current="Juegos de mesa" onChange={() => {}} options={opciones} total={3} />);
    expect(screen.getByRole('button', { name: 'Juegos de mesa' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: /Todos/ }).getAttribute('aria-pressed')).toBe('false');
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('avisa la categoría elegida mediante onChange (mock)', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<Filters current="todas" onChange={onChange} options={opciones} total={3} />);
    fireEvent.click(screen.getByRole('button', { name: 'Accesorios de escritorio' }));
    fireEvent.click(screen.getByRole('button', { name: /Todos/ }));
    expect(onChange.calls.allArgs()).toEqual([['Accesorios de escritorio'], ['todas']]);
  });
});

describe('Carousel', () => {
  const imagenes = ['/assets/img/Playmat1.png', '/assets/img/Playmat2.png', '/assets/img/Playmat3.png'];

  it('parte en la primera imagen y avanza con el botón siguiente', () => {
    render(<Carousel images={imagenes} alt="Playmat" />);
    expect(screen.getByAltText('Playmat (imagen 1 de 3)').getAttribute('src')).toBe(imagenes[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Imagen siguiente' }));
    expect(screen.getByAltText('Playmat (imagen 2 de 3)').getAttribute('src')).toBe(imagenes[1]);
  });

  it('vuelve a la última imagen al retroceder desde la primera', () => {
    render(<Carousel images={imagenes} alt="Playmat" />);
    fireEvent.click(screen.getByRole('button', { name: 'Imagen anterior' }));
    expect(screen.getByAltText('Playmat (imagen 3 de 3)')).toBeTruthy();
  });

  it('no renderiza nada si no hay imágenes', () => {
    const { container } = render(<Carousel images={[]} alt="Vacío" />);
    expect(container.innerHTML).toBe('');
  });
});
