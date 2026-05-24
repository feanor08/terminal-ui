# dist-themes

Generated theme files from `@feanor08/terminal-ui` token definitions.

Run `npm run export:themes` to regenerate all files in this directory.

---

## iterm/

iTerm2 `.itermcolors` files — double-click to install into iTerm2.

### Token → iTerm2 mapping

| iTerm2 key              | Token path                        |
|-------------------------|-----------------------------------|
| Ansi 0 Color            | `ansi.black`                      |
| Ansi 1 Color            | `ansi.red`                        |
| Ansi 2 Color            | `ansi.green`                      |
| Ansi 3 Color            | `ansi.yellow`                     |
| Ansi 4 Color            | `ansi.blue`                       |
| Ansi 5 Color            | `ansi.magenta`                    |
| Ansi 6 Color            | `ansi.cyan`                       |
| Ansi 7 Color            | `ansi.white`                      |
| Ansi 8 Color            | `ansi.brightBlack`                |
| Ansi 9 Color            | `ansi.brightRed`                  |
| Ansi 10 Color           | `ansi.brightGreen`                |
| Ansi 11 Color           | `ansi.brightYellow`               |
| Ansi 12 Color           | `ansi.brightBlue`                 |
| Ansi 13 Color           | `ansi.brightMagenta`              |
| Ansi 14 Color           | `ansi.brightCyan`                 |
| Ansi 15 Color           | `ansi.brightWhite`                |
| Background Color        | `base.background`                 |
| Foreground Color        | `base.foreground`                 |
| Bold Color              | `base.foreground`                 |
| Cursor Color            | `terminal.cursorColor`            |
| Cursor Text Color       | `base.background`                 |
| Selection Color         | `terminal.selectionBackground`    |
| Selected Text Color     | `terminal.selectionForeground`    |
| Link Color              | `ansi.cyan`                       |
| Badge Color             | `ansi.red`                        |

Semantic tokens (info, success, warning, etc.) are not exported to iTerm2 — they are CSS/React-layer concerns only.

---

## css/

CSS custom property files. Each file sets variables on a selector:

- `terminal-dark.css` → `:root { … }`
- `terminal-light.css` → `.tui-light { … }`
- `all-themes.css` — both themes in one file

To use a standalone CSS theme without the React package:

```html
<link rel="stylesheet" href="dist-themes/css/all-themes.css" />
```

Then apply `.tui-light` to any element to switch themes.
