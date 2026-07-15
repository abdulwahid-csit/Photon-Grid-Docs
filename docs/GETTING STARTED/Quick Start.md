---
sidebar_position: 2
title: Quick Start
description: Build your first Photon Grid in less than a minute.
---

# Quick Start

This guide shows how to create your first Photon Grid using the CDN build.

## Include Photon Grid

Add the Photon Grid script to your page.

```html
<script src="https://cdn.jsdelivr.net/npm/photon-grid-core@2.0.1/photon-grid.min.js"></script>
```

## Create a container

```html
<div id="grid"></div>
```

```css
#grid {
    width: 100%;
    height: 500px;
    border: 1px solid #ddd;
}
```

## Define your columns

```javascript
const columns = [
    {
        field: "id",
        header: "ID",
        colId: "id",
        width: 80
    },
    {
        field: "name",
        header: "Employee",
        colId: "name",
        flex: 1
    },
    {
        field: "department",
        header: "Department",
        colId: "department",
        flex: 1
    },
    {
        field: "salary",
        header: "Salary",
        colId: "salary",
        flex: 1
    }
];
```

## Provide row data

```javascript
const rowData = [
    {
        id: 1,
        name: "John Smith",
        department: "Engineering",
        salary: 85000
    },
    {
        id: 2,
        name: "Sarah Johnson",
        department: "Finance",
        salary: 72000
    },
    {
        id: 3,
        name: "Michael Brown",
        department: "Marketing",
        salary: 68000
    }
];
```

## Create the grid

```javascript
new PhotonGrid.GridCore(
    document.getElementById("grid"),
    {
        columns,
        data: rowData,
        headerRowHeight: 48,
        rowHeight: 42,
        pagination: {
            enabled: true,
            pageSize: 100
        }
    }
);
```

## Live Example

<iframe
  src="/examples/quick-start/index.html"
  width="100%"
  height="500"
/>

## What's Next?

- Column Definitions
- Sorting
- Filtering
- Pagination
- Row Selection
- Cell Editing
- Virtual Scrolling