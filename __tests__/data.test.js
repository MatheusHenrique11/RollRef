import { getTodosModelos, filtrarPorTipo, filtrarPorNivel, buscarPorNome, getModeloPorId, getMarcas, getCategorias } from '../lib/data';

describe('Data Utility Functions', () => {
  it('getTodosModelos should return an array of skates', () => {
    const modelos = getTodosModelos();
    expect(Array.isArray(modelos)).toBe(true);
    expect(modelos.length).toBeGreaterThan(0);
  });

  it('filtrarPorTipo should correctly filter inline and quad skates', () => {
    const inlines = filtrarPorTipo('inline');
    const quads = filtrarPorTipo('quad');
    
    expect(inlines.every(m => m.tipo === 'inline')).toBe(true);
    expect(quads.every(m => m.tipo === 'quad')).toBe(true);
  });

  it('filtrarPorNivel should return correct skill level models', () => {
    const iniciantes = filtrarPorNivel('iniciante');
    expect(iniciantes.every(m => m.nivel === 'iniciante')).toBe(true);
  });

  it('buscarPorNome should find items regardless of case sensitivity', () => {
    const result = buscarPorNome('oxer');
    expect(result.some(m => m.marca === 'Oxer')).toBe(true);
  });

  it('getModeloPorId should return exactly one item or null', () => {
    const model = getModeloPorId('oxer-secret-retro');
    expect(model.id).toBe('oxer-secret-retro');

    const notFound = getModeloPorId('non-existent');
    expect(notFound).toBeNull();
  });

  it('getMarcas should return an array of unique brands', () => {
    const marcas = getMarcas();
    expect(new Set(marcas).size).toBe(marcas.length);
    expect(marcas).toContain('Oxer');
  });

  it('getCategorias should return an array of unique categories', () => {
    const categorias = getCategorias();
    expect(new Set(categorias).size).toBe(categorias.length);
  });
});
