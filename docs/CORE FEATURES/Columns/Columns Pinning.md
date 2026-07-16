---
sidebar_position: 8
title: "Columns Pinning"
description: "Pin columns to the left or right in Photon Grid, the JavaScript data grid, using the pinned key and setColumnPin, and react to changes with the column:pinned event."
keywords: [photon grid, javascript data grid, pinned columns, freeze columns, setColumnPin, sticky columns]
---

# Columns Pinning

Pinning keeps a column fixed against the left or right edge while the rest of the grid scrolls horizontally. In Photon Grid you can pin a column up front with the `pinned` key or change it at runtime with `setColumnPin`, making key identifier columns always visible in the JavaScript data grid.

## Overview

Pinned columns are ideal for anchoring a row's identity — such as an ID or name — so it stays on screen while the user scrolls through many wide columns. A column can be pinned `"left"`, pinned `"right"`, or unpinned (back into the scrollable center).

## Pinning in the column definition

Set `pinned` on the column definition to pin it from the start:

```js
const columns = [
  { field: "id",   header: "ID",       colId: "id",   width: 80, pinned: "left" },
  { field: "name", header: "Employee", colId: "name", flex: 1 },
  { field: "active", header: "Active", colId: "active", width: 100, pinned: "right" }
];
```

Here the `id` column is anchored to the left edge and `active` to the right edge.

## Pinning at runtime

`setColumnPin(colId, side)` changes a column's pin state on the fly. Pass `"left"`, `"right"`, or `null` to unpin:

```js
// Pin the department column to the left
grid.api.setColumnPin("department", "left");

// Unpin it again
grid.api.setColumnPin("department", null);
```

To toggle a pin, check the column's current state via `getColumn`:

```js
function togglePin(colId) {
  const column = grid.api.getColumn(colId);
  const isPinned = column && column.pinned === "left";
  grid.api.setColumnPin(colId, isPinned ? null : "left");
}
```

## Responding to pin changes

Subscribe to `column:pinned` to react whenever a column is pinned or unpinned:

```js
grid.api.on("column:pinned", (event) => {
  console.log("Pin state changed", event);
});
```

## Live Example

<iframe
  src="/examples/columns-pinning/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Method / Option / Event | Type | Description |
| --- | --- | --- |
| `pinned` | `string` | Column definition key; `"left"` or `"right"`. |
| `setColumnPin(colId, side)` | `method` | Pins a column `"left"`, `"right"`, or `null` to unpin. |
| `getColumn(colId)` | `method` | Returns a column, including its current `pinned` state. |
| `column:pinned` | `event` | Fires when a column is pinned or unpinned. |

## Related

- [Columns Definition](./Columns%20Definition.md)
- [Columns Moving](./Columns%20Moving.md)
- [Columns State](./Columns%20State.md)
