"use client";

import { useCompare } from '../../../context/CompareContext';
import Link from 'next/link';

export default function Comparador() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="container text-center" style={{ padding: 'var(--spacing-2xl) 0' }}>
        <h1 className="text-gradient">Comparador de Patins</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          Selecione até 3 modelos no catálogo para visualizar as diferenças lado a lado e escolher a melhor opção para você.
        </p>
        
        <div className="card" style={{ padding: 'var(--spacing-2xl)', border: '2px dashed var(--border-color)', background: 'transparent' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>Nenhum modelo selecionado.</h3>
          <p>Vá até o catálogo e clique em "+" nos modelos que deseja analisar.</p>
          <Link href="/catalogo" className="btn btn-primary" style={{ marginTop: '1rem' }}>Ir para o Catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient">Comparando {compareList.length} Modelos</h1>
        <button onClick={clearCompare} className="btn btn-outline">Limpar Comparador</button>
      </div>
      
      <div style={{ overflowX: 'auto', paddingBottom: '2rem' }}>
        <table className="spec-table" style={{ minWidth: '800px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Atributo</th>
              {compareList.map(p => (
                <th key={p.id} style={{ width: `${80 / compareList.length}%`, textAlign: 'center', padding: '1rem', verticalAlign: 'bottom' }}>
                  <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }} />
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>{p.marca}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{p.nome}</h3>
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{p.preco_ref}</div>
                  <button onClick={() => removeFromCompare(p.id)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>Remover</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Nível / Categoria</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center' }}>{p.nivel} / {p.categoria}</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Público-Alvo</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center', textTransform: 'capitalize' }}>{p.publico.join(', ')}</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Construção (Bota)</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center' }}>{p.bota.material} ({p.bota.cano})</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Fechamento</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center' }}>{p.bota.fechamento.join(' + ')}</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Frame (Base)</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center' }}>{p.frame.material} <br/><span style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>{p.frame.configuracao}</span></td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Rodas</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center' }}>{p.rodas.diametro_mm ? `${p.rodas.diametro_mm}mm` : 'N/D'} / {p.rodas.durometro || 'N/D'}<br/><span style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>{p.rodas.quantidade} rodas</span></td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Rolamentos</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center' }}>{p.rolamento}</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Freio</td>
              {compareList.map(p => <td key={p.id} style={{ textAlign: 'center' }}>{p.freio}</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Observações</td>
              {compareList.map(p => <td key={p.id} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', padding: '1rem', textAlign: 'center' }}>{p.obs}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
