import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const target = path.resolve('web/src/content/site-content.json');

if (!process.env.DATABASE_URL) {
  console.log('[contenido] DATABASE_URL no definido: se usa site-content.json del repositorio');
  process.exit(0);
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
  }
} catch (err) {
  console.warn(`[contenido] no se pudo leer la base (${err.message}): se usa site-content.json del repositorio`);
} finally {
  await client.end().catch(() => {});
}
