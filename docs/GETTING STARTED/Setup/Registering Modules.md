---
sidebar_position: 2
title: "Registering Modules"
description: "Learn how the Photon Grid CDN build ships every feature under the global PhotonGrid namespace, including GridCore, GridApi, GridEventType, themes, and ThemeManager."
keywords: [photon grid, javascript data grid, photon grid modules, global namespace, umd build]
---

# Registering Modules

Unlike grids that require you to register feature modules one by one, the Photon Grid CDN build is all-inclusive: every feature ships in a single UMD bundle exposed on the global `PhotonGrid` namespace. This guide shows you what lives on that global and how to access it.

## Overview

When you add the CDN script, there is nothing to register. Sorting, filtering, grouping, selection, editing, pagination, charts, and theming are already bundled and enabled through grid options. Instead of importing modules, you reach into the `PhotonGrid` global for the handful of exports you need.

```html
<script src="https://cdn.jsdelivr.net/npm/photon-grid-core@2.0.1/photon-grid.min.js"></script>
```

## The PhotonGrid global

After the script loads, `window.PhotonGrid` exposes these key members:

| Export | Purpose |
| --- | --- |
| `PhotonGrid.GridCore` | The main grid class you construct. |
| `PhotonGrid.createGrid` | A factory helper that builds a grid. |
| `PhotonGrid.GridApi` | The API class; an instance is available as `grid.api`. |
| `PhotonGrid.GridEventType` | An enum of event name constants. |
| `PhotonGrid.lightTheme` | The built-in light theme object. |
| `PhotonGrid.darkTheme` | The built-in dark theme object. |
| `PhotonGrid.ThemeManager` | The theme manager class. |

## Accessing GridCore and GridApi

You construct the grid with `PhotonGrid.GridCore` and read its API from `grid.api`, which is an instance of `PhotonGrid.GridApi`.

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  { columns, data: rowData }
);

const api = grid.api;
console.log(api instanceof PhotonGrid.GridApi); // true
```

## Using GridEventType

`PhotonGrid.GridEventType` holds string constants for every event. You can subscribe with the constant or the raw string value; both are equivalent.

```js
grid.api.on(PhotonGrid.GridEventType.GRID_READY, () => {
  console.log("Grid is ready");
});

// Equivalent, using the string value directly:
grid.api.on("grid:ready", () => {
  console.log("Grid is ready");
});
```

## Accessing themes and ThemeManager

The built-in themes are plain objects you pass to the `theme` option or to `api.setTheme(theme)`. `PhotonGrid.ThemeManager` is available for advanced theme handling.

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  {
    columns,
    data: rowData,
    theme: PhotonGrid.darkTheme
  }
);

// Switch themes at runtime:
grid.api.setTheme(PhotonGrid.lightTheme);
```

## Live Example

The example below builds a grid using `PhotonGrid.darkTheme` via the `theme` option.

<iframe
  src="/examples/registering-modules/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Export / Method | Type | Description |
| --- | --- | --- |
| `PhotonGrid.GridCore` | `constructor` | Main grid class. |
| `PhotonGrid.createGrid` | `function` | Factory helper for creating a grid. |
| `PhotonGrid.GridApi` | `class` | API class; instance available as `grid.api`. |
| `PhotonGrid.GridEventType` | `object` | Enum of event name constants. |
| `PhotonGrid.lightTheme` | `object` | Built-in light theme. |
| `PhotonGrid.darkTheme` | `object` | Built-in dark theme. |
| `PhotonGrid.ThemeManager` | `class` | Theme manager class. |
| `api.setTheme(theme)` | `method` | Applies a theme at runtime. |

## Related

- [Installation](./Installation.md)
- [Styling a Grid](../Tutorials/Styling%20a%20Grid.md)
- [Key Features](../Key%20Features.md)
