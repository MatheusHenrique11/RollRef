'use strict';
const axios   = require('axios');
const cheerio = require('cheerio');
const fs      = require('fs');
const path    = require('path');
const { pipeline } = require('stream/promises');
const { createWriteStream } = require('fs');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const DATA_FILE  = path.resolve(__dirname, '../lib/data.js');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Modelos com estratégias atualizadas ──────────────────────────────────────
const models = [
  // HD INLINE — domínio correto: hdinline.com (Shopify)
  { id: 'hd-inline-bold',            shopify: 'https://hdinline.com', handle: 'patins-hd-inline-bold-696170a36ffae-69829029a7fb6',    query: 'HD Inline BOLD patins' },
  { id: 'hd-inline-rt-urban',        shopify: 'https://hdinline.com', handle: 'patins-hd-inline-rt-urban',                             query: 'HD Inline RT URBAN patins' },
  { id: 'hd-inline-bw7',             shopify: 'https://hdinline.com', handle: 'patins-hd-inline-bw7',                                  query: 'HD Inline BW7 patins' },
  { id: 'hd-inline-skull-2-5',       shopify: 'https://hdinline.com', handle: 'patins-hd-inline-skull-25-695fc5049966e',               query: 'HD Inline SKULL 2.5 patins' },
  { id: 'hd-inline-sky',             shopify: 'https://hdinline.com', handle: 'patins-hd-inline-sky-695fc380b2022',                    query: 'HD Inline SKY patins' },
  { id: 'hd-inline-tracker',         shopify: 'https://hdinline.com', handle: 'patins-hd-inline-tracker',                              query: 'HD Inline TRACKER patins' },
  { id: 'hd-inline-evolution-ii-80', shopify: 'https://hdinline.com', handle: 'patins-hd-inline-evolution-ii-4x80mm',                  query: 'HD Inline EVOLUTION II 80mm' },
  { id: 'hd-inline-evolution-ii-110',shopify: 'https://hdinline.com', handle: 'patins-hd-inline-evolution-ii-3x110mm',                 query: 'HD Inline EVOLUTION II 110mm' },
  { id: 'hd-inline-carbon-cruiser',  shopify: 'https://hdinline.com', handle: 'patins-hd-inline-carbon-cruiser',                       query: 'HD Inline CARBON CRUISER patins' },
  { id: 'hd-inline-panther',         shopify: 'https://hdinline.com', handle: 'patins-hd-inline-panther',                              query: 'HD Inline PANTHER patins' },
  { id: 'hd-inline-cherry-quad',     shopify: 'https://hdinline.com', handle: 'patins-hd-inline-quad-cherry-base-aluminio-695fdd9c8e956', query: 'HD Inline Cherry Quad patins' },
  { id: 'hd-inline-zippy',           shopify: 'https://hdinline.com', handle: 'patins-hd-inline-zippy-ajustavel',                      query: 'HD Inline ZIPPY ajustavel infantil' },
  { id: 'hd-inline-black',           shopify: 'https://hdinline.com', handle: 'patins-hd-inline-black',                                query: 'HD Inline Black patins' },
  { id: 'hd-inline-speed-110',       shopify: 'https://hdinline.com', handle: 'patins-hd-inline-speed-110',                            query: 'HD Inline Speed 110 patins' },
  { id: 'hd-inline-urban-90',        shopify: 'https://hdinline.com', handle: 'patins-hd-inline-urban-90',                             query: 'HD Inline Urban 90 patins' },

  // TRAXART — Shopify (já funcionou)
  { id: 'traxart-revolt',            shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-revolt',         query: 'Traxart Revolt patins' },
  { id: 'traxart-revolt-turbo',      shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-revolt-turbo',   query: 'Traxart Revolt Turbo patins' },
  { id: 'traxart-fitness-80',        shopify: 'https://www.traxart.com.br', handle: 'patins-inline-fitness-traxart-fitness-80',       query: 'Traxart Fitness 80 patins' },
  { id: 'traxart-volt-plus',         shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-volt',           query: 'Traxart Volt+ patins' },
  { id: 'traxart-hype',              shopify: 'https://www.traxart.com.br', handle: 'patins-quad-traxart-hype',                       query: 'Traxart Hype quad patins' },
  { id: 'traxart-dynamix',           shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-dynamix',        query: 'Traxart Dynamix patins' },
  { id: 'traxart-mesh',              shopify: 'https://www.traxart.com.br', handle: 'patins-inline-fitness-traxart-mesh',             query: 'Traxart Mesh patins' },
  { id: 'traxart-jet',               shopify: 'https://www.traxart.com.br', handle: 'patins-inline-fitness-traxart-jet',              query: 'Traxart Jet patins' },
  { id: 'traxart-electro-v2',        shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-electro-v2',     query: 'Traxart Electro V2 patins' },
  { id: 'traxart-new-revolt-r3',     shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-new-revolt-r3',  query: 'Traxart New Revolt R3 patins' },
  { id: 'traxart-street-aggressive', shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-street-aggressive', query: 'Traxart Street Aggressive patins' },
  { id: 'traxart-atomix',            shopify: 'https://www.traxart.com.br', handle: 'patins-inline-freestyle-traxart-atomix',         query: 'Traxart Atomix patins' },
  { id: 'traxart-slalom-pro',        shopify: 'https://www.traxart.com.br', handle: 'patins-inline-slalom-traxart-slalom-pro',        query: 'Traxart Slalom Pro patins' },

  // FILA SKATES — scrape direto das páginas (og:image)
  { id: 'fila-houdini',              shopify: null, directUrl: 'https://www.filaskates.com.br/houdini',        query: 'Fila Skates Houdini patins urban' },
  { id: 'fila-legacy-pro',           shopify: null, directUrl: 'https://www.filaskates.com.br/legacy-pro',     query: 'Fila Legacy Pro patins fitness' },
  { id: 'fila-crossfit-84',          shopify: null, directUrl: 'https://www.filaskates.com.br/crossfit-84',    query: 'Fila Crossfit 84 patins inline' },
  { id: 'fila-skates-houdini-evo-pro-110', shopify: null, directUrl: 'https://www.filaskates.com.br/houdini-evo-pro', query: 'Fila Houdini Evo PRO 110mm patins' },
  { id: 'fila-skates-houdini-evo-pro-125', shopify: null, directUrl: 'https://www.filaskates.com.br/houdini-evo-pro-125', query: 'Fila Houdini Evo PRO 125mm patins speed' },
  { id: 'fila-skates-madame-houdini', shopify: null, directUrl: 'https://www.filaskates.com.br/madame-houdini',query: 'Fila Madame Houdini patins feminino' },
  { id: 'fila-skates-nrk-pro',        shopify: null, directUrl: 'https://www.filaskates.com.br/copia-nrk-pro-black', query: 'Fila NRK PRO patins freeskate' },
  { id: 'fila-skates-nrk-sd',         shopify: null, directUrl: 'https://www.filaskates.com.br/nrk-sd',       query: 'Fila NRK SD patins carbono' },
  { id: 'fila-skates-nrk-fun',        shopify: null, directUrl: 'https://www.filaskates.com.br/nrk-fun',      query: 'Fila NRK Fun patins street' },
  { id: 'fila-skates-j-one',          shopify: null, directUrl: 'https://www.filaskates.com.br/j-one',        query: 'Fila J-One patins iniciante' },

  // K2 — Brasil Inline (Shopify)
  { id: 'k2-kinetic-80',             shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-m',        query: 'K2 Kinetic 80 patins inline' },
  { id: 'k2-kinetic-80-w',           shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-w',        query: 'K2 Kinetic 80 W feminino' },
  { id: 'k2-kinetic-80-pro-m',       shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-pro-m',    query: 'K2 Kinetic 80 Pro masculino' },
  { id: 'k2-kinetic-80-pro-w',       shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-kinetic-80-pro-w-2023-08-13-21-24-30', query: 'K2 Kinetic 80 Pro W feminino' },
  { id: 'k2-fit-80-boa',             shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-fit-80-boa-laranja',  query: 'K2 FIT 80 BOA patins' },
  { id: 'k2-vo2-s-90-m',             shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-vo2-s-90-m',          query: 'K2 VO2 S 90 M patins' },
  { id: 'k2-vo2-s-100',              shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-vo2-s-100',            query: 'K2 VO2 S 100 patins' },
  { id: 'k2-vo2-s-100-boa',          shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-vo2-s-100-boa',        query: 'K2 VO2 S 100 BOA patins' },
  { id: 'k2-mod-110',                shopify: 'https://www.brasilinline.com.br', handle: 'patins-inline-k2-mod-110',              query: 'K2 MOD 110 patins speed' },

  // POWERSLIDE — Rolling Sports (Shopify) + Inline Store
  { id: 'powerslide-next-core-100',  shopify: 'https://rollingsports.com.br', handle: 'patins-powerslide-next-100-pastel-34-ao-39',           query: 'Powerslide Next Core 100 patins' },
  { id: 'powerslide-r6-marathon',    shopify: 'https://rollingsports.com.br', handle: 'patins-powerslide-r6-marathon',                         query: 'Powerslide R6 Marathon speed' },
  { id: 'powerslide-phuzion-argon-80',shopify:'https://rollingsports.com.br', handle: 'patins-powerslide-phuzion-argon-80',                    query: 'Powerslide Phuzion Argon 80 patins' },
  { id: 'powerslide-phuzion-universe',shopify:'https://rollingsports.com.br', handle: 'patins-powerslide-phuzion-universe',                    query: 'Powerslide Phuzion Universe infantil' },
  { id: 'powerslide-next-core-110',  shopify: 'https://rollingsports.com.br', handle: 'patins-powerslide-next-110-core-black-36-ao-43',        query: 'Powerslide Next Core 110 Trinity patins' },
  { id: 'powerslide-swell-road-125', shopify: 'https://rollingsports.com.br', handle: 'patins-powerslide-swell-black-fire-110-2024',           query: 'Powerslide Swell Road 125mm speed' },
  { id: 'powerslide-imperial',       shopify: 'https://rollingsports.com.br', handle: 'cano-patins-powerslide-imperial-turquesa-33-ao-44',     query: 'Powerslide Imperial patins freeskate' },
  { id: 'powerslide-puls-4x110',     shopify: 'https://rollingsports.com.br', handle: 'patins-powerslide-puls-4x110',                          query: 'Powerslide Puls 4x110 patins speed' },

  // ROCES — Brasil Inline (Shopify) — handles exatos do search
  { id: 'roces-kolossal',            shopify: 'https://www.brasilinline.com.br', handle: 'patins-quad-roces-kolossal',                           query: 'Roces Kolossal quad patins' },
  { id: 'roces-disco-palace',        shopify: 'https://www.brasilinline.com.br', handle: 'patins-quad-roces-disco-palace',                       query: 'Roces Disco Palace quad retrô' },
  { id: 'roces-m12-recycle',         shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-recycle-black',               query: 'Roces M12 Recycle agressivo' },
  { id: 'roces-m12-lo-team',         shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-lo-team-juno',                query: 'Roces M12 Lo Team street' },
  { id: 'roces-m12-lo-savosin',      shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-lo-savosin-heat-',            query: 'Roces M12 Lo Savosin agressivo' },
  { id: 'roces-m12-lo-goto-namikaze',shopify: 'https://www.brasilinline.com.br', handle: 'patins-in-line-roces-m12-lo-goto-namizake',            query: 'Roces M12 Lo Goto Namikaze' },
  { id: 'roces-rc1-quad',            shopify: null, directUrl: 'https://www.amazon.com.br/Roces-patinadores-fundamental-intermediario-confortaveis/dp/B0D1WC5W9N', query: 'Roces RC1 quad patins' },

  // ROLLER DERBY — sem Shopify, usa DDG
  { id: 'roller-derby-aerio-q60',    shopify: null, directUrl: null, query: 'Roller Derby Aerio Q60 quad patins retro' },
  { id: 'roller-derby-v-tech-80',    shopify: null, directUrl: null, query: 'Roller Derby V-Tech 80 inline patins fitness' },
  { id: 'roller-derby-aerio-q60-m',  shopify: null, directUrl: 'https://www.amazon.com.br/Roller-Derby-Patins-masculinos-Aerio/dp/B07TLP3D7K', query: 'Roller Derby Aerio 60 M inline masculino' },
  { id: 'roller-derby-stryde-youth', shopify: null, directUrl: null, query: 'Roller Derby Stryde Youth patins infantil ajustavel' },
  { id: 'roller-derby-fashion-quad', shopify: null, directUrl: null, query: 'Roller Derby Fashion Quad patins retro' },
  { id: 'roller-derby-star-600',     shopify: null, directUrl: null, query: 'Roller Derby Star 600 quad feminino patins' },
  { id: 'roller-derby-star-350-girl',shopify: null, directUrl: null, query: 'Roller Derby Star 350 Girl patins infantil quad' },

  // BEL SPORTS — Bel Store (testa Shopify + DDG)
  { id: 'bel-sports-inline-starter', shopify: 'https://www.belstore.com.br', handle: 'patins-inline-starter',         query: 'Bel Sports Inline Starter patins' },
  { id: 'bel-sports-quad-classic',   shopify: 'https://www.belstore.com.br', handle: 'patins-quad-classic',           query: 'Bel Sports Quad Classic patins infantil' },
  { id: 'bel-sports-top-premium-ajustavel', shopify: 'https://www.belstore.com.br', handle: 'patins-top-premium-ajustavel', query: 'Bel Sports Top Premium Ajustavel patins' },
  { id: 'bel-sports-flexx-3-0-ajustavel',   shopify: 'https://www.belstore.com.br', handle: 'patins-flexx-3-0-ajustavel',   query: 'Bel Sports Flexx 3.0 Ajustavel patins' },
  { id: 'bel-sports-future-pro',     shopify: 'https://www.belstore.com.br', handle: 'patins-future-pro',             query: 'Bel Sports Future Pro patins fitness' },

  // OXER — sem loja Shopify conhecida, DDG
  { id: 'oxer-secret-retro',         shopify: null, directUrl: null, query: 'Oxer Secret Retro patins quad retro centauro' },
  { id: 'oxer-sweet-suede',          shopify: null, directUrl: null, query: 'Oxer Sweet Suede quad patins centauro' },
  { id: 'oxer-byte-adulto',          shopify: null, directUrl: null, query: 'Oxer Byte patins inline adulto fitness' },
  { id: 'oxer-freestyle-adulto',     shopify: null, directUrl: null, query: 'Oxer Freestyle patins inline adulto centauro' },
  { id: 'oxer-darkness-gold',        shopify: null, directUrl: null, query: 'Oxer Darkness Gold patins freestyle' },
  { id: 'oxer-speed-7000-ajustavel', shopify: null, directUrl: null, query: 'Oxer Speed 7000 ajustavel patins centauro' },
  { id: 'oxer-alice-quad',           shopify: null, directUrl: null, query: 'Oxer Alice quad patins retrô adulto centauro' },
  { id: 'oxer-algodao-doce-quad',    shopify: null, directUrl: null, query: 'Oxer Algodao Doce quad patins colorido centauro' },
];

// ── Estratégia 1: Shopify product JSON (handle exato) ────────────────────────
async function tryShopifyHandle(baseUrl, handle) {
  if (!baseUrl || !handle) return null;
  try {
    const { data } = await axios.get(`${baseUrl}/products/${handle}.json`, { headers: HEADERS, timeout: 8000 });
    const img = data?.product?.images?.[0]?.src;
    return img ? img.replace(/\?.*$/, '') : null;
  } catch { return null; }
}

// ── Estratégia 2: Shopify Storefront suggest (busca pelo slug do id) ──────────
async function tryShopifySearch(baseUrl, searchTerm) {
  if (!baseUrl) return null;
  try {
    const { data } = await axios.get(
      `${baseUrl}/search/suggest.json?q=${encodeURIComponent(searchTerm)}&resources[type]=product`,
      { headers: HEADERS, timeout: 8000 }
    );
    const product = data?.resources?.results?.products?.[0];
    return product?.image ? product.image.replace(/\?.*$/, '') : null;
  } catch { return null; }
}

// ── Estratégia 3: Scrape og:image da página de produto ───────────────────────
async function tryDirectPage(url) {
  if (!url) return null;
  try {
    const { data } = await axios.get(url, { headers: HEADERS, timeout: 12000 });
    const $ = cheerio.load(data);
    const og = $('meta[property="og:image"]').attr('content');
    if (og && og.startsWith('http') && !og.match(/logo|icon|banner|placeholder/i)) return og;
    for (const sel of [
      '.product-single__photo img', '.product__image img', '#product-featured-image',
      '[data-product-image]', '.ProductItem__Image img', '.swiper-slide img',
      'img.product-photo', 'img[itemprop="image"]',
    ]) {
      const src = $(sel).first().attr('src') || $(sel).first().attr('data-src');
      if (src && src.length > 20) return src.startsWith('//') ? `https:${src}` : src;
    }
    return null;
  } catch { return null; }
}

// ── Estratégia 4: DuckDuckGo → scrape primeiro resultado relevante ───────────
const GOOD_DOMAINS = ['brasilinline','traxart','inlinestore','hdinline','filaskates',
                      'belstore','savanaskateshop','rollingsports','centauro','46inline',
                      'skateon','konceptinline','unipatins'];

async function tryDDG(query) {
  try {
    const { data } = await axios.get(
      `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
      { headers: { ...HEADERS, Referer: 'https://duckduckgo.com/' }, timeout: 12000 }
    );
    const $ = cheerio.load(data);
    const links = [];
    $('a.result__url, .result__a, .result__title a').each((_, el) => {
      let href = $(el).attr('href') || '';
      if (href.startsWith('/l/?')) {
        try { href = new URL('https://duckduckgo.com' + href).searchParams.get('uddg') || href; } catch {}
      }
      if (GOOD_DOMAINS.some(d => href.includes(d))) links.push(href);
    });
    for (const link of [...new Set(links)].slice(0, 3)) {
      // Tenta Shopify JSON se URL parece de produto
      if (link.includes('/products/') || link.match(/\.[a-z]+\/[a-z0-9-]+$/)) {
        const base = new URL(link).origin;
        const handle = link.split('/').pop();
        const img = await tryShopifyHandle(base, handle);
        if (img) { console.log(`   ✓ DDG→Shopify: ${link.slice(0,60)}`); return img; }
      }
      const img = await tryDirectPage(link);
      if (img) { console.log(`   ✓ DDG→page: ${link.slice(0,60)}`); return img; }
      await sleep(400);
    }
    return null;
  } catch { return null; }
}

// ── Download ──────────────────────────────────────────────────────────────────
async function downloadImage(imgUrl, destPath) {
  const url = imgUrl.startsWith('//') ? `https:${imgUrl}` : imgUrl;
  const response = await axios.get(url, {
    headers: { ...HEADERS, Referer: new URL(url).origin },
    responseType: 'stream', timeout: 20000, maxRedirects: 5,
  });
  const ct = response.headers['content-type'] || '';
  if (!ct.includes('image')) throw new Error(`Content-type inválido: ${ct}`);
  await pipeline(response.data, createWriteStream(destPath));
}

// ── Atualiza data.js ──────────────────────────────────────────────────────────
function updateDataJs(id, imagePath) {
  let content = fs.readFileSync(DATA_FILE, 'utf8');
  const escaped = id.replace(/[-]/g, '\\-');
  const regex = new RegExp(`(id:\\s*"${escaped}"[\\s\\S]*?imagem:\\s*)"[^"]*"`, 'g');
  const updated = content.replace(regex, `$1"${imagePath}"`);
  if (updated === content) { console.warn(`  ⚠️  "${id}" não atualizado no data.js`); return false; }
  fs.writeFileSync(DATA_FILE, updated, 'utf8');
  return true;
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  const results = { ok: [], failed: [] };

  for (const model of models) {
    const { id, shopify, handle, directUrl, query } = model;
    const filename = `${id}.jpg`;
    const destPath = path.join(IMAGES_DIR, filename);
    const imagePath = `/images/${filename}`;

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
      console.log(`⏭️  ${id}`);
      updateDataJs(id, imagePath);
      results.ok.push(id);
      continue;
    }

    process.stdout.write(`🔍 ${id} ... `);
    let imgUrl = null;

    // 1. Shopify handle direto
    if (!imgUrl && shopify && handle) {
      imgUrl = await tryShopifyHandle(shopify, handle);
      if (imgUrl) process.stdout.write(`[handle] `);
    }

    // 2. Shopify search
    if (!imgUrl && shopify) {
      const term = id.replace(/-/g, ' ');
      imgUrl = await tryShopifySearch(shopify, term);
      if (imgUrl) process.stdout.write(`[search] `);
    }

    // 3. Página direta
    if (!imgUrl && directUrl) {
      imgUrl = await tryDirectPage(directUrl);
      if (imgUrl) process.stdout.write(`[direct] `);
    }

    // 4. DuckDuckGo
    if (!imgUrl) {
      imgUrl = await tryDDG(query);
      if (!imgUrl) { console.log(`✗`); results.failed.push(id); await sleep(600); continue; }
    }

    try {
      await downloadImage(imgUrl, destPath);
      const size = fs.statSync(destPath).size;
      if (size < 3000) { fs.unlinkSync(destPath); throw new Error(`${size}B — suspeito`); }
      updateDataJs(id, imagePath);
      results.ok.push(id);
      console.log(`✓ ${Math.round(size/1024)}KB`);
    } catch (err) {
      console.log(`✗ download: ${err.message}`);
      results.failed.push(id);
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
    }

    await sleep(500);
  }

  console.log('\n══════════════════════════════════════════════');
  console.log(`✅ OK     (${results.ok.length}): ${results.ok.join(', ')}`);
  console.log(`❌ Falhos (${results.failed.length}):\n  ${results.failed.join('\n  ')}`);
  console.log('══════════════════════════════════════════════');
  fs.writeFileSync(path.resolve(__dirname, 'image-results.json'), JSON.stringify(results, null, 2));
})();
