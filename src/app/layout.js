import '../styles/reset.css';
import '../styles/variables.css';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/catalogo.css';
import '../styles/modelo.css';
import '../styles/comparador.css';
import Link from 'next/link';
import { CompareProvider } from '../../context/CompareContext';
import CompareBar from '../../components/CompareBar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'RollRef — Referência em Patins',
  description: 'O portal definitivo de referência, comparação e comunidade para o universo dos patins no Brasil.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CompareProvider>
          <header>
            <div className="container flex items-center justify-between">
              <Link href="/" className="logo text-gradient">
                RollRef
              </Link>
              <nav>
                <ul className="nav-links">
                  <li><Link href="/">Início</Link></li>
                  <li><Link href="/catalogo">Catálogo</Link></li>
                  <li><Link href="/comparar">Comparador</Link></li>
                  <li><Link href="/vendedores">Para Vendedores</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <main>
            {children}
          </main>
          <Footer />
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}
