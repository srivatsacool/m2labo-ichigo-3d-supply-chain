import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { LowPolyLineHaulTruck, LowPolyDeliveryRider } from '../models/LowPolyVehicles';
import { LowPolyStrawberryCrate } from '../models/LowPolyPackaging';
import { MAT } from '../models/SharedMaterials';
import { FlowLayerMode } from '../data/types';

function lerp3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function samplePolyline(points: [number, number, number][], t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  if (points.length === 1) return points[0];
  const segCount = points.length - 1;
  const scaled = clamped * segCount;
  const idx = Math.min(segCount - 1, Math.floor(scaled));
  const localT = scaled - idx;
  return lerp3(points[idx], points[idx + 1], localT);
}

const LINE_HAUL_PATH: [number, number, number][] = [
  [-17.2, 0.06, -4.2],
  [-14.0, 0.06, -4.9],
  [-11.0, 0.06, -5.2],
  [-7.2, 0.06, -4.9],
  [-4.4, 0.06, -4.5],
];

const CRATE_FLOW_PATH: [number, number, number][] = [
  [-21.2, 0.52, -4.0], // Farm gate handover
  [-19.2, 0.52, -4.0], // Platform
  [-17.2, 0.82, -4.2], // Loaded truck
  [-4.4, 0.82, -4.5], // MIDC dock arrive
  [-2.2, 0.55, -4.5], // Receiving scan
  [-0.8, 0.95, -4.5], // QC bench
  [2.8, 0.6, -5.4], // Zone 1 Sellable FIFO
  [2.3, 0.6, 1.8], // Order pick
  [5.3, 0.95, 2.8], // Packing bench
  [7.8, 0.6, 3.2], // Dispatch stage
];

const LAST_MILE_PATH: [number, number, number][] = [
  [8.4, 0.06, 3.2],
  [12.5, 0.06, 3.2],
  [16.2, 0.06, 3.2],
];

const RETURN_LOOP_PATH: [number, number, number][] = [
  [16.6, 0.06, 4.6],
  [15.8, 0.06, 8.2],
  [7.8, 0.06, 8.6],
  [-1.5, 0.06, 8.2],
  [-1.5, 0.06, 5.8],
];

export function getShipmentWorldPos(progress: number): [number, number, number] {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.14) {
    return samplePolyline([CRATE_FLOW_PATH[0], CRATE_FLOW_PATH[1], CRATE_FLOW_PATH[2]], p / 0.14);
  }
  if (p < 0.34) {
    return samplePolyline(LINE_HAUL_PATH, (p - 0.14) / 0.2);
  }
  if (p < 0.48) {
    return samplePolyline([CRATE_FLOW_PATH[3], CRATE_FLOW_PATH[4], CRATE_FLOW_PATH[5]], (p - 0.34) / 0.14);
  }
  if (p < 0.60) {
    return samplePolyline([CRATE_FLOW_PATH[5], CRATE_FLOW_PATH[6]], (p - 0.48) / 0.12);
  }
  if (p < 0.76) {
    return samplePolyline([CRATE_FLOW_PATH[6], CRATE_FLOW_PATH[7], CRATE_FLOW_PATH[8], CRATE_FLOW_PATH[9]], (p - 0.60) / 0.16);
  }
  if (p < 0.90) {
    return samplePolyline(LAST_MILE_PATH, (p - 0.76) / 0.14);
  }
  return samplePolyline(RETURN_LOOP_PATH, (p - 0.90) / 0.10);
}

interface ShipmentJourneyAnimatorProps {
  journeyProgress: number;
  flowMode: FlowLayerMode;
  showLabels: boolean;
  reducedMotion: boolean;
}

export const ShipmentJourneyAnimator: React.FC<ShipmentJourneyAnimatorProps> = ({
  journeyProgress,
  flowMode,
  showLabels,
  reducedMotion,
}) => {
  const pulseRef = useRef<THREE.Mesh>(null);
  const beaconMat = useMemo(() => MAT.cyan, []);

  // Compute truck progress (stays docked at ST-01 until 0.14, travels 0.14..0.34, parks at MIDC dock)
  const truckT = journeyProgress < 0.14 ? 0 : journeyProgress > 0.34 ? 1 : (journeyProgress - 0.14) / 0.2;
  const truckPos = samplePolyline(LINE_HAUL_PATH, truckT);

  // Compute active crate visibility (visible when outside closed vehicles)
  const showActiveCrate = journeyProgress < 0.16 || (journeyProgress >= 0.32 && journeyProgress <= 0.76);
  const cratePos = getShipmentWorldPos(journeyProgress);

  // Compute last-mile rider progress (0.75..0.90)
  const riderT = journeyProgress < 0.75 ? 0 : journeyProgress > 0.90 ? 1 : (journeyProgress - 0.75) / 0.15;
  const riderPos = samplePolyline(LAST_MILE_PATH, riderT);

  // Compute return loop rider (0.90..1.0)
  const returnT = journeyProgress < 0.90 ? 0 : (journeyProgress - 0.90) / 0.10;
  const returnRiderPos = samplePolyline(RETURN_LOOP_PATH, returnT);
  const showReturnRider = journeyProgress >= 0.89;

  useFrame(({ clock }) => {
    if (!pulseRef.current || reducedMotion) return;
    const s = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.18;
    pulseRef.current.scale.set(s, 1, s);
  });

  const activeStageTemp =
    journeyProgress < 0.15
      ? '5.3°C Handover'
      : journeyProgress < 0.35
      ? '4.9°C Line-Haul'
      : journeyProgress < 0.60
      ? '5.2°C MIDC Cold'
      : journeyProgress < 0.76
      ? '5.3°C Fulfilment'
      : '5.8°C Bag Probe';

  return (
    <group>
      {/* Active Line-Haul Vehicle */}
      <LowPolyLineHaulTruck position={truckPos} rotation={[0, -0.04, 0]} showCargoCutaway />

      {/* Highlighted Shipment Crate / Beacon */}
      {showActiveCrate && (
        <group position={cratePos}>
          <LowPolyStrawberryCrate scale={1.15} variant={journeyProgress > 0.65 ? 'b2c' : 'standard'} />
          <mesh ref={pulseRef} position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} material={beaconMat}>
            <ringGeometry args={[0.45, 0.58, 16]} />
          </mesh>
          {showLabels && (
            <Html position={[0, 0.85, 0]} center distanceFactor={20}>
              <div className="pointer-events-none whitespace-nowrap rounded border border-[#42C7E8] bg-[#102A43]/95 px-2 py-0.5 font-mono text-[9px] text-[#A9E8F5] shadow-md">
                {flowMode === 'INFORMATION' ? 'SHP-MUM-01 | QR ACTIVE' : `SHIPMENT • ${activeStageTemp} (SIM)`}
              </div>
            </Html>
          )}
        </group>
      )}

      {/* Last-Mile Delivery Rider */}
      <group position={riderPos}>
        <LowPolyDeliveryRider />
        {showLabels && journeyProgress >= 0.74 && journeyProgress <= 0.91 && (
          <Html position={[0, 1.65, 0]} center distanceFactor={20}>
            <div className="pointer-events-none whitespace-nowrap rounded border border-[#42C7E8] bg-[#102A43]/95 px-2 py-0.5 font-mono text-[9px] text-[#A9E8F5] shadow">
              {flowMode === 'INFORMATION' ? 'DEL-19 → POD CAPTURE' : 'INSULATED BAG + COOLANT'}
            </div>
          </Html>
        )}
      </group>

      {/* Reverse Logistics / Return Asset Rider */}
      {showReturnRider && (
        <group position={returnRiderPos} rotation={[0, Math.PI, 0]}>
          <LowPolyDeliveryRider isReturnRun />
          {showLabels && (
            <Html position={[0, 1.65, 0]} center distanceFactor={20}>
              <div className="pointer-events-none whitespace-nowrap rounded border border-[#E9A23B] bg-[#102A43]/95 px-2 py-0.5 font-mono text-[9px] text-[#E9A23B] shadow">
                BAG RETURN / QUARANTINE LANE
              </div>
            </Html>
          )}
        </group>
      )}
    </group>
  );
};
