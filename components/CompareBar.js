"use client";

import { useCompare } from '../context/CompareContext';
import Link from 'next/link';

export default function CompareBar() {
  const { compareList, removeFromCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--accent-color)',
      padding: '1rem',
      zIndex: 1000,
      boxShadow: '0 -4px 20px rgba(14, 165, 233, 0.2)'
    }}>
      <div className="container flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="flex gap-md" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {compareList.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', minWidth: 'max-content' }}>
              <img src={p.imagem} alt={p.nome} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '0.5rem' }} />
              <div style={{ fontSize: '0.8rem', marginRight: '0.5rem' }}>
                <strong>{p.marca}</strong><br/>
                <span style={{color: 'var(--text-secondary)'}}>{p.nome.substring(0, 15)}...</span>
              </div>
              <button onClick={() => removeFromCompare(p.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}>&times;</button>
            </div>
          ))}
        </div>
        <div className="flex gap-md items-center" style={{ marginLeft: 'auto' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{compareList.length} / 3 selecionados</span>
          <Link href="/comparar" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Comparar Agora</Link>
        </div>
      </div>
    </div>
  );
}
