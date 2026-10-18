import { hashPassword } from '../lib/auth.js';

const password = process.argv[2];
if (!password) {
  console.error('Uso: node scripts/hash-password.mjs "tu-contraseña"');
  process.exit(1);
}
console.log(hashPassword(password));
