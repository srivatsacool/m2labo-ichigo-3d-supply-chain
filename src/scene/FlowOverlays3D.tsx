import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { FlowLayerMode, StationId } from '../data/types';
import { MATERIAL_FLOW_SEGMENTS, INFORMATION_CONDUIT_LINKS } from '../process/materialFlowData';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';
import { EXCEPTION_BRANCHES } from '../exceptions/exceptionsData';

interface FlowOverlays3DProps {
  flowMode: FlowLayerMode;
  selectedStationId: StationId | null;
  showExceptionPins: boolean;
  selectedExceptionId: string | null;
  onSelectException: (exceptionId: string, stationId: StationId) => void;
  reducedMotion: boolean;
}

const MovingFlowPulse: React.FC<{
  points: [number, number, number][];
  color: string;
  speed?: number;
  offset?: number;
  reducedMotion: boolean;
}> = ({ points, color, speed = 0.25, offset = 0, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || points.length < 2) return;
    const t = reducedMotion ? 0.5 : (clock.getElapsedTime() * speed + offset) % 1;
    const segs = points.length - 1;
    const scaled = t * segs;
    const idx = Math.min(segs - 1, Math.floor(scaled));
    const localT = scaled - idx;
    const a = points[idx];
    const b = points[idx + 1];
    meshRef.current.position.set(
      a[0] + (b[0] - a[0]) * localT,
      a[1] + (b[1] - a[1]) * localT + 0.14,
      a[2] + (b[2] - a[2]) * localT
    );
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.17, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} flatShading />
    </mesh>
  );
};

export const FlowOverlays3D: React.FC<FlowOverlays3DProps> = ({
  flowMode,
  selectedStationId,
  showExceptionPins,
  selectedExceptionId,
  onSelectException,
  reducedMotion,
}) => {
  const showMaterial = flowMode === 'MATERIAL' || flowMode === 'COMBINED';
  const showInfo = flowMode === 'INFORMATION' || flowMode === 'COMBINED';

  const visibleExceptions = showExceptionPins
    ? EXCEPTION_BRANCHES
    : selectedStationId
    ? EXCEPTION_BRANCHES.filter((e) => e.stationId === selectedStationId)
    : [];

  return (
    <group>
      {/* MATERIAL FLOW LAYER: Physical transport & warehouse paths */}
      {showMaterial &&
        MATERIAL_FLOW_SEGMENTS.map((seg, i) => (
          <group key={seg.id}>
            <Line
              points={seg.points3D}
              color={seg.isReverseLoop ? '#E9A23B' : '#3CA77A'}
              lineWidth={2.2}
              dashed
              dashSize={0.5}
              gapSize={0.3}
            />
            <MovingFlowPulse
              points={seg.points3D}
              color={seg.isReverseLoop ? '#E9A23B' : '#3CA77A'}
              speed={0.18}
              offset={i * 0.17}
              reducedMotion={reducedMotion}
            />
          </group>
        ))}

      {/* INFORMATION FLOW LAYER: ERP / CRM event conduits & digital node tags */}
      {showInfo && (
        <>
          {INFORMATION_CONDUIT_LINKS.map((link, i) => (
            <group key={link.id}>
              <Line
                points={link.points3D}
                color="#42C7E8"
                lineWidth={1.8}
                dashed
                dashSize={0.35}
                gapSize={0.25}
              />
              <MovingFlowPulse
                points={link.points3D}
                color="#42C7E8"
                speed={0.28}
                offset={i * 0.15}
                reducedMotion={reducedMotion}
              />
            </group>
          ))}

          {OPERATIONAL_STATIONS.map((st) => (
            <Html
              key={`info-${st.id}`}
              position={[st.position3D[0], st.isDigitalStation ? 3.55 : 2.95, st.position3D[2]]}
              center
              distanceFactor={24}
            >
              <div className="pointer-events-none select-none rounded border border-[#42C7E8]/80 bg-[#0A1C2E]/92 px-2 py-1 font-mono text-[9px] text-[#F4F7F8] shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1 font-bold text-[#42C7E8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#42C7E8]" />
                  <span>{st.informationFlowSummary.primaryEntityId}</span>
                </div>
                <div className="mt-0.5 text-[8px] text-[#A9E8F5] max-w-[170px] truncate">
                  {st.informationFlowSummary.erpEvents[0]}
                </div>
              </div>
            </Html>
          ))}
        </>
      )}

      {/* EXCEPTION BRANCH 3D MARKERS */}
      {visibleExceptions.map((exc) => {
        const station = OPERATIONAL_STATIONS.find((s) => s.id === exc.stationId);
        if (!station) return null;
        const pos: [number, number, number] = [
          station.position3D[0] + exc.anchor3DOffset[0],
          station.position3D[1] + exc.anchor3DOffset[1],
          station.position3D[2] + exc.anchor3DOffset[2],
        ];
        const isSelected = selectedExceptionId === exc.id;
        const borderColor = exc.severity === 'CRITICAL' ? 'border-[#D9534F]' : 'border-[#E9A23B]';
        const textColor = exc.severity === 'CRITICAL' ? 'text-[#D9534F]' : 'text-[#E9A23B]';

        return (
          <group key={exc.id}>
            <Line
              points={[
                [station.position3D[0], 1.2, station.position3D[2]],
                pos,
              ]}
              color={exc.severity === 'CRITICAL' ? '#D9534F' : '#E9A23B'}
              lineWidth={1.6}
              dashed
              dashSize={0.25}
              gapSize={0.2}
            />
            <Html position={pos} center distanceFactor={25}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectException(exc.id, exc.stationId);
                }}
                className={`pointer-events-auto cursor-pointer select-none whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[9px] shadow-lg transition-transform hover:scale-105 ${
                  isSelected
                    ? `${borderColor} bg-[#173B57] text-[#F4F7F8] ring-2 ring-[#42C7E8]`
                    : `${borderColor} bg-[#102A43]/95 ${textColor}`
                }`}
              >
                ! {exc.id}: {exc.title.slice(0, 26)}{exc.title.length > 26 ? '…' : ''}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
