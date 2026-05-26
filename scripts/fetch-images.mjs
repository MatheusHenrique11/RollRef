/**
 * fetch-images.mjs
 * Busca imagens reais de produto para cada modelo do catálogo RollRef.
 * Estratégias (em ordem de tentativa):
 *   1. Shopify JSON API  (/products/{handle}.json)
 *   2. Curl com headers de Chrome nas páginas de produto conhecidas
 *   3. DuckDuckGo HTML search como fallback
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const DATA_FILE  = path.resolve(__dirname, '../lib/data.js');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Catálogo de modelos: id → lista de estratégias ──────────────────────────

const models = [
  // HD INLINE — site customizado
  { id: 'hd-inline-bold',           query: 'HD Inline BOLD patins',           shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-bold' },
  { id: 'hd-inline-rt-urban',       query: 'HD Inline RT URBAN patins',        shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-rt-urban' },
  { id: 'hd-inline-bw7',            query: 'HD Inline BW7 patins',             shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-bw7' },
  { id: 'hd-inline-skull-2-5',      query: 'HD Inline SKULL 2.5 patins',       shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-skull-2-5' },
  { id: 'hd-inline-sky',            query: 'HD Inline SKY patins',             shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-sky' },
  { id: 'hd-inline-tracker',        query: 'HD Inline TRACKER patins',         shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-tracker' },
  { id: 'hd-inline-evolution-ii-80',query: 'HD Inline EVOLUTION II 80mm',      shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-evolution-ii-4x80mm' },
  { id: 'hd-inline-evolution-ii-110',query:'HD Inline EVOLUTION II 110mm',     shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-evolution-ii-3x110mm' },
  { id: 'hd-inline-carbon-cruiser', query: 'HD Inline CARBON CRUISER',         shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-carbon-cruiser' },
  { id: 'hd-inline-panther',        query: 'HD Inline PANTHER patins agressivo',shopify:'https://hdinline.com.br', handle: 'patins-inline-hd-inline-panther' },
  { id: 'hd-inline-cherry-quad',    query: 'HD Inline Cherry Quad patins',     shopify: 'https://hdinline.com.br', handle: 'patins-quad-hd-inline-cherry-quad' },
  { id: 'hd-inline-zippy',          query: 'HD Inline ZIPPY infantil ajustavel',shopify:'https://hdinline.com.br', handle: 'patins-inline-hd-inline-zippy-ajustavel' },
  { id: 'hd-inline-black',          query: 'HD Inline Black patins',           shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-black' },
  { id: 'hd-inline-speed-110',      query: 'HD Inline Speed 110 patins',       shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-speed-110' },
  { id: 'hd-inline-urban-90',       query: 'HD Inline Urban 90 patins',        shopify: 'https://hdinline.com.br', handle: 'patins-inline-hd-inline-urban-90' },

  // TRAXART — Shopify
  { id: 'traxart-revolt',           query: 'Traxart Revolt patins inline',     shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-revolt' },
  { id: 'traxart-revolt-turbo',     query: 'Traxart Revolt Turbo patins',      shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-revolt-turbo' },
  { id: 'traxart-fitness-80',       query: 'Traxart Fitness 80 patins',        shopify: 'https://www.traxart.com.br', handle: 'patins-inline-fitness-traxart-fitness-80' },
  { id: 'traxart-volt-plus',        query: 'Traxart Volt+ patins',             shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-volt' },
  { id: 'traxart-hype',             query: 'Traxart Hype quad patins',         shopify: 'https://www.traxart.com.br', handle: 'patins-quad-traxart-hype' },
  { id: 'traxart-dynamix',          query: 'Traxart Dynamix patins inline',    shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-dynamix' },
  { id: 'traxart-mesh',             query: 'Traxart Mesh patins fitness',      shopify: 'https://www.traxart.com.br', handle: 'patins-inline-fitness-traxart-mesh' },
  { id: 'traxart-jet',              query: 'Traxart Jet patins fitness',       shopify: 'https://www.traxart.com.br', handle: 'patins-inline-fitness-traxart-jet' },
  { id: 'traxart-electro-v2',       query: 'Traxart Electro V2 patins',        shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-electro-v2' },
  { id: 'traxart-new-revolt-r3',    query: 'Traxart New Revolt R3 patins',     shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-new-revolt-r3' },
  { id: 'traxart-street-aggressive',query:'Traxart Street Aggressive patins',  shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-street-aggressive' },
  { id: 'traxart-atomix',           query: 'Traxart Atomix patins',            shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-atomix' },
  { id: 'traxart-slalom-pro',       query: 'Traxart Slalom Pro patins',        shopify: 'https://www.traxart.com.br', handle: 'patins-inline-slalom-traxart-slalom-pro' },

  // FILA SKATES
  { id: 'fila-houdini',             query: 'Fila Skates Houdini patins inline',shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-houdini' },
  { id: 'fila-legacy-pro',          query: 'Fila Legacy Pro patins inline',    shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-legacy-pro' },
  { id: 'fila-crossfit-84',         query: 'Fila Crossfit 84 patins inline',   shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-crossfit-84' },
  { id: 'fila-skates-houdini-evo-pro-110', query: 'Fila Houdini Evo PRO 110mm patins', shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-houdini-evo-pro-110' },
  { id: 'fila-skates-houdini-evo-pro-125', query: 'Fila Houdini Evo PRO 125mm patins', shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-houdini-evo-pro-125mm' },
  { id: 'fila-skates-madame-houdini',query:'Fila Madame Houdini patins',       shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-madame-houdini' },
  { id: 'fila-skates-nrk-pro',      query: 'Fila NRK PRO patins freeskate',   shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-nrk-pro' },
  { id: 'fila-skates-nrk-sd',       query: 'Fila NRK SD patins inline',       shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-nrk-sd' },
  { id: 'fila-skates-nrk-fun',      query: 'Fila NRK Fun patins inline',      shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-nrk-fun' },
  { id: 'fila-skates-j-one',        query: 'Fila J-One patins inline',        shopify: 'https://www.filaskates.com.br', handle: 'patins-inline-fila-j-one' },

  // K2 — Brasil Inline (Shopify)
  { id: 'k2-kinetic-80',            query: 'K2 Kinetic 80 patins inline',     shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-m', directUrl: 'https://www.brasilinline.com.br/patins-inline-k2-kinetic-80-m' },
  { id: 'k2-kinetic-80-w',          query: 'K2 Kinetic 80 W feminino',        shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-w', directUrl: 'https://www.brasilinline.com.br/patins-inline-k2-kinetic-80-w' },
  { id: 'k2-kinetic-80-pro-m',      query: 'K2 Kinetic 80 Pro masculino',     shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-pro-m' },
  { id: 'k2-kinetic-80-pro-w',      query: 'K2 Kinetic 80 Pro W feminino',    shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-pro-w' },
  { id: 'k2-fit-80-boa',            query: 'K2 FIT 80 BOA patins',           shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-fit-80-boa' },
  { id: 'k2-vo2-s-90-m',            query: 'K2 VO2 S 90 patins inline',      shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-vo2-s-90-m', directUrl: 'https://www.brasilinline.com.br/patins-inline-k2-vo2-s-90-m' },
  { id: 'k2-vo2-s-100',             query: 'K2 VO2 S 100 patins inline',     shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-vo2-s-100' },
  { id: 'k2-vo2-s-100-boa',         query: 'K2 VO2 S 100 BOA patins',        shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-vo2-s-100-boa', directUrl: 'https://www.brasilinline.com.br/patins-inline-k2-vo2-s-100-boa' },
  { id: 'k2-mod-110',               query: 'K2 MOD 110 patins speed',        shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-mod-110', directUrl: 'https://www.brasilinline.com.br/patins-inline-k2-mod-110' },

  // POWERSLIDE — Inline Store / Rolling Sports
  { id: 'powerslide-next-core-100', query: 'Powerslide Next Core 100 patins', shopify: 'https://www.inlinestore.com.br', handle: 'patins-inline-powerslide-next-core-black-100' },
  { id: 'powerslide-r6-marathon',   query: 'Powerslide R6 Marathon speed',    shopify: 'https://www.inlinestore.com.br', handle: 'patins-inline-powerslide-r6-marathon' },
  { id: 'powerslide-phuzion-argon-80',query:'Powerslide Phuzion Argon 80',    shopify: 'https://www.inlinestore.com.br', handle: 'patins-inline-powerslide-phuzion-argon-80' },
  { id: 'powerslide-phuzion-universe',query:'Powerslide Phuzion Universe',    shopify: 'https://rollingsports.com.br',   handle: 'patins-inline-powerslide-phuzion-universe' },
  { id: 'powerslide-next-core-110', query: 'Powerslide Next Core 110 patins', shopify: 'https://www.inlinestore.com.br', handle: 'patins-inline-powerslide-next-core-110' },
  { id: 'powerslide-swell-road-125',query: 'Powerslide Swell Road 125',       shopify: 'https://www.inlinestore.com.br', handle: 'patins-inline-powerslide-swell-road-125mm' },
  { id: 'powerslide-imperial',      query: 'Powerslide Imperial patins',      shopify: 'https://www.inlinestore.com.br', handle: 'patins-inline-powerslide-imperial' },
  { id: 'powerslide-puls-4x110',    query: 'Powerslide Puls 4x110 patins',   shopify: 'https://www.inlinestore.com.br', handle: 'patins-inline-powerslide-puls-4x110' },

  // ROCES — Brasil Inline (Shopify)
  { id: 'roces-kolossal',           query: 'Roces Kolossal quad patins',      shopify: 'https://www.brasilinline.com.br', handle: 'patins-quad-roces-kolossal' },
  { id: 'roces-disco-palace',       query: 'Roces Disco Palace quad patins',  shopify: 'https://www.brasilinline.com.br', handle: 'patins-quad-roces-disco-palace' },
  { id: 'roces-m12-recycle',        query: 'Roces M12 Recycle patins',        shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-recycle-black', directUrl: 'https://www.brasilinline.com.br/patins-in-line-roces-m12-recycle-black' },
  { id: 'roces-m12-lo-team',        query: 'Roces M12 Lo Team patins',        shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-lo-team-juno', directUrl: 'https://www.brasilinline.com.br/patins-in-line-roces-m12-lo-team-juno' },
  { id: 'roces-m12-lo-savosin',     query: 'Roces M12 Lo Savosin patins',     shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-lo-savosin-heat', directUrl: 'https://www.brasilinline.com.br/patins-in-line-roces-m12-lo-savosin-heat-' },
  { id: 'roces-m12-lo-goto-namikaze',query:'Roces M12 Lo Goto Namikaze',      shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-lo-goto-namizake', directUrl: 'https://www.brasilinline.com.br/patins-in-line-roces-m12-lo-goto-namizake' },
  { id: 'roces-rc1-quad',           query: 'Roces RC1 quad patins',           shopify: 'https://www.amazon.com.br', handle: '' },

  // ROLLER DERBY
  { id: 'roller-derby-aerio-q60',   query: 'Roller Derby Aerio Q60 quad patins',   shopify: null, directUrl: 'https://www.rollerderbyskates.com' },
  { id: 'roller-derby-v-tech-80',   query: 'Roller Derby V-Tech 80 inline patins', shopify: null, directUrl: 'https://www.rollerderbyskates.com' },
  { id: 'roller-derby-aerio-q60-m', query: 'Roller Derby Aerio Q60 inline masculino patins', shopify: null, directUrl: 'https://www.amazon.com.br/Roller-Derby-Patins-masculinos-Aerio/dp/B07TLP3D7K' },
  { id: 'roller-derby-stryde-youth',query: 'Roller Derby Stryde Youth patins infantil', shopify: null, directUrl: null },
  { id: 'roller-derby-fashion-quad',query: 'Roller Derby Fashion Quad patins',     shopify: null, directUrl: null },
  { id: 'roller-derby-star-600',    query: 'Roller Derby Star 600 quad patins',    shopify: null, directUrl: null },
  { id: 'roller-derby-star-350-girl',query:'Roller Derby Star 350 Girl patins',    shopify: null, directUrl: null },

  // BEL SPORTS — Bel Store (Shopify?)
  { id: 'bel-sports-inline-starter',query: 'Bel Sports Inline Starter patins',    shopify: 'https://www.belstore.com.br', handle: 'patins-inline-starter' },
  { id: 'bel-sports-quad-classic',  query: 'Bel Sports Quad Classic patins',      shopify: 'https://www.belstore.com.br', handle: 'patins-quad-classic' },
  { id: 'bel-sports-top-premium-ajustavel', query: 'Bel Sports Top Premium Ajustavel patins', shopify: 'https://www.belstore.com.br', handle: 'patins-top-premium-ajustavel' },
  { id: 'bel-sports-flexx-3-0-ajustavel',   query: 'Bel Sports Flexx 3.0 patins ajustavel', shopify: 'https://www.belstore.com.br', handle: 'patins-flexx-3-ajustavel' },
  { id: 'bel-sports-future-pro',    query: 'Bel Sports Future Pro patins',        shopify: 'https://www.belstore.com.br', handle: 'patins-future-pro' },

  // OXER — Centauro
  { id: 'oxer-secret-retro',        query: 'Oxer Secret Retro patins quad',       shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+secret+retro' },
  { id: 'oxer-sweet-suede',         query: 'Oxer Sweet Suede quad patins',        shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+sweet+suede' },
  { id: 'oxer-byte-adulto',         query: 'Oxer Byte patins inline adulto',      shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+byte' },
  { id: 'oxer-freestyle-adulto',    query: 'Oxer Freestyle patins inline adulto', shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+freestyle' },
  { id: 'oxer-darkness-gold',       query: 'Oxer Darkness Gold patins',           shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+darkness+gold' },
  { id: 'oxer-speed-7000-ajustavel',query: 'Oxer Speed 7000 patins ajustavel',   shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+speed+7000' },
  { id: 'oxer-alice-quad',          query: 'Oxer Alice quad patins',              shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+alice' },
  { id: 'oxer-algodao-doce-quad',   query: 'Oxer Algodao Doce quad patins',      shopify: null, directUrl: 'https://www.centauro.com.br/busca?q=oxer+algodao+doce' },
];

// ── Estratégia 1: Shopify JSON API ──────────────────────────────────────────
async function tryShopify(baseUrl, handle) {
  if (!baseUrl || !handle) return null;
  const url = `${baseUrl}/products/${handle}.json`;
  try {
    const { data } = await axios.get(url, { headers: HEADERS, timeout: 8000 });
    const img = data?.product?.images?.[0]?.src;
    if (img) return img.split('?')[0]; // remove query string
    return null;
  } catch {
    return null;
  }
}

// ── Estratégia 2: Scrape direto da página de produto ────────────────────────
async function tryDirectPage(url) {
  if (!url) return null;
  try {
    const { data } = await axios.get(url, { headers: HEADERS, timeout: 10000 });
    const $ = cheerio.load(data);

    // Tenta og:image primeiro (meta tag Open Graph)
    const og = $('meta[property="og:image"]').attr('content');
    if (og && og.startsWith('http') && !og.includes('logo') && !og.includes('icon')) return og;

    // Tenta imagem principal de produto (seletores comuns)
    const selectors = [
      '.product-image img', '.product__image img', '#product-image img',
      '[data-product-image]', '.ProductItem-gallery img',
      '.swiper-slide img', '.product-gallery img',
      'img.featured-image', 'img[alt*="patins"]',
    ];
    for (const sel of selectors) {
      const src = $(sel).first().attr('src') || $(sel).first().attr('data-src');
      if (src && src.length > 10) {
        return src.startsWith('http') ? src : `https:${src}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// ── Estratégia 3: DuckDuckGo HTML search ────────────────────────────────────
async function tryDuckDuckGo(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' site patins imagem produto')}`;
  try {
    const { data } = await axios.get(url, { headers: { ...HEADERS, Referer: 'https://duckduckgo.com' }, timeout: 10000 });
    const $ = cheerio.load(data);
    // Extrai URLs de resultado para tentar scrape na primeira loja
    const links = [];
    $('a.result__url, .result__a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && (href.includes('brasilinline') || href.includes('traxart') || href.includes('inlinestore') || href.includes('hdinline') || href.includes('filaskates') || href.includes('centauro') || href.includes('belstore'))) {
        links.push(href);
      }
    });
    for (const link of links.slice(0, 2)) {
      const img = await tryDirectPage(link);
      if (img) return img;
    }
    return null;
  } catch {
    return null;
  }
}

// ── Download de imagem ───────────────────────────────────────────────────────
async function downloadImage(imgUrl, destPath) {
  const response = await axios.get(imgUrl, {
    headers: HEADERS,
    responseType: 'stream',
    timeout: 15000,
    maxRedirects: 5,
  });
  const contentType = response.headers['content-type'] || '';
  if (!contentType.includes('image')) throw new Error(`Não é imagem: ${contentType}`);
  await pipeline(response.data, createWriteStream(destPath));
}

// ── Atualiza data.js ─────────────────────────────────────────────────────────
function updateDataJs(id, imagePath) {
  let content = fs.readFileSync(DATA_FILE, 'utf8');
  // Regex: encontra o bloco do modelo e substitui a linha imagem
  const regex = new RegExp(
    `(id:\\s*"${id}"[\\s\\S]*?imagem:\\s*)"[^"]*"`,
    'g'
  );
  const updated = content.replace(regex, `$1"${imagePath}"`);
  if (updated === content) {
    console.warn(`  ⚠️  Regex não achou o id ${id} no data.js`);
    return false;
  }
  fs.writeFileSync(DATA_FILE, updated, 'utf8');
  return true;
}

// ── Main ─────────────────────────────────────────────────────────────────────
const results = { ok: [], failed: [] };

for (const model of models) {
  const { id, query, shopify, handle, directUrl } = model;
  const ext = '.jpg';
  const filename = `${id}${ext}`;
  const destPath = path.join(IMAGES_DIR, filename);
  const imagePath = `/images/${filename}`;

  // Pula se já existe imagem real (não placeholder)
  if (fs.existsSync(destPath)) {
    console.log(`⏭️  ${id} — já existe, pulando`);
    updateDataJs(id, imagePath);
    results.ok.push(id);
    continue;
  }

  console.log(`🔍 ${id}`);
  let imgUrl = null;

  // 1. Shopify API
  if (!imgUrl && shopify && handle) {
    imgUrl = await tryShopify(shopify, handle);
    if (imgUrl) console.log(`   ✓ Shopify: ${imgUrl.slice(0, 80)}`);
  }

  // 2. Página direta
  if (!imgUrl && directUrl) {
    imgUrl = await tryDirectPage(directUrl);
    if (imgUrl) console.log(`   ✓ DirectPage: ${imgUrl.slice(0, 80)}`);
  }

  // 3. DuckDuckGo
  if (!imgUrl) {
    imgUrl = await tryDuckDuckGo(query);
    if (imgUrl) console.log(`   ✓ DDG: ${imgUrl.slice(0, 80)}`);
  }

  if (!imgUrl) {
    console.log(`   ✗ Sem imagem encontrada`);
    results.failed.push(id);
    await sleep(500);
    continue;
  }

  // Download
  try {
    await downloadImage(imgUrl, destPath);
    const stat = fs.statSync(destPath);
    if (stat.size < 2000) {
      fs.unlinkSync(destPath);
      throw new Error(`Arquivo muito pequeno (${stat.size} bytes) — provavelmente bloqueado`);
    }
    updateDataJs(id, imagePath);
    results.ok.push(id);
    console.log(`   ↓ Salvo: ${filename} (${Math.round(stat.size/1024)}KB)`);
  } catch (err) {
    console.log(`   ✗ Download falhou: ${err.message}`);
    results.failed.push(id);
    if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
  }

  await sleep(400); // respeita rate limit
}

// ── Relatório final ───────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════');
console.log(`✅ Sucesso (${results.ok.length}): ${results.ok.join(', ')}`);
console.log(`❌ Falhos  (${results.failed.length}): ${results.failed.join(', ')}`);
console.log('══════════════════════════════════════════');
fs.writeFileSync(
  path.resolve(__dirname, 'image-results.json'),
  JSON.stringify(results, null, 2)
);
