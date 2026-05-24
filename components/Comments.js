"use client";

import { useState, useEffect } from 'react';

export default function Comments({ modelId }) {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nota, setNota] = useState(5);
  const [experiencia, setExperiencia] = useState('Iniciante');
  const [tempoUso, setTempoUso] = useState('Menos de 1 mês');
  const [pros, setPros] = useState('');
  const [contras, setContras] = useState('');
  const [texto, setTexto] = useState('');

  // Load comments
  useEffect(() => {
    const saved = localStorage.getItem(`rollref_comments_${modelId}`);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [modelId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nome || !email || !nota) {
      alert('Nome, E-mail e Nota são obrigatórios.');
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      nome,
      nota,
      experiencia,
      tempoUso,
      pros,
      contras,
      texto,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'approved' // Filtro automático aprova para MVP
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`rollref_comments_${modelId}`, JSON.stringify(updated));
    
    // Reset form
    setNome('');
    setEmail('');
    setNota(5);
    setPros('');
    setContras('');
    setTexto('');
    setShowForm(false);
    alert('Avaliação enviada com sucesso!');
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div style={{ marginTop: 'var(--gap-xl)', paddingTop: 'var(--gap-xl)', borderTop: '0.5px solid var(--cor-borda)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--gap-lg)' }}>
        <h2>Avaliações da Comunidade</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Deixar minha opinião'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 'var(--gap-lg)', background: 'var(--cor-fundo-hover)' }}>
          <div className="grid-2" style={{ marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Nome *</label>
              <input type="text" required value={nome} onChange={e => setNome(e.target.value)} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="Seu nome" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>E-mail * (não será exibido)</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="seu@email.com" />
            </div>
          </div>

          <div className="grid-3" style={{ marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Nota *</label>
              <select value={nota} onChange={e => setNota(Number(e.target.value))} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <option value={5}>5 Estrelas - Excelente</option>
                <option value={4}>4 Estrelas - Muito Bom</option>
                <option value={3}>3 Estrelas - Bom</option>
                <option value={2}>2 Estrelas - Regular</option>
                <option value={1}>1 Estrela - Ruim</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Nível de Experiência</label>
              <select value={experiencia} onChange={e => setExperiencia(e.target.value)} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <option>Iniciante</option>
                <option>Intermediário</option>
                <option>Avançado</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Tempo de Uso</label>
              <select value={tempoUso} onChange={e => setTempoUso(e.target.value)} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <option>Menos de 1 mês</option>
                <option>1 a 6 meses</option>
                <option>Mais de 6 meses</option>
                <option>Mais de 1 ano</option>
              </select>
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Prós (Opcional)</label>
              <input type="text" value={pros} onChange={e => setPros(e.target.value)} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="O que você mais gostou?" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Contras (Opcional)</label>
              <input type="text" value={contras} onChange={e => setContras(e.target.value)} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }} placeholder="O que poderia melhorar?" />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--cor-texto-muted)', fontSize: 'var(--text-sm)' }}>Avaliação Detalhada (Opcional)</label>
            <textarea value={texto} onChange={e => setTexto(e.target.value)} className="search-input" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', minHeight: '100px', resize: 'vertical' }} placeholder="Conte mais sobre sua experiência com este modelo..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enviar Avaliação</button>
        </form>
      )}

      {comments.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhuma avaliação ainda.</h3>
          <p>Seja o primeiro a avaliar este modelo e ajude outros patinadores!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
          {comments.map(comment => (
            <div key={comment.id} className="card" style={{ padding: 'var(--gap-lg)' }}>
              <div className="flex justify-between" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: 'var(--text-md)', color: 'var(--cor-texto)' }}>{comment.nome}</strong>
                  <div style={{ color: 'var(--cor-acento)', letterSpacing: '2px', fontSize: '1.2rem' }}>{renderStars(comment.nota)}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 'var(--text-sm)', color: 'var(--cor-texto-hint)' }}>
                  {comment.date}<br/>
                  <span className={`badge badge-nivel ${comment.experiencia.toLowerCase()}`} style={{ marginTop: '0.5rem' }}>{comment.experiencia}</span>
                </div>
              </div>

              {comment.texto && <p style={{ marginBottom: '1rem', color: 'var(--cor-texto-muted)' }}>"{comment.texto}"</p>}

              {(comment.pros || comment.contras) && (
                <div className="grid-2" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginTop: '1rem' }}>
                  {comment.pros && (
                    <div>
                      <strong style={{ color: '#2ecc71', fontSize: 'var(--text-sm)' }}>+ Prós</strong>
                      <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>{comment.pros}</p>
                    </div>
                  )}
                  {comment.contras && (
                    <div>
                      <strong style={{ color: '#e74c3c', fontSize: 'var(--text-sm)' }}>- Contras</strong>
                      <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>{comment.contras}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--cor-texto-hint)', marginTop: '1rem' }}>
                Tempo de uso: {comment.tempoUso}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
