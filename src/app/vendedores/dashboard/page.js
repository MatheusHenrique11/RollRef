"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  // Mock data for MVP
  const [publicacoes, setPublicacoes] = useState([
    { id: '1', nome: 'Custom Setup - Seba High Light', preco: 'R$ 2.450', views: 342, clicks: 45, status: 'Ativo' },
    { id: '2', nome: 'Patins Traxart Black - Usado', preco: 'R$ 450', views: 120, clicks: 12, status: 'Ativo' }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta publicação?')) {
      setPublicacoes(prev => prev.filter(p => p.id !== id));
    }
  };

  const totalViews = publicacoes.reduce((acc, curr) => acc + curr.views, 0);
  const totalClicks = publicacoes.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <div className="container" style={{ padding: 'var(--gap-xl) 0' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--gap-xl)', flexWrap: 'wrap' }}>
        <div>
          <h1 className="text-gradient" style={{ margin: 0 }}>Dashboard do Vendedor</h1>
          <p style={{ color: 'var(--cor-texto-muted)', marginTop: '0.5rem' }}>Bem-vindo, Skate Shop Brasil. <span className="badge badge-tipo">Plano Pro</span></p>
        </div>
        <Link href="/vendedores/nova-publicacao" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          + Nova Publicação
        </Link>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--gap-xl)' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--cor-texto-muted)' }}>Publicações Ativas</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--cor-acento)', fontFamily: 'var(--fonte-display)' }}>
            {publicacoes.length} <span style={{ fontSize: '1rem', color: 'var(--cor-texto-hint)' }}>/ 40</span>
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--cor-texto-muted)' }}>Visualizações Totais</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--cor-texto)', fontFamily: 'var(--fonte-display)' }}>
            {totalViews}
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--cor-texto-muted)' }}>Cliques em "Onde Comprar"</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2ecc71', fontFamily: 'var(--fonte-display)' }}>
            {totalClicks}
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: 'var(--gap-md)' }}>Suas Publicações</h2>
      
      {publicacoes.length === 0 ? (
        <div className="empty-state">
          <h3>Você não tem publicações ativas.</h3>
          <p>Comece a anunciar seus modelos e montagens personalizadas agora mesmo.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="specs-table" style={{ width: '100%', minWidth: '600px', background: 'var(--cor-fundo-card)', borderRadius: 'var(--radius-lg)' }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem' }}>Modelo / Título</th>
                <th style={{ padding: '1rem' }}>Preço</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Visualizações</th>
                <th style={{ padding: '1rem' }}>Cliques</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {publicacoes.map(pub => (
                <tr key={pub.id}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{pub.nome}</td>
                  <td style={{ padding: '1rem', color: 'var(--cor-texto-muted)' }}>{pub.preco}</td>
                  <td style={{ padding: '1rem' }}><span className="badge badge-nivel iniciante">{pub.status}</span></td>
                  <td style={{ padding: '1rem' }}>{pub.views}</td>
                  <td style={{ padding: '1rem' }}>{pub.clicks}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Editar</button>
                    <button onClick={() => handleDelete(pub.id)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', borderColor: '#e74c3c', color: '#e74c3c' }}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
