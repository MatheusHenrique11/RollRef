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
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── 32 modelos restantes ─────────────────────────────────────────────────────
const models = [
  // HD INLINE — buscar handles corretos via search
  { id: 'hd-inline-speed-110',
    shopify: 'https://hdinline.com',
    handle: null,
    query: '"HD Inline" "Speed 110" OR "3x110" patins site:hdinline.com OR "hdinline"' },
  { id: 'hd-inline-urban-90',
    shopify: 'https://hdinline.com',
    handle: null,
    query: '"HD Inline" "Urban 90" OR "urban" fitness 90mm patins site:hdinline.com' },

  // TRAXART — handle confirmado mas falhou; tentar direto e search
  { id: 'traxart-volt-plus',
    shopify: 'https://www.traxart.com.br',
    handle: 'patins-inline-freestyle-traxart-volt-2-0-preto-80mm-abec-9',
    directUrl: 'https://www.traxart.com.br/products/patins-inline-freestyle-traxart-volt-2-0-preto-80mm-abec-9',
    query: 'Traxart Volt patins inline freestyle traxart.com.br' },
  { id: 'traxart-slalom-pro',
    shopify: 'https://www.traxart.com.br',
    handle: null,
    query: 'Traxart Slalom Pro patins inline slalom site:traxart.com.br OR "traxart slalom"' },

  // FILA SKATES — usar savanaskateshop.com.br (Shopify, funciona)
  { id: 'fila-houdini',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-houdini',
    directUrl: 'https://www.filaskates.com.br/houdini',
    query: 'Fila Houdini patins urban inline savanaskateshop' },
  { id: 'fila-legacy-pro',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-skates-inline-legacy-comp-80-pretocinza',
    directUrl: 'https://www.filaskates.com.br/legacy-pro',
    query: 'Fila Legacy Pro patins fitness inline savanaskateshop' },
  { id: 'fila-crossfit-84',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-crossfit-84',
    directUrl: 'https://www.filaskates.com.br/crossfit-84',
    query: 'Fila Crossfit 84 patins inline savanaskateshop' },
  { id: 'fila-skates-madame-houdini',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-madame-houdini-black',
    directUrl: 'https://www.filaskates.com.br/madame-houdini',
    query: 'Fila Madame Houdini patins feminino savanaskateshop' },
  { id: 'fila-skates-nrk-pro',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-nrk-pro',
    directUrl: 'https://www.filaskates.com.br/nrk-pro-black',
    query: 'Fila NRK PRO patins freeskate carbono savanaskateshop' },
  { id: 'fila-skates-nrk-sd',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-nrk-sd',
    directUrl: 'https://www.filaskates.com.br/nrk-sd',
    query: 'Fila NRK SD patins carbono freeskate savanaskateshop' },
  { id: 'fila-skates-nrk-fun',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-nrk-fun',
    directUrl: 'https://www.filaskates.com.br/nrk-fun',
    query: 'Fila NRK Fun patins street freeskate savanaskateshop' },
  { id: 'fila-skates-j-one',
    shopify: 'https://www.savanaskateshop.com.br',
    handle: 'patins-fila-j-one',
    directUrl: 'https://www.filaskates.com.br/j-one-boy',
    query: 'Fila J-One patins iniciante infantil savanaskateshop' },

  // K2 — k2skates.com não é Shopify; tentar inlinestore.com.br ou busca direta
  { id: 'k2-kinetic-80-w',
    shopify: 'https://www.inlinestore.com.br',
    handle: 'patins-inline-k2-kinetic-80-w',
    directUrl: 'https://k2skates.com/en-us/p/kinetic-80-womens-inline-skates-2025',
    query: 'K2 Kinetic 80 feminino patins inline mulher' },
  { id: 'k2-kinetic-80-pro-m',
    shopify: 'https://www.inlinestore.com.br',
    handle: 'patins-inline-k2-kinetic-80-pro-m',
    directUrl: 'https://k2skates.com/en-us/p/kinetic-80-pro-mens-inline-skates-2025',
    query: 'K2 Kinetic 80 Pro masculino patins inline' },
  { id: 'k2-fit-80-boa',
    shopify: 'https://www.inlinestore.com.br',
    handle: 'patins-inline-k2-fit-80-boa',
    directUrl: 'https://k2skates.com/en-us/p/f-i-t-80-boa-mens-inline-skates-2025',
    query: 'K2 FIT 80 BOA patins inline fitness' },
  { id: 'k2-vo2-s-90-m',
    shopify: 'https://www.inlinestore.com.br',
    handle: 'patins-inline-k2-vo2-s-90-m',
    directUrl: 'https://k2skates.com/en-us/p/vo2-s-90-boa-unisex-inline-skates-2025',
    query: 'K2 VO2 S 90 patins speed inline' },
  { id: 'k2-vo2-s-100',
    shopify: 'https://www.inlinestore.com.br',
    handle: 'patins-inline-k2-vo2-s-100',
    directUrl: 'https://k2skates.com/en-us/p/vo2-s-100-boa-inline-skates-2025',
    query: 'K2 VO2 S 100 patins speed inline' },
  { id: 'k2-vo2-s-100-boa',
    shopify: 'https://www.inlinestore.com.br',
    handle: 'patins-inline-k2-vo2-s-100-boa',
    directUrl: 'https://k2skates.com/en-us/p/vo2-s-100-boa-inline-skates-2025',
    query: 'K2 VO2 S 100 BOA patins speed inline' },

  // ROLLER DERBY — encontrar handles corretos via search
  { id: 'roller-derby-v-tech-80',
    shopify: 'https://rollerderby.com',
    handle: 'v-tech-80-inline-skate',
    directUrl: 'https://rollerderby.com/collections/mens-inline-skates',
    query: 'Roller Derby V-Tech 80 inline skates rollerderby.com' },
  { id: 'roller-derby-fashion-quad',
    shopify: 'https://rollerderby.com',
    handle: 'candi-grl-carlin-q-womens-roller-skate',
    directUrl: null,
    query: 'Roller Derby fashion quad retro roller skates women rollerderby.com' },
  { id: 'roller-derby-star-350-girl',
    shopify: null,
    directUrl: 'https://rollerderby.com/collections/girls-roller-skates',
    query: 'Roller Derby Star 350 Girl quad roller skates kids' },

  // BEL SPORTS — VTEX API para belstore.com.br
  { id: 'bel-sports-inline-starter',
    vtex: 'https://www.belstore.com.br',
    vtexSearch: 'inline starter',
    directUrl: 'https://www.belstore.com.br/patins-inline-starter-bel/p',
    query: 'Bel Sports Inline Starter patins roller patins iniciante bel' },
  { id: 'bel-sports-quad-classic',
    vtex: 'https://www.belstore.com.br',
    vtexSearch: 'quad classic',
    directUrl: 'https://www.belstore.com.br/patins-quad-classic-bel/p',
    query: 'Bel Sports Quad Classic patins quad infantil bel sports' },
  { id: 'bel-sports-top-premium-ajustavel',
    vtex: 'https://www.belstore.com.br',
    vtexSearch: 'top premium ajustavel',
    directUrl: 'https://www.belstore.com.br/patins-inline-top-premium-ajustavel-bel/p',
    query: 'Bel Sports Top Premium Ajustavel patins inline bel sports' },

  // OXER — VTEX API para centauro.com.br (com productId do URL)
  { id: 'oxer-secret-retro',
    vtex: 'https://www.centauro.com.br', vtexProductId: '860316',
    directUrl: 'https://www.centauro.com.br/patins-oxer-secret-q4-qs28-860316.html',
    query: 'Oxer Secret Retro quad patins centauro.com.br' },
  { id: 'oxer-sweet-suede',
    vtex: 'https://www.centauro.com.br', vtexProductId: '888714',
    directUrl: 'https://www.centauro.com.br/patins-4-rodas-retro-oxer-sweet-suede-888714.html',
    query: 'Oxer Sweet Suede quad patins retro centauro' },
  { id: 'oxer-byte-adulto',
    vtex: 'https://www.centauro.com.br', vtexProductId: '879782',
    directUrl: 'https://www.centauro.com.br/patins-oxer-byte-in-line-fitness-abec-7-adulto-879782.html',
    query: 'Oxer Byte inline patins fitness adulto centauro' },
  { id: 'oxer-freestyle-adulto',
    vtex: 'https://www.centauro.com.br', vtexProductId: null,
    vtexSearch: 'oxer freestyle',
    directUrl: null,
    query: 'Oxer Freestyle patins inline adulto centauro netshoes' },
  { id: 'oxer-darkness-gold',
    vtex: 'https://www.centauro.com.br', vtexProductId: '888477',
    directUrl: 'https://www.centauro.com.br/patins-oxer-darkness-gold-in-line-freestyle-abec-base-de-aluminio-adulto-888477.html',
    query: 'Oxer Darkness Gold patins inline freestyle centauro' },
  { id: 'oxer-speed-7000-ajustavel',
    vtex: 'https://www.centauro.com.br', vtexProductId: '839631',
    directUrl: 'https://www.centauro.com.br/patins-oxer-speed-7000-in-line-fitness-abec-7-adulto-839631.html',
    query: 'Oxer Speed 7000 Ajustavel patins inline centauro' },
  { id: 'oxer-alice-quad',
    vtex: 'https://www.centauro.com.br', vtexProductId: '936728',
    directUrl: 'https://www.centauro.com.br/patins-4-rodas-retro-oxer-alice-adulto-936728.html',
    query: 'Oxer Alice quad patins retro adulto centauro' },
  { id: 'oxer-algodao-doce-quad',
    vtex: 'https://www.centauro.com.br', vtexProductId: '936726',
    directUrl: 'https://www.centauro.com.br/patins-4-rodas-retro-oxer-algodao-doce-quad-adulto-936726.html',
    query: 'Oxer Algodao Doce quad colorido patins centauro' },
];

// ── VTEX Catalog API ──────────────────────────────────────────────────────────
async function tryVTEX(baseUrl, productId, searchTerm) {
  try {
    let url;
    if (productId) {
      url = `${baseUrl}/api/catalog_system/pub/products/search?fq=productId:${productId}&_from=0&_to=0`;
    } else if (searchTerm) {
      url = `${baseUrl}/api/catalog_system/pub/products/search?ft=${encodeURIComponent(searchTerm)}&_from=0&_to=0`;
    } else return null;

    const { data } = await axios.get(url, {
      headers: { ...HEADERS, Accept: 'application/json' },
      timeout: 12000,
    });
    if (!Array.isArray(data) || !data[0]) return null;
    const product = data[0];
    // Tenta pegar imagem do primeiro item (SKU)
    const items = product.items || [];
    for (const item of items) {
      const images = item.images || [];
      if (images[0]?.imageUrl) return images[0].imageUrl;
    }
    // Fallback: link da imagem no nível do produto
    const imgs = product.images || product.Images || [];
    if (imgs[0]?.imageUrl) return imgs[0].imageUrl;
    return null;
  } catch { return null; }
}

// ── Shopify handle direto ─────────────────────────────────────────────────────
async function tryShopifyHandle(baseUrl, handle) {
  if (!baseUrl || !handle) return null;
  try {
    const { data } = await axios.get(`${baseUrl}/products/${handle}.json`, { headers: HEADERS, timeout: 10000 });
    const img = data?.product?.images?.[0]?.src;
    return img ? img.replace(/\?.*$/, '') : null;
  } catch { return null; }
}

// ── Shopify search ────────────────────────────────────────────────────────────
async function tryShopifySearch(baseUrl, searchTerm) {
  if (!baseUrl) return null;
  try {
    const { data } = await axios.get(
      `${baseUrl}/search/suggest.json?q=${encodeURIComponent(searchTerm)}&resources[type]=product`,
      { headers: HEADERS, timeout: 10000 }
    );
    const product = data?.resources?.results?.products?.[0];
    return product?.image ? product.image.replace(/\?.*$/, '') : null;
  } catch { return null; }
}

// ── Scrape og:image da página ─────────────────────────────────────────────────
async function tryDirectPage(url) {
  if (!url) return null;
  try {
    const { data } = await axios.get(url, { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(data);
    const og = $('meta[property="og:image"]').attr('content')
            || $('meta[name="og:image"]').attr('content');
    if (og && og.startsWith('http') && !og.match(/logo|icon|banner|placeholder|favicon/i)) return og;
    const tw = $('meta[name="twitter:image"]').attr('content');
    if (tw && tw.startsWith('http') && !tw.match(/logo|icon|banner|placeholder/i)) return tw;
    // JSON-LD
    let jsonLdImg = null;
    $('script[type="application/ld+json"]').each((_, el) => {
      if (jsonLdImg) return;
      try {
        const j = JSON.parse($(el).html());
        const img = j?.image?.[0] || j?.image;
        if (img && typeof img === 'string' && img.startsWith('http')) jsonLdImg = img;
      } catch {}
    });
    if (jsonLdImg) return jsonLdImg;
    // CSS selectors
    for (const sel of [
      '.product-single__photo img', '.product__image img', '.product__media img',
      '.product-gallery img', 'img[itemprop="image"]', '[data-product-image]',
      '.fotorama__img', 'img.product-photo',
    ]) {
      const el = $(sel).first();
      const src = el.attr('src') || el.attr('data-src');
      if (src && src.length > 20 && !src.match(/logo|icon|spinner|placeholder/i)) {
        return src.startsWith('//') ? `https:${src}` : (src.startsWith('http') ? src : null);
      }
    }
    return null;
  } catch { return null; }
}

// ── DuckDuckGo ────────────────────────────────────────────────────────────────
const GOOD_DOMAINS = [
  'brasilinline','traxart','inlinestore','hdinline','filaskates',
  'belstore','savanaskateshop','rollingsports','centauro','46inline',
  'skateon','konceptinline','unipatins','k2skates','powerslide',
  'roces','rollerderby','netshoes','decathlon','skatepro','amazon',
];

async function tryDDG(query) {
  try {
    const { data } = await axios.get(
      `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
      { headers: { ...HEADERS, Referer: 'https://duckduckgo.com/' }, timeout: 15000 }
    );
    const $ = cheerio.load(data);
    const links = [];
    $('a.result__url, .result__a, .result__title a, h2.result__title a').each((_, el) => {
      let href = $(el).attr('href') || '';
      if (href.startsWith('/l/?')) {
        try { href = new URL('https://duckduckgo.com' + href).searchParams.get('uddg') || href; } catch {}
      }
      if (href.startsWith('http') && GOOD_DOMAINS.some(d => href.includes(d))) links.push(href);
    });
    for (const link of [...new Set(links)].slice(0, 4)) {
      if (link.includes('/products/')) {
        const base = new URL(link).origin;
        const handle = link.split('/products/')[1]?.split('?')[0];
        if (handle) {
          const img = await tryShopifyHandle(base, handle);
          if (img) { console.log(`   ✓ DDG→Shopify: ${link.slice(0,60)}`); return img; }
        }
      }
      const img = await tryDirectPage(link);
      if (img) { console.log(`   ✓ DDG→page: ${link.slice(0,60)}`); return img; }
      await sleep(500);
    }
    return null;
  } catch { return null; }
}

// ── Download ──────────────────────────────────────────────────────────────────
async function downloadImage(imgUrl, destPath) {
  const url = imgUrl.startsWith('//') ? `https:${imgUrl}` : imgUrl;
  let referer = 'https://google.com/';
  try { referer = new URL(url).origin; } catch {}
  const response = await axios.get(url, {
    headers: { ...HEADERS, Referer: referer },
    responseType: 'stream', timeout: 25000, maxRedirects: 6,
  });
  const ct = response.headers['content-type'] || '';
  if (!ct.includes('image') && !ct.includes('octet-stream')) throw new Error(`Content-type: ${ct}`);
  await pipeline(response.data, createWriteStream(destPath));
}

// ── Atualiza data.js ──────────────────────────────────────────────────────────
function updateDataJs(id, imagePath) {
  let content = fs.readFileSync(DATA_FILE, 'utf8');
  const escaped = id.replace(/[-]/g, '\\-');
  const regex = new RegExp(`(id:\\s*"${escaped}"[\\s\\S]*?imagem:\\s*)"[^"]*"`, 'g');
  const updated = content.replace(regex, `$1"${imagePath}"`);
  if (updated === content) { console.warn(`  ⚠️  "${id}" não atualizado`); return false; }
  fs.writeFileSync(DATA_FILE, updated, 'utf8');
  return true;
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  const results = { ok: [], failed: [] };

  for (const model of models) {
    const { id, shopify, handle, directUrl, query, vtex, vtexProductId, vtexSearch } = model;
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

    // 1. VTEX API (para Centauro/BelStore)
    if (!imgUrl && vtex) {
      imgUrl = await tryVTEX(vtex, vtexProductId, vtexSearch);
      if (imgUrl) process.stdout.write(`[vtex] `);
    }

    // 2. Shopify handle direto
    if (!imgUrl && shopify && handle) {
      imgUrl = await tryShopifyHandle(shopify, handle);
      if (imgUrl) process.stdout.write(`[handle] `);
    }

    // 3. Shopify search
    if (!imgUrl && shopify) {
      const term = id.replace(/-/g, ' ');
      imgUrl = await tryShopifySearch(shopify, term);
      if (imgUrl) process.stdout.write(`[search] `);
    }

    // 4. Página direta
    if (!imgUrl && directUrl) {
      imgUrl = await tryDirectPage(directUrl);
      if (imgUrl) process.stdout.write(`[direct] `);
    }

    // 5. DuckDuckGo
    if (!imgUrl) {
      imgUrl = await tryDDG(query);
      if (imgUrl) process.stdout.write(`[ddg] `);
    }

    if (!imgUrl) {
      console.log(`✗`);
      results.failed.push(id);
      await sleep(700);
      continue;
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

    await sleep(600);
  }

  console.log('\n══════════════════════════════════════════════');
  console.log(`✅ OK     (${results.ok.length}): ${results.ok.join(', ')}`);
  console.log(`❌ Falhos (${results.failed.length}):`);
  if (results.failed.length) console.log('  ' + results.failed.join('\n  '));
  console.log('══════════════════════════════════════════════\n');
  fs.writeFileSync(
    path.resolve(__dirname, 'image-results-pass3.json'),
    JSON.stringify(results, null, 2)
  );
})();
