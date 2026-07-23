---
title: "Demo"
description: "Interactive Photon Grid demos rendered live in the browser, with the exact code behind each one."
---

# Demo

Every grid on this page is a **real, running Photon Grid** — the published
`photon-grid-core` bundle loaded from the CDN and rendered inline. Interact with
them: sort a column, resize, or scroll. Below each demo is the exact code that
produces it, in your chosen framework.

## Basic grid

A minimal grid: four columns, plain row data, default theme.

<LiveGrid preset="quickStart" height={340} title="Basic grid — sortable, resizable, virtualized" />

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

```html
<div id="grid" style="width:100%;height:340px;"></div>
<script src="https://cdn.jsdelivr.net/npm/photon-grid-core@latest/photon-grid.min.js"></script>
<script>
  const columns = [
    { field: "id", header: "ID", colId: "id", width: 80 },
    { field: "name", header: "Employee", colId: "name", flex: 1, minWidth: 160 },
    { field: "department", header: "Department", colId: "department", flex: 1, minWidth: 150 },
    { field: "salary", header: "Salary", colId: "salary", type: "number", flex: 1, minWidth: 120 }
  ];

  const rowData = [
    { id: 1, name: "John Smith", department: "Engineering", salary: 85000 },
    { id: 2, name: "Sarah Johnson", department: "Finance", salary: 72000 },
    { id: 3, name: "Michael Brown", department: "Marketing", salary: 68000 },
    { id: 4, name: "Emma Wilson", department: "Human Resources", salary: 61000 },
    { id: 5, name: "David Miller", department: "Engineering", salary: 93000 }
  ];

  new PhotonGrid.GridCore(document.getElementById("grid"), {
    columns,
    data: rowData
  });
</script>
```

</TabItem>
<TabItem value="react" label="React">

```tsx
import { PhotonGrid } from 'photon-grid-react';

const columns = [
  { field: 'id', header: 'ID', colId: 'id', width: 80 },
  { field: 'name', header: 'Employee', colId: 'name', flex: 1, minWidth: 160 },
  { field: 'department', header: 'Department', colId: 'department', flex: 1, minWidth: 150 },
  { field: 'salary', header: 'Salary', colId: 'salary', type: 'number', flex: 1, minWidth: 120 },
];

const rowData = [
  { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Sarah Johnson', department: 'Finance', salary: 72000 },
  { id: 3, name: 'Michael Brown', department: 'Marketing', salary: 68000 },
  { id: 4, name: 'Emma Wilson', department: 'Human Resources', salary: 61000 },
  { id: 5, name: 'David Miller', department: 'Engineering', salary: 93000 },
];

export function BasicGrid() {
  return (
    <div style={{ width: '100%', height: 340 }}>
      <PhotonGrid columns={columns} dataSet={rowData} />
    </div>
  );
}
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts
import { Component } from '@angular/core';
import { PhotonGridComponent } from 'photon-grid-angular';

@Component({
  selector: 'app-basic-grid',
  standalone: true,
  imports: [PhotonGridComponent],
  template: `
    <div style="width: 100%; height: 340px;">
      <photon-grid [columns]="columns" [dataSet]="rowData"></photon-grid>
    </div>
  `,
})
export class BasicGridComponent {
  columns = [
    { field: 'id', header: 'ID', colId: 'id', width: 80 },
    { field: 'name', header: 'Employee', colId: 'name', flex: 1, minWidth: 160 },
    { field: 'department', header: 'Department', colId: 'department', flex: 1, minWidth: 150 },
    { field: 'salary', header: 'Salary', colId: 'salary', type: 'number', flex: 1, minWidth: 120 },
  ];

  rowData = [
    { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000 },
    { id: 2, name: 'Sarah Johnson', department: 'Finance', salary: 72000 },
    { id: 3, name: 'Michael Brown', department: 'Marketing', salary: 68000 },
    { id: 4, name: 'Emma Wilson', department: 'Human Resources', salary: 61000 },
    { id: 5, name: 'David Miller', department: 'Engineering', salary: 93000 },
  ];
}
```

</TabItem>
<TabItem value="vue" label="Vue">

```vue
<script setup lang="ts">
import { PhotonGrid } from 'photon-grid-vue';

const columns = [
  { field: 'id', header: 'ID', colId: 'id', width: 80 },
  { field: 'name', header: 'Employee', colId: 'name', flex: 1, minWidth: 160 },
  { field: 'department', header: 'Department', colId: 'department', flex: 1, minWidth: 150 },
  { field: 'salary', header: 'Salary', colId: 'salary', type: 'number', flex: 1, minWidth: 120 },
];

const rowData = [
  { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Sarah Johnson', department: 'Finance', salary: 72000 },
  { id: 3, name: 'Michael Brown', department: 'Marketing', salary: 68000 },
  { id: 4, name: 'Emma Wilson', department: 'Human Resources', salary: 61000 },
  { id: 5, name: 'David Miller', department: 'Engineering', salary: 93000 },
];
</script>

<template>
  <div style="width: 100%; height: 340px;">
    <PhotonGrid :columns="columns" :dataSet="rowData" />
  </div>
</template>
```

</TabItem>
</FrameworkTabs>

## Custom cell renderers

Columns can render arbitrary DOM — avatars, badges, and formatted numbers — via
a `renderer.display` function. The renderer receives the cell `value` and the
whole `row`, and returns a DOM node.

<LiveGrid preset="richCells" height={380} title="The same data with avatar, badge, and currency renderers" />

<FrameworkTabs>
<TabItem value="vanilla" label="Vanilla JS">

```js
function moneyCell(p) {
  const span = document.createElement("span");
  span.textContent = "$" + Number(p.value).toLocaleString();
  return span;
}

const columns = [
  { field: "name", header: "Employee", colId: "name", flex: 1.6, minWidth: 220 },
  { field: "department", header: "Department", colId: "department", flex: 1, minWidth: 150 },
  {
    field: "salary", header: "Salary", colId: "salary", type: "number", width: 140,
    renderer: { display: moneyCell }
  }
];

new PhotonGrid.GridCore(document.getElementById("grid"), {
  columns,
  data: rowData,
  rowHeight: 52
});
```

</TabItem>
<TabItem value="react" label="React">

```tsx
import { PhotonGrid } from 'photon-grid-react';

function moneyCell(p: { value: unknown }) {
  const span = document.createElement('span');
  span.textContent = '$' + Number(p.value).toLocaleString();
  return span;
}

const columns = [
  { field: 'name', header: 'Employee', colId: 'name', flex: 1.6, minWidth: 220 },
  { field: 'department', header: 'Department', colId: 'department', flex: 1, minWidth: 150 },
  {
    field: 'salary', header: 'Salary', colId: 'salary', type: 'number', width: 140,
    renderer: { display: moneyCell },
  },
];

export function RichGrid() {
  return (
    <div style={{ width: '100%', height: 380 }}>
      <PhotonGrid columns={columns} dataSet={rowData} options={{ rowHeight: 52 }} />
    </div>
  );
}
```

</TabItem>
<TabItem value="angular" label="Angular">

```ts
import { Component } from '@angular/core';
import { PhotonGridComponent } from 'photon-grid-angular';

function moneyCell(p: { value: unknown }) {
  const span = document.createElement('span');
  span.textContent = '$' + Number(p.value).toLocaleString();
  return span;
}

@Component({
  selector: 'app-rich-grid',
  standalone: true,
  imports: [PhotonGridComponent],
  template: `
    <div style="width: 100%; height: 380px;">
      <photon-grid [columns]="columns" [dataSet]="rowData" [options]="options"></photon-grid>
    </div>
  `,
})
export class RichGridComponent {
  columns = [
    { field: 'name', header: 'Employee', colId: 'name', flex: 1.6, minWidth: 220 },
    { field: 'department', header: 'Department', colId: 'department', flex: 1, minWidth: 150 },
    {
      field: 'salary', header: 'Salary', colId: 'salary', type: 'number', width: 140,
      renderer: { display: moneyCell },
    },
  ];
  options = { rowHeight: 52 };
}
```

</TabItem>
<TabItem value="vue" label="Vue">

```vue
<script setup lang="ts">
import { PhotonGrid } from 'photon-grid-vue';

function moneyCell(p: { value: unknown }) {
  const span = document.createElement('span');
  span.textContent = '$' + Number(p.value).toLocaleString();
  return span;
}

const columns = [
  { field: 'name', header: 'Employee', colId: 'name', flex: 1.6, minWidth: 220 },
  { field: 'department', header: 'Department', colId: 'department', flex: 1, minWidth: 150 },
  {
    field: 'salary', header: 'Salary', colId: 'salary', type: 'number', width: 140,
    renderer: { display: moneyCell },
  },
];

const options = { rowHeight: 52 };
</script>

<template>
  <div style="width: 100%; height: 380px;">
    <PhotonGrid :columns="columns" :dataSet="rowData" :options="options" />
  </div>
</template>
```

</TabItem>
</FrameworkTabs>

## Sortable data grid

Pass more rows and let Photon Grid handle sorting and virtualization. Click a
header to sort; colored badges are rendered per cell.

<LiveGrid preset="finance" height={360} title="Watchlist — click a header to sort" />

## Next steps

- [Installation](./installation.md) — add Photon Grid to your own project.
- [Configuration options](./configuration-options.md) — the full list of grid options.
