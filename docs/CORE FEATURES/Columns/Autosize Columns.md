---
sidebar_position: 10
title: "Autosize Columns"
description: "Auto-size columns to their content in Photon Grid, the JavaScript data grid, using autoSizeColumn and autoSizeAllColumns, and respond with the column:autoSize event."
keywords: [photon grid, javascript data grid, autosize columns, fit columns to content, autoSizeAllColumns]
---

# Autosize Columns

Auto-sizing measures a column's content and sets its width to fit exactly — no clipped text, no wasted space. Photon Grid provides `autoSizeColumn` and `autoSizeAllColumns` so you can right-size one column or every column with a single call in the JavaScript data grid.

## Overview

Auto-sizing differs from [resizing to fit](./Columns%20Resizing.md): instead of distributing the grid's width across columns, it sizes each column to its widest visible value and header. This is the behavior users expect when they double-click a column border. Use it after data loads or changes so widths always match the content.

## Auto-sizing a single column

`autoSizeColumn(colId)` sizes one column to fit its content:

```js
// Fit the employee column to its longest name
grid.api.autoSizeColumn("name");
```

## Auto-sizing every column

`autoSizeAllColumns()` sizes all columns at once:

```js
grid.api.autoSizeAllColumns();
```

Call this after loading data so each column starts at an ideal width:

```js
const grid = new PhotonGrid.GridCore(document.getElementById("grid"), {
  columns,
  data: rowData
});

grid.api.autoSizeAllColumns();
```

## Responding to auto-size

Subscribe to `column:autoSize` to react when a column is auto-sized — for example to persist the resulting widths:

```js
grid.api.on("column:autoSize", (event) => {
  console.log("Column auto-sized", event);
});
```

## Live Example

<iframe
  src="/examples/autosize-columns/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Method / Event | Type | Description |
| --- | --- | --- |
| `autoSizeColumn(colId)` | `method` | Sizes a single column to fit its content. |
| `autoSizeAllColumns()` | `method` | Sizes every column to fit its content. |
| `column:autoSize` | `event` | Fires when a column is auto-sized. |

## Related

- [Columns Resizing](./Columns%20Resizing.md)
- [Columns Overview](./Overview.md)
- [Columns State](./Columns%20State.md)
