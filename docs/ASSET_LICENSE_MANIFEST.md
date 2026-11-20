# 3D Asset & Licensing Manifest

All 3D models sourced from **Polyfork** (`https://polyfork.dev`) were inspected via the live Polyfork API (`/prompt.txt`, `/api/kits`, `/api/assets/{id}`) prior to integration. Free low-poly `.glb` mesh files are streamed directly from `https://polyfork.dev/cdn/<id>.glb` and are **not** bundled or redistributed as standalone asset packs.

## Verified Polyfork Assets (CC BY 4.0)

| Asset ID | Title | Kit | Tris | Dimensions (m) | License | Required Attribution |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| `greenhouse-53ab6d` | Greenhouse | `cozy-farm-cc979f` | 800 | `4.0 × 4.45 × 6.0` | CC BY 4.0 | Greenhouse by Polyfork (https://polyfork.dev/asset/greenhouse-53ab6d), CC BY 4.0 |
| `strawberry-crop-6bec33` | Strawberry Crop | `cozy-farm-cc979f` | 619 | `0.59 × 0.32 × 0.50` | CC BY 4.0 | Strawberry Crop by Polyfork (https://polyfork.dev/asset/strawberry-crop-6bec33), CC BY 4.0 |
| `strawberry-57b7d5` | Strawberry | Standalone | 129 | `0.04 × 0.06 × 0.04` | CC BY 4.0 | Strawberry by Polyfork (https://polyfork.dev/asset/strawberry-57b7d5), CC BY 4.0 |
| `boxy-delivery-van-a3ceae` | Boxy Delivery Van | `chrome-arcology-transit-kit` | 1,116 | `2.04 × 2.90 × 6.00` | CC BY 4.0 | Boxy Delivery Van by Polyfork (https://polyfork.dev/asset/boxy-delivery-van-a3ceae), CC BY 4.0 |
| `timber-eur-pallet-a1f655` | Timber EUR Pallet | `warehouse-and-logistics-activity-f7e79d` | 720 | `1.20 × 0.14 × 1.20` | CC BY 4.0 | Timber EUR Pallet by Polyfork (https://polyfork.dev/asset/timber-eur-pallet-a1f655), CC BY 4.0 |
| `cargo-forklift-91f591` | Cargo Forklift | `airport-43b137` | 2,546 | `1.30 × 2.27 × 3.60` | CC BY 4.0 | Cargo Forklift by Polyfork (https://polyfork.dev/asset/cargo-forklift-91f591), CC BY 4.0 |

## Conceptual / Procedural Models (Non-Polyfork)
- **Harvest Robot Placeholder (`EQ-03`)**: Procedural geometry representing an unverified semi-automated robot concept. Vendor, vision algorithm, gripper mechanics and autonomy remain `UNKNOWN / NEEDS VERIFICATION`.
- **Blast Cooling Cutaway (`EQ-04`)**: Procedural cutaway representing the stated 5-hour / 5°C target concept (`SOURCE DOCUMENT PROPOSAL`).
- **B2C & B2B Packaging Exploded Views**: Procedural 3D representations paired with 2D CAD SVG drawings (`PackagingBlueprintSvg.tsx`) explicitly separating B2C black 250 g / 500 g cartons from B2B protective cavity sheets/trays.

## Attribution & Fallback Rule
- Every 3D scene renders inside a `GlbErrorBoundary` + `React.Suspense`. If a Polyfork CDN file is unreachable offline, the viewer degrades cleanly to procedural blueprint 3D meshes or the 2D CAD fallback without breaking the application.
