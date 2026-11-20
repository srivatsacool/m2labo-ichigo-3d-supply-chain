# Architecture Documentation

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS 3 with custom M2Labo ICHIGO® blueprint tokens (`#102A43`, `#173B57`, `#42C7E8`, `#A9E8F5`, `#F4F7F8`, `#8C9BA5`, `#E9A23B`, `#D9534F`, `#3CA77A`)
- **3D Engine**: Lazy-loaded `three`, `@react-three/fiber`, and `@react-three/drei` split into a dedicated `three` Rollup chunk (`vite.config.ts`)
- **Deployment Target**: Static SPA build (`dist/`) served via Cloudflare Workers static assets (`wrangler.jsonc`)

## Core Architectural Decisions
1. **Strict Process Boundary**: Station 01 starts at `FARM → M2LABO CUSTODY HANDOVER` (`M2LABO CUSTODY BEGINS HERE`). All upstream farm production processes are excluded from M2Labo-controlled stages.
2. **Cohesive Procedural Low-Poly 3D World**: Built with shared `MeshStandardMaterial` instances (`flatShading: true`), instanced bollards (`THREE.InstancedMesh`), and modular asset components under `src/models/` so no external CDN GLB latency or mismatched illustration styles degrade performance.
3. **2D Process Fallback & Error Resilience**: `IchigoWorldScene.tsx` wraps `<Canvas>` in both a `WebGLErrorBoundary` and runtime WebGL capability detection, degrading seamlessly to `Fallback2DProcessMap.tsx`. Users can also toggle `2D Fallback` and `Reduced Motion` manually at any time.
4. **Unified Data/UI Separation**: All station definitions, 11 animated journey steps, ERP/CRM 10-attribute field dictionaries, 19 exception branches, and entity-relationship definitions reside in pure TypeScript modules (`src/stations/`, `src/process/`, `src/information/`, `src/exceptions/`, `src/data/`).
