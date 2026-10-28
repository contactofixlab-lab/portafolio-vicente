import crypto from 'node:crypto';
import { getPool } from '@/lib/db';

const STATUSES = ['nuevo', 'leido', 'respondido', 'archivado'];

/* ---------- Tabla ---------- */

let tableReady = null;

export function ensureMessagesTable() {
  if (!tableReady) {
    tableReady = (async () => {
      const pool = getPool();
      await pool.query(`
        create table if not exists contact_messages (
          id bigserial primary key,
          created_at timestamptz not null default now(),
          name text not null,
          email text not null,
          subject text not null,
          message text not null,
          status text not null default 'nuevo',
          starred boolean not null default false,
          country text,
          device text,
          ip_hash text,
          host text,
          page text,
          read_at timestamptz,
          replied_at timestamptz
        )`);
      await pool.query('create index if not exists contact_messages_created_idx on contact_messages (created_at desc)');
      await pool.query('create index if not exists contact_messages_status_idx on contact_messages (status, created_at desc)');
      await pool.query('create index if not exists contact_messages_ip_idx on contact_messages (ip_hash, created_at desc)');
    })().catch((err) => {
      tableReady = null;
      throw err;
    });
  }
  return tableReady;
}

/* ---------- Recepción desde el sitio ---------- */

const SITE_HOST = /^portfolio-vicente[a-z0-9-]*\.vercel\.app$/i;
const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;

function originAllowed(request) {
  const origin = request.headers.get('origin') || '';
  let host = '';
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  if (SITE_HOST.test(host)) return true;
  const extra = (process.env.ANALYTICS_ALLOWED_HOSTS || '').split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);
  if (extra.includes(host.toLowerCase())) return true;
  // En desarrollo local se permite probar el formulario
  return process.env.NODE_ENV !== 'production' && /^(localhost|127\.0\.0\.1)$/.test(host);
}

const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '');
const linkCount = (t) => (t.match(/https?:\/\/|www\./gi) || []).length;

const recent = new Map();
function memoryLimited(key) {
  const now = Date.now();
  const list = (recent.get(key) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  recent.set(key, list);
  if (recent.size > 3000) recent.clear();
  return list.length > 3;
}

function hashIp(request) {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'sin-ip';
  return crypto.createHash('sha256').update(ip + (process.env.SESSION_SECRET || '')).digest('hex').slice(0, 24);
}

export async function receiveMessage(request, body) {
  if (!originAllowed(request)) return { status: 403, error: 'Origen no permitido' };
  if (!body || typeof body !== 'object') return { status: 400, error: 'Datos no válidos' };

  // Trampa para robots: un campo oculto que una persona nunca llena
  if (typeof body.website === 'string' && body.website.trim()) return { status: 200, ok: true, fake: true };
  // Una persona tarda al menos unos segundos en escribir
  if (Number.isFinite(body.t) && body.t < 2500) return { status: 200, ok: true, fake: true };

  const name = clean(body.name, 80);
  const email = clean(body.email, 120).toLowerCase();
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 1500);
  if (name.length < 2) return { status: 400, error: 'Escribe tu nombre completo.', field: 'name' };
  if (!EMAIL.test(email)) return { status: 400, error: 'Escribe un correo válido.', field: 'email' };
  if (subject.length < 3) return { status: 400, error: 'Escribe un asunto.', field: 'subject' };
  if (message.length < 10) return { status: 400, error: 'Cuéntame un poco más en tu comentario.', field: 'message' };
  if (linkCount(message) > 2 || linkCount(subject) > 0) return { status: 400, error: 'Por seguridad, el mensaje no puede llevar tantos enlaces.', field: 'message' };

  const ipHash = hashIp(request);
  if (memoryLimited(ipHash)) return { status: 429, error: 'Enviaste varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo.' };

  await ensureMessagesTable();
  const pool = getPool();
  const { rows } = await pool.query(
    "select count(*)::int as n from contact_messages where (ip_hash = $1 or email = $2) and created_at > now() - interval '1 hour'",
    [ipHash, email]
  );
  if (rows[0].n >= 4) return { status: 429, error: 'Ya recibí tus mensajes. Te responderé pronto.' };

  const ua = request.headers.get('user-agent') || '';
  const device = /mobile|iphone|android/i.test(ua) ? 'mobile' : /ipad|tablet/i.test(ua) ? 'tablet' : 'desktop';
  const result = await pool.query(
    `insert into contact_messages (name, email, subject, message, country, device, ip_hash, host, page)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id`,
    [name, email, subject, message, clean(request.headers.get('x-vercel-ip-country') || '', 3) || null, device, ipHash,
      clean(body.host, 80) || null, clean(body.page, 60) || null]
  );
  return { status: 200, ok: true, id: result.rows[0].id };
}

/* ---------- Bandeja de entrada (consola) ---------- */

export async function listMessages({ status = 'todos', q = '', starred = false, limit = 200 }) {
  await ensureMessagesTable();
  const pool = getPool();
  const where = [];
  const args = [];
  if (STATUSES.includes(status)) {
    args.push(status);
    where.push(`status = $${args.length}`);
  } else if (status === 'todos') {
    where.push("status <> 'archivado'");
  }
  if (starred) where.push('starred');
  if (q) {
    args.push('%' + q.slice(0, 60) + '%');
    where.push(`(name ilike $${args.length} or email ilike $${args.length} or subject ilike $${args.length} or message ilike $${args.length})`);
  }
  const rows = await pool.query(
    `select id, created_at, name, email, subject, message, status, starred, country, device, page, read_at, replied_at
     from contact_messages ${where.length ? 'where ' + where.join(' and ') : ''} order by created_at desc limit ${Math.min(500, Math.max(1, limit))}`,
    args
  );
  const counts = await messageCounts();
  return { messages: rows.rows, counts };
}

export async function messageCounts() {
  await ensureMessagesTable();
  const { rows } = await getPool().query(
    `select count(*)::int as total,
       count(*) filter (where status = 'nuevo')::int as nuevo,
       count(*) filter (where status = 'leido')::int as leido,
       count(*) filter (where status = 'respondido')::int as respondido,
       count(*) filter (where status = 'archivado')::int as archivado,
       count(*) filter (where starred and status <> 'archivado')::int as starred
     from contact_messages`
  );
  return rows[0];
}

export async function updateMessage(id, patch) {
  await ensureMessagesTable();
  const sets = [];
  const args = [id];
  if (patch.status && STATUSES.includes(patch.status)) {
    args.push(patch.status);
    sets.push(`status = $${args.length}`);
    if (patch.status === 'leido') sets.push('read_at = coalesce(read_at, now())');
    if (patch.status === 'respondido') sets.push('replied_at = now()', 'read_at = coalesce(read_at, now())');
    if (patch.status === 'nuevo') sets.push('read_at = null');
  }
  if (typeof patch.starred === 'boolean') {
    args.push(patch.starred);
    sets.push(`starred = $${args.length}`);
  }
  if (!sets.length) return null;
  const { rows } = await getPool().query(`update contact_messages set ${sets.join(', ')} where id = $1 returning id, status, starred, read_at, replied_at`, args);
  return rows[0] || null;
}

export async function deleteMessage(id) {
  await ensureMessagesTable();
  const r = await getPool().query('delete from contact_messages where id = $1', [id]);
  return r.rowCount;
}
