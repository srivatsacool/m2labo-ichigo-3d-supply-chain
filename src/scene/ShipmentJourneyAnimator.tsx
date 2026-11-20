import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LowPolyLineHaulTruck, LowPolyDeliveryRider } from '../models/LowPolyVehicles';
import { EmptyReusableCrate, StrawberryCrateFilled } from '../models/StrawberryAssetSystem';
import { InsulatedDeliveryBagAsset } from '../models/InsulatedDeliveryBagAsset';
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

const OUTBOUND_TRUCK_PATH: [number, number, number][] = [
  [-49.5, 0.06, -14.8],
  [-41.0, 0.06, -15.4],
  [-28.0, 0.06, -15.6],
  [-17.5, 0.06, -15.6],
  [-12.2, 0.06, -15.6],
];

const RETURN_EMPTY_CRATE_TRUCK_PATH: [number, number, number][] = [
  [-12.2, 0.06, -24.0],
  [-20.0, 0.06, -24.2],
  [-28.0, 0.06, -24.2],
  [-38.0, 0.06, -24.2],
  [-49.5, 0.06, -23.4],
];

const STRAWBERRY_HANDLING_PATH: [number, number, number][] = [
  [-59.2, 0.56, -14.0],
  [-54.8, 0.56, -14.2],
  [-49.5, 1.12, -14.8],
  [-12.2, 1.12, -15.6],
  [-7.5, 0.88, -15.8],
  [-1.0, 1.25, -15.0],
  [13.4, 0.72, -19.2],
  [14.8, 0.72, 7.6],
  [20.2, 1.25, 10.3],
  [25.2, 0.85, 10.0],
];

const LAST_MILE_RIDER_OUTBOUND: [number, number, number][] = [
  [27.8, 0.06, 10.0],
  [36.5, 0.06, 10.0],
  [46.8, 0.06, 10.0],
];

const LAST_MILE_RIDER_RETURN: [number, number, number][] = [
  [48.8, 0.06, 16.5],
  [48.5, 0.06, 24.2],
  [26.0, 0.06, 24.4],
  [3.0, 0.06, 24.0],
  [-2.5, 0.06, 19.5],
];

export function getShipmentWorldPos(progress: number): [number, number, number] {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.16) {
    return samplePolyline([STRAWBERRY_HANDLING_PATH[0], STRAWBERRY_HANDLING_PATH[1], STRAWBERRY_HANDLING_PATH[2]], p / 0.16);
  }
  if (p < 0.27) {
    return samplePolyline(OUTBOUND_TRUCK_PATH, (p - 0.16) / 0.11);
  }
  if (p < 0.43) {
    return samplePolyline([STRAWBERRY_HANDLING_PATH[3], STRAWBERRY_HANDLING_PATH[4], STRAWBERRY_HANDLING_PATH[5]], (p - 0.27) / 0.16);
  }
  if (p < 0.52) {
    return samplePolyline(RETURN_EMPTY_CRATE_TRUCK_PATH, (p - 0.43) / 0.09);
  }
  if (p < 0.61) {
    return samplePolyline([STRAWBERRY_HANDLING_PATH[5], STRAWBERRY_HANDLING_PATH[6]], (p - 0.52) / 0.09);
  }
  if (p < 0.76) {
    return samplePolyline(
      [STRAWBERRY_HANDLING_PATH[6], STRAWBERRY_HANDLING_PATH[7], STRAWBERRY_HANDLING_PATH[8], STRAWBERRY_HANDLING_PATH[9]],
      (p - 0.61) / 0.15
    );
  }
  if (p < 0.89) {
    return samplePolyline(LAST_MILE_RIDER_OUTBOUND, Math.min(1, (p - 0.76) / 0.08));
  }
  if (p < 0.95) {
    return samplePolyline(LAST_MILE_RIDER_RETURN, (p - 0.89) / 0.06);
  }
  return [-32.0, 2.0, 14.0];
}

interface ShipmentJourneyAnimatorProps {
  journeyProgressRef: React.MutableRefObject<number>;
  flowMode: FlowLayerMode;
  reducedMotion: boolean;
}

/**
 * Zero-React-re-render 60fps Journey Animator:
 * Reads journeyProgressRef.current directly inside useFrame to smoothly animate all trucks,
 * strawberry batches, empty crates, riders, and black delivery bags with zero React reconciliation overhead.
 */
export const ShipmentJourneyAnimator: React.FC<ShipmentJourneyAnimatorProps> = React.memo(
  ({ journeyProgressRef, flowMode, reducedMotion }) => {
    const outboundTruckRef = useRef<THREE.Group>(null);
    const returnTruckRef = useRef<THREE.Group>(null);
    const activeCrateRef = useRef<THREE.Group>(null);
    const activeBagRef = useRef<THREE.Group>(null);
    const flowABeaconRef = useRef<THREE.Group>(null);
    const outboundRiderClosedRef = useRef<THREE.Group>(null);
    const outboundRiderOpenRef = useRef<THREE.Group>(null);
    const returnRiderRef = useRef<THREE.Group>(null);
    const pulseRef = useRef<THREE.Mesh>(null);
    const beaconMat = useMemo(() => MAT.green, []);

    useFrame(({ clock }) => {
      const p = journeyProgressRef.current;
      const t = clock.getElapsedTime();

      // 1. Outbound Strawberry Truck
      const outboundT = p < 0.16 ? 0 : p > 0.27 ? 1 : (p - 0.16) / 0.11;
      const outPos = samplePolyline(OUTBOUND_TRUCK_PATH, outboundT);
      if (outboundTruckRef.current) {
        outboundTruckRef.current.position.set(outPos[0], outPos[1], outPos[2]);
      }

      // 2. Flow A Empty-Crate Return Truck
      const isFlowA = p >= 0.43 && p <= 0.52;
      const retTruckT = isFlowA ? (p - 0.43) / 0.09 : reducedMotion ? 0.42 : (t * 0.02) % 1;
      const retTruckPos = samplePolyline(RETURN_EMPTY_CRATE_TRUCK_PATH, retTruckT);
      if (returnTruckRef.current) {
        returnTruckRef.current.position.set(retTruckPos[0], retTruckPos[1], retTruckPos[2]);
      }
      if (flowABeaconRef.current) {
        flowABeaconRef.current.visible = isFlowA;
        if (isFlowA) {
          flowABeaconRef.current.position.set(retTruckPos[0], retTruckPos[1] + 2.8, retTruckPos[2]);
        }
      }

      // 3. Active Hero Strawberry Crate / Packed Black Delivery Bag inside facilities
      const showCrate = p < 0.16 || (p >= 0.27 && p < 0.43) || (p >= 0.52 && p < 0.69);
      const showBag = p >= 0.69 && p < 0.77;
      if (showCrate || showBag) {
        const batchPos = getShipmentWorldPos(p);
        if (activeCrateRef.current) {
          activeCrateRef.current.visible = showCrate;
          if (showCrate) activeCrateRef.current.position.set(batchPos[0], batchPos[1], batchPos[2]);
        }
        if (activeBagRef.current) {
          activeBagRef.current.visible = showBag;
          if (showBag) activeBagRef.current.position.set(batchPos[0], batchPos[1], batchPos[2]);
        }
      } else {
        if (activeCrateRef.current) activeCrateRef.current.visible = false;
        if (activeBagRef.current) activeBagRef.current.visible = false;
      }

      if (pulseRef.current && !reducedMotion && showCrate) {
        const s = 1 + Math.sin(t * 4) * 0.18;
        pulseRef.current.scale.set(s, 1, s);
      }

      // 4. Flow B Outbound Rider carrying Black Insulated Delivery Bag
      const riderOutT = p < 0.76 ? 0 : p > 0.84 ? 1 : (p - 0.76) / 0.08;
      const riderOutPos = samplePolyline(LAST_MILE_RIDER_OUTBOUND, riderOutT);
      const atHandover = p >= 0.83 && p <= 0.89;
      if (outboundRiderClosedRef.current) {
        outboundRiderClosedRef.current.visible = !atHandover;
        outboundRiderClosedRef.current.position.set(riderOutPos[0], riderOutPos[1], riderOutPos[2]);
      }
      if (outboundRiderOpenRef.current) {
        outboundRiderOpenRef.current.visible = atHandover;
        outboundRiderOpenRef.current.position.set(riderOutPos[0], riderOutPos[1], riderOutPos[2]);
      }

      // 5. Flow B Return Rider carrying EMPTY Black Insulated Delivery Bag
      const isFlowB = p >= 0.89 && p <= 0.95;
      const retRiderT = isFlowB ? (p - 0.89) / 0.06 : reducedMotion ? 0.48 : (t * 0.024 + 0.35) % 1;
      const retRiderPos = samplePolyline(LAST_MILE_RIDER_RETURN, retRiderT);
      if (returnRiderRef.current) {
        returnRiderRef.current.position.set(retRiderPos[0], retRiderPos[1], retRiderPos[2]);
      }
    });

    const hidePhysicalForInfoOnly = flowMode === 'INFORMATION';

    return (
      <group visible={!hidePhysicalForInfoOnly}>
        <group ref={outboundTruckRef} position={OUTBOUND_TRUCK_PATH[0]}>
          <LowPolyLineHaulTruck showCargoCutaway cargoMode="STRAWBERRIES" />
        </group>

        <group ref={returnTruckRef} position={RETURN_EMPTY_CRATE_TRUCK_PATH[0]} rotation={[0, Math.PI, 0]}>
          <LowPolyLineHaulTruck showCargoCutaway cargoMode="EMPTY_CRATES" />
        </group>

        <group ref={activeCrateRef}>
          <StrawberryCrateFilled scale={1.18} />
          <mesh ref={pulseRef} position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={beaconMat}>
            <ringGeometry args={[0.58, 0.74, 16]} />
          </mesh>
        </group>

        <group ref={activeBagRef} visible={false}>
          <InsulatedDeliveryBagAsset scale={1.15} variant="open_strawberries" />
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={MAT.cyan}>
            <ringGeometry args={[0.55, 0.7, 16]} />
          </mesh>
        </group>

        <group ref={flowABeaconRef} visible={false}>
          <EmptyReusableCrate scale={0.75} />
        </group>

        <group ref={outboundRiderClosedRef} position={LAST_MILE_RIDER_OUTBOUND[0]}>
          <LowPolyDeliveryRider bagOpenAtHandover={false} />
        </group>
        <group ref={outboundRiderOpenRef} position={LAST_MILE_RIDER_OUTBOUND[2]} visible={false}>
          <LowPolyDeliveryRider bagOpenAtHandover />
        </group>

        <group ref={returnRiderRef} position={LAST_MILE_RIDER_RETURN[0]} rotation={[0, Math.PI, 0]}>
          <LowPolyDeliveryRider isReturnRun />
        </group>
      </group>
    );
  }
);
