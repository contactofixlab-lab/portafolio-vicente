import { createSessionToken, sessionCookie, verifyPassword } from '@/lib/auth';

export async function POST(request) {
  const { user, pass } = await request.json().catch(() => ({}));
  const expectedUser = process.env.ADMIN_USER;
  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUser || !storedHash) {
    return Response.json({ error: 'El acceso no está configurado' }, { status: 500 });
  }
  const validPassword = typeof pass === 'string' && verifyPassword(pass, storedHash);
  if (user !== expectedUser || !validPassword) {
    return Response.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
  }
  return Response.json({ ok: true }, { headers: { 'Set-Cookie': sessionCookie(createSessionToken(user)) } });
}
