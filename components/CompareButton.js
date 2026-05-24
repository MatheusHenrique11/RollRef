"use client";

import { useCompare } from '../context/CompareContext';

export default function CompareButton({ patins }) {
  const { compareList, toggleCompare } = useCompare();
  
  const isCompared = compareList.some(p => p.id === patins.id);

  return (
    <button 
      onClick={() => toggleCompare(patins)} 
      className={`btn ${isCompared ? 'btn-primary' : 'btn-outline'}`}
    >
      {isCompared ? '✓ Adicionado ao Comparador' : '+ Comparar'}
    </button>
  );
}
