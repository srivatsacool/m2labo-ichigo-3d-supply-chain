# 3D Asset & Licensing Manifest

All 3D assets in the **M2Labo ICHIGO® 3D Supply Chain Experience** are original, modular, flat-shaded low-poly React Three Fiber / Three.js components authored directly inside `src/models/` for this repository:

- `src/models/SharedMaterials.ts` — Shared `MeshStandardMaterial` palette (`#102A43`, `#173B57`, `#42C7E8`, `#A9E8F5`, `#F4F7F8`, `#8C9BA5`, `#E9A23B`, `#D9534F`, `#3CA77A`).
- `src/models/LowPolyBuildings.tsx` — Conceptual architectural low-poly models for the Custody Handover Gate, Andheri MIDC 4-Zone Cutaway Warehouse, Customer Destination Buildings, and Compact Digital Financial Reconciliation Station.
- `src/models/LowPolyVehicles.tsx` — Conceptual low-poly Line-Haul Transport Van, Last-Mile Delivery Scooter Rider, and Urban Delivery Van.
- `src/models/LowPolyWorkers.tsx` — Role-coded low-poly operational worker characters.
- `src/models/LowPolyPackaging.tsx` — Low-poly Strawberry Crates, B2C Black 250g/500g Box Stacks, B2B Protective Cavity Trays, Insulated Delivery Bags with Coolant Packs, and Pallet Stacks.
- `src/models/LowPolyEquipment.tsx` — Low-poly QR Scanner Stations, Precision Weighing Scale, QC Inspection Tables, FIFO Warehouse Racks, and Order Packing Benches.
- `src/models/LowPolyEnvironment.tsx` — Diorama base island, road network, route markers, trees, and instanced safety bollards.

## Conceptual Model Notice
All vehicles, facilities, packaging geometries, and equipment silhouettes are clearly illustrative conceptual models representing the downstream supply-chain workflow and do not claim to depict verified M2Labo CAD drawings or vendor equipment models.

Zero third-party remote `.glb` downloads are required at runtime, ensuring reliable offline/corporate-network loading and full MIT/project-owned asset cleanliness.
