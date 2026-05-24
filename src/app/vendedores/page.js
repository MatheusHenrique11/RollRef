export default function Vendedores() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <div className="text-center">
        <h1 className="text-gradient">Área do Vendedor</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.25rem' }}>
          Alcance milhares de patinadores qualificados. Publique seus modelos e aumente suas vendas.
        </p>
      </div>

      <div className="grid">
        <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-primary)' }}>Starter</h2>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0', color: 'var(--accent-color)' }}>R$ 9,90<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/mês</span></div>
          <ul style={{ listStyle: 'none', margin: '0 0 2rem', color: 'var(--text-secondary)' }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Até 15 modelos ativos</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Modelos padrão de mercado</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Relatório de acessos básico</li>
            <li style={{ padding: '0.5rem 0' }}>1 Link Externo</li>
          </ul>
          <button className="btn btn-outline" style={{ width: '100%' }}>Começar agora</button>
        </div>

        <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', borderColor: 'var(--accent-color)', transform: 'scale(1.05)', zIndex: 10 }}>
          <div style={{ background: 'var(--accent-color)', color: 'white', padding: '0.25rem 1rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>Mais Popular</div>
          <h2 style={{ color: 'var(--text-primary)' }}>Pro</h2>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0', color: 'var(--accent-color)' }}>R$ 24,90<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/mês</span></div>
          <ul style={{ listStyle: 'none', margin: '0 0 2rem', color: 'var(--text-secondary)' }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Até 40 modelos ativos</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Modelos e montagens</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Badge "Vendedor Verificado"</li>
            <li style={{ padding: '0.5rem 0' }}>3 Links Externos</li>
          </ul>
          <button className="btn btn-primary" style={{ width: '100%' }}>Assinar Pro</button>
        </div>

        <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-primary)' }}>Premium</h2>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0', color: 'var(--accent-color)' }}>R$ 49,90<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/mês</span></div>
          <ul style={{ listStyle: 'none', margin: '0 0 2rem', color: 'var(--text-secondary)' }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Modelos Ilimitados</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Itens exclusivos e em destaque</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Badge "Premium" e Destaque no Topo</li>
            <li style={{ padding: '0.5rem 0' }}>Links Ilimitados</li>
          </ul>
          <button className="btn btn-outline" style={{ width: '100%' }}>Assinar Premium</button>
        </div>
      </div>
    </div>
  );
}
