import fs from 'node:fs';
import path from 'node:path';

const worksDir = path.join(process.cwd(), 'public', 'works');
const missing = [];

for (let i = 1; i <= 48; i += 1) {
  const name = `${String(i).padStart(2, '0')}.png`;
  const full = path.join(worksDir, name);
  if (!fs.existsSync(full)) {
    missing.push(name);
  }
}

if (missing.length) {
  console.error(`Missing ${missing.length} work image(s):`);
  console.error(missing.join(', '));
  process.exit(1);
}

console.log('All 48 work images exist in public/works.');
