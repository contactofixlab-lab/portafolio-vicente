import { getSession } from '@/lib/auth';
import { dashboard, heatmap, deleteLocalData, totals } from '@/lib/analytics';

const RANGES = ['today', '7d', '30d', '90d', '365d'];
const DEVICES = ['all', 'desktop', 'tablet', 'mobile'];

function readFilters(url) {
  const range = RANGES.includes(url.searchParams.get('range')) ? url.searchParams.get('range') : '30d';
  const device = DEVICES.includes(url.searchParams.get('device')) ? url.searchParams.get('device') : 'all';
  const includeLocal = url.searchParams.get('local') === '1';
  const page = (url.searchParams.get('page') || 'all').slice(0, 60);
  return { range, device, includeLocal, page };
}

export async function GET(request) {
  if (!getSession(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const url = new URL(request.url);
  const filters = readFilters(url);

  try {
    if (url.searchParams.get('view') === 'heat') {
      const data = await heatmap({ ...filters, device: filters.device === 'all' ? 'desktop' : filters.device });
      return Response.json(data);
    }
    const [data, info] = await Promise.all([dashboard(filters), totals()]);
    return Response.json({ ...data, info });
  } catch (err) {
    return Response.json({ error: 'No se pudo leer la analítica: ' + err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!getSession(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const url = new URL(request.url);
  if (url.searchParams.get('scope') !== 'local') return Response.json({ error: 'Alcance no válido' }, { status: 400 });
  const removed = await deleteLocalData();
  return Response.json({ ok: true, removed });
}
