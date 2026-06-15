# @feanor08/terminal-ui

A flexible terminal/workbench design system. **Early v0.1.0 — API is not yet stable.**

Lightweight React + CSS component library. Structured so its design tokens can export to iTerm2 color schemes, CSS themes, and other application palettes without touching React at all.

This repo is adjacent to THG rather than a deployed THG service. It provides reusable UI primitives and token exports that can be consumed by THG frontends or any other React app. There is no backend, database, or secrets footprint in this package.

---

## Install

```bash
npm install @feanor08/terminal-ui
```

Peer dependencies: `react ^18`, `react-dom ^18`.

## Repo role

- Primary output: publishable npm package
- Secondary output: generated standalone CSS and iTerm theme files under `dist-themes/`
- No runtime services, background jobs, or deployment manifests

## Architecture overview

```text
token JSON
  -> typed token schema
  -> CSS variable export
  -> iTerm2 theme export
  -> React components consume the same CSS variables
```

Main source areas:

| Path | Purpose |
| --- | --- |
| `src/components/` | React UI primitives such as panels, tabs, tables, badges, and shell wrappers |
| `src/tokens/` | Theme token JSON plus the typed token schema |
| `src/themes/` | CSS and iTerm export functions |
| `src/styles/` | package-level CSS |
| `src/demo/` | local showcase app |
| `scripts/export-*.ts` | theme artifact generation |

---

## React usage

```tsx
import '@feanor08/terminal-ui/styles.css';
import {
  TerminalShell,
  TerminalTitlebar,
  TerminalPanel,
  TerminalMetric,
  TerminalStatusTag,
  TerminalProgressBar,
  TerminalCommandBar,
} from '@feanor08/terminal-ui';

export function App() {
  return (
    <TerminalShell theme="dark">
      <TerminalTitlebar title="my app" />
      <TerminalPanel title="Overview">
        <TerminalMetric label="requests" value="1,204" delta="+8%" deltaDirection="up" />
        <TerminalStatusTag variant="success" dot>online</TerminalStatusTag>
        <TerminalProgressBar label="CPU" value={64} />
      </TerminalPanel>
      <TerminalCommandBar prompt="$" placeholder="run a command…" />
    </TerminalShell>
  );
}
```

### Available components

| Component | Description |
|---|---|
| `TerminalShell` | Root wrapper. Sets theme class, scanline overlay. |
| `TerminalTitlebar` | macOS-style title bar with traffic-light dots. |
| `TerminalPanel` | Bordered panel with optional title and header slot. |
| `TerminalStatusTag` | Inline status badge (info / success / warning / danger / accent / muted). |
| `TerminalMetric` | Label + large value + optional delta. |
| `TerminalTable` | Typed data table with column renderers. |
| `TerminalTabs` | Tab bar with accessible `role="tab"` markup. |
| `TerminalCommandBar` | Prompt + text input styled as a shell prompt. |
| `TerminalToast` | Alert/notification bar with dismiss button. |
| `TerminalProgressBar` | Track + fill bar with variant colors. |
| `TerminalKbd` | Keyboard shortcut display (`⌘ + S`). |

---

## CSS-only usage

No React required. Import the stylesheet and use the generated class names:

```html
<link rel="stylesheet" href="node_modules/@feanor08/terminal-ui/dist/styles.css" />

<div class="tui-panel">
  <div class="tui-panel__header">
    <span class="tui-panel__title">Status</span>
  </div>
  <div class="tui-panel__body">
    <span class="tui-status-tag tui-status-tag--success">online</span>
  </div>
</div>
```

Or import the pre-generated standalone CSS theme from `dist-themes/`:

```html
<link rel="stylesheet" href="dist-themes/css/all-themes.css" />
```

---

## Theming with CSS variables

All components consume CSS custom properties prefixed `--tui-*`. Override any variable on `:root` or a scoped selector:

```css
:root {
  --tui-accent: #f97316;   /* swap accent to orange */
  --tui-bg:     #0a0a0a;   /* deeper background */
}
```

Switch to the built-in light theme by adding the `.tui-light` class to your root element:

```tsx
<TerminalShell theme="light">…</TerminalShell>
// or in plain HTML:
<div class="tui-light">…</div>
```

---

## Creating a new token theme

1. Copy `src/tokens/terminal-dark.json` to `src/tokens/my-theme.json`.
2. Edit the `meta` block: set `name`, `slug`, `appearance`, `author`, `description`.
3. Change color values to taste.
4. Import and register it:

```ts
// src/tokens/index.ts (or your own file)
import myTheme from './my-theme.json';
import type { TerminalTokens } from '@feanor08/terminal-ui';

export const MY_THEME = myTheme as TerminalTokens;
```

5. Pass it to any export function:

```ts
import { tokensToCss, tokensToIterm } from '@feanor08/terminal-ui';
const css = tokensToCss(MY_THEME, ':root');
const plist = tokensToIterm(MY_THEME);
```

## Package surface

Exports from `src/index.ts` include:

- React components such as `TerminalShell`, `TerminalPanel`, `TerminalTable`, `TerminalTabs`, and `TerminalCommandBar`
- token constants `TERMINAL_DARK`, `TERMINAL_LIGHT`, `ALL_THEMES`
- conversion helpers `tokensToCss` and `tokensToIterm`

## Environment variables

No runtime environment variables are defined in tracked source.

## Local development

```bash
cd /Volumes/Dex/Adarsh/TheHighGround/terminal-ui
npm install
npm run dev
```

## Build, lint, and export commands

```bash
npm run build
npm run lint
npm run export:iterm
npm run export:css
npm run export:themes
git diff --check
```

## Data model and APIs

- No database
- No HTTP routes
- No persistent runtime state in the repo

## What not to commit

- local package tarballs
- publish tokens from private experiments unless intentionally versioned
- generated caches or temporary demo artifacts outside `dist-themes/`

## Open questions and TODOs

- The README documents usage well, but the public API is still labeled unstable.
- If THG frontends depend on this package, release/versioning policy should be tightened before broader reuse.

---

## Exporting iTerm2 themes

```bash
npm run export:iterm
```

Writes `.itermcolors` plist files to `dist-themes/iterm/`. Double-click any file to install into iTerm2, or import via **Preferences → Profiles → Colors → Color Presets → Import**.

See [`dist-themes/README.md`](dist-themes/README.md) for the full token → iTerm2 color key mapping.

---

## Exporting CSS themes

```bash
npm run export:css
```

Writes CSS custom property files to `dist-themes/css/`. Useful for non-React apps, static sites, or terminal web UIs that want the same palette.

---

## Export both at once

```bash
npm run export:themes
```

---

## Design goals

- **Tokens first.** Colors, spacing, and type live in JSON. Components and export scripts are consumers of that data, not the source of truth.
- **No runtime overhead.** CSS variables resolve at paint time. Zero JS for theming.
- **Portable palette.** The same token file can drive a React UI, an iTerm2 profile, a static CSS theme, or anything else a script can write.
- **Typed schema.** `TerminalTokens` interface enforces token shape at compile time.

---

## Non-goals

- Tailwind or CSS-in-JS integration.
- Backend or API assumptions.
- App-specific data or business logic.
- Animation library.
- Full design system scale (this is intentionally minimal).

---

## License

MIT
