---
sidebar_position: 2
title: "Registering Modules"
description: "Photon Grid ships every feature in one bundle — reached through the global PhotonGrid namespace on the CDN, or through named imports in React, Angular, and Vue."
keywords: [photon grid, javascript data grid, photon grid modules, global namespace, umd build, named imports]
---

# Registering Modules

Unlike grids that require you to register feature modules one by one, Photon Grid is all-inclusive: every feature ships in a single bundle. In vanilla JS you reach features through the global `PhotonGrid` namespace; in React, Angular, and Vue you reach them through named imports from the wrapper package (or from `photon-grid-core`). This guide shows what is available and how to access it. Pick your framework in the tabs below — your choice is remembered across the whole documentation.

## Overview

There is nothing to register. Sorting, filtering, grouping, selection, editing, pagination, charts, and theming are already bundled and enabled through grid options.

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

Add the CDN script; everything lives on the `PhotonGrid` global.

```html
<script src="https://cdn.jsdelivr.net/npm/photon-grid-core@2.0.1/photon-grid.min.js"></script>
```

</TabItem>
<TabItem value="react" label="React">

Install the wrapper; import named exports where you need them.

```bash
npm install photon-grid-react photon-grid-core
```

</TabItem>
<TabItem value="angular" label="Angular">

Install the wrapper; import named exports where you need them.

```bash
npm install photon-grid-angular photon-grid-core
```

</TabItem>
<TabItem value="vue" label="Vue">

Install the wrapper; import named exports where you need them.

```bash
npm install photon-grid-vue photon-grid-core
```

</TabItem>
</FrameworkTabs>

## The key members

Whether you reach them through the global or through imports, these are the members you use most:

| Member | Purpose |
| --- | --- |
| `GridCore` | The main grid class you construct (vanilla). |
| `createGrid` | A factory helper that builds a grid. |
| `GridApi` | The API class; an instance is available via `grid.api` or the ready callback. |
| `GridEventType` | An enum of event name constants. |
| `lightTheme` | The built-in light theme object. |
| `darkTheme` | The built-in dark theme object. |
| `ThemeManager` | The theme manager class. |

## Accessing GridCore and GridApi

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

Everything is a property of the `PhotonGrid` global.

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  { columns, data: rowData }
);

const api = grid.api;
console.log(api instanceof PhotonGrid.GridApi); // true
```

</TabItem>
<TabItem value="react" label="React">

The component comes from the wrapper; types and helpers come from the packages.

```tsx
import { PhotonGrid } from 'photon-grid-react';
import type { GridApi, GridEventType } from 'photon-grid-core';
```

</TabItem>
<TabItem value="angular" label="Angular">

The component comes from the wrapper; types and helpers come from the packages.

```ts
import { PhotonGridComponent } from 'photon-grid-angular';
import type { GridApi, GridEventType } from 'photon-grid-core';
```

</TabItem>
<TabItem value="vue" label="Vue">

The component comes from the wrapper; types and helpers come from the packages.

```ts
import { PhotonGrid } from 'photon-grid-vue';
import type { GridApi, GridEventType } from 'photon-grid-vue';
```

</TabItem>
</FrameworkTabs>

## Subscribing to events

`GridEventType` holds string constants for every event. You can subscribe with the constant or the raw string value; both are equivalent. In the wrappers, prefer the declarative event bindings (`onGridReady`, `@gridReady`, `(gridReady)`), but you can still call `api.on(...)` for any event.

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

```js
grid.api.on(PhotonGrid.GridEventType.GRID_READY, () => {
  console.log("Grid is ready");
});

// Equivalent, using the string value directly:
grid.api.on("grid:ready", () => {
  console.log("Grid is ready");
});
```

</TabItem>
<TabItem value="react" label="React">

```tsx
<PhotonGrid columns={columns} dataSet={rowData} onGridReady={(api) => {
  api.on('sort:changed', () => console.log('sorted'));
}} />
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts
onReady(api: GridApi): void {
  api.on('sort:changed', () => console.log('sorted'));
}
```

</TabItem>
<TabItem value="vue" label="Vue">

```ts
function onReady(api: GridApi) {
  api.on('sort:changed', () => console.log('sorted'));
}
```

</TabItem>
</FrameworkTabs>

## Themes and ThemeManager

The built-in themes are plain objects you pass to the `theme` option or to `api.setTheme(theme)`.

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

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

</TabItem>
<TabItem value="react" label="React">

```tsx
import { darkTheme, lightTheme } from 'photon-grid-core';

<PhotonGrid
  columns={columns}
  dataSet={rowData}
  options={{ theme: darkTheme }}
  onGridReady={(api) => api.setTheme(lightTheme)}
/>
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts
import { darkTheme, lightTheme } from 'photon-grid-core';

// options = { theme: darkTheme }
onReady(api: GridApi): void {
  api.setTheme(lightTheme);
}
```

</TabItem>
<TabItem value="vue" label="Vue">

```ts
import { darkTheme, lightTheme } from 'photon-grid-core';

const options = { theme: darkTheme };

function onReady(api: GridApi) {
  api.setTheme(lightTheme);
}
```

</TabItem>
</FrameworkTabs>

## Live Example

The example below builds a grid using the dark theme via the `theme` option.

<iframe
  src="/examples/registering-modules/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Export / Method | Type | Description |
| --- | --- | --- |
| `GridCore` | `constructor` | Main grid class (vanilla). |
| `createGrid` | `function` | Factory helper for creating a grid. |
| `GridApi` | `class` | API class; instance available via `grid.api` or the ready callback. |
| `GridEventType` | `object` | Enum of event name constants. |
| `lightTheme` | `object` | Built-in light theme. |
| `darkTheme` | `object` | Built-in dark theme. |
| `ThemeManager` | `class` | Theme manager class. |
| `api.setTheme(theme)` | `method` | Applies a theme at runtime. |

## Related

- [Installation](./Installation.md)
- [Styling a Grid](../Tutorials/Styling%20a%20Grid.md)
- [Key Features](../Key%20Features.md)
