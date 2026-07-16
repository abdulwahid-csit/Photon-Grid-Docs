---
sidebar_position: 6
title: "Column Groups"
description: "Group related columns under a shared header in Photon Grid, the JavaScript data grid, using columnGroup, children, and marryChildren plus expand and collapse group APIs."
keywords: [photon grid, javascript data grid, column groups, grouped headers, columnGroup, marryChildren]
---

# Column Groups

Column groups let you organize related columns under a single shared header — for example an "Identity" group and a "Compensation" group. Photon Grid builds these with the `columnGroup`, `children`, and `marryChildren` keys, and lets you expand or collapse groups at runtime through the JavaScript data grid API.

## Overview

A column group is a definition object that, instead of a `field`, contains a `children` array of ordinary column definitions. The group's `header` renders as a spanning header above its child columns. Groups can be expanded and collapsed, and `marryChildren` keeps the grouped columns together so they cannot be separated by moves.

## Defining a column group

Add a group by nesting child column definitions under `children`, and mark the object with `columnGroup`:

```js
const columns = [
  {
    columnGroup: true,
    header: "Identity",
    marryChildren: true,
    children: [
      { field: "id",   header: "ID",       colId: "id",   width: 80, configurable: false },
      { field: "name", header: "Employee", colId: "name", flex: 1, minWidth: 160 }
    ]
  },
  {
    columnGroup: true,
    header: "Compensation",
    marryChildren: true,
    children: [
      { field: "salary", header: "Salary", colId: "salary", width: 120 },
      { field: "active", header: "Active", colId: "active", width: 100 }
    ]
  }
];
```

Setting `marryChildren: true` on each group ensures its columns always stay adjacent, even when the user reorders columns.

## Expanding and collapsing groups

Use the group APIs on `grid.api` to open or close a group by its header. Collapsing a group is useful for hiding secondary columns while keeping the group available:

```js
// Collapse the Compensation group
grid.api.collapseColumnGroup("Compensation");

// Expand it again
grid.api.expandColumnGroup("Compensation");
```

## Reading group state

`getColumnGroupState()` returns the current expanded/collapsed state of every group, which you can persist and later restore:

```js
const groupState = grid.api.getColumnGroupState();
console.log(groupState);
```

Pair it with `applyColumnGroupState(state)` to restore a saved layout.

## Live Example

<iframe
  src="/examples/column-groups/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Method / Option | Type | Description |
| --- | --- | --- |
| `columnGroup` | `object` | Marks a definition as a column group. |
| `children` | `array` | Child column definitions nested under the group. |
| `marryChildren` | `boolean` | Keeps grouped children together during moves. |
| `expandColumnGroup(group)` | `method` | Expands a collapsed group. |
| `collapseColumnGroup(group)` | `method` | Collapses an expanded group. |
| `getColumnGroupState()` | `method` | Returns the expanded/collapsed state of all groups. |
| `applyColumnGroupState(state)` | `method` | Restores a saved group state. |
| `columnGroup:collapsed` | `event` | Fires when a group is collapsed. |
| `columnGroup:expanded` | `event` | Fires when a group is expanded. |

## Related

- [Columns Definition](./Columns%20Definition.md)
- [Columns Moving](./Columns%20Moving.md)
- [Columns State](./Columns%20State.md)
