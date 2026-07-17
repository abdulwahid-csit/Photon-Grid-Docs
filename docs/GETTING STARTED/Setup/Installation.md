---
sidebar_position: 1
title: "Installation"
description: "Install Photon Grid in seconds — a single CDN script tag for vanilla JS, or an npm package for React, Angular, and Vue."
keywords: [photon grid, javascript data grid, install data grid, cdn, react data grid, angular data grid, vue data grid, photon grid setup]
---

# Installation

Getting started with Photon Grid takes seconds. Use the CDN build for plain JavaScript, or install the framework wrapper for React, Angular, or Vue. This guide shows you how to install the grid, add a container, and render your first grid.

## Overview

Photon Grid ships as a zero-dependency core engine plus thin framework wrappers:

- **Vanilla JS** uses the UMD bundle from a CDN `<script>` tag, exposing a single global called `PhotonGrid` that contains everything, including the `GridCore` constructor.
- **React / Angular / Vue** install from npm and give you a single declarative component that binds to the same core engine.

Pick your framework in the tabs below — your choice is remembered across the whole documentation.

## Install

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

Add the Photon Grid script to the `<head>` of your page. This is the primary installation method and requires no build step.

```html
<script src="https://cdn.jsdelivr.net/npm/photon-grid-core@2.0.1/photon-grid.min.js"></script>
```

After the script loads, `PhotonGrid` is available on the global `window` object:

```js
console.log(typeof PhotonGrid);          // "object"
console.log(typeof PhotonGrid.GridCore); // "function"
```

</TabItem>
<TabItem value="react" label="React">

Install the React wrapper alongside the core engine:

```bash
npm install photon-grid-react photon-grid-core
```

`react` and `react-dom` (>= 18) are peer dependencies. Styling is injected automatically by the core engine — no CSS import is required.

```tsx
import { PhotonGrid } from 'photon-grid-react';
```

</TabItem>
<TabItem value="angular" label="Angular">

Install the Angular wrapper alongside the core engine:

```bash
npm install photon-grid-angular photon-grid-core
```

`PhotonGridComponent` is standalone — import it directly into any standalone component or NgModule. Styling is injected automatically by the core engine — no CSS import is required.

```ts
import { PhotonGridComponent } from 'photon-grid-angular';
```

</TabItem>
<TabItem value="vue" label="Vue">

Install the Vue 3 wrapper alongside the core engine:

```bash
npm install photon-grid-vue photon-grid-core
```

Styling is injected automatically by the core engine — no CSS import is required.

```ts
import { PhotonGrid } from 'photon-grid-vue';
```

</TabItem>
</FrameworkTabs>

## Add a container

Photon Grid renders into an element you provide. With the framework wrappers the component manages its own element, but you should still give the grid room to lay out.

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

```html
<div id="grid"></div>
```

```css
#grid {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
}
```

</TabItem>
<TabItem value="react" label="React">

Wrap the grid in a sized container:

```tsx
<div style={{ width: '100%', height: 500 }}>
  {/* <PhotonGrid /> goes here */}
</div>
```

</TabItem>
<TabItem value="angular" label="Angular">

Wrap the grid in a sized container:

```html
<div style="width: 100%; height: 500px;">
  <!-- <photon-grid> goes here -->
</div>
```

</TabItem>
<TabItem value="vue" label="Vue">

Wrap the grid in a sized container:

```vue
<template>
  <div style="width: 100%; height: 500px;">
    <!-- <PhotonGrid /> goes here -->
  </div>
</template>
```

</TabItem>
</FrameworkTabs>

## Create a minimal grid

Define your columns and data, then render the grid.

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

Construct a grid with `new PhotonGrid.GridCore(element, options)`. The instance exposes its API as `grid.api`.

```js
const columns = [
  { field: "id", header: "ID", colId: "id", width: 80, configurable: false },
  { field: "name", header: "Employee", colId: "name", flex: 1 },
  { field: "department", header: "Department", colId: "department", flex: 1 },
  { field: "salary", header: "Salary", colId: "salary", flex: 1 }
];

const rowData = [
  { id: 1, name: "John Smith", department: "Engineering", salary: 85000 },
  { id: 2, name: "Sarah Johnson", department: "Finance", salary: 72000 },
  { id: 3, name: "Michael Brown", department: "Marketing", salary: 68000 }
];

const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  {
    columns,
    data: rowData,
    headerRowHeight: 48,
    rowHeight: 42
  }
);
```

</TabItem>
<TabItem value="react" label="React">

Render the `<PhotonGrid />` component. `onGridReady` hands you the `GridApi` for full programmatic control.

```tsx
import { PhotonGrid } from 'photon-grid-react';
import type { PhotonGridColumnDef } from 'photon-grid-react';
import type { GridApi } from 'photon-grid-core';

const columns: PhotonGridColumnDef[] = [
  { field: 'id', header: 'ID', colId: 'id', width: 80, configurable: false },
  { field: 'name', header: 'Employee', colId: 'name', flex: 1 },
  { field: 'department', header: 'Department', colId: 'department', flex: 1 },
  { field: 'salary', header: 'Salary', colId: 'salary', flex: 1 },
];

const rowData = [
  { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Sarah Johnson', department: 'Finance', salary: 72000 },
  { id: 3, name: 'Michael Brown', department: 'Marketing', salary: 68000 },
];

export function App() {
  const onReady = (api: GridApi) => {
    console.log('rows:', api.getVisibleRows().length);
  };

  return (
    <div style={{ width: '100%', height: 500 }}>
      <PhotonGrid
        columns={columns}
        dataSet={rowData}
        options={{ headerRowHeight: 48, rowHeight: 42 }}
        onGridReady={onReady}
      />
    </div>
  );
}
```

</TabItem>
<TabItem value="angular" label="Angular">

Use the standalone `<photon-grid>` component. `(gridReady)` emits the `GridApi` for full programmatic control.

```ts
import { Component } from '@angular/core';
import { PhotonGridComponent } from 'photon-grid-angular';
import type { ColumnDef } from 'photon-grid-angular';
import type { GridApi } from 'photon-grid-core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PhotonGridComponent],
  template: `
    <div style="width: 100%; height: 500px;">
      <photon-grid
        [columns]="columns"
        [dataSet]="rowData"
        [options]="{ headerRowHeight: 48, rowHeight: 42 }"
        (gridReady)="onReady($event)">
      </photon-grid>
    </div>
  `,
})
export class AppComponent {
  columns: ColumnDef[] = [
    { field: 'id', header: 'ID', colId: 'id', width: 80, configurable: false },
    { field: 'name', header: 'Employee', colId: 'name', flex: 1 },
    { field: 'department', header: 'Department', colId: 'department', flex: 1 },
    { field: 'salary', header: 'Salary', colId: 'salary', flex: 1 },
  ];

  rowData = [
    { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000 },
    { id: 2, name: 'Sarah Johnson', department: 'Finance', salary: 72000 },
    { id: 3, name: 'Michael Brown', department: 'Marketing', salary: 68000 },
  ];

  onReady(api: GridApi): void {
    console.log('rows:', api.getVisibleRows().length);
  }
}
```

</TabItem>
<TabItem value="vue" label="Vue">

Use the `<PhotonGrid />` component. `@gridReady` emits the `GridApi` for full programmatic control.

```vue
<script setup lang="ts">
import { PhotonGrid } from 'photon-grid-vue';
import type { ColumnDef, GridApi } from 'photon-grid-vue';

const columns: ColumnDef[] = [
  { field: 'id', header: 'ID', colId: 'id', width: 80, configurable: false },
  { field: 'name', header: 'Employee', colId: 'name', flex: 1 },
  { field: 'department', header: 'Department', colId: 'department', flex: 1 },
  { field: 'salary', header: 'Salary', colId: 'salary', flex: 1 },
];

const rowData = [
  { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Sarah Johnson', department: 'Finance', salary: 72000 },
  { id: 3, name: 'Michael Brown', department: 'Marketing', salary: 68000 },
];

function onReady(api: GridApi) {
  console.log('rows:', api.getVisibleRows().length);
}
</script>

<template>
  <div style="width: 100%; height: 500px;">
    <PhotonGrid
      :columns="columns"
      :dataSet="rowData"
      :options="{ headerRowHeight: 48, rowHeight: 42 }"
      @gridReady="onReady"
    />
  </div>
</template>
```

</TabItem>
</FrameworkTabs>

## Using the global PhotonGrid

Because the CDN build is UMD, all exports live under the `PhotonGrid` global — you never import individual modules with the CDN build. The most common entry points are:

- `PhotonGrid.GridCore` — the main grid constructor.
- `PhotonGrid.createGrid` — a factory helper that also builds a grid.
- `PhotonGrid.GridApi` — the API class; an instance is available as `grid.api`.
- `PhotonGrid.lightTheme` and `PhotonGrid.darkTheme` — built-in theme objects.

With the React, Angular, and Vue wrappers you import these named exports from the wrapper package (or from `photon-grid-core`) instead of reaching into a global. See [Registering Modules](./Registering%20Modules.md) for a full tour.

## Live Example

<iframe
  src="/examples/installation/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Option / Method | Type | Description |
| --- | --- | --- |
| `PhotonGrid.GridCore` | `constructor` | Creates a grid: `new PhotonGrid.GridCore(element, options)` (vanilla). |
| `<PhotonGrid>` / `<photon-grid>` | `component` | The wrapper component for React, Vue, and Angular. |
| `columns` | `array` | Array of column definitions. |
| `data` / `dataSet` | `array` | Row data — `data` in vanilla, `dataSet` in the wrappers. |
| `headerRowHeight` | `number` | Height of the header row in pixels. |
| `rowHeight` | `number` | Height of each data row in pixels. |
| `grid.api` / `onGridReady` | `GridApi` | The API instance for driving the grid at runtime. |

## Related

- [Quick Start](../Quick%20Start.md)
- [Registering Modules](./Registering%20Modules.md)
- [Creating a Basic Grid](../Tutorials/Creating%20a%20Basic%20Grid.md)
