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
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Only the 57 failed models — with corrected strategies
const models = [
  // ── HD INLINE ────────────────────────────────────────────────────────────────
  { id: 'hd-inline-speed-110', shopify: 'https://hdinline.com',
    handle: 'patins-hd-inline-speed-3x110mm',
    query: 'HD Inline Speed 110mm patins 3x110 hdinline.com' },
  { id: 'hd-inline-urban-90',  shopify: 'https://hdinline.com',
    handle: 'patins-hd-inline-urban-90',
    query: 'HD Inline Urban 90 patins fitness hdinline.com' },

  // ── TRAXART ──────────────────────────────────────────────────────────────────
  { id: 'traxart-volt-plus', shopify: 'https://www.traxart.com.br',
    handle: 'patins-inline-freestyle-traxart-volt-2-0-preto-80mm-abec-9',
    query: 'Traxart Volt Plus patins inline freestyle' },
  { id: 'traxart-slalom-pro', shopify: 'https://www.traxart.com.br',
    handle: 'patins-inline-slalom-traxart-slalom-pro',
    query: 'Traxart Slalom Pro patins inline slalom' },

  // ── FILA SKATES ─────────────────────────────────────────────────────────────
  { id: 'fila-houdini',
    shopify: null, directUrl: 'https://www.filaskates.com.br/houdini',
    query: 'Fila Houdini patins urban inline filaskates' },
  { id: 'fila-legacy-pro',
    shopify: null, directUrl: 'https://www.filaskates.com.br/legacy-pro',
    query: 'Fila Legacy Pro patins fitness site:filaskates.com.br' },
  { id: 'fila-crossfit-84',
    shopify: null, directUrl: 'https://www.filaskates.com.br/crossfit-84',
    query: 'Fila Crossfit 84 patins inline site:filaskates.com.br' },
  { id: 'fila-skates-houdini-evo-pro-110',
    shopify: null,
    directUrl: 'https://www.savanaskateshop.com.br/patins-fila-houdini-evo-pro-110mm-blackwhite-lancamento',
    query: 'Fila Houdini Evo PRO 110mm patins speed inline' },
  { id: 'fila-skates-houdini-evo-pro-125',
    shopify: null,
    directUrl: 'https://www.savanaskateshop.com.br/patins-fila-houdini-evo-pro-125mm-blackwhite-abec-9-lancamento',
    query: 'Fila Houdini Evo PRO 125mm patins speed marathon' },
  { id: 'fila-skates-madame-houdini',
    shopify: null, directUrl: 'https://www.filaskates.com.br/madame-houdini',
    query: 'Fila Madame Houdini patins feminino urban' },
  { id: 'fila-skates-nrk-pro',
    shopify: null, directUrl: 'https://www.filaskates.com.br/nrk-pro-black',
    query: 'Fila NRK PRO patins freeskate carbono' },
  { id: 'fila-skates-nrk-sd',
    shopify: null, directUrl: 'https://www.filaskates.com.br/nrk-sd',
    query: 'Fila NRK SD patins freeskate carbono' },
  { id: 'fila-skates-nrk-fun',
    shopify: null, directUrl: 'https://www.filaskates.com.br/nrk-fun',
    query: 'Fila NRK Fun patins street freestyle' },
  { id: 'fila-skates-j-one',
    shopify: null, directUrl: 'https://www.filaskates.com.br/j-one-boy',
    query: 'Fila J-One patins infantil iniciante' },

  // ── K2 SKATES — k2skates.com (scrape og:image) ───────────────────────────────
  { id: 'k2-kinetic-80',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/kinetic-80-mens-inline-skates-2026',
    query: 'K2 Kinetic 80 mens inline skates site:k2skates.com' },
  { id: 'k2-kinetic-80-w',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/kinetic-80-womens-inline-skates-2025',
    query: 'K2 Kinetic 80 womens inline skates site:k2skates.com' },
  { id: 'k2-kinetic-80-pro-m',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/kinetic-80-pro-mens-inline-skates-2025',
    query: 'K2 Kinetic 80 Pro mens inline skates site:k2skates.com' },
  { id: 'k2-kinetic-80-pro-w',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/kinetic-80-pro-womens-inline-skates-2026',
    query: 'K2 Kinetic 80 Pro womens inline skates site:k2skates.com' },
  { id: 'k2-fit-80-boa',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/f-i-t-80-boa-mens-inline-skates-2025',
    query: 'K2 FIT 80 BOA mens inline skates site:k2skates.com' },
  { id: 'k2-vo2-s-90-m',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/vo2-s-90-boa-unisex-inline-skates-2025',
    query: 'K2 VO2 S 90 BOA inline skates site:k2skates.com' },
  { id: 'k2-vo2-s-100',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/vo2-s-100-boa-inline-skates-2025',
    query: 'K2 VO2 S 100 inline speed skates site:k2skates.com' },
  { id: 'k2-vo2-s-100-boa',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/vo2-s-100-boa-inline-skates-2025',
    query: 'K2 VO2 S 100 BOA inline speed skates site:k2skates.com' },
  { id: 'k2-mod-110',
    shopify: null,
    directUrl: 'https://k2skates.com/en-us/p/mod-110-inline-skates-2026',
    query: 'K2 MOD 110 inline speed skates site:k2skates.com' },

  // ── POWERSLIDE — powerslide.com (Shopify) ────────────────────────────────────
  { id: 'powerslide-next-core-100',
    shopify: 'https://powerslide.com', handle: 'next-core-black-100-ii',
    query: 'Powerslide Next Core 100 inline skates site:powerslide.com' },
  { id: 'powerslide-r6-marathon',
    shopify: 'https://powerslide.com', handle: 'r6-marathon',
    query: 'Powerslide R6 Marathon speed inline skates' },
  { id: 'powerslide-phuzion-argon-80',
    shopify: 'https://powerslide.com', handle: 'argon-black-80',
    query: 'Powerslide Phuzion Argon 80 inline skates' },
  { id: 'powerslide-phuzion-universe',
    shopify: 'https://powerslide.com', handle: 'universe-green',
    query: 'Powerslide Phuzion Universe inline skates kids' },
  { id: 'powerslide-next-core-110',
    shopify: 'https://powerslide.com', handle: 'next-core-black-110',
    query: 'Powerslide Next Core 110 inline skates trinity' },
  { id: 'powerslide-swell-road-125',
    shopify: 'https://powerslide.com', handle: 'stellar-road-125',
    query: 'Powerslide Swell Road 125 speed marathon skates' },
  { id: 'powerslide-puls-4x110',
    shopify: 'https://powerslide.com', handle: 'puls-110',
    query: 'Powerslide Puls 4x110 speed inline skates' },

  // ── ROCES — roces.com (direct scrape og:image) ────────────────────────────────
  { id: 'roces-kolossal',
    shopify: null, directUrl: 'https://roces.com/kolossal/',
    query: 'Roces Kolossal quad roller skates site:roces.com' },
  { id: 'roces-disco-palace',
    shopify: null, directUrl: 'https://roces.com/disco-palace/',
    query: 'Roces Disco Palace quad skates retro site:roces.com' },
  { id: 'roces-m12-recycle',
    shopify: null, directUrl: 'https://roces.com/m12-ufs-recycle/',
    query: 'Roces M12 UFS Recycle aggressive inline skates' },
  { id: 'roces-m12-lo-team',
    shopify: null, directUrl: 'https://roces.com/m12-lo-team-buio/',
    query: 'Roces M12 Lo Team aggressive inline skates' },
  { id: 'roces-m12-lo-savosin',
    shopify: null, directUrl: 'https://www.roces.com/en/m12-lo-savosin-heat.html',
    query: 'Roces M12 Lo Savosin Heat aggressive inline skates' },
  { id: 'roces-m12-lo-goto-namikaze',
    shopify: null, directUrl: 'https://roces.com/m12-lo-goto-namikaze/',
    query: 'Roces M12 Lo Goto Namikaze aggressive inline skates' },
  { id: 'roces-rc1-quad',
    shopify: null, directUrl: 'https://roces.com/rc1/',
    query: 'Roces RC1 quad roller skates site:roces.com' },

  // ── ROLLER DERBY — rollerderby.com (Shopify) ─────────────────────────────────
  { id: 'roller-derby-aerio-q60',
    shopify: 'https://rollerderby.com', handle: 'aerio-q-60-womens-inline-skates',
    query: 'Roller Derby Aerio Q60 womens inline skates' },
  { id: 'roller-derby-v-tech-80',
    shopify: 'https://rollerderby.com', handle: 'v-tech-80-mens-inline-skates',
    directUrl: 'https://rollerderby.com/collections/mens-inline-skates',
    query: 'Roller Derby V-Tech 80 inline skates site:rollerderby.com' },
  { id: 'roller-derby-aerio-q60-m',
    shopify: 'https://rollerderby.com', handle: 'aerio-q-60-mens-inline-skates',
    query: 'Roller Derby Aerio Q60 mens inline skates' },
  { id: 'roller-derby-stryde-youth',
    shopify: 'https://rollerderby.com', handle: 'stryde-lighted-boys-adjustable-inline-skates',
    query: 'Roller Derby Stryde youth kids adjustable inline skates' },
  { id: 'roller-derby-fashion-quad',
    shopify: 'https://rollerderby.com', handle: 'candi-grl-carlin-quad-roller-skate',
    query: 'Roller Derby Fashion Quad retro roller skates women' },
  { id: 'roller-derby-star-600',
    shopify: 'https://rollerderby.com', handle: 'roller-star-600-mens-roller-skates',
    query: 'Roller Derby Star 600 quad roller skates' },
  { id: 'roller-derby-star-350-girl',
    shopify: 'https://rollerderby.com', handle: 'roller-star-350-girls-roller-skate',
    query: 'Roller Derby Star 350 Girl quad roller skates kids' },

  // ── BEL SPORTS ───────────────────────────────────────────────────────────────
  { id: 'bel-sports-inline-starter',
    shopify: null, directUrl: 'https://www.belstore.com.br/patins-inline-starter-bel/p',
    query: 'Bel Sports Inline Starter patins site:belstore.com.br' },
  { id: 'bel-sports-quad-classic',
    shopify: null, directUrl: 'https://www.belstore.com.br/patins-quad-classic-bel/p',
    query: 'Bel Sports Quad Classic patins infantil site:belstore.com.br' },
  { id: 'bel-sports-top-premium-ajustavel',
    shopify: null, directUrl: 'https://www.belstore.com.br/patins-inline-top-premium-ajustavel-bel/p',
    query: 'Bel Sports Top Premium Ajustavel patins inline' },
  { id: 'bel-sports-flexx-3-0-ajustavel',
    shopify: null, directUrl: 'https://www.belstore.com.br/patins-inline-flexx-30-ajustavel-roxo-bel/p',
    query: 'Bel Sports Flexx 3.0 Ajustavel patins inline' },
  { id: 'bel-sports-future-pro',
    shopify: null, directUrl: 'https://www.belstore.com.br/patins-inline-future-vermelho-bel/p',
    query: 'Bel Sports Future Pro patins inline fitness' },

  // ── OXER — centauro.com.br (direct scrape) ───────────────────────────────────
  { id: 'oxer-secret-retro',
    shopify: null,
    directUrl: 'https://www.centauro.com.br/patins-oxer-secret-q4-qs28-860316.html',
    query: 'Oxer Secret Retro patins quad centauro' },
  { id: 'oxer-sweet-suede',
    shopify: null,
    directUrl: 'https://www.centauro.com.br/patins-4-rodas-retro-oxer-sweet-suede-888714.html',
    query: 'Oxer Sweet Suede quad patins retro centauro' },
  { id: 'oxer-byte-adulto',
    shopify: null,
    directUrl: 'https://www.centauro.com.br/patins-oxer-byte-in-line-fitness-abec-7-adulto-879782.html',
    query: 'Oxer Byte inline patins fitness adulto centauro' },
  { id: 'oxer-freestyle-adulto',
    shopify: null, directUrl: null,
    query: 'Oxer Freestyle inline patins adulto fitness centauro netshoes' },
  { id: 'oxer-darkness-gold',
    shopify: null,
    directUrl: 'https://www.centauro.com.br/patins-oxer-darkness-gold-in-line-freestyle-abec-base-de-aluminio-adulto-888477.html',
    query: 'Oxer Darkness Gold patins freestyle inline centauro' },
  { id: 'oxer-speed-7000-ajustavel',
    shopify: null,
    directUrl: 'https://www.centauro.com.br/patins-oxer-speed-7000-in-line-fitness-abec-7-adulto-839631.html',
    query: 'Oxer Speed 7000 Ajustavel patins inline centauro' },
  { id: 'oxer-alice-quad',
    shopify: null,
    directUrl: 'https://www.centauro.com.br/patins-4-rodas-retro-oxer-alice-adulto-936728.html',
    query: 'Oxer Alice quad retro patins centauro' },
  { id: 'oxer-algodao-doce-quad',
    shopify: null,
    directUrl: 'https://www.centauro.com.br/patins-4-rodas-retro-oxer-algodao-doce-quad-adulto-936726.html',
    query: 'Oxer Algodao Doce quad colorido patins centauro' },
];

// ── Estratégia 1: Shopify product JSON (handle exato) ────────────────────────
async function tryShopifyHandle(baseUrl, handle) {
  if (!baseUrl || !handle) return null;
  try {
    const { data } = await axios.get(`${baseUrl}/products/${handle}.json`, { headers: HEADERS, timeout: 10000 });
    const img = data?.product?.images?.[0]?.src;
    return img ? img.replace(/\?.*$/, '') : null;
  } catch { return null; }
}

// ── Estratégia 2: Shopify Storefront suggest ──────────────────────────────────
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

// ── Estratégia 3: Scrape og:image ou seletores CSS da página ─────────────────
async function tryDirectPage(url) {
  if (!url) return null;
  try {
    const { data } = await axios.get(url, { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(data);

    // og:image (mais confiável)
    const og = $('meta[property="og:image"]').attr('content')
            || $('meta[name="og:image"]').attr('content');
    if (og && og.startsWith('http') && !og.match(/logo|icon|banner|placeholder|favicon/i)) return og;

    // Twitter image
    const tw = $('meta[name="twitter:image"]').attr('content');
    if (tw && tw.startsWith('http') && !tw.match(/logo|icon|banner|placeholder/i)) return tw;

    // JSON-LD
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html());
        const img = json?.image?.[0] || json?.image || json?.offers?.[0]?.image;
        if (img && typeof img === 'string' && img.startsWith('http')) return img;
      } catch {}
    });

    // CSS selectors
    const selectors = [
      '.product-single__photo img', '.product__image img', '#product-featured-image',
      '[data-product-image]', '.ProductItem__Image img', '.swiper-slide img',
      'img.product-photo', 'img[itemprop="image"]', '.product-gallery img',
      '.fotorama__img', '.zoomImg', 'img.wp-post-image',
      '[data-zoom-image]', '.product__media img', 'picture source',
    ];
    for (const sel of selectors) {
      const el = $(sel).first();
      const src = el.attr('src') || el.attr('data-src') || el.attr('srcset')?.split(' ')?.[0] || el.attr('content');
      if (src && src.length > 20 && !src.match(/logo|icon|spinner|placeholder/i)) {
        return src.startsWith('//') ? `https:${src}` : (src.startsWith('http') ? src : null);
      }
    }
    return null;
  } catch { return null; }
}

// ── Estratégia 4: DuckDuckGo → scrape primeiro resultado relevante ────────────
const GOOD_DOMAINS = [
  'brasilinline', 'traxart', 'inlinestore', 'hdinline', 'filaskates',
  'belstore', 'savanaskateshop', 'rollingsports', 'centauro', '46inline',
  'skateon', 'konceptinline', 'unipatins', 'k2skates', 'powerslide',
  'roces', 'rollerderby', 'netshoes', 'decathlon',
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

// ── Download de imagem ────────────────────────────────────────────────────────
async function downloadImage(imgUrl, destPath) {
  const url = imgUrl.startsWith('//') ? `https:${imgUrl}` : imgUrl;
  let referer = 'https://google.com/';
  try { referer = new URL(url).origin; } catch {}
  const response = await axios.get(url, {
    headers: { ...HEADERS, Referer: referer },
    responseType: 'stream', timeout: 25000, maxRedirects: 6,
  });
  const ct = response.headers['content-type'] || '';
  if (!ct.includes('image') && !ct.includes('octet-stream')) throw new Error(`Content-type inválido: ${ct}`);
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

    // Skip se já existe imagem válida
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

    // 2. Shopify search (fallback do handle)
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
    path.resolve(__dirname, 'image-results-pass2.json'),
    JSON.stringify(results, null, 2)
  );
})();
