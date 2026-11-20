# Architecture Documentation

## Stack
- **Framework**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS 3 with custom Industrial Blueprint tokens (`#0B1F33`, `#102A43`, `#12334D`, `#173B57`, `#42C7E8`, `#1D9BF0`, `#F5FAFC`, `#9BB4C5`, `#E9A23B`, `#D9534F`, `#3CA77A`)
- **2D Technical Graphics**: Custom modular SVG components (`StationIsometricSvg.tsx`, `PackagingBlueprintSvg.tsx`) and SVG KPI sparklines/curves
- **3D Spatial Layer**: Lazy-loaded `three`, `@react-three/fiber`, `@react-three/drei` split into a dedicated `three` rollup chunk (`vite.config.ts`)

## Directory Layout
```text
src/
├── types/blueprint.ts                # Core domain schemas
├── context/BlueprintContext.tsx      # State, perspectives, search/filters, localStorage demo persistence
├── data/
│   ├── milestonesPart1.ts            # Milestones M01–M06 (all 26 standard sections)
│   ├── milestonesPart2.ts            # Milestones M07–M11 (all 26 standard sections)
│   ├── milestonesData.ts             # Unified MILESTONES export
│   ├── risksAndScenariosData.ts      # FMEA library + all 24 mandatory scenario simulations
│   ├── traceabilityData.ts           # 14-stage QR hierarchy + thermal timeline
│   ├── equipmentAndPackagingData.ts  # Separate B2C/B2B specs + Polyfork catalog manifest
│   ├── kpiAnalyticsData.ts           # 9 KPI domains (illustrative values explicitly marked)
│   └── openQuestionsData.ts          # 25 open question categories + discrepancy register
└── components/
    ├── layout/                       # TopCommandBar, ModuleNavRail, StatusBadge
    ├── diagrams/                     # StationIsometricSvg, PackagingBlueprintSvg
    ├── three/                        # SpatialSceneViewer (lazy chunk + WebGL/GLB fallbacks)
    └── modules/                      # All 10 views + GlobalSearchModal + MilestoneDetailView
```

## Future FastAPI / ERP / WMS Integration Readiness
- Every checklist, inventory movement, traceability ID and open question uses stable IDs (`M01`–`M11`, `M01-CHK-1`, `SCN-01`–`SCN-24`, `OQ-01`–`OQ-25`).
- `BlueprintContext.tsx` encapsulates persistence (`localStorage` for prototype demo); replacing these hooks with REST/FastAPI mutations requires zero refactoring of presentational components.
