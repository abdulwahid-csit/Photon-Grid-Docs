---
sidebar_position: 7
title: "Columns Moving"
description: "Reorder columns programmatically in Photon Grid, the JavaScript data grid, using moveColumn and moveColumns, and respond to reordering with the column:moved event."
keywords: [photon grid, javascript data grid, move columns, reorder columns, moveColumn, column order]
---

# Columns Moving

Column moving lets you change the left-to-right order of columns at runtime. Photon Grid exposes `moveColumn` and `moveColumns` on the API so you can reposition one or many columns programmatically, and emits a `column:moved` event whenever the order changes in the JavaScript data grid.

## Overview

Every column sits at a zero-based index across the grid. Moving a column means giving it a new target index; the surrounding columns shift to make room. You reference columns by their stable `colId`, which keeps your code readable regardless of the current order.

## Moving a single column

`moveColumn(colId, toIndex)` moves one column to a new position:

```js
// Move the "country" column to the first position
grid.api.moveColumn("country", 0);
```

To move a column relative to where it currently is, read the current order from `getAllColumns` and compute the new index:

```js
function nudge(colId, delta) {
  const ids = grid.api.getAllColumns().map((c) => c.colId);
  const current = ids.indexOf(colId);
  if (current === -1) return;

  const target = Math.max(0, Math.min(ids.length - 1, current + delta));
  grid.api.moveColumn(colId, target);
}

nudge("salary", -1); // move one position left
nudge("salary", 1);  // move one position right
```

## Moving multiple columns

`moveColumns(colIds, toIndex)` relocates several columns together, preserving their relative order:

```js
// Group salary and active together starting at index 1
grid.api.moveColumns(["salary", "active"], 1);
```

## Responding to reordering

Subscribe to the `column:moved` event to react whenever the order changes — for example to persist the new layout:

```js
grid.api.on("column:moved", (event) => {
  console.log("Column order changed", event);
});
```

## Live Example

<iframe
  src="/examples/columns-moving/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Method / Event | Type | Description |
| --- | --- | --- |
| `moveColumn(colId, toIndex)` | `method` | Moves one column to a new index. |
| `moveColumns(colIds, toIndex)` | `method` | Moves several columns to a target index together. |
| `getAllColumns()` | `method` | Returns all columns in their current order. |
| `column:moved` | `event` | Fires when column order changes. |

## Related

- [Columns State](./Columns%20State.md)
- [Columns Pinning](./Columns%20Pinning.md)
- [Column Groups](./Columns%20Groups.md)
