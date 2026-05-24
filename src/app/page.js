import Link from 'next/link';
import { getTodosModelos } from '../../lib/data';
import CardPatins from '../../components/CardPatins';

export default function Home() {
  const destaques = getTodosModelos().slice(0, 6);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1 className="text-gradient">Encontre o Patins Ideal</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Compare modelos, leia avaliações reais e descubra o melhor equipamento para o seu estilo de patinação.
          </p>
          
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar por marca, modelo ou categoria..." 
              className="search-input"
            />
          </div>
          
          <div className="flex gap-md justify-center">
            <Link href="/catalogo" className="btn btn-primary">Ver Catálogo Completo</Link>
            <Link href="/comparar" className="btn btn-outline">Comparar Modelos</Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '4rem' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
          <h2>Modelos em Destaque</h2>
          <Link href="/catalogo" style={{ color: 'var(--accent-color)', fontWeight: '500' }}>
            Ver todos &rarr;
          </Link>
        </div>
        
        <div className="grid">
          {destaques.map(patins => (
            <CardPatins key={patins.id} patins={patins} />
          ))}
        </div>
      </section>
    </div>
  );
}
