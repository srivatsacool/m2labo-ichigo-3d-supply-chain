import React from 'react';
import { Html } from '@react-three/drei';
import { MAT } from './SharedMaterials';
import { LowPolyStrawberryCrate, LowPolyPalletStack } from './LowPolyPackaging';
import { LowPolyWorker } from './LowPolyWorkers';
import {
  LowPolyPackingBench,
  LowPolyQcInspectionTable,
  LowPolyQrScannerStation,
  LowPolyWarehouseRack,
  LowPolyWeighingScale,
} from './LowPolyEquipment';

export const UpstreamFarmCounterpartyGate: React.FC<{
  position?: [number, number, number];
  showSignage?: boolean;
}> = ({ position = [-20.5, 0, -4.0], showSignage = true }) => (
  <group position={position}>
    {/* Upstream Farm Counterparty Facade (Strictly External Boundary — No Farm Interior/Robots/Coolers) */}
    <group position={[-4.2, 0, 0]}>
      <mesh position={[0, 1.55, 0]} material={MAT.darkGrey} castShadow receiveShadow>
        <boxGeometry args={[2.2, 3.1, 4.8]} />
      </mesh>
      <mesh position={[0, 3.3, 0]} material={MAT.neutralGrey} castShadow>
        <boxGeometry args={[2.4, 0.35, 5.0]} />
      </mesh>
      {/* Closed Upstream Delivery Shutter */}
      <mesh position={[1.12, 1.15, 0]} material={MAT.slateDark}>
        <boxGeometry args={[0.08, 2.2, 2.6]} />
      </mesh>
    </group>

    {/* Dedicated Custody Handover Boundary Floor Strip */}
    <mesh position={[-2.1, 0.04, 0]} material={MAT.cyan} receiveShadow>
      <boxGeometry args={[0.28, 0.06, 5.8]} />
    </mesh>
    <mesh position={[-2.1, 0.045, 0]} material={MAT.amber}>
      <boxGeometry args={[0.08, 0.07, 5.8]} />
    </mesh>

    {/* Dedicated Custody Handover Archway Gate */}
    <group position={[-2.1, 0, 0]}>
      <mesh position={[0, 1.85, -2.55]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.42, 3.7, 0.42]} />
      </mesh>
      <mesh position={[0, 1.85, 2.55]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.42, 3.7, 0.42]} />
      </mesh>
      <mesh position={[0, 3.75, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.52, 0.55, 5.5]} />
      </mesh>
      <mesh position={[0.27, 3.75, 0]} material={MAT.cyan}>
        <boxGeometry args={[0.04, 0.38, 5.1]} />
      </mesh>
    </group>

    {/* M2Labo Raised Handover Platform */}
    <mesh position={[0.4, 0.16, 0]} material={MAT.secondaryNavy} castShadow receiveShadow>
      <boxGeometry args={[4.4, 0.32, 4.8]} />
    </mesh>
    <mesh position={[0.4, 0.33, 0]} material={MAT.offWhite} receiveShadow>
      <boxGeometry args={[4.2, 0.03, 4.6]} />
    </mesh>

    {/* Crates handed over across boundary */}
    <LowPolyStrawberryCrate position={[-0.7, 0.34, -0.7]} variant="b2c" />
    <LowPolyStrawberryCrate position={[-0.7, 0.34, 0.0]} variant="b2b" />
    <LowPolyStrawberryCrate position={[-0.7, 0.58, -0.35]} variant="standard" />

    {/* Farm Counterparty Sender & M2Labo Receiving Representative */}
    <LowPolyWorker position={[-1.4, 0.34, 1.2]} rotation={[0, Math.PI / 2, 0]} role="counterparty" holdingBox />
    <LowPolyWorker position={[0.7, 0.34, 0.95]} rotation={[0, -Math.PI / 2, 0]} role="m2labo" holdingScanner />
    <LowPolyQrScannerStation position={[1.25, 0.34, -1.25]} rotation={[0, -Math.PI / 3, 0]} />

    {showSignage && (
      <Html position={[-2.1, 4.55, 0]} center distanceFactor={22}>
        <div className="pointer-events-none select-none whitespace-nowrap rounded border-2 border-[#42C7E8] bg-[#102A43]/95 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-[#F4F7F8] shadow-xl">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#3CA77A]" />
          M2LABO CUSTODY BEGINS HERE
        </div>
      </Html>
    )}
  </group>
);

export const MidcWarehouseComplex: React.FC<{
  showZones?: boolean;
}> = ({ showZones = true }) => (
  <group position={[0, 0, 0]}>
    {/* Main MIDC Slab Footprint */}
    <mesh position={[3.6, 0.08, -0.1]} material={MAT.deepNavy} receiveShadow>
      <boxGeometry args={[14.2, 0.16, 15.2]} />
    </mesh>
    <mesh position={[3.6, 0.17, -0.1]} material={MAT.slateDark} receiveShadow>
      <boxGeometry args={[13.8, 0.03, 14.8]} />
    </mesh>

    {/* Perimeter Architectural Cutaway Low Walls */}
    {/* North Back Wall */}
    <mesh position={[3.6, 1.65, -7.4]} material={MAT.secondaryNavy} castShadow receiveShadow>
      <boxGeometry args={[14.0, 3.1, 0.25]} />
    </mesh>
    {/* West Wall Split by Receiving Bay & Quarantine Bay */}
    <mesh position={[-3.3, 1.5, -6.4]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.25, 2.8, 2.1]} />
    </mesh>
    <mesh position={[-3.3, 1.5, -0.2]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.25, 2.8, 3.6]} />
    </mesh>
    {/* Translucent Cold-Storage Roof Canopy Over North Half */}
    <mesh position={[3.6, 3.2, -4.4]} material={MAT.glassIce}>
      <boxGeometry args={[13.6, 0.12, 6.2]} />
    </mesh>

    {/* ST-03: RECEIVING & QC DOCK ZONE (West-North) */}
    <group position={[-1.5, 0.18, -4.5]}>
      <mesh position={[0, 0.01, 0]} material={MAT.secondaryNavy} receiveShadow>
        <boxGeometry args={[3.4, 0.02, 4.8]} />
      </mesh>
      <LowPolyQrScannerStation position={[-1.1, 0, -1.4]} rotation={[0, Math.PI / 2, 0]} />
      <LowPolyWeighingScale position={[-0.2, 0, 1.2]} />
      <LowPolyQcInspectionTable position={[0.7, 0, -0.4]} rotation={[0, Math.PI / 2, 0]} />
      <LowPolyWorker position={[-0.9, 0, 0.1]} rotation={[0, Math.PI / 2, 0]} role="m2labo" holdingScanner />
      <LowPolyWorker position={[0.1, 0, -1.3]} rotation={[0, 0, 0]} role="qc" />
      {/* Cold-Storage Entrance Airlock Frame */}
      <mesh position={[1.65, 1.25, 0]} material={MAT.lightCyan}>
        <boxGeometry args={[0.14, 2.5, 2.2]} />
      </mesh>
    </group>

    {/* ST-04: 4 PHYSICALLY SEGREGATED INVENTORY BUCKETS (North-East Cold Zone) */}
    <group position={[4.5, 0.18, -4.5]}>
      {/* Bucket 1: Full Sellable Stock (Green + FIFO Racks) */}
      <mesh position={[-1.7, 0.02, -1.35]} material={MAT.zoneSellable} receiveShadow>
        <boxGeometry args={[3.3, 0.04, 2.6]} />
      </mesh>
      <LowPolyWarehouseRack position={[-1.7, 0, -1.65]} bucket="sellable" showFifoMarker />
      <LowPolyPalletStack position={[-1.7, 0, -0.55]} bucket="sellable" levels={2} />

      {/* Bucket 2: Reshuffling Buffer Stock (Cyan) */}
      <mesh position={[2.0, 0.02, -1.35]} material={MAT.zoneReshuffle} receiveShadow>
        <boxGeometry args={[3.2, 0.04, 2.6]} />
      </mesh>
      <LowPolyWarehouseRack position={[2.0, 0, -1.65]} bucket="reshuffle" />
      <LowPolyWorker position={[1.5, 0, -0.6]} rotation={[0, -Math.PI / 4, 0]} role="qc" />

      {/* Bucket 3: Value Addition Stock (Amber) */}
      <mesh position={[2.0, 0.02, 1.65]} material={MAT.zoneValueAdd} receiveShadow>
        <boxGeometry args={[3.2, 0.04, 2.4]} />
      </mesh>
      <LowPolyPalletStack position={[2.2, 0, 1.65]} bucket="valueAdd" levels={2} />

      {/* Bucket 4: Scrap / Waste Stock (Red + Physical Partition Wall Locking from Sellable) */}
      <mesh position={[-1.7, 0.02, 1.65]} material={MAT.zoneScrap} receiveShadow>
        <boxGeometry args={[3.3, 0.04, 2.4]} />
      </mesh>
      {/* Physical Partition Barrier */}
      <mesh position={[-1.7, 0.52, 0.28]} material={MAT.red} castShadow>
        <boxGeometry args={[3.3, 1.0, 0.14]} />
      </mesh>
      <LowPolyPalletStack position={[-1.7, 0, 1.65]} bucket="scrap" levels={1} />

      {showZones && (
        <>
          <Html position={[-1.7, 2.8, -1.65]} center distanceFactor={24}>
            <div className="pointer-events-none whitespace-nowrap rounded border border-[#3CA77A]/80 bg-[#102A43]/90 px-2 py-0.5 font-mono text-[9px] text-[#3CA77A]">
              ZONE 1: FULL SELLABLE (FIFO)
            </div>
          </Html>
          <Html position={[2.0, 2.6, -1.65]} center distanceFactor={24}>
            <div className="pointer-events-none whitespace-nowrap rounded border border-[#42C7E8]/80 bg-[#102A43]/90 px-2 py-0.5 font-mono text-[9px] text-[#42C7E8]">
              ZONE 2: RESHUFFLING BUFFER
            </div>
          </Html>
          <Html position={[2.0, 1.5, 1.65]} center distanceFactor={24}>
            <div className="pointer-events-none whitespace-nowrap rounded border border-[#E9A23B]/80 bg-[#102A43]/90 px-2 py-0.5 font-mono text-[9px] text-[#E9A23B]">
              ZONE 3: VALUE ADDITION
            </div>
          </Html>
          <Html position={[-1.7, 1.6, 1.65]} center distanceFactor={24}>
            <div className="pointer-events-none whitespace-nowrap rounded border border-[#D9534F]/80 bg-[#102A43]/90 px-2 py-0.5 font-mono text-[9px] text-[#D9534F]">
              ZONE 4: SCRAP / WASTE (LOCKED)
            </div>
          </Html>
        </>
      )}
    </group>

    {/* ST-05: CUSTOMER ORDER, PICKING & PACKING HALL (South-East) */}
    <group position={[4.5, 0.18, 3.2]}>
      <mesh position={[0, 0.01, 0]} material={MAT.secondaryNavy} receiveShadow>
        <boxGeometry args={[7.4, 0.02, 5.2]} />
      </mesh>
      <LowPolyWarehouseRack position={[-2.2, 0, -1.6]} bucket="sellable" showFifoMarker />
      <LowPolyPackingBench position={[0.8, 0, -0.4]} />
      <LowPolyPackingBench position={[0.8, 0, 1.5]} />
      <LowPolyQrScannerStation position={[3.1, 0, 0.5]} rotation={[0, -Math.PI / 2, 0]} accent="green" />
      <LowPolyWorker position={[-0.8, 0, 0.4]} role="picker" holdingBox />
      <LowPolyWorker position={[0.9, 0, 0.5]} rotation={[0, Math.PI, 0]} role="m2labo" holdingScanner />
    </group>

    {/* ST-07: PHYSICALLY WALLED QUARANTINE RETURN & ASSET BAY (South-West) */}
    <group position={[-1.5, 0.18, 4.2]}>
      <mesh position={[0, 0.015, 0]} material={MAT.zoneScrap} receiveShadow>
        <boxGeometry args={[3.5, 0.03, 4.6]} />
      </mesh>
      {/* Solid Quarantine Barrier Separating from Zone 1 / Packing */}
      <mesh position={[1.82, 0.65, 0]} material={MAT.red} castShadow>
        <boxGeometry args={[0.16, 1.3, 4.6]} />
      </mesh>
      <LowPolyQrScannerStation position={[-1.0, 0, 1.4]} accent="red" />
      <LowPolyQcInspectionTable position={[0.1, 0, -0.3]} rotation={[0, Math.PI / 2, 0]} quarantine />
      <LowPolyWorker position={[-0.7, 0, -0.3]} rotation={[0, Math.PI / 2, 0]} role="qc" />
      {showZones && (
        <Html position={[0.1, 2.0, -1.9]} center distanceFactor={24}>
          <div className="pointer-events-none whitespace-nowrap rounded border border-[#D9534F]/80 bg-[#102A43]/95 px-2 py-0.5 font-mono text-[9px] text-[#D9534F]">
            QUARANTINE RETURNS (NEVER AUTO-SELLABLE)
          </div>
        </Html>
      )}
    </group>
  </group>
);

export const CustomerDestinationBuildings: React.FC<{
  position?: [number, number, number];
}> = ({ position = [18.5, 0, 3.2] }) => (
  <group position={position}>
    {/* Customer Delivery Plaza Pad */}
    <mesh position={[0, 0.08, 0]} material={MAT.secondaryNavy} receiveShadow>
      <boxGeometry args={[7.4, 0.16, 8.6]} />
    </mesh>

    {/* B2B Luxury Hospitality / Fine-Dining Destination */}
    <group position={[1.8, 0.16, -2.1]}>
      <mesh position={[0, 1.8, 0]} material={MAT.offWhite} castShadow receiveShadow>
        <boxGeometry args={[2.8, 3.6, 2.8]} />
      </mesh>
      <mesh position={[0, 3.7, 0]} material={MAT.goldAccent} castShadow>
        <boxGeometry args={[3.0, 0.22, 3.0]} />
      </mesh>
      {/* Glass hospitality lobby */}
      <mesh position={[-1.42, 0.8, 0]} material={MAT.lightCyan}>
        <boxGeometry args={[0.08, 1.4, 1.8]} />
      </mesh>
      <mesh position={[-1.85, 1.45, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.9, 0.14, 2.1]} />
      </mesh>
      <LowPolyWorker position={[-1.9, 0, 0.5]} rotation={[0, -Math.PI / 2, 0]} role="counterparty" />
    </group>

    {/* B2C Premium Residential / Retail Drop */}
    <group position={[1.8, 0.16, 2.1]}>
      <mesh position={[0, 1.4, 0]} material={MAT.secondaryNavy} castShadow receiveShadow>
        <boxGeometry args={[2.6, 2.8, 2.6]} />
      </mesh>
      <mesh position={[0, 2.9, 0]} material={MAT.cyan}>
        <boxGeometry args={[2.7, 0.18, 2.7]} />
      </mesh>
      {/* Window band accents */}
      {[0.9, 1.7, 2.3].map((y, idx) => (
        <mesh key={idx} position={[-1.32, y, 0]} material={MAT.lightCyan}>
          <boxGeometry args={[0.06, 0.32, 1.8]} />
        </mesh>
      ))}
      <LowPolyWorker position={[-1.7, 0, -0.4]} rotation={[0, -Math.PI / 2, 0]} role="counterparty" />
    </group>
  </group>
);

export const FinancialReconciliationStation3D: React.FC<{
  position?: [number, number, number];
}> = ({ position = [-12.5, 0, 5.5] }) => (
  <group position={position}>
    {/* Compact Digital Nexus Plinth */}
    <mesh position={[0, 0.18, 0]} material={MAT.secondaryNavy} castShadow receiveShadow>
      <cylinderGeometry args={[2.6, 2.9, 0.36, 8]} />
    </mesh>
    <mesh position={[0, 0.38, 0]} material={MAT.cyan}>
      <cylinderGeometry args={[2.3, 2.3, 0.05, 8]} />
    </mesh>

    {/* Central Ledger Core Tower */}
    <mesh position={[0, 1.35, 0]} material={MAT.deepNavy} castShadow>
      <cylinderGeometry args={[0.62, 0.78, 1.9, 6]} />
    </mesh>
    <mesh position={[0, 2.45, 0]} material={MAT.cyan}>
      <octahedronGeometry args={[0.45, 0]} />
    </mesh>

    {/* 4 Surrounding Financial Pillars: Orders/POD, Invoices/CN, Logistics Costs, Margin */}
    {[
      { pos: [-1.35, 0.9, -0.9] as [number, number, number], h: 1.0, mat: MAT.green },
      { pos: [1.35, 1.05, -0.9] as [number, number, number], h: 1.3, mat: MAT.cyan },
      { pos: [-1.35, 0.8, 0.95] as [number, number, number], h: 0.8, mat: MAT.amber },
      { pos: [1.35, 1.2, 0.95] as [number, number, number], h: 1.6, mat: MAT.lightCyan },
    ].map((pillar, idx) => (
      <group key={idx} position={pillar.pos}>
        <mesh material={MAT.secondaryNavy} castShadow>
          <boxGeometry args={[0.45, pillar.h, 0.45]} />
        </mesh>
        <mesh position={[0, pillar.h / 2 + 0.08, 0]} material={pillar.mat}>
          <boxGeometry args={[0.48, 0.1, 0.48]} />
        </mesh>
      </group>
    ))}
  </group>
);
