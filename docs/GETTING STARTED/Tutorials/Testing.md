---
sidebar_position: 3
title: "Testing"
description: "Sanity-check your Photon Grid by listening for grid:ready, asserting row counts with getDisplayedRowCount, and inspecting rows with getAllRows in your JavaScript data grid."
keywords: [photon grid, javascript data grid, testing grid, grid:ready, getDisplayedRowCount]
---

# Testing

Once your grid renders, you will want a quick way to confirm it initialized correctly and loaded the right data. This tutorial shows you how to sanity-check a Photon Grid using lifecycle events and the data API.

## Overview

Testing a grid comes down to three questions: did it finish initializing, does it show the expected number of rows, and does it hold the expected data? Photon Grid answers all three through the `grid:ready` event and the data methods `getDisplayedRowCount()` and `getAllRows()`.

## Wait for grid:ready

The grid initializes and renders asynchronously. Wait for the ready signal before running assertions — subscribe to `grid:ready` in vanilla, or use the ready callback in the wrappers. Both hand you the `GridApi`.

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

```js
const grid = new PhotonGrid.GridCore(
  document.getElementById("grid"),
  { columns, data: rowData }
);

const api = grid.api;

api.on("grid:ready", () => {
  console.log("Grid is ready");
});
```

</TabItem>
<TabItem value="react" label="React">

```tsx
<PhotonGrid columns={columns} dataSet={rowData} onGridReady={(api) => {
  console.log("Grid is ready");
}} />
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts
onReady(api: GridApi): void {
  console.log("Grid is ready");
}
```

</TabItem>
<TabItem value="vue" label="Vue">

```ts
function onReady(api: GridApi) {
  console.log("Grid is ready");
}
```

</TabItem>
</FrameworkTabs>

## Assert the displayed row count

Use `api.getDisplayedRowCount()` to confirm the grid shows the number of rows you expect. This count reflects what is currently displayed, so it is a good post-filter check as well.

```js
api.on("grid:ready", () => {
  const count = api.getDisplayedRowCount();
  console.assert(count === rowData.length, "Expected all rows to display");
  console.log("Displayed rows:", count);
});
```

## Inspect all rows

Use `api.getAllRows()` to read every row the grid holds. This is useful for verifying that the data loaded correctly and that fields map to the columns you defined.

```js
api.on("grid:ready", () => {
  const rows = api.getAllRows();
  console.log("First row:", rows[0]);
  console.log("Total rows:", rows.length);
});
```

You can combine these checks into a small sanity function that you run in the console or wire into an automated test.

```js
function sanityCheck(api) {
  const displayed = api.getDisplayedRowCount();
  const all = api.getAllRows();
  return {
    displayed,
    total: all.length,
    ok: displayed > 0 && all.length > 0
  };
}
```

## Live Example

The example below logs `grid:ready` to the console and shows the displayed row count in the toolbar.

<iframe
  src="/examples/testing/index.html"
  width="100%"
  height="500"
  style={{border: '1px solid #ddd', borderRadius: '8px'}}
></iframe>

## API Reference

| Method / Event | Type | Description |
| --- | --- | --- |
| `api.on(eventType, handler)` | `method` | Subscribes to a grid event. |
| `grid:ready` | `event` | Fires once the grid has finished initializing. |
| `api.getDisplayedRowCount()` | `method` | Returns the number of currently displayed rows. |
| `api.getAllRows()` | `method` | Returns every row the grid holds. |

## Related

- [Creating a Basic Grid](./Creating%20a%20Basic%20Grid.md)
- [Styling a Grid](./Styling%20a%20Grid.md)
- [Key Features](../Key%20Features.md)
