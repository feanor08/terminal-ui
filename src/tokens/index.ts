export type {
  TerminalTokens,
  TerminalTokenMetadata,
  AnsiColors,
  BaseColors,
  SemanticColorFamilies,
  ColorFamily,
  TextColors,
  Effects,
  Shape,
  Spacing,
  Typography,
  TerminalSpecific,
} from './schema.js';

import terminalDark from './terminal-dark.json';
import terminalLight from './terminal-light.json';
import type { TerminalTokens } from './schema.js';

export const TERMINAL_DARK  = terminalDark  as TerminalTokens;
export const TERMINAL_LIGHT = terminalLight as TerminalTokens;

export const ALL_THEMES: TerminalTokens[] = [TERMINAL_DARK, TERMINAL_LIGHT];
