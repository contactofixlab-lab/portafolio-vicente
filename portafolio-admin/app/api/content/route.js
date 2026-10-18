import { getSession } from '@/lib/auth';
import { readContent, writeContent } from '@/lib/db';
import { missingKeys } from '@/lib/content';

export async function GET(request) {
  if (!getSession(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const content = await readContent();
  if (!content) return Response.json({ error: 'No hay contenido guardado' }, { status: 404 });
  return Response.json(content);
}

export async function PUT(request) {
  if (!getSession(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });

  const content = await request.json().catch(() => null);
  const missing = missingKeys(content);
  if (missing.length > 0) {
    return Response.json({ error: `Faltan secciones: ${missing.join(', ')}` }, { status: 400 });
  }

  await writeContent(content);

  let deployTriggered = false;
  if (process.env.DEPLOY_HOOK_URL) {
    const hook = await fetch(process.env.DEPLOY_HOOK_URL, { method: 'POST' }).catch(() => null);
    deployTriggered = Boolean(hook?.ok);
  }

  return Response.json({ ok: true, savedAt: new Date().toISOString(), deployTriggered });
}
