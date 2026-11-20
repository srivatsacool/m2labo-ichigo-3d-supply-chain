# 3D Asset & Licensing Manifest

All 3D assets in the **M2Labo ICHIGO® 3D Supply Chain Experience** are original, modular, flat-shaded low-poly React Three Fiber / Three.js components authored directly inside `src/models/` for this repository, paired with project-generated visual reference sheets in `public/images/references/`:

- `src/models/SharedMaterials.ts` — Shared `MeshStandardMaterial` palette (`#071524`, `#102A43`, `#173B57`, `#42C7E8`, `#A9E8F5`, `#E7C24E`, `#F4F7F8`, `#8C9BA5`, `#E9A23B`, `#D9534F`, `#3CA77A`) and cached procedural `CanvasTexture` maps (industrial blueprint floor grid, road asphalt markings, moulded plastic micro-grain).
- `src/models/ICBOXModel.tsx` — Hero 3D reusable insulated transport container (`ICBOXContainer`, 8 variants: `closed`, `open`, `empty`, `strawberries`, `secured`, `handling`, `returned`, `quarantine`), `StrawberryTrayInsert`, and `LowPolyStrawberry`.
- `src/models/LowPolyBuildings.tsx` — Distinct architectural environments for all 8 downstream stations (`ST-01`..`ST-08`), `ICBOXHeroPlinth`, and `WORLD_BUILDING_COLLIDERS` AABB definitions.
- `src/models/LowPolyVehicles.tsx` — Low-poly Line-Haul Refrigerated Truck (with cutaway ICBOX cargo view), Last-Mile Delivery Rider, and Urban Delivery Van.
- `src/models/LowPolyWorkers.tsx` — Role-coded low-poly operational worker characters.
- `src/models/LowPolyPackaging.tsx` — ICBOX packaging wrappers, B2C Black 250g/500g Box Stacks, B2B Protective Cavity Trays, Insulated Delivery Bags with Coolant Packs, and Pallet Stacks.
- `src/models/LowPolyEquipment.tsx` — QR Scanner Stations, Precision Weighing Scale, QC Inspection Tables, FIFO Warehouse Racks, Order Packing Benches, Roller Conveyors, Electric Forklift Stacker, and Cold-Room Chiller Units.
- `src/models/LowPolyEnvironment.tsx` — Expanded `150 × 85` campus base island, road corridors, route markers, and instanced trees, yard lamps, and safety bollards (`THREE.InstancedMesh`).
- `src/models/AmbientWorldLife.tsx` — Cold-chain chilled air particles and facility status beacons.
- `public/images/pkg-b2c-black-box.jpg` & `public/images/references/ref-*.jpg` — Supplied B2C packaging photo and generated low-poly visual asset reference sheets (`ref-a-environment.jpg` through `ref-f-terrain-pack.jpg`).

## Conceptual Model Notice
All vehicles, facilities, packaging geometries, and equipment silhouettes are illustrative conceptual models representing the downstream supply-chain workflow and do not claim to depict verified M2Labo CAD drawings or vendor equipment models.

Zero third-party remote `.glb` downloads are required at runtime, ensuring reliable offline/corporate-network loading and clean project-owned licensing.
