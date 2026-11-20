# Architecture Documentation — M2Labo ICHIGO® V2

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite 5 + Tailwind CSS 3
- **3D Engine**: Lazy-loaded `three`, `@react-three/fiber`, and `@react-three/drei` split into a dedicated `three` Rollup chunk (`vite.config.ts`)
- **Scroll Choreography**: `gsap` + `ScrollTrigger` (`src/components/ScrollJourneyController.tsx`) synchronized bi-directionally with playback, timeline scrubbing, and station selection
- **Deployment Target**: Static SPA build (`dist/`) served via Cloudflare Workers static assets (`wrangler.jsonc`)

## Core V2 Architectural Decisions
1. **Strawberry-First Visual Hierarchy (`src/models/StrawberryAssetSystem.tsx`)**: Sculpted low-poly heart-tapered strawberries with baked golden achene seed textures, 6-leaf calyx crowns, stems, graded 250g punnets (`2L`/`L`/`M`/`S`), clusters, filled transport crates, and clearly distinguishable empty slatted reusable crates. Yellow ICBOX (`src/models/ICBOXModel.tsx`) is retained at realistic scale as a supporting insulated farm-to-MIDC container.
2. **Two Distinct Reverse-Logistics Loops (`src/scene/ShipmentJourneyAnimator.tsx`, `src/process/materialFlowData.ts`)**:
   - **Flow A (Loop 1 — Turquoise)**: Outbound truck carries fresh strawberries Farm (`ST-01`) → MIDC (`ST-03`); after unloading and separating berries from crates, empty crates are consolidated at MIDC North Bay and returned via the westbound return highway lane to Farm Empty-Crate Receipt Bay (`ST-01`) carrying **empty crates only**.
   - **Flow B (Loop 2 — Amber)**: Packed strawberry orders at `ST-05` transfer into realistic woven matte-black insulated delivery bags (`src/models/InsulatedDeliveryBagAsset.tsx`), are delivered by helmeted two-wheeler riders (`ST-06`), and empty reusable black bags return to MIDC (`ST-07` → `ST-05` pool). Returned fruit stays strictly isolated behind the Quarantine Firewall.
3. **Continuous Geographical World (`src/models/LowPolyEnvironment.tsx`, `src/models/LowPolyBuildings.tsx`)**: Replaced the bounded diorama board with a `640m × 640m` sculpted terrain mesh, twilight sky dome, horizon fog, upstream strawberry fields & poly-tunnel greenhouses (strictly outside the `M2LABO CUSTODY BEGINS HERE` gate), dual-carriageway highway with median, integrated MIDC campus complex, Mumbai urban delivery avenue, and instanced skyline/forest/industrial silhouettes.
4. **Exactly Three Independent Camera Modes (`src/scene/CameraController.tsx`)**:
   - `FIRST_PERSON` (`FirstPersonController.tsx`): Eye-level walking (`WASD`/Arrows + Shift sprint), AABB building collision, terrain elevation following, drag look + optional Pointer Lock, touch D-pad.
   - `THIRD_PERSON` (`ThirdPersonCameraController.tsx`): Articulated low-poly explorer avatar with stride animation, spring-damped orbit camera, camera wall collision, wheel zoom, nearest-station jump, touch D-pad.
   - `OVERVIEW`: Elevated `OrbitControls` with smooth station fly-to and cinematic hero strawberry close-ups when `Follow Shipment` is active.
5. **Three Independent Flow Modes (`src/scene/FlowOverlays3D.tsx`)**: `MATERIAL FLOW`, `INFORMATION FLOW`, and `COMBINED FLOW` operate completely independently of camera mode, with ground-level physical routes (`y ~ 0.35m`) spatially separated from elevated curved cyan ERP/CRM conduits (`y ~ 4.2–7.8m`).
6. **Collision-Aware Screen-Space Annotation Engine (`src/scene/AnnotationManager.tsx`)**: Projects 3D station, loop, and prioritized warning anchors at 60fps via direct DOM transform mutation, measures real card bounds (`offsetWidth`/`offsetHeight`), solves 2D AABB placement with priority rules across Class A markers, Class B active callouts, and Class C inspection drawer (`StationDetailPanel.tsx`), and keeps SVG leader lines anchored to 3D world origins.
