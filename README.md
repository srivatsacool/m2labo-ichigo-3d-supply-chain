# M2Labo ICHIGO® — Immersive 3D Downstream Supply Chain & ERP/CRM World

An interactive, low-poly 3D supply-chain digital twin and ERP/CRM data architecture experience (**ICHIGO FLOW 3D**) for the **M2Labo ICHIGO®** downstream operations — starting strictly at **Farm → M2Labo Custody Handover** (`M2LABO CUSTODY BEGINS HERE`) through Line-Haul Transport, Andheri MIDC Receiving & QC, 4-Bucket Segregated Inventory (FIFO), Order Picking & Packing, Last-Mile Delivery, Returns & Quarantine, and Financial Reconciliation.

> **Conceptual Simulation Notice**: This application is an operational process and ERP/CRM architecture prototype backed by structured local TypeScript data. It does not connect to live GPS, temperature loggers, inventory ledgers, customer orders, or accounting backends.

## Quick Start

```bash
npm install
npm run dev
```

Type-check and build for production:

```bash
npm run typecheck
npm run build
npm run preview
```

## Key Features

- **Expanded 150 × 85 Industrial Campus (`src/models/`)**: Distinct architectural environments for all 8 operational stations (`ST-01`..`ST-08`), connected highway/MIDC/last-mile/return corridors, instanced foliage/lamps/bollards, and purposeful ambient life.
- **Hero ICBOX Reusable Insulated Container (`src/models/ICBOXModel.tsx`)**: Recognizable pale mustard-yellow moulded insulated box with tapered walls, thick hollow interior well, dark metallic side clips, recessed grip handles, fitted rimmed lid with hinge animation, stylized low-poly strawberries, and all 8 container variants (`closed`, `open`, `empty`, `strawberries`, `secured`, `handling`, `returned`, `quarantine`).
- **Two Independent Camera Modes (`OVERVIEW` & `EXPLORE`)**:
  - **Mode B — Overview**: Elevated cinematic orbit camera with stage fly-to, `Follow ICBOX`, and `ICBOX Closed` / `ICBOX Open` close-up showcase presets.
  - **Mode A — Third-Person Exploration**: Stylized operator avatar with `WASD`/Arrow movement, virtual mobile D-pad, mouse drag look, wheel zoom, `Space` station snap, `Escape` exit to overview, and building collision clamping.
- **GSAP ScrollTrigger Spatial Storytelling (`src/components/ScrollJourneyController.tsx`)**: Synchronizes vertical narrative chapter scrolling with `Play Journey`, scrubber, `Prev`/`Next`, and direct station selection.
- **3-Level Spatial Annotation Engine (`src/scene/AnnotationManager.tsx`)**: Deliberately overlapping, leader-linked digital-twin overlays with Identity (Level 1), Operational & ERP/CRM anchor (Level 2), and Expandable Record Snapshot (Level 3).

## Process Ownership & Governance Rules

1. **Strict Custody Boundary**: M2Labo operational custody begins at **Station 01 (`M2LABO CUSTODY BEGINS HERE`)**. Upstream farm cultivation, harvesting, picking robots, blast cooling, and farm-side sorting/grading are excluded from M2Labo-controlled operations.
2. **4-Bucket Inventory & Quarantine Firewalls**:
   - Full Sellable Stock (Zone 1 — FIFO) is the *only* bucket visible to customer order allocation.
   - Reshuffling Buffer (Zone 2), Value Addition Stock (Zone 3), and Scrap / Waste (Zone 4) are physically segregated and locked against customer allocation.
   - Returned product (Station 07) routes exclusively to Quarantine Inspection and **must never automatically re-enter sellable inventory**.
3. **Field Classification**: Every ERP/CRM field is classified into:
   - `SOURCE_DEFINED` — directly stated in M2Labo process requirements.
   - `PROPOSED_DEVELOPMENT` — recommended ERP/CRM capture field for implementation.
   - `DERIVED_METRIC` — analytical metric computed from captured operational events.
4. **Open Process Decisions**: Any exception pathway or tolerance threshold not defined by M2Labo is explicitly flagged **`PROCESS DECISION REQUIRED`** rather than inventing an unapproved contingency SOP.

## Modular Architecture

```text
src/
├── App.tsx                                  # Root state, camera modes, journey playback & view routing
├── data/
│   ├── types.ts                             # Core domain, camera mode & ICBOX variant interfaces
│   └── dataArchitectureMap.ts               # Entity-relationship graph & KPI strip definitions
├── stations/
│   └── stationsData.ts                      # 8 downstream stations + 150x85 world & explorer coordinates
├── process/
│   ├── materialFlowData.ts                  # Physical downstream, reverse-loop & digital conduit splines
│   └── journeyPathData.ts                   # 11-step animated ICBOX journey & camera focus targets
├── information/
│   ├── erpCrmData.ts                        # 10-attribute ERP & CRM field dictionary across ST-01..ST-08
│   ├── InformationFlowView.tsx              # Dedicated ERP/CRM Stage-by-Stage Field Explorer
│   └── DataArchitectureView.tsx             # End-to-end entity lineage & guardrail view
├── exceptions/
│   ├── exceptionsData.ts                    # 19 exception branches with PROCESS DECISION REQUIRED flags
│   └── ExceptionsExplorerView.tsx           # Interactive exception & decision-gate explorer
├── models/
│   ├── SharedMaterials.ts                   # Shared flat-shaded PBR palette + procedural canvas textures
│   ├── ICBOXModel.tsx                       # Hero ICBOX insulated container (8 variants) & low-poly strawberries
│   ├── LowPolyBuildings.tsx                 # Distinct station architectures + collider AABBs + Hero Plinth
│   ├── LowPolyEnvironment.tsx               # 150x85 base campus, road corridors & instanced props
│   ├── LowPolyEquipment.tsx                 # Scanners, scales, QC benches, conveyors, forklift stacker, chillers
│   ├── LowPolyPackaging.tsx                 # ICBOX wrappers, B2C black cartons, B2B trays, insulated bags, pallets
│   ├── LowPolyVehicles.tsx                  # Line-Haul reefer truck, delivery rider & urban last-mile van
│   ├── LowPolyWorkers.tsx                   # Role-coded low-poly operational characters
│   └── AmbientWorldLife.tsx                 # Cold-chain mist particles & pulsing facility status beacons
├── scene/
│   ├── IchigoWorldScene.tsx                 # Lazy-loaded R3F 3D campus + progressive load + WebGL fallback
│   ├── CameraController.tsx                 # Mode switching (Overview, Explore, ICBOX Close-up presets)
│   ├── ThirdPersonCameraController.tsx      # WASD/touch explorer avatar, collision clamping & follow camera
│   ├── AnnotationManager.tsx                # 3-level spatial annotation engine with 3D leader lines
│   ├── ShipmentJourneyAnimator.tsx          # Animated ICBOX container (lid open/close) & vehicle movement
│   ├── FlowOverlays3D.tsx                   # Physical/Information 3D splines, directional arrows & exception pins
│   └── Fallback2DProcessMap.tsx             # Accessible 2D schematic fallback when WebGL is unavailable/toggled
└── components/
    ├── TopNavBar.tsx                        # Primary tabs, [OVERVIEW]/[EXPLORE], ICBOX presets & layer switches
    ├── KpiStrip.tsx                         # Compact conceptual simulation KPI strip
    ├── ScrollJourneyController.tsx          # GSAP ScrollTrigger spatial storytelling rail
    ├── BottomJourneyControls.tsx            # Play/Pause/Restart/Prev/Next, progress bar & stage pills
    ├── StationDetailPanel.tsx               # Collapsible 3D station SOP, ERP/CRM, exceptions & transition drawer
    └── ICBOXShowcaseModal.tsx               # Interactive 3D ICBOX variant studio & asset reference sheets
```

## Documentation Index

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Data Schema Reference](docs/DATA_SCHEMA.md)
- [3D Asset & Licensing Manifest](docs/ASSET_LICENSE_MANIFEST.md)
- [QA & Verification Report](docs/QA_REPORT.md)
