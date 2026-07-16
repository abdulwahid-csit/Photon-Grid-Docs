---
sidebar_position: 2
title: "Row Sorting"
description: "Sort rows in Photon Grid with sortable columns and full programmatic control using sortColumn, multiSort, clearSort, and getSortConfig, plus sort events."
keywords: [photon grid, javascript data grid, row sorting, sortColumn, multi column sort, sort events]
---

# Sorting

**Row sorting** lets users reorder grid data by one or more columns, either by clicking a header or through the API. Photon Grid supports single-column and multi-column sorting and emits events whenever the sort state changes.

## Overview

Sorting is enabled per column with the `sortable` flag. Once a column is sortable, users can click its header to cycle through ascending, descending, and unsorted states. You can also drive sorting entirely from code with `grid.api`, which is useful for building custom sort toolbars or restoring a saved view.

## Enabling sorting

Set `sortable: true` on any column you want users to sort.

```js
const columns = [
  { field: "id",         header: "ID",         colId: "id",         width: 80, sortable: true },
  { field: "name",       header: "Employee",   colId: "name",       flex: 1, sortable: true },
  { field: "department", header: "Department", colId: "department", flex: 1, sortable: true },
  { field: "salary",     header: "Salary",     colId: "salary",     flex: 1, sortable: true }
];

const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  { columns, data: rowData, headerRowHeight: 48, rowHeight: 42 }
);
```

## Sorting from the API

Call `sortColumn` with a column id and a direction to sort programmatically.

```js
const api = grid.api;

api.sortColumn("salary", "asc");   // sort ascending
api.sortColumn("salary", "desc");  // sort descending
api.clearSort();                   // remove all sorting

api.getSortConfig();               // read the current sort state
```

## Multi-column sorting

To sort by several columns at once, pass an array of sort configurations to `multiSort`. Rows are ordered by the first config, ties broken by the second, and so on.

```js
api.multiSort([
  { colId: "department", dir: "asc" },
  { colId: "salary", dir: "desc" }
]);
```

## Reacting to sort changes

Subscribe to `sort:changed` to run logic whenever the sort state updates, or to `column:sorted` for column-level sort events.

```js
api.on("sort:changed", (event) => {
  console.log("Sort changed", api.getSortConfig());
});

api.on("column:sorted", (event) => {
  console.log("Column sorted", event);
});
```

## Live Example

<iframe
  src="/examples/sorting/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Option / Method | Type | Description |
| --- | --- | --- |
| `sortable` | `boolean` | Enables header-click sorting on a column. |
| `sortColumn(colId, dir)` | `method` | Sorts a single column ascending or descending. |
| `multiSort(configs)` | `method` | Applies a multi-column sort from an array of configs. |
| `clearSort()` | `method` | Removes all active sorting. |
| `getSortConfig()` | `method` | Returns the current sort configuration. |
| `sort:changed` | `event` | Fires whenever the sort state changes. |
| `column:sorted` | `event` | Fires when a specific column is sorted. |

## Related

- [Rows Overview](./Overview.md)
- [Grouping](./Grouping.md)
- [Row Numbers](./Row%20Numbers.md)
- [Quick Start](../../GETTING%20STARTED/Quick%20Start.md)
