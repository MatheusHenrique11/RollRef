import { getModeloPorId, getTodosModelos } from '../../../../lib/data';
import Link from 'next/link';
import CompareButton from '../../../../components/CompareButton';
import Comments from '../../../../components/Comments';

export function generateMetadata({ params }) {
  const patins = getModeloPorId(params.id);
  
  if (!patins) {
    return { title: 'Modelo não encontrado | RollRef' };
  }

  return {
    title: `${patins.nome} - Especificações e Preço | RollRef`,
    description: `Confira todos os detalhes técnicos, faixa de preço (${patins.preco_ref}) e onde comprar o patins ${patins.marca} ${patins.nome}. Ideal para nível ${patins.nivel}.`,
    openGraph: {
      title: `${patins.nome} | RollRef`,
      description: `Confira todas as especificações do patins ${patins.marca} ${patins.nome}.`,
      images: [patins.imagem],
    }
  };
}

export function generateStaticParams() {
  const modelos = getTodosModelos();
  return modelos.map((patins) => ({
    id: patins.id,
  }));
}

export default function PatinsDetalhe({ params }) {
  const patins = getModeloPorId(params.id);

  if (!patins) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Modelo não encontrado</h1>
        <Link href="/catalogo" className="btn btn-primary">Voltar ao Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <Link href="/catalogo" style={{ color: 'var(--text-secondary)' }}>&larr; Voltar ao catálogo</Link>
      </div>
      
      <div className="detail-grid">
        <div className="detail-img-wrap">
          <img src={patins.imagem} alt={patins.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div>
          <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', textTransform: 'uppercase' }}>{patins.marca}</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '2.5rem' }}>{patins.nome}</h1>
          
          <div className="card-tags" style={{ marginBottom: '1.5rem' }}>
            <span className="tag">{patins.tipo.toUpperCase()}</span>
            <span className="tag">{patins.categoria}</span>
            <span className="tag">{patins.nivel}</span>
          </div>

          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            {patins.preco_ref}
          </div>

          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            {patins.obs}
          </p>

          <div className="flex gap-md">
            <a href={patins.link_oficial} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
              Onde Comprar ({patins.disponibilidade})
            </a>
            <CompareButton patins={patins} />
          </div>

          <h3 style={{ marginTop: '3rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Especificações</h3>
          
          <table className="spec-table">
            <tbody>
              <tr>
                <th>Público</th>
                <td>{patins.publico.join(', ')}</td>
              </tr>
              <tr>
                <th>Material da Bota</th>
                <td>{patins.bota.material}</td>
              </tr>
              <tr>
                <th>Cano</th>
                <td>{patins.bota.cano}</td>
              </tr>
              <tr>
                <th>Fechamento</th>
                <td>{patins.bota.fechamento.join(' + ')}</td>
              </tr>
              <tr>
                <th>Base (Frame)</th>
                <td>{patins.frame.material} - {patins.frame.configuracao}</td>
              </tr>
              <tr>
                <th>Rodas</th>
                <td>{patins.rodas.diametro_mm ? `${patins.rodas.diametro_mm}mm` : 'N/D'} - {patins.rodas.durometro || 'N/D'} ({patins.rodas.quantidade}x)</td>
              </tr>
              <tr>
                <th>Rolamentos</th>
                <td>{patins.rolamento}</td>
              </tr>
              <tr>
                <th>Freio</th>
                <td>{patins.freio}</td>
              </tr>
            </tbody>
          </table>
          
          <Comments modelId={patins.id} />
        </div>
      </div>
    </div>
  );
}
