import pg from 'pg';

const globalForPg = globalThis;

function getPool() {
  if (!globalForPg.__portafolioPool) {
    globalForPg.__portafolioPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 2,
    });
  }
  return globalForPg.__portafolioPool;
}

export async function readContent() {
  const { rows } = await getPool().query('select data from site_content where id = $1', ['main']);
  return rows[0]?.data ?? null;
}

export async function writeContent(data) {
  await getPool().query(
    `insert into site_content (id, data, updated_at) values ('main', $1, now())
     on conflict (id) do update set data = excluded.data, updated_at = now()`,
    [JSON.stringify(data)]
  );
}
