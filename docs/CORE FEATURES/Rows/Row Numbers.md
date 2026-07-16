---
sidebar_position: 8
title: "Row Numbers"
description: "Add a sequential row number or index column to Photon Grid using a computed field or a custom cell renderer, and read rows positionally with getRowByIndex."
keywords: [photon grid, javascript data grid, row numbers, row index column, getRowByIndex, cell renderer]
---

# Row Numbers

A **row number column** shows a running index next to each row, making it easy for users to reference and count records. Photon Grid has no dedicated index option, but you can add one with a computed field or a cell `renderer`, and read rows positionally with `getRowByIndex`.

## Overview

There are two practical ways to display row numbers:

- **Computed field** — add a numeric property to each row object and bind a column to it. This is the simplest approach and works with the standard column pipeline.
- **Cell renderer** — use a column `renderer` to draw the index without storing it on the data.

Either way, the number is a presentation concern; your underlying data stays clean.

## Using a computed field

Assign a sequential value to each row, then bind a narrow `#` column to that field.

```js
const rawRows = [
  { id: 101, name: "John Smith",    department: "Engineering" },
  { id: 102, name: "Sarah Johnson", department: "Finance" },
  { id: 103, name: "Michael Brown", department: "Marketing" }
];

const rowData = rawRows.map((row, index) => ({
  ...row,
  rowNumber: index + 1
}));

const columns = [
  { field: "rowNumber",  header: "#",          colId: "rowNumber", width: 60, configurable: false },
  { field: "name",       header: "Employee",   colId: "name",      flex: 1 },
  { field: "department", header: "Department", colId: "department", flex: 1 }
];

const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  { columns, data: rowData, headerRowHeight: 48, rowHeight: 42 }
);
```

## Using a cell renderer

If you prefer not to store the index on your rows, render it in a column instead. The `renderer` returns the content shown for the cell.

```js
const columns = [
  {
    header: "#",
    colId: "rowNumber",
    width: 60,
    renderer: (params) => (params && params.rowIndex != null ? params.rowIndex + 1 : "")
  }
  // ...other columns
];
```

## Reading rows by position

`getRowByIndex` returns the row node at a display index, which pairs naturally with a row number column when you need to act on the row a user referenced.

```js
const api = grid.api;

const firstRow = api.getRowByIndex(0);
console.log("First row", firstRow);
```

## Live Example

<iframe
  src="/examples/row-numbers/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Option / Method | Type | Description |
| --- | --- | --- |
| `field` | `string` | Binds a column to a data property, such as a computed `rowNumber`. |
| `renderer` | `function` | Renders custom cell content, such as a sequential index. |
| `getRowByIndex(i)` | `method` | Returns the row node at the given display index. |

## Related

- [Rows Overview](./Overview.md)
- [Row Height](./Row%20Height.md)
- [Row Actions](./Row%20Actions.md)
- [Quick Start](../../GETTING%20STARTED/Quick%20Start.md)
