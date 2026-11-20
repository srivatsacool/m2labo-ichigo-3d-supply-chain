# THE COLD CHAIN — M2Labo Bharat / ICHIGO® Interactive Supply Chain Blueprint

An end-to-end interactive industrial engineering blueprint, SOP handbook, FMEA risk library, 24-scenario exception simulator, 14-stage QR traceability explorer, B2B/B2C packaging & 3D spatial atlas, KPI dictionary, and validation governance system for the **M2Labo Bharat / ICHIGO®** premium Japanese strawberry supply chain.

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Key Architecture Principles

1. **Truth & Validation Governance**: Every operational item explicitly carries one of five validation statuses:
   - `CONFIRMED IN PROJECT DISCUSSION`
   - `SOURCE DOCUMENT PROPOSAL`
   - `PROPOSED DESIGN`
   - `UNKNOWN / NEEDS VERIFICATION`
   - `ILLUSTRATIVE SIMULATION`
2. **Data/UI Separation**: All 11 milestones, 26 sections per milestone, 24 failure scenarios, FMEA risks, 14 traceability stages, 9 KPI groups, equipment/packaging specs, and 25 open questions live in typed TypeScript modules inside `src/data/` completely separate from UI components.
3. **2D-First Performance with Lazy 3D**: Initial paint renders lightweight 2D CAD blueprint SVGs (`StationIsometricSvg`, `PackagingBlueprintSvg`). Three.js / React Three Fiber (`SpatialSceneViewer.tsx`) loads on demand only when 3D Spatial Mode or an Atlas 3D scene is requested, with automatic fallback to procedural meshes or 2D blueprints if WebGL or remote GLBs are unavailable.
4. **Local Demonstration Persistence**: Checklist completions, sensor demo readings, escalation flags, and open-question validation entries persist locally via `localStorage` and are explicitly marked as demonstration mode with zero fake ERP/GPS claims.

## Application Modules

1. **Executive Overview** (`src/components/modules/ExecutiveOverview.tsx`)
2. **Horizontal Process Explorer** (`src/components/modules/HorizontalBlueprint.tsx`) + **26-Section Milestone Detail Workspace** (`MilestoneDetailView.tsx`)
3. **Worker Handbook** (`src/components/modules/WorkerHandbook.tsx`)
4. **Task Checklists** (`src/components/modules/TaskChecklistsModule.tsx`)
5. **Risk & FMEA Library** (`src/components/modules/RiskFmeaLibrary.tsx`)
6. **Scenario Simulator (24 Scenarios)** (`src/components/modules/ScenarioSimulator.tsx`)
7. **Traceability Explorer** (`src/components/modules/TraceabilityExplorer.tsx`)
8. **Equipment & Packaging Atlas** (`src/components/modules/EquipmentPackagingAtlas.tsx`)
9. **KPI & Analytics** (`src/components/modules/KpiAnalyticsDashboard.tsx`)
10. **Decisions & Open Questions Register** (`src/components/modules/OpenQuestionsRegister.tsx`)

## Adding New Milestones, Scenarios, or Assets

- **Add a Milestone**: Append a `MilestoneData` object following `src/types/blueprint.ts` into `src/data/milestonesPart2.ts` (automatically included in `MILESTONES` via `milestonesData.ts`).
- **Add a Risk or Scenario**: Append a `FmeaRiskRecord` or `ScenarioSimulation` object into `src/data/risksAndScenariosData.ts`.
- **Add an Equipment/3D Asset**: Add an `EquipmentAssetEntry` to `src/data/equipmentAndPackagingData.ts` and record its license and credit in `docs/ASSET_LICENSE_MANIFEST.md`.

## Documentation Index

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Data Schema Reference](docs/DATA_SCHEMA.md)
- [3D Asset & CC BY 4.0 License Manifest](docs/ASSET_LICENSE_MANIFEST.md)
- [QA & Verification Report](docs/QA_REPORT.md)
