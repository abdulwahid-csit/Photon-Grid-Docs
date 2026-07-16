---
sidebar_position: 7
title: "Row Height"
description: "Control row and header sizing in Photon Grid with the rowHeight and headerRowHeight options to build compact or comfortable, readable data grid layouts."
keywords: [photon grid, javascript data grid, row height, headerRowHeight, compact rows, grid density]
---

# Row Height

**Row height** controls how tall each row and header appears, letting you tune the grid between a dense, information-rich layout and a relaxed, easy-to-scan one. Photon Grid sets sizing through the `rowHeight` and `headerRowHeight` options.

## Overview

Row density is a design decision. Compact rows fit more data on screen and suit dashboards and power users, while taller rows improve readability and touch targets. Photon Grid gives you two numeric options: `rowHeight` for body rows and `headerRowHeight` for the header. Both are pixel values you supply when the grid is created.

## Setting row and header height

Pass `rowHeight` and `headerRowHeight` in the grid options.

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

## Choosing a size

Use these values as starting points and adjust to fit your design system:

| Density | `rowHeight` | `headerRowHeight` | Best for |
| --- | --- | --- | --- |
| Compact | `32` | `38` | Dense dashboards, large datasets |
| Comfortable | `48` | `56` | Readability, touch interfaces |

## Applying a new height

`rowHeight` and `headerRowHeight` are read when the grid is built. To switch density at runtime, recreate the grid with the new values, then call `refresh` on the new instance if you need to force a re-render after further changes.

```js
function buildGrid(rowHeight, headerRowHeight) {
  const container = document.getElementById("grid");
  container.innerHTML = "";
  return new PhotonGrid.GridCore(container, {
    columns,
    data: rowData,
    rowHeight,
    headerRowHeight
  });
}

let grid = buildGrid(42, 48);

// Switch to a compact layout
grid = buildGrid(32, 38);
grid.api.refresh();
```

## Live Example

<iframe
  src="/examples/row-height/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Option / Method | Type | Description |
| --- | --- | --- |
| `rowHeight` | `number` | Height in pixels of each body row. |
| `headerRowHeight` | `number` | Height in pixels of the header row. |
| `refresh()` | `method` | Forces the grid to re-render its rows. |

## Related

- [Rows Overview](./Overview.md)
- [Row Numbers](./Row%20Numbers.md)
- [Row Checkboxes](./Row%20Checkboxes.md)
- [Quick Start](../../GETTING%20STARTED/Quick%20Start.md)
