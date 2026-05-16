import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

const svg = readFileSync(resolve(publicDir, 'favicon.svg'), 'utf-8');

const sizes = [192, 512];

for (const size of sizes) {
  const png = await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toBuffer();

  const outPath = resolve(publicDir, `icon-${size}x${size}.png`);
  writeFileSync(outPath, png);
  console.log(`Generated ${outPath} (${size}x${size})`);
}

console.log('Done!');
