import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAT } from './SharedMaterials';
import { ICBOXContainer } from './ICBOXModel';
import {
  EmptyCrateStack,
  GradedStrawberryDisplay,
  StrawberryCluster,
  StrawberryCrateFilled,
} from './StrawberryAssetSystem';
import { InsulatedDeliveryBagAsset } from './InsulatedDeliveryBagAsset';
import { LowPolyB2BCavityTray, LowPolyB2CBlackBoxStack, LowPolyPalletStack } from './LowPolyPackaging';
import { LowPolyWorker } from './LowPolyWorkers';
import { LowPolyLastMileVan } from './LowPolyVehicles';
import {
  LowPolyCoolingChillerUnit,
  LowPolyForkliftStacker,
  LowPolyPackingBench,
  LowPolyQcInspectionTable,
  LowPolyQrScannerStation,
  LowPolyRollerConveyor,
  LowPolyWarehouseRack,
  LowPolyWeighingScale,
} from './LowPolyEquipment';

export interface BuildingColliderAABB {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export const WORLD_BUILDING_COLLIDERS: BuildingColliderAABB[] = [
  // ST-01 Farm Barn & Counterparty Wall
  { minX: -67.5, maxX: -60.8, minZ: -22.5, maxZ: -7.5 },
  // ST-03 Receiving Pavilion Back Wall
  { minX: -11.5, maxX: 3.5, minZ: -22.8, maxZ: -21.2 },
  // ST-04 Cold Storage North Wall & Locked Scrap Zone 4
  { minX: 9.0, maxX: 27.8, minZ: -23.6, maxZ: -21.8 },
  { minX: 9.8, maxX: 16.5, minZ: -12.6, maxZ: -11.4 },
  // ST-05 Fulfilment North Wall
  { minX: 12.2, maxX: 27.8, minZ: 3.6, maxZ: 5.0 },
  // ST-06 B2B Hospitality Tower & D2C Residential Tower
  { minX: 53.0, maxX: 60.0, minZ: 0.2, maxZ: 7.5 },
  { minX: 53.0, maxX: 60.0, minZ: 12.5, maxZ: 19.8 },
  // ST-07 Quarantine Firewall Partition
  { minX: -11.5, maxX: 3.5, minZ: 8.2, maxZ: 9.4 },
  { minX: 2.2, maxX: 3.6, minZ: 8.5, maxZ: 19.2 },
  // ST-08 Finance Nexus Core Tower
  { minX: -34.2, maxX: -29.8, minZ: 11.8, maxZ: 16.2 },
];

/**
 * STATION 01 — Upstream Farm Collection Barn, Custody Handover Gate & North Empty-Crate Receipt Bay
 */
export const UpstreamFarmCounterpartyGate: React.FC<{
  position?: [number, number, number];
  showSignage?: boolean;
}> = ({ position = [-56.0, 0, -14.0] }) => (
  <group position={position}>
    {/* Upstream Farm Collection Barn (Strictly Outside M2Labo Custody Boundary) */}
    <group position={[-7.6, 0, -1.0]}>
      <mesh position={[0, 2.4, 0]} material={MAT.barnWood} castShadow receiveShadow>
        <boxGeometry args={[5.4, 4.8, 12.6]} />
      </mesh>
      {/* Pitched barn roof */}
      <mesh position={[0, 5.4, 0]} rotation={[0, Math.PI / 4, 0]} material={MAT.barnRoof} castShadow>
        <coneGeometry args={[6.4, 1.8, 4]} />
      </mesh>
      {/* Farm Dispatch Roll-Up Shutter */}
      <mesh position={[2.75, 1.85, 1.0]} material={MAT.slateDark}>
        <boxGeometry args={[0.12, 3.5, 4.6]} />
      </mesh>
      {/* Warm barn exterior dock sconce */}
      <mesh position={[2.8, 3.9, 1.0]} material={MAT.warmLampGlow}>
        <boxGeometry args={[0.16, 0.22, 1.6]} />
      </mesh>
    </group>

    {/* Dedicated Custody Handover Boundary Floor Strip ("M2LABO CUSTODY BEGINS HERE") */}
    <mesh position={[-3.4, 0.06, 0]} material={MAT.green} receiveShadow>
      <boxGeometry args={[0.45, 0.06, 13.0]} />
    </mesh>
    <mesh position={[-3.4, 0.08, 0]} material={MAT.cyan}>
      <boxGeometry args={[0.14, 0.06, 13.0]} />
    </mesh>

    {/* Architectural Steel Custody Handover Archway Gate */}
    <group position={[-3.4, 0, 0]}>
      <mesh position={[0, 2.75, -5.2]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.68, 5.5, 0.68]} />
      </mesh>
      <mesh position={[0, 2.75, 5.2]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.68, 5.5, 0.68]} />
      </mesh>
      <mesh position={[0, 5.45, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.88, 0.85, 11.2]} />
      </mesh>
      <mesh position={[0.46, 5.45, 0]} material={MAT.green}>
        <boxGeometry args={[0.06, 0.44, 10.2]} />
      </mesh>
    </group>

    {/* M2Labo Concrete Handover Dock + Weather Canopy */}
    <mesh position={[0.8, 0.24, 0]} material={MAT.concretePad} castShadow receiveShadow>
      <boxGeometry args={[7.4, 0.48, 9.2]} />
    </mesh>
    <mesh position={[4.45, 0.49, 0]} material={MAT.amber}>
      <boxGeometry args={[0.18, 0.05, 9.0]} />
    </mesh>
    {[-1.5, 1.5].map((z, i) => (
      <mesh key={i} position={[4.58, 0.34, z]} material={MAT.rubberBlack} castShadow>
        <boxGeometry args={[0.18, 0.38, 0.82]} />
      </mesh>
    ))}
    {/* Cantilevered architectural steel roof */}
    <mesh position={[1.3, 4.4, 0]} rotation={[0, 0, -0.05]} material={MAT.warehouseRoof} castShadow>
      <boxGeometry args={[6.8, 0.18, 9.2]} />
    </mesh>
    {[-4.2, 4.2].map((z, i) => (
      <mesh key={`col-${i}`} position={[4.1, 2.35, z]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.24, 4.1, 0.24]} />
      </mesh>
    ))}

    {/* HERO FRESH STRAWBERRY CRATES Crossing Custody Gate + Supporting Yellow ICBOX Units */}
    <StrawberryCrateFilled position={[-1.5, 0.49, -1.6]} scale={1.06} />
    <StrawberryCrateFilled position={[-1.5, 0.83, -1.6]} scale={1.06} />
    <StrawberryCrateFilled position={[-1.5, 0.49, -0.45]} scale={1.08} />
    <StrawberryCluster position={[-0.2, 0.5, -1.1]} scale={1.45} />
    {/* Supporting yellow ICBOX insulated transport containers (realistically scaled) */}
    <ICBOXContainer position={[-1.5, 0.49, 0.8]} scale={0.92} variant="closed" animateLid={false} />
    <ICBOXContainer position={[-1.5, 0.49, 1.55]} scale={0.92} variant="open" animateLid={false} />

    <LowPolyPalletStack position={[1.7, 0.49, -2.5]} bucket="sellable" levels={2} includeIcbox />
    <LowPolyForkliftStacker position={[2.2, 0.49, 2.2]} rotation={[0, -0.35, 0]} carryingBox />

    {/* Farm Counterparty Sender & M2Labo Receiving Representative */}
    <LowPolyWorker position={[-2.4, 0.49, 2.3]} rotation={[0, Math.PI / 2, 0]} role="counterparty" holdingBox />
    <LowPolyWorker position={[0.2, 0.49, 1.6]} rotation={[0, -Math.PI / 2, 0]} role="m2labo" holdingScanner />
    <LowPolyQrScannerStation position={[1.5, 0.49, 0.2]} rotation={[0, -Math.PI / 3, 0]} accent="green" />

    {/* NORTH BAY (z = -7.8 local => world z = -21.8): FLOW A Empty Crate Receipt & Accounting Bay */}
    <group position={[0.8, 0, -8.2]}>
      <mesh position={[0, 0.18, 0]} material={MAT.concretePad} receiveShadow>
        <boxGeometry args={[6.8, 0.36, 4.6]} />
      </mesh>
      {/* Turquoise floor stripe marking Flow A Empty Crate Receipt */}
      <mesh position={[0, 0.37, 2.15]} material={MAT.turquoiseReturn}>
        <boxGeometry args={[6.4, 0.03, 0.22]} />
      </mesh>
      <EmptyCrateStack position={[-1.4, 0.36, -0.3]} levels={4} columns={2} />
      <EmptyCrateStack position={[1.2, 0.36, -0.3]} levels={3} columns={2} />
      <LowPolyQrScannerStation position={[2.6, 0.36, 1.2]} rotation={[0, Math.PI, 0]} accent="cyan" />
      <LowPolyWorker position={[2.0, 0.36, 1.4]} rotation={[0, -Math.PI / 2, 0]} role="counterparty" />
    </group>
  </group>
);

/**
 * STATION 02 — Dual-Carriageway Line-Haul Highway Telemetry Gantry (Outbound Green + Flow A Return Turquoise)
 */
export const LineHaulHighwayCorridorStation: React.FC<{
  position?: [number, number, number];
  animated?: boolean;
}> = ({ position = [-28.0, 0, -16.0], animated = true }) => {
  const radarRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!radarRef.current || !animated) return;
    radarRef.current.rotation.y = clock.getElapsedTime() * 1.4;
  });

  return (
    <group position={position}>
      {/* Wide Steel Overhead Gantry Spanning BOTH Outbound (z=0.4) and Return Empty-Crate Lane (z=-8.2) */}
      <mesh position={[0, 3.1, 3.5]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.55, 6.2, 0.55]} />
      </mesh>
      <mesh position={[0, 3.1, -3.9]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.48, 6.2, 0.48]} />
      </mesh>
      <mesh position={[0, 3.1, -11.4]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.55, 6.2, 0.55]} />
      </mesh>
      {/* Overhead truss beam */}
      <mesh position={[0, 5.9, -3.95]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.78, 0.72, 16.0]} />
      </mesh>
      {/* Outbound Strawberry Lane Signboard Strip (Green) */}
      <mesh position={[0.42, 5.9, 0.3]} material={MAT.green}>
        <boxGeometry args={[0.06, 0.36, 4.8]} />
      </mesh>
      {/* Flow A Empty Crate Return Lane Signboard Strip (Turquoise) */}
      <mesh position={[-0.42, 5.9, -8.1]} material={MAT.turquoiseReturn}>
        <boxGeometry args={[0.06, 0.36, 4.8]} />
      </mesh>
      {/* Rotating GPS / Thermal Telemetry Beacon */}
      <mesh ref={radarRef} position={[0, 6.65, -3.9]} material={MAT.cyan}>
        <octahedronGeometry args={[0.38, 0]} />
      </mesh>

      {/* Roadside Thermal Lay-by Pad with Supporting Yellow ICBOX Reference */}
      <mesh position={[0, 0.08, 5.6]} material={MAT.concretePad} receiveShadow>
        <boxGeometry args={[8.6, 0.16, 3.4]} />
      </mesh>
      <LowPolyQrScannerStation position={[-2.2, 0.16, 5.5]} accent="cyan" animated={animated} />
      <ICBOXContainer position={[0.3, 0.16, 5.6]} scale={0.96} variant="secured" animateLid={false} />
      <StrawberryCrateFilled position={[1.6, 0.16, 5.6]} scale={0.98} />
      <LowPolyWorker position={[-1.0, 0.16, 5.3]} rotation={[0, Math.PI / 4, 0]} role="driver" />
    </group>
  );
};

/**
 * STATION 03 — Andheri MIDC Inbound Receiving Dock, Fresh Strawberry QC Lab & North Empty Crate Consolidation Bay
 */
export const MidcReceivingAndQcBuilding: React.FC<{
  position?: [number, number, number];
  animated?: boolean;
}> = ({ position = [-4.0, 0, -16.0], animated = true }) => (
  <group position={position}>
    {/* Architectural Foundation & Receiving Slab */}
    <mesh position={[0, 0.14, 0]} material={MAT.concretePad} receiveShadow>
      <boxGeometry args={[15.0, 0.28, 12.6]} />
    </mesh>
    <mesh position={[0, 0.29, 0]} material={MAT.slateDark} receiveShadow>
      <boxGeometry args={[14.5, 0.04, 12.1]} />
    </mesh>

    {/* North Insulated Architectural Wall + Structural Columns + Chiller Unit */}
    <mesh position={[0, 2.35, -5.9]} material={MAT.warehouseWall} castShadow receiveShadow>
      <boxGeometry args={[14.8, 4.2, 0.42]} />
    </mesh>
    <mesh position={[0, 4.5, -5.9]} material={MAT.cyanSubtle}>
      <boxGeometry args={[14.8, 0.16, 0.48]} />
    </mesh>
    <LowPolyCoolingChillerUnit position={[0, 3.6, -5.3]} animated={animated} />

    {/* West Inbound Truck Dock Portal with Warm Interior Lighting & Rubber Bumpers */}
    <mesh position={[-7.2, 2.2, -3.6]} material={MAT.warehouseWall} castShadow>
      <boxGeometry args={[0.4, 4.0, 4.2]} />
    </mesh>
    <mesh position={[-7.2, 2.2, 3.6]} material={MAT.warehouseWall} castShadow>
      <boxGeometry args={[0.4, 4.0, 4.2]} />
    </mesh>
    <mesh position={[-7.2, 3.9, 0]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.52, 0.9, 11.8]} />
    </mesh>
    <mesh position={[-7.48, 3.85, 0]} material={MAT.warmLampGlow}>
      <boxGeometry args={[0.08, 0.22, 3.2]} />
    </mesh>
    {[-1.3, 1.3].map((z, i) => (
      <mesh key={i} position={[-7.48, 0.48, z]} material={MAT.rubberBlack} castShadow>
        <boxGeometry args={[0.22, 0.48, 0.72]} />
      </mesh>
    ))}

    {/* Cutaway Sawtooth Roof Canopy (leaves interior fully visible from Overview & walkable in FP/TP) */}
    <mesh position={[0, 4.65, -3.4]} rotation={[0.08, 0, 0]} material={MAT.warehouseRoof} castShadow>
      <boxGeometry args={[14.8, 0.18, 5.2]} />
    </mesh>
    <mesh position={[0, 4.55, 0.8]} material={MAT.glassIce}>
      <boxGeometry args={[14.4, 0.12, 3.6]} />
    </mesh>

    {/* Unload Roller Conveyor carrying Vivid Fresh Strawberry Crates + QR Arch */}
    <LowPolyRollerConveyor position={[-3.8, 0.31, 0.2]} length={5.4} withBoxes />
    <LowPolyQrScannerStation position={[-3.2, 0.31, -1.2]} accent="cyan" animated={animated} />

    {/* Precision Digital Weighing Scale with Fresh Strawberry Crate */}
    <LowPolyWeighingScale position={[0.4, 0.31, -2.5]} rotation={[0, -0.3, 0]} />

    {/* Prominent Strawberry QC Inspection Benches */}
    <LowPolyQcInspectionTable position={[3.0, 0.31, 1.2]} rotation={[0, Math.PI / 2, 0]} />
    <LowPolyQcInspectionTable position={[3.0, 0.31, -2.2]} rotation={[0, Math.PI / 2, 0]} />

    {/* Cold-Storage East Airlock Portal leading into ST-04 */}
    <mesh position={[7.15, 1.85, 0]} material={MAT.lightCyan}>
      <boxGeometry args={[0.22, 3.3, 3.6]} />
    </mesh>

    {/* Staff: Receiving Operator, QC Inspector, Supervisor */}
    <LowPolyWorker position={[-4.5, 0.31, 1.8]} rotation={[0, 0, 0]} role="m2labo" holdingScanner />
    <LowPolyWorker position={[1.4, 0.31, 1.2]} rotation={[0, Math.PI / 2, 0]} role="qc" />
    <LowPolyWorker position={[1.4, 0.31, -2.2]} rotation={[0, Math.PI / 2, 0]} role="m2labo" holdingScanner />

    {/* NORTH-WEST EXTERIOR BAY: FLOW A Empty Reusable Crate Consolidation & Return Loading Bay */}
    <group position={[-3.2, 0, -8.4]}>
      <mesh position={[0, 0.14, 0]} material={MAT.concretePad} receiveShadow>
        <boxGeometry args={[8.4, 0.28, 4.2]} />
      </mesh>
      <mesh position={[0, 0.29, -1.95]} material={MAT.turquoiseReturn}>
        <boxGeometry args={[8.0, 0.03, 0.22]} />
      </mesh>
      <EmptyCrateStack position={[-2.2, 0.28, 0]} levels={4} columns={2} />
      <EmptyCrateStack position={[0.6, 0.28, 0]} levels={3} columns={2} />
      <LowPolyWorker position={[2.8, 0.28, 0.4]} rotation={[0, -Math.PI / 2, 0]} role="m2labo" holdingScanner />
    </group>
  </group>
);

/**
 * STATION 04 — MIDC 4-Bucket Segregated Cold-Storage Architectural Warehouse
 */
export const MidcFourBucketColdStorageBuilding: React.FC<{
  position?: [number, number, number];
  showZones?: boolean;
  animated?: boolean;
}> = ({ position = [18.0, 0, -16.0], animated = true }) => (
  <group position={position}>
    <mesh position={[0, 0.14, 0]} material={MAT.concretePad} receiveShadow>
      <boxGeometry args={[19.2, 0.28, 15.0]} />
    </mesh>
    <mesh position={[0, 0.29, 0]} material={MAT.slateDark} receiveShadow>
      <boxGeometry args={[18.6, 0.04, 14.4]} />
    </mesh>

    {/* Insulated North & East Exterior Cold-Room Walls + Twin Rooftop Chiller Condensers */}
    <mesh position={[0, 2.5, -7.1]} material={MAT.insulatedPanel} castShadow receiveShadow>
      <boxGeometry args={[18.8, 4.5, 0.42]} />
    </mesh>
    <mesh position={[9.2, 2.5, 0]} material={MAT.insulatedPanel} castShadow receiveShadow>
      <boxGeometry args={[0.42, 4.5, 14.6]} />
    </mesh>
    <mesh position={[0, 4.8, -7.1]} material={MAT.cyan}>
      <boxGeometry args={[18.8, 0.16, 0.48]} />
    </mesh>
    {/* Twin Heavy Rooftop Refrigerated Condenser Blocks (matching v2-endless-world.jpg!) */}
    <group position={[-4.5, 4.9, -5.0]}>
      <mesh material={MAT.warehouseRoof} castShadow>
        <boxGeometry args={[4.4, 1.1, 3.2]} />
      </mesh>
      <mesh position={[0, 0.58, 0]} material={MAT.cyan}>
        <cylinderGeometry args={[1.05, 1.05, 0.08, 12]} />
      </mesh>
    </group>
    <group position={[4.5, 4.9, -5.0]}>
      <mesh material={MAT.warehouseRoof} castShadow>
        <boxGeometry args={[4.4, 1.1, 3.2]} />
      </mesh>
      <mesh position={[0, 0.58, 0]} material={MAT.cyan}>
        <cylinderGeometry args={[1.05, 1.05, 0.08, 12]} />
      </mesh>
    </group>
    <LowPolyCoolingChillerUnit position={[-4.5, 3.6, -6.4]} animated={animated} />
    <LowPolyCoolingChillerUnit position={[4.5, 3.6, -6.4]} animated={animated} />

    {/* Partial Insulated Roof Cutaway */}
    <mesh position={[0, 4.85, -4.6]} material={MAT.warehouseRoof} castShadow>
      <boxGeometry args={[18.8, 0.2, 5.4]} />
    </mesh>
    <mesh position={[0, 4.75, 1.4]} material={MAT.glassIce}>
      <boxGeometry args={[18.4, 0.12, 6.8]} />
    </mesh>

    {/* ZONE 1 (North-West — Green): Full Sellable Fresh Strawberries (FIFO) */}
    <mesh position={[-4.6, 0.32, -3.2]} material={MAT.zoneSellable} receiveShadow>
      <boxGeometry args={[8.4, 0.05, 6.2]} />
    </mesh>
    <LowPolyWarehouseRack position={[-5.6, 0.32, -4.6]} bucket="sellable" showFifoMarker />
    <LowPolyWarehouseRack position={[-2.2, 0.32, -4.6]} bucket="sellable" showFifoMarker />
    <LowPolyPalletStack position={[-5.2, 0.32, -1.7]} bucket="sellable" levels={2} includeIcbox />
    <LowPolyForkliftStacker position={[-1.9, 0.32, -1.3]} rotation={[0, Math.PI, 0]} carryingBox />

    {/* ZONE 2 (North-East — Cyan): Reshuffling Buffer Stock */}
    <mesh position={[4.6, 0.32, -3.2]} material={MAT.zoneReshuffle} receiveShadow>
      <boxGeometry args={[8.4, 0.05, 6.2]} />
    </mesh>
    <LowPolyWarehouseRack position={[4.8, 0.32, -4.6]} bucket="reshuffle" />
    <LowPolyQcInspectionTable position={[4.5, 0.32, -1.7]} />
    <LowPolyWorker position={[2.8, 0.32, -1.7]} rotation={[0, Math.PI / 2, 0]} role="qc" />

    {/* ZONE 3 (South-East — Amber): Value Addition Stock */}
    <mesh position={[4.6, 0.32, 3.6]} material={MAT.zoneValueAdd} receiveShadow>
      <boxGeometry args={[8.4, 0.05, 6.0]} />
    </mesh>
    <LowPolyWarehouseRack position={[5.0, 0.32, 4.6]} bucket="valueAdd" />
    <LowPolyPalletStack position={[3.0, 0.32, 2.2]} bucket="valueAdd" levels={2} />

    {/* ZONE 4 (South-West — Red Walled/Locked): Scrap / Waste Containment */}
    <mesh position={[-4.6, 0.32, 3.6]} material={MAT.zoneScrap} receiveShadow>
      <boxGeometry args={[8.4, 0.05, 6.0]} />
    </mesh>
    <mesh position={[-4.6, 1.1, 0.55]} material={MAT.red} castShadow>
      <boxGeometry args={[8.4, 1.6, 0.3]} />
    </mesh>
    <mesh position={[-0.35, 1.1, 3.6]} material={MAT.red} castShadow>
      <boxGeometry args={[0.3, 1.6, 6.2]} />
    </mesh>
    <LowPolyPalletStack position={[-4.8, 0.32, 3.6]} bucket="scrap" levels={1} />
    <LowPolyQrScannerStation position={[-2.2, 0.32, 2.4]} accent="red" animated={animated} />
  </group>
);

/**
 * STATION 05 — Customer Order, Strawberry Packing & Black Insulated Delivery Bag Dispatch Hall
 */
export const MidcOrderPackingFulfilmentHall: React.FC<{
  position?: [number, number, number];
  animated?: boolean;
}> = ({ position = [20.0, 0, 10.0], animated = true }) => (
  <group position={position}>
    <mesh position={[0, 0.14, 0]} material={MAT.concretePad} receiveShadow>
      <boxGeometry args={[16.8, 0.28, 12.6]} />
    </mesh>
    <mesh position={[0, 0.29, 0]} material={MAT.slateDark} receiveShadow>
      <boxGeometry args={[16.2, 0.04, 12.0]} />
    </mesh>

    {/* North Architectural Partition Wall with Chilled Airlock from ST-04 */}
    <mesh position={[-4.6, 2.2, -5.8]} material={MAT.warehouseWall} castShadow>
      <boxGeometry args={[7.0, 4.0, 0.36]} />
    </mesh>
    <mesh position={[4.6, 2.2, -5.8]} material={MAT.warehouseWall} castShadow>
      <boxGeometry args={[7.0, 4.0, 0.36]} />
    </mesh>
    <mesh position={[0, 4.25, -5.8]} material={MAT.cyanSubtle}>
      <boxGeometry args={[16.4, 0.14, 0.42]} />
    </mesh>
    {/* Partial Rear Roof Canopy + Warm Dispatch Bay Overhang */}
    <mesh position={[0, 4.35, -3.5]} material={MAT.warehouseRoof} castShadow>
      <boxGeometry args={[16.4, 0.18, 4.8]} />
    </mesh>
    {/* East Rider Dispatch Canopy */}
    <mesh position={[7.4, 3.6, 0]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[2.6, 0.18, 8.0]} />
    </mesh>
    <mesh position={[8.6, 3.45, 0]} material={MAT.warmLampGlow}>
      <boxGeometry args={[0.1, 0.18, 4.2]} />
    </mesh>

    {/* FIFO Strawberry Pick Racks fed from Zone 1 */}
    <LowPolyWarehouseRack position={[-5.4, 0.31, -2.5]} bucket="sellable" showFifoMarker />
    <LowPolyWarehouseRack position={[-5.4, 0.31, 2.2]} bucket="sellable" />

    {/* Parallel Strawberry Packing Benches (B2C Black Cartons + B2B Trays + Open Black Insulated Delivery Bags) */}
    <LowPolyPackingBench position={[0.0, 0.31, -2.6]} />
    <LowPolyPackingBench position={[0.0, 0.31, 0.3]} />
    <LowPolyPackingBench position={[0.0, 0.31, 3.2]} />

    {/* Outbound Conveyor carrying Packed Black Insulated Delivery Bags to Rider Bay */}
    <LowPolyRollerConveyor position={[4.9, 0.31, 0.0]} length={4.8} withBags />
    <LowPolyQrScannerStation position={[6.5, 0.31, -1.8]} rotation={[0, -Math.PI / 2, 0]} accent="green" animated={animated} />

    {/* Dedicated Black Insulated Delivery Bag Ready-Pool Staging Rack (South-East corner) */}
    <group position={[4.6, 0.31, 3.8]}>
      <mesh position={[0, 0.06, 0]} material={MAT.steelRack} receiveShadow>
        <boxGeometry args={[3.4, 0.12, 1.3]} />
      </mesh>
      <InsulatedDeliveryBagAsset position={[-1.05, 0.12, 0]} scale={0.92} variant="closed" />
      <InsulatedDeliveryBagAsset position={[0.0, 0.12, 0]} scale={0.92} variant="open_strawberries" />
      <InsulatedDeliveryBagAsset position={[1.05, 0.12, 0]} scale={0.92} variant="closed" />
    </group>

    {/* Fulfilment Staff */}
    <LowPolyWorker position={[-3.0, 0.31, -0.5]} rotation={[0, Math.PI / 2, 0]} role="picker" holdingBox />
    <LowPolyWorker position={[-1.8, 0.31, 1.8]} rotation={[0, Math.PI / 3, 0]} role="picker" holdingBox />
    <LowPolyWorker position={[2.2, 0.31, 0.4]} rotation={[0, -Math.PI / 2, 0]} role="m2labo" holdingScanner />
  </group>
);

/**
 * STATION 06 — Mumbai Urban Customer Delivery District (B2B Luxury Hospitality & D2C Residential)
 */
export const CustomerDestinationDistrict: React.FC<{
  position?: [number, number, number];
}> = ({ position = [52.0, 0, 10.0] }) => (
  <group position={position}>
    {/* Integrated Sidewalk & Delivery Forecourt */}
    <mesh position={[0, 0.08, 0]} material={MAT.sidewalk} receiveShadow>
      <boxGeometry args={[17.2, 0.16, 20.6]} />
    </mesh>

    {/* B2B Luxury Hospitality / Patisserie Tower (North Wing) */}
    <group position={[4.2, 0.16, -5.4]}>
      <mesh position={[0, 4.2, 0]} material={MAT.urbanFacadeLight} castShadow receiveShadow>
        <boxGeometry args={[6.4, 8.4, 6.4]} />
      </mesh>
      {/* Architectural window bands */}
      {[2.8, 4.4, 6.0, 7.3].map((y, i) => (
        <mesh key={i} position={[-3.24, y, 0]} material={MAT.warmLampGlow}>
          <boxGeometry args={[0.08, 0.65, 4.8]} />
        </mesh>
      ))}
      <mesh position={[0, 8.6, 0]} material={MAT.goldAccent} castShadow>
        <boxGeometry args={[6.8, 0.4, 6.8]} />
      </mesh>
      {/* Portico entrance & canopy */}
      <mesh position={[-3.26, 1.4, 0]} material={MAT.lightCyan}>
        <boxGeometry args={[0.12, 2.5, 3.6]} />
      </mesh>
      <mesh position={[-4.2, 2.75, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[2.1, 0.24, 4.4]} />
      </mesh>
      {/* Delivered Fresh Strawberries + Open Black Insulated Delivery Bag at Kitchen Handover */}
      <mesh position={[-4.5, 0.42, -1.2]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[1.6, 0.84, 1.0]} />
      </mesh>
      <LowPolyB2BCavityTray position={[-4.85, 0.86, -1.2]} />
      <InsulatedDeliveryBagAsset position={[-4.1, 0.86, -1.2]} scale={0.86} variant="open_strawberries" />
      <LowPolyWorker position={[-4.3, 0, 0.8]} rotation={[0, -Math.PI / 2, 0]} role="counterparty" holdingBox />
    </group>

    {/* D2C Premium Residential & Speciality Retail Tower (South Wing) */}
    <group position={[4.2, 0.16, 5.6]}>
      <mesh position={[0, 3.6, 0]} material={MAT.urbanFacadeWarm} castShadow receiveShadow>
        <boxGeometry args={[6.0, 7.2, 6.0]} />
      </mesh>
      <mesh position={[0, 7.35, 0]} material={MAT.cyanSubtle} castShadow>
        <boxGeometry args={[6.3, 0.3, 6.3]} />
      </mesh>
      {[1.6, 3.0, 4.4, 5.8].map((y, idx) => (
        <mesh key={idx} position={[-3.04, y, 0]} material={MAT.warmLampGlow}>
          <boxGeometry args={[0.08, 0.56, 4.2]} />
        </mesh>
      ))}
      <mesh position={[-3.8, 2.4, 0]} material={MAT.concreteCurb} castShadow>
        <boxGeometry args={[1.6, 0.2, 3.6]} />
      </mesh>
      {/* Delivered B2C Matte-Black Strawberry Cartons + Black Delivery Bag */}
      <LowPolyB2CBlackBoxStack position={[-4.1, 0.0, 0.9]} />
      <InsulatedDeliveryBagAsset position={[-4.2, 0.0, -0.2]} scale={0.85} variant="closed" />
      <LowPolyWorker position={[-3.8, 0, -1.2]} rotation={[0, -Math.PI / 2, 0]} role="counterparty" />
    </group>

    {/* Parked Compact Urban Delivery Van at North Bay */}
    <LowPolyLastMileVan position={[-4.4, 0.16, -5.2]} rotation={[0, -0.18, 0]} />
  </group>
);

/**
 * STATION 07 — Flow B Black Insulated Delivery Bag Return Intake & Physically Walled Quarantine Bay
 */
export const QuarantineReturnsAndSanitizationFacility: React.FC<{
  position?: [number, number, number];
  showZones?: boolean;
  animated?: boolean;
}> = ({ position = [-4.0, 0, 14.0], animated = true }) => (
  <group position={position}>
    <mesh position={[0, 0.14, 0]} material={MAT.concretePad} receiveShadow>
      <boxGeometry args={[15.0, 0.28, 11.6]} />
    </mesh>
    <mesh position={[-3.4, 0.29, 0]} material={MAT.zoneScrap} receiveShadow>
      <boxGeometry args={[7.4, 0.04, 10.6]} />
    </mesh>

    {/* Solid Red Firewall Partition Separating Quarantine from MIDC Core */}
    <mesh position={[0, 1.45, -5.3]} material={MAT.red} castShadow>
      <boxGeometry args={[14.6, 2.6, 0.34]} />
    </mesh>
    <mesh position={[7.15, 1.45, 0]} material={MAT.red} castShadow>
      <boxGeometry args={[0.34, 2.6, 10.8]} />
    </mesh>
    <mesh position={[0.4, 1.15, 0]} material={MAT.amber} castShadow>
      <boxGeometry args={[0.24, 2.0, 10.2]} />
    </mesh>

    {/* WEST BAY: Quarantined Strawberry Return QC (Strictly Blocked from Zone 1 Sellable) */}
    <LowPolyQrScannerStation position={[-5.0, 0.31, 2.8]} accent="red" animated={animated} />
    <LowPolyQcInspectionTable position={[-3.2, 0.31, -0.8]} rotation={[0, Math.PI / 2, 0]} quarantine />
    <StrawberryCrateFilled position={[-5.2, 0.31, -2.8]} scale={1.0} quarantine />
    <LowPolyWorker position={[-4.8, 0.31, -0.8]} rotation={[0, Math.PI / 2, 0]} role="qc" />

    {/* EAST BAY: FLOW B Returning Black Insulated Delivery Bag Intake, Recording & Sanitization */}
    <mesh position={[3.8, 0.3, 0.2]} material={MAT.zoneReshuffle} receiveShadow>
      <boxGeometry args={[5.8, 0.04, 8.6]} />
    </mesh>
    {/* Amber Return Check-In Floor Strip */}
    <mesh position={[3.8, 0.33, 4.35]} material={MAT.amber}>
      <boxGeometry args={[5.6, 0.03, 0.24]} />
    </mesh>
    {/* Black Insulated Delivery Bag Sanitization & Re-Freeze Racks */}
    <group position={[3.8, 0.31, -2.4]}>
      <mesh position={[0, 0.45, 0]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[3.8, 0.08, 1.1]} />
      </mesh>
      <mesh position={[0, 1.4, 0]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[3.8, 0.08, 1.1]} />
      </mesh>
      {[-1.85, 1.85].map((x, i) => (
        <mesh key={i} position={[x, 0.9, 0]} material={MAT.steelRack} castShadow>
          <boxGeometry args={[0.1, 1.8, 1.0]} />
        </mesh>
      ))}
      <InsulatedDeliveryBagAsset position={[-1.1, 0.5, 0]} scale={0.88} variant="empty_return" />
      <InsulatedDeliveryBagAsset position={[0.0, 0.5, 0]} scale={0.88} variant="empty_return" />
      <InsulatedDeliveryBagAsset position={[1.1, 0.5, 0]} scale={0.88} variant="closed" />
      <InsulatedDeliveryBagAsset position={[-0.6, 1.45, 0]} scale={0.88} variant="closed" />
      <InsulatedDeliveryBagAsset position={[0.6, 1.45, 0]} scale={0.88} variant="closed" />
    </group>
    {/* Returned Black Bags arriving at intake bench */}
    <InsulatedDeliveryBagAsset position={[2.8, 0.31, 2.0]} scale={0.96} variant="empty_return" />
    <InsulatedDeliveryBagAsset position={[4.2, 0.31, 2.0]} scale={0.96} variant="empty_return" />
    <LowPolyQrScannerStation position={[5.4, 0.31, 2.2]} rotation={[0, -Math.PI / 2, 0]} accent="cyan" animated={animated} />
    <LowPolyWorker position={[1.8, 0.31, 2.0]} rotation={[0, Math.PI / 2, 0]} role="m2labo" holdingScanner />
  </group>
);

/**
 * STATION 08 — Digital ERP / Financial Reconciliation Information Pavilion
 */
export const FinancialReconciliationStation3D: React.FC<{
  position?: [number, number, number];
  animated?: boolean;
}> = ({ position = [-32.0, 0, 14.0], animated = true }) => {
  const coreOrbRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!coreOrbRef.current || !animated) return;
    coreOrbRef.current.rotation.y = clock.getElapsedTime() * 0.9;
    coreOrbRef.current.position.y = 4.3 + Math.sin(clock.getElapsedTime() * 2.0) * 0.14;
  });

  return (
    <group position={position}>
      {/* Architectural Octagonal Operations Pavilion Terrace */}
      <mesh position={[0, 0.25, 0]} material={MAT.concretePad} castShadow receiveShadow>
        <cylinderGeometry args={[5.8, 6.3, 0.5, 8]} />
      </mesh>
      <mesh position={[0, 0.54, 0]} material={MAT.cyanSubtle}>
        <cylinderGeometry args={[5.1, 5.1, 0.08, 8]} />
      </mesh>
      <mesh position={[0, 0.62, 0]} material={MAT.deepNavy} receiveShadow>
        <cylinderGeometry args={[4.5, 4.7, 0.12, 8]} />
      </mesh>

      {/* Central 3-Way Match Digital Ledger Core */}
      <mesh position={[0, 2.2, 0]} material={MAT.secondaryNavy} castShadow>
        <cylinderGeometry args={[1.08, 1.38, 3.0, 6]} />
      </mesh>
      <mesh position={[0, 2.2, 0]} material={MAT.cyan}>
        <cylinderGeometry args={[1.15, 1.15, 0.18, 6]} />
      </mesh>
      <mesh ref={coreOrbRef} position={[0, 4.3, 0]} material={MAT.cyan}>
        <octahedronGeometry args={[0.74, 0]} />
      </mesh>

      {/* 4 Financial Monoliths (Orders/POD, Invoices/CN, Logistics Costs, Contribution Margin) */}
      {[
        { pos: [-2.7, 1.65, -2.0] as [number, number, number], h: 2.0, mat: MAT.green },
        { pos: [2.7, 1.85, -2.0] as [number, number, number], h: 2.4, mat: MAT.cyan },
        { pos: [-2.7, 1.5, 2.0] as [number, number, number], h: 1.7, mat: MAT.amber },
        { pos: [2.7, 2.05, 2.0] as [number, number, number], h: 2.8, mat: MAT.lightCyan },
      ].map((pillar, idx) => (
        <group key={idx} position={pillar.pos}>
          <mesh material={MAT.secondaryNavy} castShadow>
            <boxGeometry args={[0.88, pillar.h, 0.88]} />
          </mesh>
          <mesh position={[0, pillar.h / 2 + 0.1, 0]} material={pillar.mat}>
            <boxGeometry args={[0.96, 0.16, 0.96]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
