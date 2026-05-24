import type { TerminalTokens } from '../tokens/schema.js';

function hexToComponents(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function colorEntry(key: string, hex: string): string {
  const { r, g, b } = hexToComponents(hex);
  const rf = (r / 255).toFixed(6);
  const gf = (g / 255).toFixed(6);
  const bf = (b / 255).toFixed(6);
  return `\t<key>${key}</key>
\t<dict>
\t\t<key>Alpha Component</key>
\t\t<real>1</real>
\t\t<key>Blue Component</key>
\t\t<real>${bf}</real>
\t\t<key>Color Space</key>
\t\t<string>sRGB</string>
\t\t<key>Green Component</key>
\t\t<real>${gf}</real>
\t\t<key>Red Component</key>
\t\t<real>${rf}</real>
\t</dict>`;
}

export function tokensToIterm(tokens: TerminalTokens): string {
  const { ansi, base, terminal } = tokens;

  const entries = [
    colorEntry('Ansi 0 Color',  ansi.black),
    colorEntry('Ansi 1 Color',  ansi.red),
    colorEntry('Ansi 2 Color',  ansi.green),
    colorEntry('Ansi 3 Color',  ansi.yellow),
    colorEntry('Ansi 4 Color',  ansi.blue),
    colorEntry('Ansi 5 Color',  ansi.magenta),
    colorEntry('Ansi 6 Color',  ansi.cyan),
    colorEntry('Ansi 7 Color',  ansi.white),
    colorEntry('Ansi 8 Color',  ansi.brightBlack),
    colorEntry('Ansi 9 Color',  ansi.brightRed),
    colorEntry('Ansi 10 Color', ansi.brightGreen),
    colorEntry('Ansi 11 Color', ansi.brightYellow),
    colorEntry('Ansi 12 Color', ansi.brightBlue),
    colorEntry('Ansi 13 Color', ansi.brightMagenta),
    colorEntry('Ansi 14 Color', ansi.brightCyan),
    colorEntry('Ansi 15 Color', ansi.brightWhite),
    colorEntry('Background Color',          base.background),
    colorEntry('Foreground Color',          base.foreground),
    colorEntry('Bold Color',                base.foreground),
    colorEntry('Cursor Color',              terminal.cursorColor),
    colorEntry('Cursor Text Color',         base.background),
    colorEntry('Selection Color',           terminal.selectionBackground),
    colorEntry('Selected Text Color',       terminal.selectionForeground),
    colorEntry('Link Color',                ansi.cyan),
    colorEntry('Badge Color',               ansi.red),
  ].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${entries}
</dict>
</plist>
`;
}
