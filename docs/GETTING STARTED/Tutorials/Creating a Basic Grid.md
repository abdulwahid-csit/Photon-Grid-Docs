---
sidebar_position: 1
title: "Creating a Basic Grid"
description: "Follow a step-by-step tutorial to build your first Photon Grid, from adding a container and defining columns to constructing GridCore and reading the grid API."
keywords: [photon grid, javascript data grid, create data grid, gridcore, basic grid tutorial]
---

# Creating a Basic Grid

This tutorial walks you through building your first Photon Grid from scratch. You will add a container, define columns and data, construct `GridCore`, and read the grid's `api` object so you can drive it later.

## Overview

A Photon Grid needs three things: a DOM element to render into, a set of column definitions, and an array of row data. You pass the columns and data to the `GridCore` constructor along with any options, and the grid handles rendering and virtualization for you.

## Step 1: Add the script and a container

Include the CDN build and add a sized container element.

```html
<script src="https://cdn.jsdelivr.net/npm/photon-grid-core@2.0.1/photon-grid.min.js"></script>

<div id="grid" style="width:100%;height:460px;"></div>
```

## Step 2: Define your columns

Each column needs a `field` that maps to a property on your row objects, a `header` label, and a stable `colId`. Use `width` for fixed columns and `flex` to share remaining space.

```js
const columns = [
  { field: "id", header: "ID", colId: "id", width: 80, configurable: false },
  { field: "name", header: "Employee", colId: "name", flex: 1 },
  { field: "department", header: "Department", colId: "department", flex: 1 },
  { field: "country", header: "Country", colId: "country", flex: 1 },
  { field: "salary", header: "Salary", colId: "salary", flex: 1 },
  { field: "active", header: "Active", colId: "active", width: 100 }
];
```

## Step 3: Provide your data

Data is a plain array of objects. Each object's keys must match the `field` names in your columns.

```js
const rowData = [
  { id: 1, name: "John Smith", department: "Engineering", country: "USA", salary: 85000, active: true },
  { id: 2, name: "Sarah Johnson", department: "Finance", country: "UK", salary: 72000, active: true },
  { id: 3, name: "Michael Brown", department: "Marketing", country: "Canada", salary: 68000, active: false }
];
```

## Step 4: Construct GridCore

Create the grid by passing the container element and an options object with your `columns` and `data`. You can also set `headerRowHeight` and `rowHeight`.

```js
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

## Step 5: Read the grid API

Every grid exposes its API as `grid.api`. Use it to read state and drive the grid at runtime. For example, you can check how many rows are displayed.

```js
const api = grid.api;
console.log(api.getDisplayedRowCount()); // 3
```

## Live Example

<iframe
  src="/examples/basic-grid/index.html"
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
| `field` | `string` | Row property a column maps to. |
| `colId` | `string` | Stable column id. |
| `flex` | `number` | Flex grow factor for column width. |
| `grid.api` | `GridApi` | The API instance for driving the grid. |
| `api.getDisplayedRowCount()` | `method` | Returns the number of displayed rows. |

## Related

- [Installation](../Setup/Installation.md)
- [Styling a Grid](./Styling%20a%20Grid.md)
- [Testing](./Testing.md)
