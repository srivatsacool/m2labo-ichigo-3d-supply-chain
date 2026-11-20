# M2Labo ICHIGO® — 3D Downstream Supply Chain & ERP/CRM Architecture

An interactive, low-poly 3D supply-chain process visualisation and ERP/CRM data architecture experience (**ICHIGO FLOW**) for the **M2Labo ICHIGO®** downstream operations — starting strictly at **Farm → M2Labo Custody Handover** (`M2LABO CUSTODY BEGINS HERE`) through Line-Haul Transport, Andheri MIDC Receiving & QC, 4-Bucket Segregated Inventory (FIFO), Order Picking & Packing, Last-Mile Delivery, Returns & Quarantine, and Financial Reconciliation.

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
├── App.tsx                             # Root shell, keyboard shortcuts, journey playback & view routing
├── data/
│   ├── types.ts                        # Core domain interfaces (Stations, ERP/CRM fields, Exceptions, Flow)
│   └── dataArchitectureMap.ts          # Entity-relationship graph & KPI strip definitions
├── stations/
│   └── stationsData.ts                 # All 8 downstream operational stations + 3D camera coordinates
├── process/
│   ├── materialFlowData.ts             # Physical downstream, reverse-loop & digital conduit 3D splines
│   └── journeyPathData.ts              # 11-step animated shipment journey & camera focus targets
├── information/
│   ├── erpCrmData.ts                   # 10-attribute ERP & CRM field dictionary across ST-01..ST-08
│   ├── InformationFlowView.tsx         # Dedicated ERP/CRM Stage-by-Stage Field Explorer
│   └── DataArchitectureView.tsx        # End-to-end entity lineage & guardrail view
├── exceptions/
│   ├── exceptionsData.ts               # 19 exception branches with PROCESS DECISION REQUIRED flags
│   └── ExceptionsExplorerView.tsx      # Interactive exception & decision-gate explorer
├── models/
│   ├── SharedMaterials.ts              # Pre-allocated flat-shaded low-poly PBR material palette
│   ├── LowPolyBuildings.tsx            # Handover Gate, MIDC 4-Zone Warehouse, Destinations, Finance Nexus
│   ├── LowPolyVehicles.tsx             # Line-Haul Van, Last-Mile Delivery Rider & Urban Van
│   ├── LowPolyWorkers.tsx              # Role-coded low-poly operational characters
│   ├── LowPolyPackaging.tsx            # Strawberry Crates, B2C Black 250g/500g Cartons, B2B Cavity Trays, Insulated Bags
│   ├── LowPolyEquipment.tsx            # QR Scanners, Weighing Scale, QC Table, FIFO Racks, Packing Benches
│   └── LowPolyEnvironment.tsx          # Architectural island, road network & instanced environmental props
├── scene/
│   ├── IchigoWorldScene.tsx            # Lazy-loaded Three.js / React Three Fiber 3D environment + WebGL fallback
│   ├── CameraController.tsx            # Smooth station fly-to, follow-shipment & OrbitControls
│   ├── ShipmentJourneyAnimator.tsx     # Animated vehicles, shipment beacon & return-loop movement
│   ├── FlowOverlays3D.tsx              # Material / Information / Combined 3D overlays & exception pins
│   └── Fallback2DProcessMap.tsx        # Accessible 2D schematic fallback when WebGL is unavailable/toggled
└── components/
    ├── TopNavBar.tsx                   # Minimal 4-tab navigation + Material/Info/Combined + 2D/Motion toggles
    ├── KpiStrip.tsx                    # Compact conceptual simulation KPI strip
    ├── BottomJourneyControls.tsx       # Play/Pause/Restart/Prev/Next, progress bar & stage pills
    └── StationDetailPanel.tsx          # Collapsible 3D station inspector drawer
```

## Extending the Application

- **Add or Update a Station**: Edit `OPERATIONAL_STATIONS` in `src/stations/stationsData.ts` and position its 3D hub inside `src/scene/IchigoWorldScene.tsx`.
- **Add an ERP/CRM Field**: Append an `ErpCrmEventField` entry in `src/information/erpCrmData.ts` using the accurate `SOURCE_DEFINED`, `PROPOSED_DEVELOPMENT`, or `DERIVED_METRIC` category.
- **Add an Exception Branch**: Append an `ExceptionBranch` entry in `src/exceptions/exceptionsData.ts`, setting `decisionDefinedInSource: false` if the contingency procedure still awaits M2Labo sign-off.
- **Add Low-Poly 3D Models**: Compose reusable geometry with `MAT` from `src/models/SharedMaterials.ts` inside `src/models/` to keep draw calls and material allocations minimal.

## Documentation Index

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Data Schema Reference](docs/DATA_SCHEMA.md)
- [3D Asset & Licensing Manifest](docs/ASSET_LICENSE_MANIFEST.md)
- [QA & Verification Report](docs/QA_REPORT.md)
