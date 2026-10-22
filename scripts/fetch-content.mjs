import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const target = path.resolve('web/src/content/site-content.json');

if (!process.env.DATABASE_URL) {
  console.log('[contenido] DATABASE_URL no definido: se usa site-content.json del repositorio');
  process.exit(0);
}

const htmlTarget = path.resolve('web/index.html');
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Escribe el SEO editable (título y descripción) en el HTML estático para buscadores y vistas previas de enlaces. */
function applySeo(seo) {
  if (!seo || typeof seo !== 'object') return;
  let html = fs.readFileSync(htmlTarget, 'utf8');
  const setAttr = (re, value) => { html = html.replace(re, (_, a, b) => a + escAttr(value) + b); };
  if (seo.title?.trim()) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escAttr(seo.title)}</title>`);
    setAttr(/(<meta property="og:title" content=")[^"]*(")/, seo.title);
    setAttr(/(<meta name="twitter:title" content=")[^"]*(")/, seo.title);
  }
  if (seo.description?.trim()) {
    setAttr(/(<meta name="description" content=")[^"]*(")/, seo.description);
    setAttr(/(<meta property="og:description" content=")[^"]*(")/, seo.description);
    setAttr(/(<meta name="twitter:description" content=")[^"]*(")/, seo.description);
  }
  if (seo.keywords?.trim()) setAttr(/(<meta name="keywords" content=")[^"]*(")/, seo.keywords);
  fs.writeFileSync(htmlTarget, html);
  console.log('[contenido] SEO aplicado al HTML');
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
try {
  await client.connect();
  const { rows } = await client.query("select data from site_content where id = 'main'");
  if (!rows[0]) {
    console.warn('[contenido] la base no tiene contenido: se usa site-content.json del repositorio');
  } else {
    fs.writeFileSync(target, JSON.stringify(rows[0].data, null, 2) + '\n');
    console.log('[contenido] sincronizado desde la base de datos');
    applySeo(rows[0].data.seo);
  }
} catch (err) {
  console.warn(`[contenido] no se pudo leer la base (${err.message}): se usa site-content.json del repositorio`);
} finally {
  await client.end().catch(() => {});
}
