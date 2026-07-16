---
sidebar_position: 6
title: "Row Dragging"
description: "Listen for row drag and drop events in Photon Grid using drag:started, drag:over, drag:stopped, and row:drop to react to row reordering interactions cleanly."
keywords: [photon grid, javascript data grid, row dragging, drag and drop rows, row:drop event, drag events]
---

# Row Dragging

**Row dragging** lets users reorder rows by dragging them to a new position. Photon Grid reports the drag lifecycle through events on `grid.api`, so you can track where a row started, where it moves, and where it is dropped.

## Overview

Dragging a row produces a sequence of events. A drag begins, the pointer moves over other rows, and the drag ends when the user releases. Photon Grid emits a dedicated event for each phase, plus a `row:drop` event that reports the final drop. You listen for these events to update your own data model, persist a new order, or log the interaction.

The lifecycle events are:

- `drag:started` — the user begins dragging a row.
- `drag:over` — the dragged row moves over a potential target.
- `drag:stopped` — the drag interaction ends.
- `row:drop` — a row is dropped at its destination.

## Listening for drag events

Subscribe to the drag events after constructing the grid. Each handler receives an event object describing the interaction.

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  { columns, data: rowData, headerRowHeight: 48, rowHeight: 42 }
);

const api = grid.api;

api.on("drag:started", (event) => {
  console.log("Drag started", event);
});

api.on("drag:over", (event) => {
  console.log("Drag over", event);
});

api.on("drag:stopped", (event) => {
  console.log("Drag stopped", event);
});
```

## Reacting to a drop

The `row:drop` event fires when a row is released on a target. Use it to read the drop and reconcile your source data.

```js
api.on("row:drop", (event) => {
  console.log("Row dropped", event);
  // Update your source array or persist the new order here.
});
```

Because the drop event carries the interaction details, this is the right place to recompute order and, if needed, push the updated rows back into the grid with `setData`.

## Live Example

The example below logs each drag and drop event as you interact with the grid. Open your console, or watch the on-page log, to see the lifecycle.

<iframe
  src="/examples/row-dragging/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Option / Method | Type | Description |
| --- | --- | --- |
| `drag:started` | `event` | Fires when a row drag begins. |
| `drag:over` | `event` | Fires as a dragged row moves over a target. |
| `drag:stopped` | `event` | Fires when a drag interaction ends. |
| `row:drop` | `event` | Fires when a row is dropped at its destination. |
| `on(type, handler)` | `method` | Subscribes to a grid event. |

## Related

- [Rows Overview](./Overview.md)
- [Row Actions](./Row%20Actions.md)
- [Row Checkboxes](./Row%20Checkboxes.md)
- [Quick Start](../../GETTING%20STARTED/Quick%20Start.md)
