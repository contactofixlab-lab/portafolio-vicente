import { getSession } from '@/lib/auth';
import { receiveMessage, listMessages, messageCounts, updateMessage, deleteMessage } from '@/lib/messages';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

/** Público: recibe el formulario de contacto del sitio. */
export async function POST(request) {
  try {
    const text = await request.text();
    if (text.length > 8000) return Response.json({ ok: false, error: 'Mensaje demasiado largo' }, { status: 413, headers: CORS });
    const result = await receiveMessage(request, JSON.parse(text));
    const { status, ...rest } = result;
    return Response.json({ ok: Boolean(rest.ok), error: rest.error, field: rest.field }, { status, headers: CORS });
  } catch {
    return Response.json({ ok: false, error: 'No se pudo enviar. Inténtalo de nuevo.' }, { status: 500, headers: CORS });
  }
}

/** Consola: bandeja de entrada. */
export async function GET(request) {
  if (!getSession(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const url = new URL(request.url);
  try {
    if (url.searchParams.get('counts') === '1') return Response.json({ counts: await messageCounts() });
    const data = await listMessages({
      status: url.searchParams.get('status') || 'todos',
      q: url.searchParams.get('q') || '',
      starred: url.searchParams.get('starred') === '1',
    });
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: 'No se pudieron leer los mensajes: ' + err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!getSession(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const id = Number(body && body.id);
  if (!Number.isInteger(id)) return Response.json({ error: 'Falta el mensaje' }, { status: 400 });
  const updated = await updateMessage(id, { status: body.status, starred: body.starred });
  if (!updated) return Response.json({ error: 'No se encontró el mensaje' }, { status: 404 });
  return Response.json({ ok: true, message: updated, counts: await messageCounts() });
}

export async function DELETE(request) {
  if (!getSession(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!Number.isInteger(id)) return Response.json({ error: 'Falta el mensaje' }, { status: 400 });
  await deleteMessage(id);
  return Response.json({ ok: true, counts: await messageCounts() });
}
