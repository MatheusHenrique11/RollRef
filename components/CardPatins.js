"use client";

import { useCompare } from '../context/CompareContext';
import { useRouter } from 'next/navigation';

export default function CardPatins({ patins }) {
  const { compareList, toggleCompare } = useCompare();
  const router = useRouter();
  
  const isCompared = compareList.some(p => p.id === patins.id);

  const handleCardClick = () => {
    router.push(`/patins/${patins.id}`);
  };

  return (
    <div className="card" style={{ position: 'relative', cursor: 'pointer' }} onClick={handleCardClick}>
      <button 
        onClick={(e) => { e.stopPropagation(); toggleCompare(patins); }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          background: isCompared ? 'var(--accent-color)' : 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          fontSize: '1.2rem'
        }}
        title={isCompared ? "Remover do comparador" : "Adicionar ao comparador"}
      >
        {isCompared ? '✓' : '+'}
      </button>
      
      <div className="card-img-container">
        <img src={patins.imagem} alt={patins.nome} className="card-img" />
      </div>
      <div className="card-body">
        <span className="card-brand">{patins.marca}</span>
        <h3 className="card-title">{patins.nome}</h3>
        
        <div className="card-tags">
          <span className="tag">{patins.tipo.toUpperCase()}</span>
          <span className="tag">{patins.categoria}</span>
          <span className="tag">{patins.nivel}</span>
        </div>
        
        <div className="card-footer">
          <span className="price">{patins.preco_ref}</span>
          <span className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Detalhes</span>
        </div>
      </div>
    </div>
  );
}
