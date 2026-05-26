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
    imagem: "/images/patins_inline.png" // placeholder
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
    imagem: "/images/patins_quad.png"
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
    imagem: "/images/patins_quad.png"
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
    imagem: "/images/patins_inline.png"
  },

  // ──────────────────────────────────────────────
  //  TRAXART
  // ──────────────────────────────────────────────
  {
    id: "traxart-revolt",
    nome: "Traxart Revolt",
    marca: "Traxart",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot) reforçado",
      cano: "alto",
      fechamento: ["cadarço", "fivela de catraca superior e inferior"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha (flat)"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "rodas de poliuretano de alta performance"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 900 – R$ 1.100",
    disponibilidade: "Traxart online e lojas especializadas",
    link_oficial: "https://www.traxart.com.br",
    obs: "Modelo clássico da linha Urban da Traxart. Muito resistente, ideal para saltos, descidas e patinação nas ruas.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "traxart-revolt-turbo",
    nome: "Traxart Revolt Turbo",
    marca: "Traxart",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot) com bota interna super acolchoada",
      cano: "alto",
      fechamento: ["cadarço", "fivela de catraca superior e inferior"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "3 rodas em linha (triskate)"
    },
    rodas: {
      diametro_mm: 110,
      durometro: "88A",
      quantidade: 3,
      obs: "rodas grandes para maior velocidade e superação de obstáculos"
    },
    rolamento: "ABEC 9 Cromo",
    freio: "sem freio",
    preco_ref: "R$ 1.200 – R$ 1.400",
    disponibilidade: "Traxart online e lojas especializadas",
    link_oficial: "https://www.traxart.com.br",
    obs: "Versão Triskate do Revolt. Rodas de 110mm garantem muita velocidade e fluidez na cidade. Indicado para patinadores experientes.",
    imagem: "/images/patins_speed.png"
  },
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
    imagem: "/images/patins_speed.png"
  },
  {
    id: "traxart-volt-plus",
    nome: "Traxart Volt+",
    marca: "Traxart",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot)",
      cano: "alto",
      fechamento: ["cadarço", "fivela", "presilha micro ajustável"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha (rockeável)"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "rodas de poliuretano de alta resiliência"
    },
    rolamento: "ABEC 9 Cromo",
    freio: "sem freio",
    preco_ref: "R$ 1.000 – R$ 1.200",
    disponibilidade: "Traxart online e lojas parceiras",
    link_oficial: "https://www.traxart.com.br",
    obs: "Evolução do modelo Volt. Possui absorvedor de impacto e frame rockeável, excelente para urban e slalom.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "traxart-hype",
    nome: "Traxart Hype",
    marca: "Traxart",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "sintético reforçado (softboot)",
      cano: "alto",
      fechamento: ["cadarço"]
    },
    frame: {
      material: "alumínio",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: 58,
      durometro: "83A",
      quantidade: 4,
      obs: "rodas em PU para asfalto liso ou rinque"
    },
    rolamento: "ABEC 7",
    freio: "frontal com regulagem",
    preco_ref: "R$ 800 – R$ 950",
    disponibilidade: "Traxart online",
    link_oficial: "https://www.traxart.com.br",
    obs: "Quad de nível intermediário com design moderno e confortável. A base em alumínio e o freio regulável são diferenciais chave.",
    imagem: "/images/patins_quad.png"
  },
  {
    id: "traxart-dynamix",
    nome: "Traxart Dynamix",
    marca: "Traxart",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot)",
      cano: "alto",
      fechamento: ["cadarço", "fivela", "presilha"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "bom para asfalto"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 850 – R$ 1.050",
    disponibilidade: "Traxart online",
    link_oficial: "https://www.traxart.com.br",
    obs: "Opção muito escolhida pelo custo-benefício e durabilidade no urban.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "traxart-mesh",
    nome: "Traxart Mesh",
    marca: "Traxart",
    tipo: "inline",
    categoria: "fitness",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "tecido mesh respirável (softboot)",
      cano: "medio",
      fechamento: ["cadarço", "velcro", "fivela"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "82A",
      quantidade: 4,
      obs: "ideal para ciclovias"
    },
    rolamento: "ABEC 7",
    freio: "traseiro",
    preco_ref: "R$ 600 – R$ 800",
    disponibilidade: "Traxart online",
    link_oficial: "https://www.traxart.com.br",
    obs: "Design voltado para extremo conforto e ventilação.",
    imagem: "/images/patins_speed.png"
  },
  {
    id: "traxart-jet",
    nome: "Traxart Inline Fitness Jet",
    marca: "Traxart",
    tipo: "inline",
    categoria: "fitness",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "softboot acolchoado",
      cano: "medio",
      fechamento: ["cadarço", "velcro", "fivela"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "82A",
      quantidade: 4,
      obs: "piso liso e passeios suaves"
    },
    rolamento: "ABEC 7",
    freio: "traseiro",
    preco_ref: "R$ 550 – R$ 750",
    disponibilidade: "Traxart online e lojas parceiras",
    link_oficial: "https://www.traxart.com.br",
    obs: "Patins fitness com ótima relação custo-benefício.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "traxart-electro-v2",
    nome: "Traxart Electro V2",
    marca: "Traxart",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot) reforçado",
      cano: "alto",
      fechamento: ["cadarço", "fivelas de alta precisão"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "3 rodas em linha (triskate)"
    },
    rodas: {
      diametro_mm: 110,
      durometro: "85A",
      quantidade: 3,
      obs: "rodas de alto desempenho"
    },
    rolamento: "ABEC 9 Cromo",
    freio: "sem freio",
    preco_ref: "R$ 1.300 – R$ 1.500",
    disponibilidade: "Traxart online",
    link_oficial: "https://www.traxart.com.br",
    obs: "Modelo triskate de visual impactante e componentes de alta performance.",
    imagem: "/images/patins_speed.png"
  },
  {
    id: "traxart-new-revolt-r3",
    nome: "Traxart New Revolt R3",
    marca: "Traxart",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido resistente",
      cano: "alto",
      fechamento: ["cadarço", "fivelas catraca"]
    },
    frame: {
      material: "alumínio CNC (híbrido)",
      configuracao: "3 ou 4 rodas"
    },
    rodas: {
      diametro_mm: 110,
      durometro: "88A",
      quantidade: 3,
      obs: "pode rodar com setup de 4 rodas menores também"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 1.400 – R$ 1.700",
    disponibilidade: "Traxart online",
    link_oficial: "https://www.traxart.com.br",
    obs: "A última geração do Revolt, com frame versátil que permite mudar o setup conforme o rolê.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "traxart-street-aggressive",
    nome: "Traxart Street Aggressive",
    marca: "Traxart",
    tipo: "inline",
    categoria: "freestyle",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido com soulplate amplo",
      cano: "alto",
      fechamento: ["cadarço", "fivela superior", "velcro"]
    },
    frame: {
      material: "UFS composto (nylon/fibra)",
      configuracao: "anti-rocker (2 grandes, 2 pequenas no meio)"
    },
    rodas: {
      diametro_mm: 57,
      durometro: "90A",
      quantidade: 4,
      obs: "rodas nas pontas e grindwheels no meio"
    },
    rolamento: "ABEC 7",
    freio: "sem freio",
    preco_ref: "R$ 900 – R$ 1.200",
    disponibilidade: "Traxart online",
    link_oficial: "https://www.traxart.com.br",
    obs: "Voltado especificamente para manobras em skateparks e corrimãos (grinds).",
    imagem: "/images/patins_quad.png"
  },
  {
    id: "traxart-atomix",
    nome: "Traxart Atomix",
    marca: "Traxart",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot)",
      cano: "alto",
      fechamento: ["cadarço", "fivela", "presilha"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "poliuretano alta durabilidade"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 900 – R$ 1.100",
    disponibilidade: "Traxart online",
    link_oficial: "https://www.traxart.com.br",
    obs: "Opção moderna para urban com excelente fluidez e estabilidade em curvas.",
    imagem: "/images/patins_inline.png"
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
    imagem: "/images/patins_quad.png"
  },

  // ──────────────────────────────────────────────
  //  FILA
  // ──────────────────────────────────────────────
  {
    id: "fila-houdini",
    nome: "Fila Houdini",
    marca: "Fila",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot) ventilado",
      cano: "alto",
      fechamento: ["cadarço", "fivela de catraca no cuff e peito do pé"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas (aceita configuração 3 rodas)"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "82A",
      quantidade: 4,
      obs: "base híbrida que suporta tanto 4x80mm quanto 3x90mm"
    },
    rolamento: "ABEC 7",
    freio: "heel brake incluso (removível)",
    preco_ref: "R$ 950 – R$ 1.200",
    disponibilidade: "Lojas esportivas e e-commerce",
    link_oficial: "https://www.fila.com.br",
    obs: "Um dos urban mais versáteis do mercado graças ao seu frame híbrido. Hardboot muito confortável para pés levemente mais largos.",
    imagem: "/images/patins_inline.png"
  },
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
    imagem: "/images/patins_speed.png"
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
    imagem: "/images/patins_inline.png"
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
    imagem: "/images/patins_speed.png"
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
    imagem: "/images/patins_quad.png"
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
    imagem: "/images/patins_inline.png"
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
    imagem: "/images/patins_speed.png"
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
    imagem: "/images/patins_inline.png"
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
    imagem: "/images/patins_quad.png"
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
    imagem: "/images/patins_speed.png"
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
    imagem: "/images/patins_quad.png"
  },

  // ──────────────────────────────────────────────
  //  HD INLINE
  // ──────────────────────────────────────────────
  {
    id: "hd-inline-bold",
    nome: "HD Inline BOLD",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido resistente",
      cano: "alto",
      fechamento: ["cadarço", "fivela", "presilha"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "rodas de poliuretano de alta resistência"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 999,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Lançamento. Patins robusto para manobras e patinação urbana.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "hd-inline-rt-urban",
    nome: "HD Inline RT URBAN",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido (hardboot)",
      cano: "alto",
      fechamento: ["cadarço", "fivela superior", "presilha"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "disponível nas cores cinza, verde e vermelho"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 999,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Design urbano focado em estabilidade. Disponível em várias cores: cinza, verde e vermelho.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "hd-inline-bw7",
    nome: "HD Inline BW7",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto"],
    bota: {
      material: "plástico reforçado de alta durabilidade",
      cano: "alto",
      fechamento: ["cadarço", "fivelas micrométricas"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "alta performance em piso de asfalto"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 999,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Modelo profissional voltado para patinadores experientes que buscam máxima resposta.",
    imagem: "/images/patins_speed.png"
  },
  {
    id: "hd-inline-skull-2-5",
    nome: "HD Inline SKULL 2.5",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "hardboot estilizado",
      cano: "alto",
      fechamento: ["cadarço", "fivela de precisão"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "rodas duráveis para uso diário"
    },
    rolamento: "ABEC 7",
    freio: "sem freio",
    preco_ref: "R$ 799,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Design urbano arrojado e disponível em várias cores. Excelente custo-benefício.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "hd-inline-sky",
    nome: "HD Inline SKY",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido com forro respirável",
      cano: "alto",
      fechamento: ["cadarço", "fivelas ajustáveis"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "versátil para passeios urbanos"
    },
    rolamento: "ABEC 7",
    freio: "sem freio",
    preco_ref: "R$ 799,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Disponível nas versões Black Stone e Tradicional.",
    imagem: "/images/patins_speed.png"
  },
  {
    id: "hd-inline-tracker",
    nome: "HD Inline TRACKER",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "hardboot performance",
      cano: "alto",
      fechamento: ["cadarço", "presilha"]
    },
    frame: {
      material: "alumínio",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "foco em performance"
    },
    rolamento: "ABEC 7",
    freio: "sem freio",
    preco_ref: "R$ 799,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Modelo focado em performance urbana e precisão nas manobras.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "hd-inline-evolution-ii-80",
    nome: "HD Inline EVOLUTION II (4x80mm)",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto", "profissional"],
    bota: {
      material: "hardboot de precisão profissional",
      cano: "alto",
      fechamento: ["cadarço", "fivelas de alta segurança"]
    },
    frame: {
      material: "alumínio CNC ultra resistente",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "rodas de alta performance"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 1.399,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Alta performance e nível profissional. Ideal para saltos e slides intensos.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "hd-inline-evolution-ii-110",
    nome: "HD Inline EVOLUTION II (3x110mm)",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "avancado",
    publico: ["adulto", "profissional"],
    bota: {
      material: "hardboot de precisão profissional",
      cano: "alto",
      fechamento: ["cadarço", "fivelas de alta segurança"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "3 rodas em linha (triskate)"
    },
    rodas: {
      diametro_mm: 110,
      durometro: "88A",
      quantidade: 3,
      obs: "rodas de 110mm para alta velocidade e absorção de impacto em asfalto irregular"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 1.399,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Versão triskate para alta velocidade nas ruas, sem abrir mão do controle.",
    imagem: "/images/patins_speed.png"
  },
  {
    id: "hd-inline-carbon-cruiser",
    nome: "HD Inline CARBON CRUISER",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "speed",
    nivel: "avancado",
    publico: ["adulto", "profissional"],
    bota: {
      material: "fibra de carbono ultraleve",
      cano: "baixo/médio",
      fechamento: ["cadarço", "fivelas milimétricas"]
    },
    frame: {
      material: "alumínio CNC de alta classe",
      configuracao: "3 ou 4 rodas dependendo do setup"
    },
    rodas: {
      diametro_mm: 110,
      durometro: "88A",
      quantidade: 3,
      obs: "alto desempenho em retas e maratonas"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 1.999,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Estrutura super leve com base em carbono. Para patinadores de velocidade e maratona que buscam alto desempenho.",
    imagem: "/images/patins_speed.png"
  },
  {
    id: "hd-inline-panther",
    nome: "HD Inline PANTHER",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "freestyle",
    nivel: "avancado",
    publico: ["adulto", "profissional"],
    bota: {
      material: "plástico super resistente a impactos severos",
      cano: "alto",
      fechamento: ["cadarço", "fivela de pressão e velcro"]
    },
    frame: {
      material: "composto nylon/fibra de vidro UFS",
      configuracao: "anti-rocker ou flat"
    },
    rodas: {
      diametro_mm: 58,
      durometro: "90A",
      quantidade: 4,
      obs: "rodas pequenas para street"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 1.999,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "O ápice do street da HD Inline. Controle total, resistência extrema e soulplate generoso para deslizar em qualquer superfície.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "hd-inline-cherry-quad",
    nome: "HD Inline Cherry Quad",
    marca: "HD Inline",
    tipo: "quad",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["adulto"],
    bota: {
      material: "sintético aveludado ou com glitter",
      cano: "alto",
      fechamento: ["cadarço"]
    },
    frame: {
      material: "alumínio",
      configuracao: "quad (2x2)"
    },
    rodas: {
      diametro_mm: 58,
      durometro: "82A",
      quantidade: 4,
      obs: "Poliuretano macio para absorção de vibrações"
    },
    rolamento: "ABEC 7",
    freio: "frontal",
    preco_ref: "R$ 559,84",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Disponível em acabamentos incríveis: preto glitter, preto veludo, preto e rosa. Base em alumínio para maior resistência.",
    imagem: "/images/patins_quad.png"
  },
  {
    id: "hd-inline-zippy",
    nome: "HD Inline ZIPPY Ajustável",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "recreativo",
    nivel: "iniciante",
    publico: ["criança"],
    bota: {
      material: "plástico rígido com bota interna confortável",
      cano: "alto",
      fechamento: ["cadarço", "velcro", "presilha ajustável"]
    },
    frame: {
      material: "plástico de alta resistência",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 72,
      durometro: "82A",
      quantidade: 4,
      obs: "rodas de tamanho adaptável à bota infantil"
    },
    rolamento: "ABEC 5",
    freio: "traseiro removível",
    preco_ref: "R$ 599,90",
    disponibilidade: "HD Inline oficial",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Patins infantil com sistema expansível de tamanhos. Conforto e segurança para os pequenos iniciarem na patinação.",
    imagem: "/images/patins_inline.png"
  },
  {
    id: "hd-inline-black",
    nome: "HD Inline Black",
    marca: "HD Inline",
    tipo: "inline",
    categoria: "urban",
    nivel: "intermediario",
    publico: ["adulto"],
    bota: {
      material: "plástico rígido resistente a impactos",
      cano: "alto",
      fechamento: ["cadarço", "fivela de catraca superior e peito do pé"]
    },
    frame: {
      material: "alumínio CNC",
      configuracao: "4 rodas em linha"
    },
    rodas: {
      diametro_mm: 80,
      durometro: "85A",
      quantidade: 4,
      obs: "bom desempenho em asfalto rugoso"
    },
    rolamento: "ABEC 9",
    freio: "sem freio",
    preco_ref: "R$ 800 – R$ 1.000",
    disponibilidade: "Lojas especializadas",
    link_oficial: "https://www.hdinline.com.br",
    obs: "Opção nacional robusta e com ótimo custo-benefício para quem quer entrar no patins street/urban sem investir valores exorbitantes.",
    imagem: "/images/patins_inline.png"
  },
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
    imagem: "/images/patins_inline.png"
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
    imagem: "/images/patins_speed.png"
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
