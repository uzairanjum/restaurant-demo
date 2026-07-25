# Tierra Querida — Kitchen Dashboard

React + TypeScript recreation of the **Tierra Querida** restaurant kitchen operations dashboard.

## Features

- **Kitchen Board** — Kanban view with 6 order columns (Needs attention → Completed)
- **Orders** — Full order list with search
- **Needs attention** — Blocked orders grid
- **Payments** — Bank transfer review queue
- **Conversations** — WhatsApp-style messaging UI
- **Customers** — Aggregated customer stats
- **Menu** — Menu management with add category/item modals
- **Order detail** — Full order view with payment proof, actions, and chat

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    layout/     Header, Sidebar
    orders/     OrderCard, OrderDetail, KanbanColumn
    views/      KitchenBoard, Orders, Payments, etc.
  context/      DashboardProvider (state + actions)
  data/         Seed orders and menu data
  pages/        Dashboard page shell
  styles/       Design tokens (tierra.css)
  types/        Order & menu types
  utils/        Order enrichment helpers
```

Design tokens, layout, and sample data match the original standalone HTML export.
