import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { FlowLayerMode, RouteKind, StationId } from '../data/types';
import { MATERIAL_FLOW_SEGMENTS, INFORMATION_CONDUIT_LINKS } from '../process/materialFlowData';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';
import { EXCEPTION_BRANCHES } from '../exceptions/exceptionsData';
import { MAT } from '../models/SharedMaterials';

interface FlowOverlays3DProps {
  flowMode: FlowLayerMode;
  selectedStationId: StationId | null;
  showExceptionPins: boolean;
  selectedExceptionId: string | null;
  onSelectException: (exceptionId: string, stationId: StationId) => void;
  reducedMotion: boolean;
}

function sampleSmoothCurve(points: [number, number, number][]): [number, number, number][] {
  if (points.length < 3) return points;
  const vecs = points.map((p) => new THREE.Vector3(...p));
  const curve = new THREE.CatmullRomCurve3(vecs);
  return curve.getPoints(28).map((v) => [v.x, v.y, v.z] as [number, number, number]);
}

const MovingFlowPulse: React.FC<{
  points: [number, number, number][];
  routeKind: RouteKind;
  speed?: number;
  offset?: number;
  reducedMotion: boolean;
}> = ({ points, routeKind, speed = 0.22, offset = 0, reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || points.length < 2) return;
    const t = reducedMotion ? 0.5 : (clock.getElapsedTime() * speed + offset) % 1;
    const segs = points.length - 1;
    const scaled = t * segs;
    const idx = Math.min(segs - 1, Math.floor(scaled));
    const localT = scaled - idx;
    const a = points[idx];
    const b = points[idx + 1];
    groupRef.current.position.set(
      a[0] + (b[0] - a[0]) * localT,
      a[1] + (b[1] - a[1]) * localT + 0.2,
      a[2] + (b[2] - a[2]) * localT
    );
    groupRef.current.rotation.y = Math.atan2(b[0] - a[0], b[2] - a[2]);
  });

  if (routeKind === 'FORWARD_STRAWBERRY') {
    // Vivid strawberry product marker along outbound green route
    return (
      <group ref={groupRef}>
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI, 0, 0]} material={MAT.strawberrySolidRed}>
          <coneGeometry args={[0.24, 0.44, 6]} />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={MAT.calyxGreen}>
          <cylinderGeometry args={[0.2, 0.08, 0.08, 5]} />
        </mesh>
      </group>
    );
  }

  if (routeKind === 'RETURN_EMPTY_CRATES') {
    // Hollow turquoise empty-crate icon marker along Flow A return route
    return (
      <group ref={groupRef}>
        <mesh material={MAT.turquoiseReturn}>
          <boxGeometry args={[0.52, 0.28, 0.36]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} material={MAT.crateEmptyInner}>
          <boxGeometry args={[0.4, 0.2, 0.26]} />
        </mesh>
      </group>
    );
  }

  if (routeKind === 'RETURN_BLACK_BAG') {
    // Compact black insulated bag with amber return strip along Flow B return route
    return (
      <group ref={groupRef}>
        <mesh material={MAT.bagBlackFabric}>
          <boxGeometry args={[0.42, 0.34, 0.34]} />
        </mesh>
        <mesh position={[0, 0.14, 0]} material={MAT.amber}>
          <boxGeometry args={[0.44, 0.07, 0.36]} />
        </mesh>
      </group>
    );
  }

  // DIGITAL ERP/CRM Data Packet
  return (
    <group ref={groupRef}>
      <mesh material={MAT.cyan}>
        <octahedronGeometry args={[0.3, 0]} />
      </mesh>
    </group>
  );
};

const FlowDirectionArrow: React.FC<{
  from: [number, number, number];
  to: [number, number, number];
  material: THREE.Material;
}> = ({ from, to, material }) => {
  const { pos, rotY } = useMemo(() => {
    const mid: [number, number, number] = [
      (from[0] + to[0]) * 0.5,
      (from[1] + to[1]) * 0.5 + 0.12,
      (from[2] + to[2]) * 0.5,
    ];
    const angle = Math.atan2(to[0] - from[0], to[2] - from[2]);
    return { pos: mid, rotY: angle };
  }, [from, to]);

  return (
    <mesh position={pos} rotation={[Math.PI / 2, 0, -rotY]} material={material}>
      <coneGeometry args={[0.32, 0.72, 4]} />
    </mesh>
  );
};

export const FlowOverlays3D: React.FC<FlowOverlays3DProps> = React.memo(({
  flowMode,
  selectedStationId,
  showExceptionPins,
  onSelectException,
  reducedMotion,
}) => {
  const showMaterial = flowMode === 'MATERIAL' || flowMode === 'COMBINED';
  const showInfo = flowMode === 'INFORMATION' || flowMode === 'COMBINED';

  const smoothInfoCurves = useMemo(
    () =>
      INFORMATION_CONDUIT_LINKS.map((link) => ({
        ...link,
        curvedPoints: sampleSmoothCurve(link.points3D),
      })),
    []
  );

  // Subtle 3D severity beacon per affected station (actual text handled by collision-free AnnotationEngine!)
  const stationBeacons = useMemo(() => {
    const list = showExceptionPins
      ? EXCEPTION_BRANCHES
      : selectedStationId
      ? EXCEPTION_BRANCHES.filter((e) => e.stationId === selectedStationId)
      : [];

    // Keep highest-severity beacon per station in 3D space to prevent visual clutter
    const byStation = new Map<StationId, (typeof EXCEPTION_BRANCHES)[number]>();
    for (const exc of list) {
      const existing = byStation.get(exc.stationId);
      if (!existing || (exc.severity === 'CRITICAL' && existing.severity !== 'CRITICAL')) {
        byStation.set(exc.stationId, exc);
      }
    }
    return Array.from(byStation.values());
  }, [showExceptionPins, selectedStationId]);

  return (
    <group>
      {/* 1. PHYSICAL MATERIAL FLOW LAYER (Ground Level y ~ 0.35–0.45m) */}
      {showMaterial &&
        MATERIAL_FLOW_SEGMENTS.map((seg, i) => {
          const lineColor =
            seg.routeKind === 'RETURN_EMPTY_CRATES'
              ? '#2DD4BF'
              : seg.routeKind === 'RETURN_BLACK_BAG'
              ? '#F59E0B'
              : '#3CA77A';
          const arrowMat =
            seg.routeKind === 'RETURN_EMPTY_CRATES'
              ? MAT.turquoiseReturn
              : seg.routeKind === 'RETURN_BLACK_BAG'
              ? MAT.amber
              : MAT.green;
          const midIdx = Math.max(0, Math.floor((seg.points3D.length - 1) / 2));

          return (
            <group key={seg.id}>
              <Line
                points={seg.points3D}
                color={lineColor}
                lineWidth={seg.isReverseLoop ? 2.8 : 3.2}
                dashed
                dashSize={1.1}
                gapSize={0.55}
              />
              <FlowDirectionArrow
                from={seg.points3D[midIdx]}
                to={seg.points3D[midIdx + 1]}
                material={arrowMat}
              />
              <MovingFlowPulse
                points={seg.points3D}
                routeKind={seg.routeKind}
                speed={seg.isReverseLoop ? 0.075 : 0.095}
                offset={i * 0.13}
                reducedMotion={reducedMotion}
              />
            </group>
          );
        })}

      {/* 2. INFORMATION FLOW LAYER (Elevated Curved Cyan ERP/CRM Arches y ~ 4.2–7.8m — NEVER stacks on ground lines!) */}
      {showInfo && (
        <group>
          {smoothInfoCurves.map((link, i) => (
            <group key={link.id}>
              <Line
                points={link.curvedPoints}
                color="#42C7E8"
                lineWidth={flowMode === 'INFORMATION' ? 2.6 : 1.7}
                dashed
                dashSize={0.85}
                gapSize={0.45}
              />
              <MovingFlowPulse
                points={link.curvedPoints}
                routeKind="DIGITAL_ERP"
                speed={0.12}
                offset={i * 0.14}
                reducedMotion={reducedMotion}
              />
            </group>
          ))}

          {/* Digital System Telemetry Nodes Rising Above Each Station */}
          {OPERATIONAL_STATIONS.map((st) => (
            <group key={`info-node-${st.id}`} position={[st.position3D[0], 0, st.position3D[2]]}>
              <Line
                points={[
                  [0, 1.5, 0],
                  [0, 4.4, 0],
                ]}
                color="#42C7E8"
                lineWidth={1.4}
                dashed
                dashSize={0.3}
                gapSize={0.22}
              />
              <mesh position={[0, 4.5, 0]} material={MAT.cyan}>
                <octahedronGeometry args={[0.36, 0]} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* 3. SUBTLE 3D SEVERITY BEACONS (Clean visual anchors — no overlapping HTML banners!) */}
      {stationBeacons.map((exc) => {
        const station = OPERATIONAL_STATIONS.find((s) => s.id === exc.stationId);
        if (!station) return null;
        const isCritical = exc.severity === 'CRITICAL';
        return (
          <group
            key={exc.id}
            position={[
              station.position3D[0] + exc.anchor3DOffset[0] * 1.4,
              4.2,
              station.position3D[2] + exc.anchor3DOffset[2] * 1.4,
            ]}
          >
            <mesh
              material={isCritical ? MAT.red : MAT.amber}
              onClick={(e) => {
                e.stopPropagation();
                onSelectException(exc.id, exc.stationId);
              }}
            >
              <octahedronGeometry args={[0.38, 0]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
});
