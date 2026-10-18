import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  console.error('Falta DATABASE_URL');
  process.exit(1);
}

const seedFile = path.resolve('..', 'web', 'src', 'content', 'site-content.json');
const content = JSON.parse(fs.readFileSync(seedFile, 'utf8'));

const client = new pg.Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();
await client.query(`
  create table if not exists site_content (
    id text primary key,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )
`);
await client.query(
  `insert into site_content (id, data) values ('main', $1)
   on conflict (id) do nothing`,
  [JSON.stringify(content)]
);
const { rows } = await client.query("select updated_at from site_content where id = 'main'");
console.log(`Contenido listo. Última actualización: ${rows[0].updated_at.toISOString()}`);
await client.end();
