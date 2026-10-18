import { handleUpload } from '@vercel/blob/client';
import { getSession } from '@/lib/auth';

const ALLOWED_TYPES = ['image/*', 'application/pdf'];
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(request) {
  const body = await request.json();
  const result = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => {
      if (!getSession(request)) throw new Error('No autorizado');
      return { allowedContentTypes: ALLOWED_TYPES, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true };
    },
    onUploadCompleted: async () => {},
  });
  return Response.json(result);
}
