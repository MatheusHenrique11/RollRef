// ============================================================
//  RollRef — data.js
//  Fonte central de dados do catálogo.
// ============================================================

export const modelos = [
  // ──────────────────────────────────────────────
  //  OXER
  // ──────────────────────────────────────────────
  {
    id: "oxer-secret-retro",
    nome: "Oxer Secret Retrô",
    marca: "Oxer",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "vinil sintético",
      cano: "alto",
      fechamento: ["cadarço", "fivela"]
    },
    frame: {
      material: "metal",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: null,
      durometro: null,
      quantidade: 4,
      obs: "rodas básicas — indicadas para piso liso"
    },
    rolamento: "ABEC 5",
    freio: "frontal fixo",
    preco_ref: "R$ 400 – R$ 480",
    disponibilidade: "Centauro",
    link_oficial: "https://www.centauro.com.br",
    obs: "Modelo clássico de visual retrô. Bota acolchoada e base em metal. Indicado para lazer em piso liso. Peças de reposição limitadas.",
    imagem: "https://images.unsplash.com/photo-1520625345719-f55bb1c58474?w=500&auto=format&fit=crop&q=60" // placeholder
  },
  {
    id: "oxer-sweet-suede",
    nome: "Oxer Sweet Suede",
    marca: "Oxer",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "camurça sintética",
      cano: "alto",
      fechamento: ["cadarço"]
    },
    frame: {
      material: "metal",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: null,
      durometro: null,
      quantidade: 4,
      obs: "rodas básicas com freio de altura regulável"
    },
    rolamento: "ABEC 5",
    freio: "frontal com regulagem de altura",
    preco_ref: "R$ 380 – R$ 450",
    disponibilidade: "Centauro",
    link_oficial: "https://www.centauro.com.br",
    obs: "Visual artístico com bota em camurça sintética. Freio com regulagem é um diferencial para iniciantes. Fabricado na China.",
    imagem: "https://images.unsplash.com/photo-1577700204780-e3258c704da8?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  ROLLER DERBY
  // ──────────────────────────────────────────────
  {
    id: "roller-derby-aerio-q60",
    nome: "Roller Derby Aerio Q60",
    marca: "Roller Derby",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "sintético macio (softboot)",
      cano: "alto",
      fechamento: ["cadarço", "velcro"]
    },
    frame: {
      material: "plástico reforçado",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: 62,
      durometro: "82A",
      quantidade: 4,
      obs: "boa aderência em piso de madeira e asfalto liso"
    },
    rolamento: "ABEC 5",
    freio: "frontal removível",
    preco_ref: "R$ 350 – R$ 500",
    disponibilidade: "Lojas de esporte e e-commerce",
    link_oficial: "https://www.rollerderbyskates.com",
    obs: "Clássico da marca para recreação. Boa relação custo-benefício para quem está começando no quad.",
    imagem: "https://images.unsplash.com/photo-1601633596708-5d2024bc99bc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "roller-derby-v-tech-80",
    nome: "Roller Derby V-Tech 80",
    marca: "Roller Derby",
    tipo: "inline",
    categoria: "fitness",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "softboot sintético",
      cano: "medio",
      fechamento: ["cadarço", "fivela", "velcro"]
    },
    frame: {
      material: "nylon reforçado",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "82A",
      quantidade: 4,
      obs: "boas para passeio urbano e ciclovia"
    },
    rolamento: "ABEC 5",
    freio: "heel brake traseiro",
    preco_ref: "R$ 300 – R$ 420",
    disponibilidade: "E-commerce e lojas esportivas",
    link_oficial: "https://www.rollerderbyskates.com",
    obs: "Entrada acessível no mundo do inline. Sistema triplo de fechamento garante segurança para iniciantes.",
    imagem: "https://images.unsplash.com/photo-1520625345719-f55bb1c58474?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  TRAXART
  // ──────────────────────────────────────────────
  {
    id: "traxart-fitness-80",
    nome: "Traxart Fitness 80",
    marca: "Traxart",
    tipo: "inline",
    categoria: "fitness",
    nivel: "iniciante",
    publico: ["adulto", "criança"],
    bota: {
      material: "softboot com espuma EVA",
      cano: "medio",
      fechamento: ["cadarço", "fivela"]
    },
    frame: {
      material: "nylon",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "82A",
      quantidade: 4,
      obs: "adequadas para asfalto e ciclovia"
    },
    rolamento: "ABEC 7",
    freio: "heel brake traseiro",
    preco_ref: "R$ 280 – R$ 380",
    disponibilidade: "Shopping centers e lojas de skate",
    link_oficial: "https://www.traxart.com.br",
    obs: "Uma das opções mais acessíveis com ABEC 7. Boa para quem quer começar sem gastar muito.",
    imagem: "https://images.unsplash.com/photo-1598282361668-3e4b7b39b036?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "traxart-slalom-pro",
    nome: "Traxart Slalom Pro",
    marca: "Traxart",
    tipo: "inline",
    categoria: "freestyle",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot)",
      cano: "alto",
      fechamento: ["cadarço", "fivela de catraca", "cuff ajustável"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha (rockeadas)"
    },
    rodas: {
      diametro_mm: 76,
      durometro: "85A",
      quantidade: 4,
      obs: "rodas rockeadas — pontas menores para facilitar manobras de slalom"
    },
    rolamento: "ABEC 7",
    freio: "sem freio (estilo freestyle)",
    preco_ref: "R$ 550 – R$ 750",
    disponibilidade: "Traxart online e lojas especializadas",
    link_oficial: "https://www.traxart.com.br",
    obs: "Bom custo-benefício para slalom. Base em alumínio é um diferencial nessa faixa de preço. Indicado para evolução técnica.",
    imagem: "https://images.unsplash.com/photo-1601633596708-5d2024bc99bc?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  FILA
  // ──────────────────────────────────────────────
  {
    id: "fila-legacy-pro",
    nome: "Fila Legacy Pro",
    marca: "Fila",
    tipo: "inline",
    categoria: "fitness",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "softboot com reforço lateral",
      cano: "medio",
      fechamento: ["cadarço", "fivela"]
    },
    frame: {
      material: "composite plástico",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "80A",
      quantidade: 4,
      obs: "macias — boa aderência em piso urbano"
    },
    rolamento: "ABEC 7",
    freio: "heel brake traseiro",
    preco_ref: "R$ 400 – R$ 600",
    disponibilidade: "Lojas multimarcas e e-commerce",
    link_oficial: "https://www.fila.com.br",
    obs: "Modelo confiável da marca italiana. Acabamento premium para o segmento de entrada. Boa opção de presente.",
    imagem: "https://images.unsplash.com/photo-1598282361668-3e4b7b39b036?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "fila-crossfit-84",
    nome: "Fila Crossfit 84",
    marca: "Fila",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "softboot reforçado",
      cano: "medio-alto",
      fechamento: ["cadarço", "fivela de catraca", "cuff"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 84,
      durometro: "84A",
      quantidade: 4,
      obs: "rodas maiores = mais velocidade em trajetos urbanos"
    },
    rolamento: "ABEC 9",
    freio: "heel brake traseiro removível",
    preco_ref: "R$ 700 – R$ 950",
    disponibilidade: "Lojas especializadas e e-commerce",
    link_oficial: "https://www.fila.com.br",
    obs: "Excelente para quem quer evoluir para o urban skating. Rolamento ABEC 9 e frame em alumínio são diferenciais nessa faixa.",
    imagem: "https://images.unsplash.com/photo-1520625345719-f55bb1c58474?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  BEL SPORTS
  // ──────────────────────────────────────────────
  {
    id: "bel-sports-inline-starter",
    nome: "Bel Sports Inline Starter",
    marca: "Bel Sports",
    tipo: "inline",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["criança", "adulto"],
    bota: {
      material: "plástico macio",
      cano: "baixo",
      fechamento: ["velcro", "fivela"]
    },
    frame: {
      material: "plástico",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 72,
      durometro: "82A",
      quantidade: 4,
      obs: "indicadas para piso liso — parque ou quadra"
    },
    rolamento: "ABEC 5",
    freio: "heel brake traseiro",
    preco_ref: "R$ 150 – R$ 250",
    disponibilidade: "Lojas de varejo — Americanas, Shopee, Mercado Livre",
    link_oficial: "https://www.belsports.com.br",
    obs: "Opção de entrada para crianças ou adultos que querem experimentar patinar antes de investir. Não indicado para uso frequente ou evolução técnica.",
    imagem: "https://images.unsplash.com/photo-1598282361668-3e4b7b39b036?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bel-sports-quad-classic",
    nome: "Bel Sports Quad Classic",
    marca: "Bel Sports",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["criança"],
    bota: {
      material: "plástico com forro básico",
      cano: "alto",
      fechamento: ["cadarço", "velcro"]
    },
    frame: {
      material: "plástico",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: 58,
      durometro: "82A",
      quantidade: 4,
      obs: "rodas pequenas — indicadas para crianças e pisos lisos"
    },
    rolamento: "ABEC 3",
    freio: "frontal",
    preco_ref: "R$ 120 – R$ 200",
    disponibilidade: "Varejo amplo — Americanas, Shopee, Mercado Livre",
    link_oficial: "https://www.belsports.com.br",
    obs: "Patins de entrada para crianças. Ideal para primeiros passos em casa ou parques tranquilos. Não recomendado para evolução técnica.",
    imagem: "https://images.unsplash.com/photo-1601633596708-5d2024bc99bc?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  POWERSLIDE
  // ──────────────────────────────────────────────
  {
    id: "powerslide-next-core-100",
    nome: "Powerslide Next Core Black 100",
    marca: "Powerslide",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto", "profissional"],
    bota: {
      material: "plástico rígido (hardboot)",
      cano: "alto ajustável",
      fechamento: ["cadarço", "fivela de catraca 45°", "cuff ajustável"]
    },
    frame: {
      material: "alumínio aeronáutico 6061",
      configuracao: "3 rodas em linha (sistema TRINITY 3-point mount)"
    },
    rodas: {
      diametro_mm: 100,
      durometro: "88A",
      quantidade: 3,
      obs: "Powerslide Spinner — alta velocidade e aderência em piso urbano"
    },
    rolamento: "Wicked ABEC 9",
    freio: "sem freio (urban freeride)",
    preco_ref: "R$ 1.500 – R$ 2.000",
    disponibilidade: "Lojas especializadas e importação",
    link_oficial: "https://www.powerslide.com",
    obs: "Referência no urban skating. Sistema TRINITY de 3 pontos reduz o centro de gravidade. Frame intercambiável. Patins para quem já domina a patinação.",
    imagem: "https://images.unsplash.com/photo-1520625345719-f55bb1c58474?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "powerslide-r6-marathon",
    nome: "Powerslide R6 Marathon",
    marca: "Powerslide",
    tipo: "inline",
    categoria: "speed",
    nivel: "avancado",
    publico: ["adulto", "profissional"],
    bota: {
      material: "plástico reforçado com fibra de vidro — feita à mão",
      cano: "baixo (speed boot)",
      fechamento: ["cadarço", "fivela de catraca 45°", "cuff de suporte"]
    },
    frame: {
      material: "alumínio CNC aeronáutico 6061",
      configuracao: "3 rodas em linha — 195mm / 3x125mm"
    },
    rodas: {
      diametro_mm: 125,
      durometro: "85A",
      quantidade: 3,
      obs: "Powerslide Infinity SHR (Super High Rebound) — máxima velocidade"
    },
    rolamento: "Wicked ABEC 9 — aço cromo",
    freio: "compatível com Megacruiser 125 (não incluso)",
    preco_ref: "R$ 2.200 – R$ 3.000",
    disponibilidade: "Lojas especializadas e importação",
    link_oficial: "https://www.powerslide.com",
    obs: "Patins de competição para maratonas e corridas. Bota manufaturada à mão com fibra de vidro. Máxima transferência de energia a cada pedalada. Não recomendado para iniciantes.",
    imagem: "https://images.unsplash.com/photo-1598282361668-3e4b7b39b036?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  K2
  // ──────────────────────────────────────────────
  {
    id: "k2-kinetic-80",
    nome: "K2 Kinetic 80",
    marca: "K2",
    tipo: "inline",
    categoria: "fitness",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "softboot K2 Original com Stability Plus Cuff",
      cano: "medio",
      fechamento: ["cadarço", "velcro", "presilhas plásticas"]
    },
    frame: {
      material: "composto plástico F.B.I. (Frame Boot Integration)",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "80A",
      quantidade: 4,
      obs: "poliuretano — macias e estáveis para iniciantes"
    },
    rolamento: "ABEC 5",
    freio: "heel brake traseiro",
    preco_ref: "R$ 600 – R$ 850",
    disponibilidade: "Lojas especializadas e e-commerce",
    link_oficial: "https://www.k2skates.com",
    obs: "Softboot confortável com ótimo suporte de tornozelo. Ideal para fitness e lazer urbano. A tecnologia F.B.I. integra bota e base para melhor resposta.",
    imagem: "https://images.unsplash.com/photo-1520625345719-f55bb1c58474?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "k2-vo2-s-100",
    nome: "K2 VO2 S 100",
    marca: "K2",
    tipo: "inline",
    categoria: "fitness",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "softboot com reforço estrutural",
      cano: "medio-alto",
      fechamento: ["cadarço", "fivela de catraca", "cuff ajustável"]
    },
    frame: {
      material: "alumínio — quadro unilateral VO2-S",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 100,
      durometro: "85A",
      quantidade: 4,
      obs: "rodas grandes para alta velocidade e performance em trajetos longos"
    },
    rolamento: "ABEC 7",
    freio: "heel brake traseiro removível",
    preco_ref: "R$ 1.100 – R$ 1.500",
    disponibilidade: "Lojas especializadas e importação",
    link_oficial: "https://www.k2skates.com",
    obs: "Quadro unilateral VO2-S dá visibilidade completa das rodas de 100mm. Voltado para performance em longas distâncias. Ótima escolha para treinamentos X-Training.",
    imagem: "https://images.unsplash.com/photo-1601633596708-5d2024bc99bc?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  ROCES
  // ──────────────────────────────────────────────
  {
    id: "roces-kolossal",
    nome: "Roces Kolossal",
    marca: "Roces",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "sintético estilo tênis cano alto",
      cano: "alto",
      fechamento: ["cadarço"]
    },
    frame: {
      material: "metal",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: 62,
      durometro: "82A",
      quantidade: 4,
      obs: "macias — rodam bem em piso irregular"
    },
    rolamento: "ABEC 5",
    freio: "frontal",
    preco_ref: "R$ 500 – R$ 700",
    disponibilidade: "RollerJam e lojas especializadas",
    link_oficial: "https://www.roces.com",
    obs: "Design moderno estilo tênis cano alto. Confortável para fins de semana. As rodas macias funcionam bem em piso irregular — diferencial frente a outros quads da categoria.",
    imagem: "https://images.unsplash.com/photo-1598282361668-3e4b7b39b036?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "roces-disco-palace",
    nome: "Roces Disco Palace",
    marca: "Roces",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "couro sintético estilo retrô",
      cano: "alto",
      fechamento: ["cadarço"]
    },
    frame: {
      material: "metal",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: 62,
      durometro: "82A",
      quantidade: 4,
      obs: "macias e versáteis para piso de madeira e asfalto"
    },
    rolamento: "ABEC 5",
    freio: "frontal",
    preco_ref: "R$ 550 – R$ 750",
    disponibilidade: "RollerJam e lojas especializadas",
    link_oficial: "https://www.roces.com",
    obs: "Visual retrô inspirado na era disco. Marca europeia com padrão de qualidade acima da média nessa faixa de preço. Muito procurado por fãs do estilo quad vintage.",
    imagem: "https://images.unsplash.com/photo-1577700204780-e3258c704da8?w=500&auto=format&fit=crop&q=60"
  },

  // ──────────────────────────────────────────────
  //  HD INLINE
  // ──────────────────────────────────────────────
  {
    id: "hd-inline-speed-110",
    nome: "HD Inline Speed 110",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "speed",
    nivel: "avancado",
    publico: ["adulto", "profissional"],
    bota: {
      material: "fibra de carbono / plástico de alta rigidez",
      cano: "baixo (speed boot)",
      fechamento: ["cadarço", "fivela de catraca"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "3 rodas em linha"
    },
    rodas: {
      diametro_mm: 110,
      durometro: "85A",
      quantidade: 3,
      obs: "rodas de alta performance para velocidade máxima"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 1.800 – R$ 2.500",
    disponibilidade: "Lojas especializadas em patinação",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Voltado para patinadores de velocidade e competição. Alta rigidez e leveza são o foco do modelo. Exige domínio completo da técnica de freagem sem freio.",
    imagem: "https://images.unsplash.com/photo-1520625345719-f55bb1c58474?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "hd-inline-urban-90",
    nome: "HD Inline Urban 90",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido com forro confortável",
      cano: "alto",
      fechamento: ["cadarço", "fivela", "cuff"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 90,
      durometro: "85A",
      quantidade: 4,
      obs: "versáteis para asfalto, ciclovia e piso de parque"
    },
    rolamento: "ABEC 7",
    freio: "heel brake removível",
    preco_ref: "R$ 900 – R$ 1.300",
    disponibilidade: "Lojas especializadas em patinação",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Bom ponto de entrada no urban skating. Equilibra conforto e performance. Indicado para quem já sabe patinar e quer evoluir o estilo.",
    imagem: "https://images.unsplash.com/photo-1598282361668-3e4b7b39b036?w=500&auto=format&fit=crop&q=60"
  }
];

// ─────────────────────────────────────────
//  FUNÇÕES UTILITÁRIAS
// ─────────────────────────────────────────

export function getTodosModelos() {
  return modelos;
}

export function filtrarPorTipo(tipo) {
  return modelos.filter(m => m.tipo === tipo);
}

export function filtrarPorNivel(nivel) {
  return modelos.filter(m => m.nivel === nivel);
}

export function filtrarPorCategoria(categoria) {
  return modelos.filter(m => m.categoria === categoria);
}

export function filtrarPorMarca(marca) {
  return modelos.filter(m => m.marca.toLowerCase() === marca.toLowerCase());
}

export function buscarPorNome(texto) {
  if (!texto) return modelos;
  const q = texto.toLowerCase();
  return modelos.filter(m => m.nome.toLowerCase().includes(q) || m.marca.toLowerCase().includes(q));
}

export function getModeloPorId(id) {
  return modelos.find(m => m.id === id) || null;
}

export function getMarcas() {
  return [...new Set(modelos.map(m => m.marca))].sort();
}

export function getCategorias() {
  return [...new Set(modelos.map(m => m.categoria))].sort();
}
