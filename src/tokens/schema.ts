export interface TerminalTokenMetadata {
  name: string;
  slug: string;
  appearance: 'dark' | 'light';
  author: string;
  description: string;
}

export interface AnsiColors {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightMagenta: string;
  brightCyan: string;
  brightWhite: string;
}

export interface BaseColors {
  background: string;
  backgroundOutside: string;
  foreground: string;
  surface: string;
  surfaceRaised: string;
  surfacePressed: string;
  border: string;
  borderStrong: string;
  muted: string;
}

/** One semantic color with derived tint/border/glow values */
export interface ColorFamily {
  base: string;
  bright: string;
  dark: string;
  soft: string;
  border: string;
  glow: string;
}

export interface SemanticColorFamilies {
  blue: ColorFamily;
  green: ColorFamily;
  yellow: ColorFamily;
  red: ColorFamily;
  orange: string;
  purple: string;
}

export interface TextColors {
  textPrimary: string;
  textBright: string;
  textSecondary: string;
  textMuted: string;
  textDim: string;
  textInverse: string;
}

export interface Effects {
  shadow: string;
  shadowTight: string;
  glow: string;
  scanlineOpacity: number;
}

export interface Shape {
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  radiusPill: string;
}

export interface Spacing {
  space0: string;
  space1: string;
  space2: string;
  space3: string;
  space4: string;
  space5: string;
  space6: string;
  space8: string;
  space10: string;
  space12: string;
  space16: string;
}

export interface Typography {
  fontMono: string;
  fontSans: string;
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
}

export interface TerminalSpecific {
  terminal: string;
  terminalSoft: string;
  terminalPanel: string;
  terminalRaised: string;
  terminalLine: string;
  cursorColor: string;
  selectionBackground: string;
  selectionForeground: string;
  tabActiveBackground: string;
  tabInactiveBackground: string;
}

export interface TerminalTokens {
  meta: TerminalTokenMetadata;
  base: BaseColors;
  ansi: AnsiColors;
  colors: SemanticColorFamilies;
  text: TextColors;
  effects: Effects;
  shape: Shape;
  spacing: Spacing;
  typography: Typography;
  terminal: TerminalSpecific;
}
