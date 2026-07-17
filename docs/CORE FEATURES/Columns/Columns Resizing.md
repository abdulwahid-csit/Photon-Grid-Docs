---
sidebar_position: 9
title: "Columns Resizing"
description: "Resize columns in Photon Grid, the JavaScript data grid, with the resizable and minWidth keys, setColumnWidth, and sizeColumnsToFit, plus the column:resized event."
keywords: [photon grid, javascript data grid, resize columns, column width, sizeColumnsToFit, setColumnWidth]
---

# Columns Resizing

Resizing lets users and code adjust how wide each column is. Photon Grid supports drag-to-resize through the `resizable` key, enforces limits with `minWidth`, and exposes `setColumnWidth` and `sizeColumnsToFit` so you can control widths programmatically in the JavaScript data grid.

## Overview

Column widths can change in three ways: the user drags a column border, you set an exact width in code, or you ask the grid to fit all columns into the available space. A `minWidth` guards against columns collapsing too far, and the `column:resized` event lets you react to any change.
 
## Enabling drag-to-resize

Set `resizable: true` on a column to let users drag its border. Add `minWidth` to set a floor:

```js
const columns = [
  { field: "name",   header: "Employee", colId: "name",   flex: 1, resizable: true, minWidth: 140 },
  { field: "salary", header: "Salary",   colId: "salary", width: 120, resizable: true, minWidth: 90 }
];
```

## Setting an exact width

`setColumnWidth(colId, width)` sets a column to a precise pixel width:

```js
// Widen the employee column
grid.api.setColumnWidth("name", 260);
```

The `minWidth` on the column still applies, so the column will not shrink below its configured minimum.

## Fitting all columns to the grid

`sizeColumnsToFit()` distributes the available horizontal space across the columns so they exactly fill the grid with no leftover gap or overflow:

```js
grid.api.sizeColumnsToFit();
```

This is a good action to run after the grid loads or the container resizes.

## Responding to resize

Subscribe to `column:resized` to react whenever a width changes — whether from a drag or an API call:

```js
grid.api.on("column:resized", (event) => {
  console.log("Column resized", event);
});
```

## Live Example

<iframe
  src="/examples/columns-resizing/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Method / Option / Event | Type | Description |
| --- | --- | --- |
| `resizable` | `boolean` | Column definition key; allows drag-to-resize. |
| `minWidth` | `number` | Minimum width a column can be resized to. |
| `setColumnWidth(colId, width)` | `method` | Sets a column to an exact pixel width. |
| `sizeColumnsToFit()` | `method` | Resizes all columns to fill the grid width. |
| `column:resized` | `event` | Fires when a column width changes. |

## Related

- [Autosize Columns](./Autosize%20Columns.md)
- [Columns Overview](./Overview.md)
- [Columns State](./Columns%20State.md)
