"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NovaPublicacao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      alert('Sua publicação foi enviada para revisão com sucesso! Em até 48h ela estará ativa no catálogo.');
      router.push('/vendedores/dashboard');
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: 'var(--gap-xl) 0', maxWidth: '800px' }}>
      <div style={{ marginBottom: 'var(--gap-lg)' }}>
        <Link href="/vendedores/dashboard" style={{ color: 'var(--cor-texto-muted)' }}>&larr; Voltar ao Dashboard</Link>
      </div>

      <h1 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Nova Publicação</h1>
      <p style={{ color: 'var(--cor-texto-muted)', marginBottom: 'var(--gap-xl)' }}>
        Preencha os detalhes do seu modelo de fábrica, montagem customizada ou item exclusivo.
      </p>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '0.5px solid var(--cor-borda)', paddingBottom: '0.5rem' }}>Informações Básicas</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Título da Publicação *</label>
          <input type="text" required className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="Ex: Custom Setup - Powerslide Next 110" />
        </div>

        <div className="grid-2" style={{ marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Marca Primária *</label>
            <input type="text" required className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="Ex: Powerslide" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Tipo *</label>
            <select required className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <option value="inline">Inline</option>
              <option value="quad">Quad (Tradicional)</option>
            </select>
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Preço (R$) *</label>
            <input type="text" required className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="R$ 0,00" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Link para Compra / WhatsApp *</label>
            <input type="url" required className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="https://wa.me/..." />
          </div>
        </div>

        <h3 style={{ marginBottom: '1.5rem', borderBottom: '0.5px solid var(--cor-borda)', paddingBottom: '0.5rem' }}>Especificações Técnicas</h3>

        <div className="grid-2" style={{ marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Bota (Material/Estilo)</label>
            <input type="text" className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="Ex: Hardboot em Plástico" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Frame (Base)</label>
            <input type="text" className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="Ex: Alumínio 243mm" />
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Rodas (Diâmetro e Dureza)</label>
            <input type="text" className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="Ex: 80mm 85A" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Rolamentos</label>
            <input type="text" className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="Ex: ABEC 9" />
          </div>
        </div>

        <h3 style={{ marginBottom: '1.5rem', borderBottom: '0.5px solid var(--cor-borda)', paddingBottom: '0.5rem' }}>Mídia</h3>
        
        <div style={{ marginBottom: '2rem', padding: '2rem', border: '1px dashed var(--cor-borda)', borderRadius: 'var(--radius-sm)', textAlign: 'center', background: 'var(--cor-fundo-hover)' }}>
          <p style={{ color: 'var(--cor-texto-muted)', marginBottom: '1rem' }}>Arraste e solte até 5 imagens aqui (JPG, PNG, WebP)</p>
          <button type="button" className="btn btn-outline">Escolher Arquivos</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <Link href="/vendedores/dashboard" className="btn btn-outline">Cancelar</Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Publicar Anúncio'}
          </button>
        </div>
      </form>
    </div>
  );
}
