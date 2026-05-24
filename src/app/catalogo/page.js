"use client";

import { useState } from 'react';
import { getTodosModelos, getMarcas, getCategorias } from '../../../lib/data';
import CardPatins from '../../../components/CardPatins';

export default function Catalogo() {
  const todosModelos = getTodosModelos();
  const marcas = getMarcas();
  const categorias = getCategorias();

  const [filtrosMarcas, setFiltrosMarcas] = useState([]);
  const [filtrosCats, setFiltrosCats] = useState([]);

  const toggleMarca = (m) => {
    setFiltrosMarcas(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const toggleCat = (c) => {
    setFiltrosCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const modelosFiltrados = todosModelos.filter(p => {
    const passaMarca = filtrosMarcas.length === 0 || filtrosMarcas.includes(p.marca);
    const passaCat = filtrosCats.length === 0 || filtrosCats.includes(p.categoria);
    return passaMarca && passaCat;
  });

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <h1 className="text-gradient">Catálogo de Patins</h1>
      <p>Navegue pelo nosso catálogo com os principais modelos do mercado brasileiro.</p>
      
      <div style={{ display: 'flex', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
        <aside style={{ width: '100%', maxWidth: '250px', flexShrink: 0 }}>
          <div className="card" style={{ padding: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Filtros</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Marcas</h4>
              {marcas.map(m => (
                <label key={m} style={{ display: 'block', marginBottom: '0.25rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={filtrosMarcas.includes(m)}
                    onChange={() => toggleMarca(m)}
                    style={{ marginRight: '0.5rem' }} 
                  /> {m}
                </label>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Categorias</h4>
              {categorias.map(c => (
                <label key={c} style={{ display: 'block', marginBottom: '0.25rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={filtrosCats.includes(c)}
                    onChange={() => toggleCat(c)}
                    style={{ marginRight: '0.5rem' }} 
                  /> <span style={{ textTransform: 'capitalize' }}>{c}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Mostrando {modelosFiltrados.length} {modelosFiltrados.length === 1 ? 'modelo' : 'modelos'}
          </div>
          {modelosFiltrados.length > 0 ? (
            <div className="grid">
              {modelosFiltrados.map(patins => (
                <CardPatins key={patins.id} patins={patins} />
              ))}
            </div>
          ) : (
             <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', border: '2px dashed var(--border-color)', background: 'transparent' }}>
                <h3 style={{ color: 'var(--text-secondary)' }}>Nenhum modelo encontrado.</h3>
                <button className="btn btn-outline" onClick={() => { setFiltrosMarcas([]); setFiltrosCats([]); }} style={{ marginTop: '1rem' }}>Limpar Filtros</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
