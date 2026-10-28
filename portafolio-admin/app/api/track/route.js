import { insertEvents } from '@/lib/analytics';

// Recepción pública de eventos anónimos del sitio (visitas, clics, salidas). No lleva cookies ni datos personales.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(request) {
  try {
    const text = await request.text();
    if (text.length > 30000) return new Response(null, { status: 204, headers: CORS });
    const payload = JSON.parse(text);
    await insertEvents(payload, request.headers);
  } catch {
    /* un evento perdido nunca debe afectar al visitante */
  }
  return new Response(null, { status: 204, headers: CORS });
}
