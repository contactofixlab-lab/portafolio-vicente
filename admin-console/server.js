import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const FILE_PATH = path.join(__dirname, 'index.html');
const PUBLIC_DIR = path.join(__dirname, '..', 'web', 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf'
};

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15MB

function handleUpload(req, res) {
  let body = '';
  let tooLarge = false;

  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_UPLOAD_BYTES) {
      tooLarge = true;
      req.destroy();
    }
  });

  req.on('end', () => {
    if (tooLarge) return;
    try {
      const { dataUrl, filename } = JSON.parse(body);
      const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl || '');
      if (!match) throw new Error('Formato de archivo inválido');

      const buffer = Buffer.from(match[2], 'base64');
      const safeExt = (path.extname(filename || '') || '').toLowerCase().replace(/[^a-z0-9.]/g, '');
      const uniqueName = `${Date.now()}-${crypto.randomBytes(5).toString('hex')}${safeExt}`;
      const destPath = path.join(UPLOADS_DIR, uniqueName);

      fs.writeFileSync(destPath, buffer);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ url: `/uploads/${uniqueName}`, name: filename || uniqueName }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  if (req.method === 'POST' && urlPath === '/api/upload') {
    handleUpload(req, res);
    return;
  }

  if (urlPath === '/' || urlPath === '') {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading admin console');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Sirve las imágenes/archivos compartidos con el sitio web (web/public) — proyectos, skills,
  // certificados, y todo lo subido desde el admin console (web/public/uploads)
  const staticPath = path.join(PUBLIC_DIR, urlPath);
  if (staticPath.startsWith(PUBLIC_DIR)) {
    fs.readFile(staticPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      const ext = path.extname(staticPath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, 'localhost', () => {
  console.log(`Admin Console running at http://localhost:${PORT}`);
});
