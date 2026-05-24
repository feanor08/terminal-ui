import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_THEMES } from '../src/tokens/index.js';
import { tokensToCss } from '../src/themes/css.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../dist-themes/css');

mkdirSync(outDir, { recursive: true });

for (const theme of ALL_THEMES) {
  const selector = theme.meta.appearance === 'light'
    ? `.tui-light`
    : `:root`;

  const filename = `${theme.meta.slug}.css`;
  const outPath = resolve(outDir, filename);
  const header = `/* ${theme.meta.name} — ${theme.meta.description} */\n/* appearance: ${theme.meta.appearance} */\n\n`;
  writeFileSync(outPath, header + tokensToCss(theme, selector), 'utf8');
  console.log(`✓  wrote ${filename}`);
}

const combinedParts = ALL_THEMES.map((theme) => {
  const selector = theme.meta.appearance === 'light' ? `.tui-light` : `:root`;
  const header = `/* ${theme.meta.name} */\n`;
  return header + tokensToCss(theme, selector);
});

writeFileSync(resolve(outDir, 'all-themes.css'), combinedParts.join('\n'), 'utf8');
console.log(`✓  wrote all-themes.css`);

console.log(`\nCSS themes written to dist-themes/css/`);
