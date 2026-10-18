import { getSession } from '@/lib/auth';

export async function GET(request) {
  const session = getSession(request);
  if (!session) return Response.json({ authenticated: false }, { status: 401 });
  return Response.json({ authenticated: true, user: session.u });
}
