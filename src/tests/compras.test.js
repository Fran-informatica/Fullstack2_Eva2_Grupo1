import { listarCompras, listarComprasDe, registrarCompra } from '../data/compras';
import { autenticarUsuario, registrarUsuario } from '../data/usuarios';
import { crearCompra, formatearNumeroBoleta, generarBoletaTexto } from '../utils/boleta';
import { USUARIO_MOCK, limpiarAlmacenamiento } from './helpers';

const ITEMS = [
  { id: 1, title: 'Global Warning', price: 15990, quantity: 2 },
  { id: 3, title: 'Porta Lápices', price: 5990, quantity: 1 },
];

describe('Compras, boletas y usuarios', () => {
  beforeEach(limpiarAlmacenamiento);

  it('crea una compra con subtotales, unidades y total', () => {
    const compra = crearCompra({ numero: 1, fecha: new Date(2026, 10, 8, 10, 5), usuario: USUARIO_MOCK, items: ITEMS });
    expect(compra.items[0].subtotal).toBe(31980);
    expect(compra.unidades).toBe(3);
    expect(compra.total).toBe(37970);
    expect(compra.cliente).toEqual(USUARIO_MOCK);
  });

  it('genera la boleta en texto con número de 6 dígitos y el total', () => {
    const compra = crearCompra({ numero: 7, fecha: new Date(2026, 10, 8, 10, 5), usuario: USUARIO_MOCK, items: ITEMS });
    const texto = generarBoletaTexto(compra);
    expect(formatearNumeroBoleta(7)).toBe('000007');
    expect(texto).toContain('Boleta N° 000007');
    expect(texto).toContain('Fecha: 08-11-2026 10:05');
    expect(texto).toContain('$37.970');
    expect(texto.split('\n').every((linea) => linea.length <= 40)).toBeTrue();
  });

  it('registra compras con número correlativo y las filtra por cliente', () => {
    registrarCompra(USUARIO_MOCK, ITEMS);
    const segunda = registrarCompra({ nombre: 'Luis', email: 'luis@gmail.com' }, ITEMS);
    expect(segunda.numero).toBe(2);
    expect(listarCompras().length).toBe(2);
    expect(listarComprasDe('ana@duoc.cl').length).toBe(1);
  });

  it('registra usuarios, rechaza correos repetidos y valida el login', () => {
    const datos = { nombre: 'Ana', email: 'ana@duoc.cl', password: 'Secreta123' };
    expect(registrarUsuario(datos).ok).toBeTrue();
    expect(registrarUsuario(datos)).toEqual({ ok: false, error: 'Ya existe una cuenta registrada con este correo.' });
    expect(autenticarUsuario('ana@duoc.cl', 'Secreta123')).toEqual({ ok: true, usuario: { nombre: 'Ana', email: 'ana@duoc.cl' } });
    expect(autenticarUsuario('ana@duoc.cl', 'Otra1234').ok).toBeFalse();
  });
});
