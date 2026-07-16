---
sidebar_position: 2
title: "Built-in Themes"
description: "Use the Photon Grid built-in light and dark themes, switch between them at runtime with api.setTheme, and set an initial theme with the theme grid option."
keywords: [photon grid, javascript data grid, built-in themes, light theme, dark theme, grid theming]
---

# Built-in Themes

Photon Grid includes two production-ready themes out of the box, so you can ship a polished light or dark data grid without writing any custom styling. The built-in themes, `PhotonGrid.lightTheme` and `PhotonGrid.darkTheme`, are complete theme objects you can apply at construction time or swap at runtime.

## Overview

Rather than styling the grid from scratch, most applications start with one of the two bundled themes:

- **`PhotonGrid.lightTheme`** — a clean, neutral light appearance. This is the recommended default for standard applications and printouts.
- **`PhotonGrid.darkTheme`** — a dark appearance tuned for reduced brightness, ideal for dashboards, analytics tooling, and dark-mode products.

Both are ordinary objects, so you can pass them directly to the `theme` option or to `api.setTheme(theme)`.

## Setting an initial theme

Choose the starting theme with the `theme` grid option.

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  {
    columns,
    data: rowData,
    theme: PhotonGrid.lightTheme
  }
);

const api = grid.api;
```

## Switching between themes

Call `api.setTheme(theme)` with either built-in theme to switch on demand. This is the pattern behind most theme pickers.

```js
document.getElementById("light").addEventListener("click", () => {
  api.setTheme(PhotonGrid.lightTheme);
});

document.getElementById("dark").addEventListener("click", () => {
  api.setTheme(PhotonGrid.darkTheme);
});
```

Each call re-renders the grid with the new theme and emits a `theme:changed` event, which you can use to keep the rest of your interface aligned with the active theme.

```js
api.on("theme:changed", () => {
  // e.g. update the active state of your theme buttons
});
```

## Choosing a default

If your product has a single fixed appearance, set it once with the `theme` option and leave it. If you support user preference, start from a sensible default (commonly `PhotonGrid.lightTheme`) and let `api.setTheme` or `api.toggleDarkMode()` change it in response to a user action or a system-level color-scheme preference.

## Live Example

<iframe
  src="/examples/built-in-themes/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Option / Method | Type | Description |
| --- | --- | --- |
| `PhotonGrid.lightTheme` | `object` | Built-in light theme object. |
| `PhotonGrid.darkTheme` | `object` | Built-in dark theme object. |
| `theme` | `object` | Grid option that sets the initial theme. |
| `api.setTheme(theme)` | `method` | Applies a theme object to the live grid. |
| `api.toggleDarkMode()` | `method` | Toggles between the light and dark appearance. |
| `theme:changed` | `event` | Fires whenever the active theme changes. |

## Related

- [Theming Overview](./Overview.md)
- [Theming Borders](./Borders.md)
- [Theming Headers](./Headers.md)
- [Theming Selections](./Selections.md)
