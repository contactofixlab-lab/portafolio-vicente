import { getPool } from '@/lib/db';

const TZ = 'America/Santiago';
const CONVERSIONS = ['whatsapp', 'correo', 'telefono', 'cv'];
const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

/* ---------- Tabla ---------- */

let tableReady = null;

export function ensureTable() {
  if (!tableReady) {
    tableReady = (async () => {
      const pool = getPool();
      await pool.query(`
        create table if not exists analytics_events (
          id bigserial primary key,
          ts timestamptz not null default now(),
          sid text not null,
          vid text,
          type text not null,
          page text not null,
          host text,
          section text,
          label text,
          kind text,
          href text,
          interactive boolean,
          x real,
          y integer,
          vw integer,
          vh integer,
          doc_h integer,
          device text,
          browser text,
          os text,
          country text,
          referrer text,
          value integer,
          meta jsonb
        )`);
      await pool.query('create index if not exists analytics_ts_idx on analytics_events (ts desc)');
      await pool.query('create index if not exists analytics_type_page_idx on analytics_events (type, page, ts desc)');
      await pool.query('create index if not exists analytics_sid_idx on analytics_events (sid, ts)');
    })().catch((err) => {
      tableReady = null;
      throw err;
    });
  }
  return tableReady;
}

/* ---------- Datos del visitante a partir del navegador ---------- */

export function isBot(ua = '') {
  return /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gtmetrix|facebookexternalhit|preview|monitor|uptime|python-requests|curl|wget/i.test(ua);
}

export function parseUA(ua = '') {
  let browser = 'Otro';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/opr\/|opera/i.test(ua)) browser = 'Opera';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';

  let os = 'Otro';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/mac os x|macintosh/i.test(ua)) os = 'macOS';
  else if (/linux|cros/i.test(ua)) os = 'Linux';
  return { browser, os };
}

/* ---------- Ingreso de eventos ---------- */

const clip = (v, n) => (typeof v === 'string' ? v.slice(0, n) : null);
const num = (v, min, max) => (Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : null);

const ALLOWED_HOST = /^(localhost|127\.0\.0\.1|portfolio-vicente[a-z0-9-]*\.vercel\.app)$/i;

function allowedHosts() {
  const extra = (process.env.ANALYTICS_ALLOWED_HOSTS || '').split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);
  return (host) => ALLOWED_HOST.test(host) || extra.includes(host.toLowerCase());
}

const hits = new Map();
function rateLimited(sid) {
  const now = Date.now();
  const entry = hits.get(sid) || { start: now, count: 0 };
  if (now - entry.start > 60000) {
    entry.start = now;
    entry.count = 0;
  }
  entry.count += 1;
  hits.set(sid, entry);
  if (hits.size > 5000) hits.clear();
  return entry.count > 400;
}

export async function insertEvents(payload, headers) {
  const ua = headers.get('user-agent') || '';
  if (isBot(ua)) return { stored: 0, reason: 'bot' };
  if (!payload || typeof payload !== 'object') return { stored: 0, reason: 'invalid' };

  const sid = clip(payload.sid, 40);
  const host = clip(payload.host, 80);
  if (!sid || !host || !allowedHosts()(host)) return { stored: 0, reason: 'host' };
  if (rateLimited(sid)) return { stored: 0, reason: 'rate' };

  const events = Array.isArray(payload.events) ? payload.events.slice(0, 40) : [];
  if (!events.length) return { stored: 0, reason: 'empty' };

  const { browser, os } = parseUA(ua);
  const country = clip(headers.get('x-vercel-ip-country'), 3);
  const vid = clip(payload.vid, 40);
  const device = ['mobile', 'tablet', 'desktop'].includes(payload.device) ? payload.device : 'desktop';
  const referrer = clip(payload.referrer, 200) || '';
  const vw = num(payload.vw, 200, 8000);
  const vh = num(payload.vh, 200, 8000);

  const rows = [];
  const params = [];
  for (const ev of events) {
    if (!ev || !['pageview', 'click', 'leave'].includes(ev.type)) continue;
    const page = clip(ev.page, 60);
    if (!page) continue;
    const ago = num(ev.ago, 0, 60000);
    const meta = ev.meta && typeof ev.meta === 'object' ? JSON.stringify(ev.meta).slice(0, 400) : null;
    const base = params.length;
    params.push(
      ago === null ? 0 : ago, sid, vid, ev.type, page, host,
      clip(ev.section, 80), clip(ev.label, 100), clip(ev.kind, 30), clip(ev.href, 200),
      typeof ev.interactive === 'boolean' ? ev.interactive : null,
      Number.isFinite(ev.x) ? Math.min(100, Math.max(0, ev.x)) : null, num(ev.y, 0, 100000),
      num(ev.vw, 200, 8000) ?? vw, num(ev.vh, 200, 8000) ?? vh, num(ev.docH, 0, 200000),
      device, browser, os, country, ev.type === 'pageview' ? referrer : null, num(ev.value, 0, 100000), meta
    );
    const n = (i) => `$${base + i}`;
    rows.push(`(now() - ((${n(1)})::int * interval '1 millisecond'), ${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(n).join(', ')}${''})`);
  }
  if (!rows.length) return { stored: 0, reason: 'empty' };

  await ensureTable();
  await getPool().query(
    `insert into analytics_events (ts, sid, vid, type, page, host, section, label, kind, href, interactive, x, y, vw, vh, doc_h, device, browser, os, country, referrer, value, meta)
     values ${rows.join(', ')}`,
    params
  );

  if (Math.random() < 0.01) {
    getPool().query("delete from analytics_events where ts < now() - interval '540 days'").catch(() => {});
  }
  return { stored: rows.length };
}

/* ---------- Consultas del dashboard ---------- */

export function rangeFrom(range) {
  const now = new Date();
  const to = new Date(now.getTime() + 60 * 1000);
  const days = { today: 1, '7d': 7, '30d': 30, '90d': 90, '365d': 365 }[range] ?? 30;
  let from;
  if (range === 'today') {
    const tzNow = new Date(now.toLocaleString('en-US', { timeZone: TZ }));
    from = new Date(now.getTime() - (tzNow.getHours() * 3600 + tzNow.getMinutes() * 60 + tzNow.getSeconds()) * 1000);
  } else {
    from = new Date(now.getTime() - days * 86400000);
  }
  return { from, to, days };
}

const CONV_LIST = `'${CONVERSIONS.join("','")}'`;

function baseCte() {
  return `with e as (
    select * from analytics_events
    where ts >= $1 and ts < $2
      and ($3 = 'all' or device = $3)
      and ($4::boolean or host <> all (array['localhost','127.0.0.1']))
  )`;
}

export async function dashboard({ range = '30d', device = 'all', includeLocal = false, page = 'all' }) {
  await ensureTable();
  const pool = getPool();
  const { from, to, days } = rangeFrom(range);
  const span = to.getTime() - from.getTime();
  const prevFrom = new Date(from.getTime() - span);
  const args = [from, to, device, includeLocal];
  const q = (sql, extra = []) => pool.query(`${baseCte()} ${sql}`, [...args, ...extra]).then((r) => r.rows);

  const [kpiRows, prevRows, bounceRows, daily, hourly, dow, pages, elements, sections, conversions, dead, rage, devices, browsers, oss, countries, referrers, flows, recent, convByPage] = await Promise.all([
    q(`select
        count(*) filter (where type='pageview')::int as pageviews,
        count(distinct sid)::int as sessions,
        count(distinct vid)::int as visitors,
        count(*) filter (where type='click')::int as clicks,
        count(*) filter (where type='click' and interactive)::int as clicks_interactive,
        count(*) filter (where type='click' and not coalesce(interactive,false))::int as clicks_dead,
        count(*) filter (where type='click' and meta->>'rage' = '1')::int as rage,
        count(distinct sid) filter (where type='click' and kind in (${CONV_LIST}))::int as conv_sessions,
        count(*) filter (where type='click' and kind in (${CONV_LIST}))::int as conv_clicks,
        coalesce(avg((meta->>'sec')::numeric) filter (where type='leave' and (meta->>'sec')::numeric < 1800), 0)::float as avg_sec,
        coalesce(avg(value) filter (where type='leave'), 0)::float as avg_scroll
       from e`),
    pool.query(
      `select count(*) filter (where type='pageview')::int as pageviews, count(distinct sid)::int as sessions, count(*) filter (where type='click')::int as clicks
       from analytics_events where ts >= $1 and ts < $2 and ($3 = 'all' or device = $3) and ($4::boolean or host <> all (array['localhost','127.0.0.1']))`,
      [prevFrom, from, device, includeLocal]
    ).then((r) => r.rows),
    q(`select
        count(*)::int as sessions,
        count(*) filter (where pv <= 1 and c = 0)::int as bounced
       from (select sid, count(*) filter (where type='pageview') as pv, count(*) filter (where type='click') as c from e group by sid) s`),
    q(`select to_char(date_trunc('day', ts at time zone '${TZ}'), 'YYYY-MM-DD') as d,
        count(*) filter (where type='pageview')::int as pageviews,
        count(distinct sid)::int as sessions,
        count(*) filter (where type='click')::int as clicks
       from e group by 1 order by 1`),
    q(`select extract(hour from ts at time zone '${TZ}')::int as h,
        count(*) filter (where type='pageview')::int as pageviews,
        count(*) filter (where type='click')::int as clicks
       from e group by 1 order by 1`),
    q(`select extract(isodow from ts at time zone '${TZ}')::int as dow, extract(hour from ts at time zone '${TZ}')::int as h, count(*)::int as n
       from e where type='pageview' group by 1,2`),
    q(`select page,
        count(*) filter (where type='pageview')::int as views,
        count(distinct sid)::int as sessions,
        count(*) filter (where type='click')::int as clicks,
        count(*) filter (where type='click' and kind in (${CONV_LIST}))::int as conv,
        coalesce(avg((meta->>'sec')::numeric) filter (where type='leave' and (meta->>'sec')::numeric < 1800), 0)::float as avg_sec,
        coalesce(avg(value) filter (where type='leave'), 0)::float as avg_scroll,
        count(*) filter (where type='leave')::int as leaves,
        count(*) filter (where type='leave' and value >= 25)::int as r25,
        count(*) filter (where type='leave' and value >= 50)::int as r50,
        count(*) filter (where type='leave' and value >= 75)::int as r75,
        count(*) filter (where type='leave' and value >= 98)::int as r100
       from e group by page order by views desc, clicks desc`),
    q(`select page, coalesce(section,'—') as section, coalesce(label,'(sin texto)') as label, coalesce(kind,'otro') as kind, coalesce(interactive,false) as interactive,
        count(*)::int as clicks, count(distinct sid)::int as sessions,
        round(avg(x) filter (where coalesce(meta->>'f','0') <> '1')::numeric, 1)::float as ax,
        round(avg(y) filter (where coalesce(meta->>'f','0') <> '1')::numeric, 0)::float as ay
       from e where type='click' and ($5 = 'all' or page = $5)
       group by 1,2,3,4,5 order by clicks desc limit 80`, [page]),
    q(`select page, coalesce(section,'—') as section, count(*)::int as clicks, count(*) filter (where coalesce(interactive,false))::int as interactive
       from e where type='click' and ($5 = 'all' or page = $5) group by 1,2 order by clicks desc limit 40`, [page]),
    q(`select kind, count(*)::int as clicks, count(distinct sid)::int as sessions
       from e where type='click' and kind in (${CONV_LIST}) group by 1 order by clicks desc`),
    q(`select page, coalesce(section,'—') as section, coalesce(label,'(sin texto)') as label, count(*)::int as clicks, count(distinct sid)::int as sessions
       from e where type='click' and not coalesce(interactive,false) group by 1,2,3 order by clicks desc limit 15`),
    q(`select page, coalesce(label,'(sin texto)') as label, count(*)::int as n
       from e where type='click' and meta->>'rage' = '1' group by 1,2 order by n desc limit 10`),
    q(`select device, count(distinct sid)::int as sessions from e group by 1 order by sessions desc`),
    q(`select browser, count(distinct sid)::int as sessions from e group by 1 order by sessions desc limit 8`),
    q(`select os, count(distinct sid)::int as sessions from e group by 1 order by sessions desc limit 8`),
    q(`select coalesce(country,'—') as country, count(distinct sid)::int as sessions from e group by 1 order by sessions desc limit 12`),
    q(`select coalesce(nullif(substring(referrer from '^(?:https?://)?([^/:?#]+)'), ''), 'Directo') as ref, count(distinct sid)::int as sessions
       from e where type='pageview' group by 1 order by sessions desc limit 12`),
    q(`select prev, page, count(*)::int as n from (
         select page, lag(page) over (partition by sid order by ts) as prev from e where type='pageview'
       ) s where prev is not null and prev <> page group by 1,2 order by n desc limit 14`),
    pool.query(
      `select ts, type, page, label, kind, device, country from analytics_events
       where ($1 = 'all' or device = $1) and ($2::boolean or host <> all (array['localhost','127.0.0.1']))
       order by ts desc limit 60`,
      [device, includeLocal]
    ).then((r) => r.rows),
    q(`select page, kind, count(*)::int as clicks from e where type='click' and kind in (${CONV_LIST}) group by 1,2 order by clicks desc`),
  ]);

  const kpi = kpiRows[0];
  const prev = prevRows[0];
  const b = bounceRows[0];

  return {
    range,
    days,
    from,
    to,
    kpi: {
      ...kpi,
      bounce_rate: b.sessions ? b.bounced / b.sessions : 0,
      clicks_per_session: kpi.sessions ? kpi.clicks / kpi.sessions : 0,
      conv_rate: kpi.sessions ? kpi.conv_sessions / kpi.sessions : 0,
    },
    prev,
    daily,
    hourly,
    dow,
    pages,
    elements,
    sections,
    conversions,
    convByPage,
    dead,
    rage,
    devices,
    browsers,
    os: oss,
    countries,
    referrers,
    flows,
    recent,
  };
}

export async function heatmap({ page, device = 'desktop', range = '30d', includeLocal = false }) {
  await ensureTable();
  const pool = getPool();
  const { from, to } = rangeFrom(range);
  const args = [from, to, device, includeLocal, page];
  const filter = `ts >= $1 and ts < $2 and device = $3 and ($4::boolean or host <> all (array['localhost','127.0.0.1'])) and page = $5`;

  const [cells, meta, reach] = await Promise.all([
    pool.query(
      `select round(x)::int as bx, (y / 20)::int as by, coalesce(meta->>'f','0') = '1' as fixed, count(*)::int as n
       from analytics_events where type='click' and x is not null and y is not null and ${filter}
       group by 1,2,3`,
      args
    ).then((r) => r.rows),
    pool.query(
      `select
         coalesce(percentile_cont(0.5) within group (order by doc_h) filter (where doc_h > 0 and type <> 'pageview'), 0)::int as doc_h,
         coalesce(percentile_cont(0.5) within group (order by vw), 0)::int as vw,
         count(*) filter (where type='pageview')::int as views,
         count(*) filter (where type='click')::int as clicks,
         count(distinct sid)::int as sessions
       from analytics_events where ${filter}`,
      args
    ).then((r) => r.rows[0]),
    pool.query(
      `select count(*)::int as total,
         count(*) filter (where value >= 10)::int as d10, count(*) filter (where value >= 20)::int as d20,
         count(*) filter (where value >= 30)::int as d30, count(*) filter (where value >= 40)::int as d40,
         count(*) filter (where value >= 50)::int as d50, count(*) filter (where value >= 60)::int as d60,
         count(*) filter (where value >= 70)::int as d70, count(*) filter (where value >= 80)::int as d80,
         count(*) filter (where value >= 90)::int as d90, count(*) filter (where value >= 98)::int as d100
       from analytics_events where type='leave' and ${filter}`,
      args
    ).then((r) => r.rows[0]),
  ]);

  return { cells, meta, reach };
}

export async function deleteLocalData() {
  await ensureTable();
  const r = await getPool().query("delete from analytics_events where host = any(array['localhost','127.0.0.1'])");
  return r.rowCount;
}

export async function totals() {
  await ensureTable();
  const r = await getPool().query(
    `select count(*)::int as total,
       count(*) filter (where host = any(array['localhost','127.0.0.1']))::int as local,
       min(ts) as first_event, max(ts) as last_event
     from analytics_events`
  );
  return r.rows[0];
}
