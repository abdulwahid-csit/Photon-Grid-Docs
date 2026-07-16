---
sidebar_position: 1
title: "Installation"
description: "Install Photon Grid in seconds with a single CDN script tag and start building fast, feature-rich JavaScript data grids using the global PhotonGrid namespace."
keywords: [photon grid, javascript data grid, install data grid, cdn, photon grid setup]
---

# Installation

Getting started with Photon Grid takes a single script tag. This guide shows you how to install the JavaScript data grid from a CDN, add a container, and render your first grid using the global `PhotonGrid` namespace.

## Overview

Photon Grid ships as a UMD bundle, so the simplest and recommended way to add it to a page is a CDN `<script>` tag. Once the script loads, it exposes a single global called `PhotonGrid` that contains everything you need, including the `GridCore` constructor.

## Install via CDN

Add the Photon Grid script to the `<head>` of your page. This is the primary installation method and requires no build step.

```html
<script src="https://cdn.jsdelivr.net/npm/photon-grid-core@2.0.1/photon-grid.min.js"></script>
```

After the script loads, `PhotonGrid` is available on the global `window` object:

```js
console.log(typeof PhotonGrid);        // "object"
console.log(typeof PhotonGrid.GridCore); // "function"
```

## Add a container

Photon Grid renders into an element you provide. Give it a sized container so the grid has room to lay out its rows and columns.

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

## Create a minimal grid

Define your columns and data, then construct a grid with `new PhotonGrid.GridCore(element, options)`. The instance exposes its API as `grid.api`.

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

## Using the global PhotonGrid

Because the CDN build is UMD, all exports live under the `PhotonGrid` global. You never import individual modules with the CDN build. The most common entry points are:

- `PhotonGrid.GridCore` — the main grid constructor.
- `PhotonGrid.createGrid` — a factory helper that also builds a grid.
- `PhotonGrid.GridApi` — the API class; an instance is available as `grid.api`.
- `PhotonGrid.lightTheme` and `PhotonGrid.darkTheme` — built-in theme objects.

See [Registering Modules](./Registering%20Modules.md) for a full tour of the global namespace.

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
| `PhotonGrid.GridCore` | `constructor` | Creates a grid: `new PhotonGrid.GridCore(element, options)`. |
| `columns` | `array` | Array of column definitions. |
| `data` | `array` | Array of row objects. |
| `headerRowHeight` | `number` | Height of the header row in pixels. |
| `rowHeight` | `number` | Height of each data row in pixels. |
| `grid.api` | `GridApi` | The API instance for driving the grid at runtime. |

## Related

- [Quick Start](../Quick%20Start.md)
- [Registering Modules](./Registering%20Modules.md)
- [Creating a Basic Grid](../Tutorials/Creating%20a%20Basic%20Grid.md)
