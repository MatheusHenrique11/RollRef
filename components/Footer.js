import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-dicas">
          <div className="flex justify-between items-center" style={{ marginBottom: 'var(--gap-lg)', flexWrap: 'wrap' }}>
            <h2 className="text-gradient">Dicas Rápidas para Iniciantes</h2>
            <Link href="/catalogo" className="btn btn-outline" style={{ fontSize: 'var(--text-sm)' }}>Ver todos os patins</Link>
          </div>
          
          <div className="grid-3">
            <div className="card" style={{ background: 'var(--cor-fundo-hover)' }}>
              <h3 style={{ fontSize: 'var(--text-md)', marginBottom: '0.5rem', color: 'var(--cor-acento)' }}>O que são os ABECs?</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cor-texto-muted)' }}>
                ABEC é uma norma para rolamentos. Quanto maior o número, mais preciso é o rolamento (gira mais solto e atinge mais velocidade), embora não seja a única métrica de qualidade.
              </p>
            </div>
            
            <div className="card" style={{ background: 'var(--cor-fundo-hover)' }}>
              <h3 style={{ fontSize: 'var(--text-md)', marginBottom: '0.5rem', color: 'var(--cor-acento)' }}>Dureza das Rodas (Ex: 85A)</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cor-texto-muted)' }}>
                O número seguido do "A" indica a dureza. 85A é padrão para asfalto. Rodas menores que 82A são macias (mais grip, desgaste rápido). Acima de 88A são muito duras (menos grip, mais velocidade).
              </p>
            </div>

            <div className="card" style={{ background: 'var(--cor-fundo-hover)' }}>
              <h3 style={{ fontSize: 'var(--text-md)', marginBottom: '0.5rem', color: 'var(--cor-acento)' }}>Softboot vs Hardboot</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cor-texto-muted)' }}>
                <strong>Softboot:</strong> Confortáveis, estilo tênis, ótimos para passeio leve.<br/>
                <strong>Hardboot:</strong> Bota de plástico rígido, durável, transmite mais força para a base, ideal para freeride, saltos e manobras.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <div className="logo" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Roll<span>Ref</span></div>
            <p>O guia definitivo e catálogo técnico de patins no Brasil.</p>
          </div>
          
          <div className="flex gap-md">
            <Link href="/vendedores">Área Lojista</Link>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/comparar">Comparador</Link>
          </div>
          
          <div>
            &copy; {new Date().getFullYear()} RollRef. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
