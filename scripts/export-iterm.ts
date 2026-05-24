import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_THEMES } from '../src/tokens/index.js';
import { tokensToIterm } from '../src/themes/iterm.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../dist-themes/iterm');

mkdirSync(outDir, { recursive: true });

for (const theme of ALL_THEMES) {
  const filename = `${theme.meta.slug}.itermcolors`;
  const outPath = resolve(outDir, filename);
  writeFileSync(outPath, tokensToIterm(theme), 'utf8');
  console.log(`✓  wrote ${filename}`);
}

console.log(`\niTerm themes written to dist-themes/iterm/`);
