---
sidebar_position: 2
title: "Styling a Grid"
description: "Style your Photon Grid by sizing the container, setting row and header heights, and applying light or dark themes with the theme option, setTheme, and toggleDarkMode."
keywords: [photon grid, javascript data grid, grid styling, dark mode, grid theme]
---

# Styling a Grid

Photon Grid gives you control over sizing and appearance without any CSS framework. This tutorial shows you how to size the container, adjust row and header heights, and apply light or dark themes to your JavaScript data grid.

## Overview

Styling a grid happens at two levels. The container element controls the grid's outer dimensions, while grid options and themes control the internal look, such as row height and colors. You can change the theme when you create the grid or at runtime through the API.

## Sizing the container

The grid fills the element you render into, so give that element an explicit width and height.

```html
<div id="grid" style="width:100%;height:460px;"></div>
```

If the container has no height, the grid has nowhere to draw its rows. A fixed pixel height or a flex layout that gives the container height both work well.

## Row and header heights

Control vertical density with `rowHeight` and `headerRowHeight`. Larger values give a more spacious layout; smaller values fit more rows on screen.

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  {
    columns,
    data: rowData,
    headerRowHeight: 52,
    rowHeight: 40
  }
);
```

## Applying a theme

Photon Grid ships two built-in themes, `PhotonGrid.lightTheme` and `PhotonGrid.darkTheme`. Set one with the `theme` option.

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  {
    columns,
    data: rowData,
    theme: PhotonGrid.lightTheme
  }
);
```

## Switching themes at runtime

Use `api.setTheme(theme)` to apply a specific theme, or `api.toggleDarkMode()` to flip between light and dark. This is ideal for a theme switch button in your toolbar.

```js
const api = grid.api;

// Apply a specific theme:
api.setTheme(PhotonGrid.darkTheme);

// Or toggle between light and dark:
api.toggleDarkMode();
```

You can react to theme changes by listening for the `theme:changed` event.

```js
api.on("theme:changed", () => {
  console.log("Theme changed");
});
```

## Live Example

The example below includes a toolbar button that calls `api.toggleDarkMode()`.

<iframe
  src="/examples/styling-grid/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Option / Method | Type | Description |
| --- | --- | --- |
| `rowHeight` | `number` | Height of each data row in pixels. |
| `headerRowHeight` | `number` | Height of the header row in pixels. |
| `theme` | `object` | A theme object such as `PhotonGrid.lightTheme` or `PhotonGrid.darkTheme`. |
| `api.setTheme(theme)` | `method` | Applies a theme at runtime. |
| `api.toggleDarkMode()` | `method` | Toggles between light and dark themes. |
| `theme:changed` | `event` | Fires when the active theme changes. |

## Related

- [Registering Modules](../Setup/Registering%20Modules.md)
- [Creating a Basic Grid](./Creating%20a%20Basic%20Grid.md)
- [Key Features](../Key%20Features.md)
