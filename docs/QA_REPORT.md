# QA Verification Matrix — M2Labo ICHIGO® V2

Verified via TypeScript (`tsc --noEmit`), Vite production build (`npm run build`), and automated Chromium WebGL headless visual & DOM inspection across 14 viewport/camera/flow/reverse-logistics states (`1440×900` desktop and `390×844` mobile).

## Automated Build & Runtime Checks
- `tsc --noEmit`: PASS (0 errors)
- `vite build`: PASS (0 errors)
- Browser Console Errors: **0**
- Uncaught Page Errors: **0**

## Verification Matrix

### Camera Testing
- [x] First-person movement works (`WASD` / Arrows / Shift / Touch D-pad + drag look / Mouse Lock)
- [x] First-person camera collision works (`WORLD_BUILDING_COLLIDERS` + terrain height clamp)
- [x] Third-person character movement works (articulated walking avatar + stride animation)
- [x] Third-person camera follows smoothly with wall-collision pull-in
- [x] Overview camera rotates, pans, zooms, and focuses stations smoothly
- [x] Switching modes retains active stage and selected flow (`FLOW PRESERVED AFTER SWITCH TO THIRD PERSON: true`)
- [x] Mobile camera & touch controls verified at `390×844`

### Flow Testing
- [x] `MATERIAL FLOW` renders physical strawberry outbound, Loop 1 empty crates, Loop 2 black delivery bags without ERP arches
- [x] `INFORMATION FLOW` highlights elevated curved cyan ERP/CRM conduits & station telemetry beacons
- [x] `COMBINED FLOW` cleanly separates ground physical flows from elevated digital conduits
- [x] Flow selector operates independently across all 3 camera modes

### Reverse-Logistics Testing
- [x] Outbound truck departs Farm (`ST-01`) visibly loaded with fresh red strawberry crates + supporting ICBOX units
- [x] Outbound truck arrives at MIDC Receiving (`ST-03`) and unloads strawberries
- [x] Empty reusable crates are consolidated at MIDC North Bay and loaded onto Flow A return truck
- [x] Flow A truck returns West to Farm (`ST-01`) visibly carrying **empty slatted crates only** (dual-sided cutaway verified)
- [x] Rider at `ST-05` receives packed strawberries inside **black insulated delivery bag** (no ICBOX on scooter)
- [x] Rider delivers to Mumbai customer (`ST-06`) and opens black insulated bag at handover
- [x] Flow B returning rider carries empty black insulated delivery bag back to MIDC (`ST-07`) along separate amber route
- [x] Both reverse loops have separate routes, colors, vehicles, assets, and badges (`LOOP 1: Empty Crates → Farm` & `LOOP 2: Black Bag → MIDC`)

### World & Annotation Testing
- [x] Seamless `640m × 640m` sculpted terrain + sky dome + horizon fog eliminates flat-board void borders
- [x] Farm strawberry beds/greenhouses, dual highway, MIDC complex, and Mumbai skyline are geographically distinct and connected
- [x] Screen-space annotation engine guarantees legible typography and AABB collision avoidance (`overlaps=0` across Overview Combined, Material, Info, ST-01, and ST-03; SVG leader lines remain anchored; Class C drawer shifts safe viewport margin automatically)
- [x] Prioritized warnings never flood the scene or block active strawberries

## Generated Reference Assets (Section 10)
- `public/images/references/v2-hero-strawberries.jpg`
- `public/images/references/v2-black-delivery-bag.jpg`
- `public/images/references/v2-operators-rider.jpg`
- `public/images/references/v2-endless-world.jpg`
