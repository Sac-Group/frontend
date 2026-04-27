# Front-End overview

An AI-assisted architecture workbench where users describe a product idea and constraints, then generate a proposed solution architecture.

This repository is currently frontend-focused. The "generate architecture" action uses a simulated delay and placeholder output, ready to be connected to a real backend/API.

## What This Project Does

- Collects system requirements from the user in a guided panel
- Lets users apply templates (E-commerce, SaaS, IoT, Chat, etc.)
- Captures delivery constraints like scale, team size, budget, and deployment mode
- Simulates architecture generation flow (loading state -> result state)
- Displays a polished architecture output area with empty/loading/result views

## Tech Stack (Simple View)

- React + TypeScript for UI and component logic
- TanStack Router / React Start for routing and app shell
- Tailwind CSS v4 + custom tokens for design system styling
- Radix + shadcn-style UI components for reusable controls
- Framer Motion for animations and transitions
- Vite for local development and production builds
- Wrangler config included for Cloudflare-compatible deployment

## App Flow

1. User lands on `/` and sees the workbench layout.
2. User writes requirements (or picks a template).
3. User adjusts constraints (scale, team size, budget, deployment).
4. User clicks **Generate Architecture**.
5. App shows an animated loading sequence.
6. App shows a placeholder result panel (until backend is integrated).

## Project Structure and File Purpose

### Root Files

- `package.json`: project metadata, scripts, dependencies
- `vite.config.ts`: Vite config wrapper from `@lovable.dev/vite-tanstack-config`
- `wrangler.jsonc`: Cloudflare Worker deployment configuration
- `tsconfig.json`: TypeScript compiler options
- `eslint.config.js`: linting rules and TypeScript/React lint setup
- `components.json`: shadcn-style component configuration
- `src/styles.css`: global theme tokens, utilities (`glass`, `dot-grid`, etc.), and base styles

### App Routing Files

- `src/routes/__root.tsx`: root HTML shell, meta tags, fonts, and not-found page
- `src/routes/index.tsx`: main page route (`/`) and workbench composition
- `src/router.tsx`: router initialization and default global error UI
- `src/routeTree.gen.ts`: auto-generated route tree used by TanStack Router

### Workbench Feature Files

- `src/components/workbench/Header.tsx`
  - Top navigation/header bar (branding, share/star actions)
- `src/components/workbench/InputPanel.tsx`
  - Left-side requirements + constraints panel
  - Includes template chips, textarea auto-resize, constraint controls, and submit action
- `src/components/workbench/OutputDisplay.tsx`
  - Right-side output area
  - Renders three states: empty, loading, and result placeholder

### Shared Utility Files

- `src/lib/utils.ts`: shared helpers (for example class name merging via `cn`)
- `src/hooks/use-mobile.tsx`: reusable hook for mobile viewport behavior

### UI Component Library

The `src/components/ui/` folder contains reusable UI primitives such as:

- form controls (`input`, `textarea`, `select`, `checkbox`, `switch`, `radio-group`)
- layout elements (`card`, `separator`, `sheet`, `drawer`, `sidebar`)
- feedback/display (`alert`, `dialog`, `tooltip`, `badge`, `progress`, `skeleton`)
- navigation/interaction (`tabs`, `dropdown-menu`, `navigation-menu`, `popover`)

These files are mostly foundational building blocks used by feature components like `InputPanel` and `Header`.

## How to Run Locally

### Prerequisites

- Node.js 18+ (or Bun, since `bun.lockb` is included)

### Install

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### Start Dev Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Current Status

- UI/UX is implemented and polished
- Route structure and error/not-found handling are set up
- Generation flow is currently mocked in `src/routes/index.tsx`
- Next step is wiring the generate action to a real architecture backend service
