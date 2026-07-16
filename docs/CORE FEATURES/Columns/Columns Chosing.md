---
sidebar_position: 5
title: "Columns Choosing"
description: "Show and hide columns at runtime in Photon Grid, the JavaScript data grid, using setColumnVisible, setColumnsVisible, and getVisibleColumns with the configurable and hide keys."
keywords: [photon grid, javascript data grid, column visibility, show hide columns, column chooser]
---

# Columns Choosing

Column choosing lets your users decide which columns are visible. Photon Grid combines definition-level keys (`configurable`, `hide`) with runtime API methods so you can toggle columns on and off at any time in this JavaScript data grid.

## Overview

There are two layers to controlling visibility:

- **Definition keys** set the starting state. Use `hide: true` to start a column hidden, and `configurable: false` to lock a column so users cannot toggle it.
- **API methods** change visibility at runtime — `setColumnVisible`, `setColumnsVisible`, and `getVisibleColumns` on `grid.api`.

## Starting visibility with definition keys

Set the initial visibility directly on the column definition:

```js
const columns = [
  { field: "id",     header: "ID",     colId: "id",     width: 80, configurable: false },
  { field: "name",   header: "Employee", colId: "name", flex: 1 },
  { field: "country", header: "Country", colId: "country", flex: 1, hide: true } // starts hidden
];
```

Here the `id` column cannot be hidden by the user, and `country` starts off hidden.

## Toggling a single column

Use `setColumnVisible(colId, visible)` to show or hide one column by its `colId`:

```js
// Hide the country column
grid.api.setColumnVisible("country", false);

// Show it again
grid.api.setColumnVisible("country", true);
```

To flip the current state, read it first with `getVisibleColumns`:

```js
function toggleColumn(colId) {
  const visibleIds = grid.api.getVisibleColumns().map((c) => c.colId);
  const isVisible = visibleIds.includes(colId);
  grid.api.setColumnVisible(colId, !isVisible);
}
```

## Toggling multiple columns at once

`setColumnsVisible(colIds, visible)` changes several columns in a single call:

```js
// Hide both compensation-related columns together
grid.api.setColumnsVisible(["salary", "active"], false);

// Show them again
grid.api.setColumnsVisible(["salary", "active"], true);
```

## Reading which columns are visible

`getVisibleColumns()` returns the currently visible columns, which is useful for building a column chooser UI or persisting the user's choice:

```js
const visible = grid.api.getVisibleColumns();
console.log(visible.map((c) => c.colId));
```

## Live Example

<iframe
  src="/examples/columns-choosing/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Method / Option | Type | Description |
| --- | --- | --- |
| `setColumnVisible(colId, visible)` | `method` | Shows or hides a single column by id. |
| `setColumnsVisible(colIds, visible)` | `method` | Shows or hides multiple columns at once. |
| `getVisibleColumns()` | `method` | Returns the currently visible columns. |
| `hide` | `boolean` | Column definition key; starts the column hidden. |
| `configurable` | `boolean` | Column definition key; whether users may toggle the column. |
| `column:visible` | `event` | Fires when a column's visibility changes. |

## Related

- [Columns Definition](./Columns%20Definition.md)
- [Columns State](./Columns%20State.md)
- [Column Groups](./Columns%20Groups.md)
