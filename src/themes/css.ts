import type { TerminalTokens } from '../tokens/schema.js';

export function tokensToCss(tokens: TerminalTokens, selector = ':root'): string {
  const { base, ansi, colors, text, effects, shape, spacing, typography, terminal } = tokens;

  const vars: [string, string][] = [
    /* base */
    ['--tui-bg',              base.background],
    ['--tui-bg-outside',      base.backgroundOutside],
    ['--tui-fg',              base.foreground],
    ['--tui-surface',         base.surface],
    ['--tui-surface-raised',  base.surfaceRaised],
    ['--tui-surface-pressed', base.surfacePressed],
    ['--tui-border',          base.border],
    ['--tui-border-strong',   base.borderStrong],
    ['--tui-muted',           base.muted],

    /* ansi */
    ['--tui-ansi-black',          ansi.black],
    ['--tui-ansi-red',            ansi.red],
    ['--tui-ansi-green',          ansi.green],
    ['--tui-ansi-yellow',         ansi.yellow],
    ['--tui-ansi-blue',           ansi.blue],
    ['--tui-ansi-magenta',        ansi.magenta],
    ['--tui-ansi-cyan',           ansi.cyan],
    ['--tui-ansi-white',          ansi.white],
    ['--tui-ansi-bright-black',   ansi.brightBlack],
    ['--tui-ansi-bright-red',     ansi.brightRed],
    ['--tui-ansi-bright-green',   ansi.brightGreen],
    ['--tui-ansi-bright-yellow',  ansi.brightYellow],
    ['--tui-ansi-bright-blue',    ansi.brightBlue],
    ['--tui-ansi-bright-magenta', ansi.brightMagenta],
    ['--tui-ansi-bright-cyan',    ansi.brightCyan],
    ['--tui-ansi-bright-white',   ansi.brightWhite],

    /* color families */
    ['--tui-blue',            colors.blue.base],
    ['--tui-blue-bright',     colors.blue.bright],
    ['--tui-blue-dark',       colors.blue.dark],
    ['--tui-blue-soft',       colors.blue.soft],
    ['--tui-blue-border',     colors.blue.border],
    ['--tui-blue-glow',       colors.blue.glow],

    ['--tui-green',           colors.green.base],
    ['--tui-green-bright',    colors.green.bright],
    ['--tui-green-dark',      colors.green.dark],
    ['--tui-green-soft',      colors.green.soft],
    ['--tui-green-border',    colors.green.border],
    ['--tui-green-glow',      colors.green.glow],

    ['--tui-yellow',          colors.yellow.base],
    ['--tui-yellow-bright',   colors.yellow.bright],
    ['--tui-yellow-dark',     colors.yellow.dark],
    ['--tui-yellow-soft',     colors.yellow.soft],
    ['--tui-yellow-border',   colors.yellow.border],
    ['--tui-yellow-glow',     colors.yellow.glow],

    ['--tui-red',             colors.red.base],
    ['--tui-red-bright',      colors.red.bright],
    ['--tui-red-dark',        colors.red.dark],
    ['--tui-red-soft',        colors.red.soft],
    ['--tui-red-border',      colors.red.border],
    ['--tui-red-glow',        colors.red.glow],

    ['--tui-orange',          colors.orange],
    ['--tui-purple',          colors.purple],

    /* text */
    ['--tui-text-primary',    text.textPrimary],
    ['--tui-text-bright',     text.textBright],
    ['--tui-text-secondary',  text.textSecondary],
    ['--tui-text-muted',      text.textMuted],
    ['--tui-text-dim',        text.textDim],
    ['--tui-text-inverse',    text.textInverse],

    /* effects */
    ['--tui-shadow',           effects.shadow],
    ['--tui-shadow-tight',     effects.shadowTight],
    ['--tui-glow',             effects.glow],
    ['--tui-scanline-opacity', String(effects.scanlineOpacity)],

    /* shape */
    ['--tui-radius-sm',   shape.radiusSm],
    ['--tui-radius-md',   shape.radiusMd],
    ['--tui-radius-lg',   shape.radiusLg],
    ['--tui-radius-xl',   shape.radiusXl],
    ['--tui-radius-pill', shape.radiusPill],

    /* spacing */
    ['--tui-space-0',  spacing.space0],
    ['--tui-space-1',  spacing.space1],
    ['--tui-space-2',  spacing.space2],
    ['--tui-space-3',  spacing.space3],
    ['--tui-space-4',  spacing.space4],
    ['--tui-space-5',  spacing.space5],
    ['--tui-space-6',  spacing.space6],
    ['--tui-space-8',  spacing.space8],
    ['--tui-space-10', spacing.space10],
    ['--tui-space-12', spacing.space12],
    ['--tui-space-16', spacing.space16],

    /* typography */
    ['--tui-font-mono',    typography.fontMono],
    ['--tui-font-sans',    typography.fontSans],
    ['--tui-font-size-xs', typography.fontSizeXs],
    ['--tui-font-size-sm', typography.fontSizeSm],
    ['--tui-font-size-md', typography.fontSizeMd],
    ['--tui-font-size-lg', typography.fontSizeLg],

    /* terminal */
    ['--tui-terminal',          terminal.terminal],
    ['--tui-terminal-soft',     terminal.terminalSoft],
    ['--tui-terminal-panel',    terminal.terminalPanel],
    ['--tui-terminal-raised',   terminal.terminalRaised],
    ['--tui-terminal-line',     terminal.terminalLine],
    ['--tui-cursor',            terminal.cursorColor],
    ['--tui-selection-bg',      terminal.selectionBackground],
    ['--tui-selection-fg',      terminal.selectionForeground],
    ['--tui-tab-active-bg',     terminal.tabActiveBackground],
    ['--tui-tab-inactive-bg',   terminal.tabInactiveBackground],
  ];

  const lines = vars.map(([k, v]) => `  ${k}: ${v};`).join('\n');
  return `${selector} {\n${lines}\n}\n`;
}
