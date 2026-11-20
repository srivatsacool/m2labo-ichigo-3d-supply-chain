import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { AlertTriangle, Database, ExternalLink, RotateCcw } from 'lucide-react';
import { CameraMode, ExceptionBranch, FlowLayerMode, StationId } from '../data/types';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';
import { EXCEPTION_BRANCHES } from '../exceptions/exceptionsData';

export interface ProjectedLabelItem {
  id: string;
  kind: 'CLASS_B_ACTIVE' | 'CLASS_A_STATION' | 'EXCEPTION' | 'REVERSE_LOOP';
  priority: number;
  worldPos: [number, number, number];
  width: number;
  height: number;
  preferredDy: number;
  preferredDx: number;
  color: string;
}

export interface AnnotationOverlayRefs {
  cardRefs: Map<string, HTMLDivElement | null>;
  lineRefs: Map<string, SVGLineElement | null>;
  dotRefs: Map<string, SVGCircleElement | null>;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function rectsOverlap(a: Rect, b: Rect, pad = 10): boolean {
  return !(
    a.x + a.w + pad <= b.x ||
    b.x + b.w + pad <= a.x ||
    a.y + a.h + pad <= b.y ||
    b.y + b.h + pad <= a.y
  );
}

/**
 * Builds the prioritized list of screen-space annotation descriptors for the current app state.
 */
export function buildAnnotationDescriptors(
  selectedStationId: StationId | null,
  activeJourneyStationId: StationId,
  flowMode: FlowLayerMode,
  showExceptionPins: boolean,
  isDetailOpen: boolean
): {
  items: ProjectedLabelItem[];
  prioritizedExceptions: { exc: ExceptionBranch; extraCount: number }[];
  focusedStationId: StationId;
} {
  const focusedStationId = selectedStationId ?? activeJourneyStationId;
  const items: ProjectedLabelItem[] = [];

  // 1. Prioritized Exceptions (never flood screen with 19 banners!)
  const prioritizedExceptions: { exc: ExceptionBranch; extraCount: number }[] = [];
  if (showExceptionPins) {
    // At most 1 top-priority exception per station (prioritize CRITICAL first, max 4 shown on canvas)
    const grouped = new Map<StationId, ExceptionBranch[]>();
    for (const exc of EXCEPTION_BRANCHES) {
      const list = grouped.get(exc.stationId) ?? [];
      list.push(exc);
      grouped.set(exc.stationId, list);
    }
    const candidates: { exc: ExceptionBranch; extraCount: number; score: number }[] = [];
    grouped.forEach((list, stId) => {
      const sorted = [...list].sort((a, b) => (a.severity === 'CRITICAL' ? -1 : b.severity === 'CRITICAL' ? 1 : 0));
      const top = sorted[0];
      const score = (stId === focusedStationId ? 100 : 0) + (top.severity === 'CRITICAL' ? 20 : 5);
      candidates.push({ exc: top, extraCount: list.length - 1, score });
    });
    candidates
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .forEach((c) => prioritizedExceptions.push({ exc: c.exc, extraCount: c.extraCount }));
  } else if (selectedStationId) {
    // When a station is selected, surface ONLY its single highest-severity exception concisely
    const stExcs = EXCEPTION_BRANCHES.filter((e) => e.stationId === selectedStationId);
    if (stExcs.length > 0) {
      const sorted = [...stExcs].sort((a, b) => (a.severity === 'CRITICAL' ? -1 : b.severity === 'CRITICAL' ? 1 : 0));
      prioritizedExceptions.push({ exc: sorted[0], extraCount: stExcs.length - 1 });
    }
  }

  prioritizedExceptions.forEach(({ exc }) => {
    const st = OPERATIONAL_STATIONS.find((s) => s.id === exc.stationId);
    if (!st) return;
    items.push({
      id: `EXC-${exc.id}`,
      kind: 'EXCEPTION',
      priority: exc.severity === 'CRITICAL' ? 100 : 88,
      worldPos: [
        st.position3D[0] + exc.anchor3DOffset[0] * 1.4,
        4.2,
        st.position3D[2] + exc.anchor3DOffset[2] * 1.4,
      ],
      width: 268,
      height: 58,
      preferredDy: -92,
      preferredDx: 28,
      color: exc.severity === 'CRITICAL' ? '#D9534F' : '#E9A23B',
    });
  });

  // 2. Station Markers (Focused gets CLASS B Operational Callout; others get crisp CLASS A Markers)
  OPERATIONAL_STATIONS.forEach((st) => {
    const isFocused = st.id === focusedStationId;
    const preferRight = st.position3D[0] < 0;
    items.push({
      id: st.id,
      kind: isFocused && !isDetailOpen ? 'CLASS_B_ACTIVE' : 'CLASS_A_STATION',
      priority: isFocused ? 92 : 60,
      worldPos: [st.position3D[0], st.isDigitalStation ? 3.2 : 2.6, st.position3D[2]],
      width: isFocused && !isDetailOpen ? 320 : 234,
      height: isFocused && !isDetailOpen ? 168 : 42,
      preferredDy: isFocused ? -128 : -64,
      preferredDx: isFocused ? (preferRight ? 40 : -40) : 0,
      color: isFocused ? '#42C7E8' : st.id === activeJourneyStationId ? '#3CA77A' : '#27B7D8',
    });
  });

  // 3. Explicit Two Reverse-Loop Identifiers in Material / Combined Modes
  if (flowMode === 'MATERIAL' || flowMode === 'COMBINED') {
    items.push({
      id: 'LOOP-A-BADGE',
      kind: 'REVERSE_LOOP',
      priority: 66,
      worldPos: [-30.0, 2.0, -24.2],
      width: 274,
      height: 36,
      preferredDy: -96,
      preferredDx: 0,
      color: '#2DD4BF',
    });
    items.push({
      id: 'LOOP-B-BADGE',
      kind: 'REVERSE_LOOP',
      priority: 64,
      worldPos: [22.0, 1.8, 24.4],
      width: 266,
      height: 36,
      preferredDy: 34,
      preferredDx: 0,
      color: '#F59E0B',
    });
  }

  // Sort strictly descending by priority so higher-priority items win placement first
  items.sort((a, b) => b.priority - a.priority);
  return { items, prioritizedExceptions, focusedStationId };
}

/**
 * R3F Canvas Bridge: runs inside <Canvas>, projects 3D anchors to viewport pixels,
 * solves 2D bounding-box collisions deterministically, and mutates DOM transforms directly at 60fps
 * without triggering React re-renders.
 */
export const AnnotationProjectionBridge: React.FC<{
  items: ProjectedLabelItem[];
  overlayRefs: React.MutableRefObject<AnnotationOverlayRefs>;
  cameraMode: CameraMode;
  showLabels: boolean;
  isDetailOpen: boolean;
}> = ({ items, overlayRefs, cameraMode, showLabels, isDetailOpen }) => {
  const { camera, size } = useThree();
  const _proj = useMemo(() => new THREE.Vector3(), []);
  const _camPos = useMemo(() => new THREE.Vector3(), []);
  const sizeCacheRef = useRef<Map<string, { w: number; h: number }>>(new Map());

  // Measure DOM card dimensions ONCE when items or viewport change (zero layout thrashing inside useFrame!)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const refs = overlayRefs.current;
      const cache = sizeCacheRef.current;
      cache.clear();
      for (const item of items) {
        const el = refs.cardRefs.get(item.id);
        cache.set(item.id, {
          w: el && el.offsetWidth > 0 ? el.offsetWidth : item.width,
          h: el && el.offsetHeight > 0 ? el.offsetHeight : item.height,
        });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [items, overlayRefs, size.width, size.height, showLabels]);

  useFrame(() => {
    const refs = overlayRefs.current;
    if (!showLabels) {
      items.forEach((item) => {
        const el = refs.cardRefs.get(item.id);
        const ln = refs.lineRefs.get(item.id);
        const dt = refs.dotRefs.get(item.id);
        if (el) {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        }
        if (ln) ln.style.opacity = '0';
        if (dt) dt.style.opacity = '0';
      });
      return;
    }

    const vw = size.width;
    const vh = size.height;
    const isMobile = vw < 640;
    // Safe viewport margins keeping labels clear of top bar, Class C detail panel & bottom timeline
    const padLeft = 14;
    const padRight = isDetailOpen && !isMobile ? vw - 486 : vw - 14;
    const padTop = isMobile ? 68 : 14;
    const padBottom = isMobile ? vh - 166 : vh - 124;

    const placed: Rect[] = [];
    camera.getWorldPosition(_camPos);

    for (const item of items) {
      const el = refs.cardRefs.get(item.id);
      const ln = refs.lineRefs.get(item.id);
      const dt = refs.dotRefs.get(item.id);
      if (!el) continue;

      // On compact mobile viewports, keep the 3D scene open (top mobile stage banner already summarizes active stage)
      if (isMobile && item.kind === 'CLASS_B_ACTIVE') {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
        if (ln) ln.style.opacity = '0';
        if (dt) dt.style.opacity = '0';
        continue;
      }

      _proj.set(item.worldPos[0], item.worldPos[1], item.worldPos[2]);
      const dist = _camPos.distanceTo(_proj);

      // In eye-level First Person, avoid cluttering view with far-away >95m secondary markers
      const tooFarForFp =
        cameraMode === 'FIRST_PERSON' && item.kind !== 'CLASS_B_ACTIVE' && item.kind !== 'EXCEPTION' && dist > 92;

      _proj.project(camera);

      // Behind camera or way off frustum
      const inFront = _proj.z >= -1 && _proj.z <= 1;
      const ax = (_proj.x * 0.5 + 0.5) * vw;
      const ay = (-_proj.y * 0.5 + 0.5) * vh;
      const onScreen = ax > -40 && ax < vw + 40 && ay > -40 && ay < vh + 40;

      if (!inFront || !onScreen || tooFarForFp) {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
        if (ln) ln.style.opacity = '0';
        if (dt) dt.style.opacity = '0';
        continue;
      }

      // Use cached measured DOM dimensions (eliminates synchronous layout thrashing inside useFrame!)
      const cached = sizeCacheRef.current.get(item.id);
      const w = cached ? cached.w : item.width;
      const h = cached ? cached.h : item.height;

      // Candidate offsets radiating around the anchor so labels hug their 3D object without overlapping each other
      const dx0 = item.preferredDx;
      const dy0 = item.preferredDy;
      const candidates: [number, number][] = [
        [dx0, dy0],
        [dx0, dy0 - 58],
        [dx0 + 96, dy0 - 24],
        [dx0 - 96, dy0 - 24],
        [dx0, Math.abs(dy0) + 34],
        [dx0 + 150, dy0 + 16],
        [dx0 - 150, dy0 + 16],
        [dx0, dy0 - 116],
        [dx0 + 190, dy0 - 60],
        [dx0 - 190, dy0 - 60],
        [dx0 + 135, Math.abs(dy0) + 74],
        [dx0 - 135, Math.abs(dy0) + 74],
      ];

      let chosen: Rect | null = null;
      for (const [cdx, cdy] of candidates) {
        let x = ax + cdx - w / 2;
        let y = ay + cdy - h / 2;
        x = Math.max(padLeft, Math.min(padRight - w, x));
        y = Math.max(padTop, Math.min(padBottom - h, y));
        const rect: Rect = { x, y, w, h };

        let collides = false;
        for (const p of placed) {
          if (rectsOverlap(rect, p, 12)) {
            collides = true;
            break;
          }
        }
        if (!collides) {
          chosen = rect;
          break;
        }
      }

      if (!chosen) {
        // Hide cleanly rather than overlap illegible text!
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
        if (ln) ln.style.opacity = '0';
        if (dt) dt.style.opacity = '0';
        continue;
      }

      placed.push(chosen);
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.pointerEvents = 'auto';
      el.style.transform = `translate3d(${Math.round(chosen.x)}px, ${Math.round(chosen.y)}px, 0)`;

      // Leader line from exact 3D anchor dot to nearest edge center of resolved card
      const cx = chosen.x + w / 2;
      const cy = chosen.y + h / 2;
      const attachX = Math.max(chosen.x + 12, Math.min(chosen.x + w - 12, ax));
      const attachY = cy < ay ? chosen.y + h : chosen.y;

      if (ln) {
        ln.setAttribute('x1', `${Math.round(ax)}`);
        ln.setAttribute('y1', `${Math.round(ay)}`);
        ln.setAttribute('x2', `${Math.round(attachX)}`);
        ln.setAttribute('y2', `${Math.round(attachY)}`);
        ln.style.opacity = '0.85';
      }
      if (dt) {
        dt.setAttribute('cx', `${Math.round(ax)}`);
        dt.setAttribute('cy', `${Math.round(ay)}`);
        dt.style.opacity = '1';
      }
    }
  });

  return null;
};

interface ScreenSpaceAnnotationOverlayProps {
  items: ProjectedLabelItem[];
  prioritizedExceptions: { exc: ExceptionBranch; extraCount: number }[];
  focusedStationId: StationId;
  activeJourneyStationId: StationId;
  flowMode: FlowLayerMode;
  showLabels: boolean;
  overlayRefs: React.MutableRefObject<AnnotationOverlayRefs>;
  onSelectStation: (id: StationId) => void;
  onInspectFullStation: (id: StationId) => void;
  onSelectException: (exceptionId: string, stationId: StationId) => void;
}

/**
 * True Screen-Space HTML + SVG Overlay Layer:
 * - Guaranteed legible desktop typography (15px Class A markers, 20px Class B titles, 15px operational copy)
 * - Zero text overlap guaranteed by collision solver
 * - Crisp SVG leader lines anchored directly to real 3D coordinates
 */
export const ScreenSpaceAnnotationOverlay: React.FC<ScreenSpaceAnnotationOverlayProps> = ({
  items,
  prioritizedExceptions,
  focusedStationId,
  activeJourneyStationId,
  flowMode,
  showLabels,
  overlayRefs,
  onSelectStation,
  onInspectFullStation,
  onSelectException,
}) => {
  if (!showLabels) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Crisp Vector Leader Lines Anchored to 3D World Objects */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {items.map((item) => (
          <g key={`svg-${item.id}`}>
            <line
              ref={(node) => {
                overlayRefs.current.lineRefs.set(item.id, node);
              }}
              stroke={item.color}
              strokeWidth={item.kind === 'CLASS_B_ACTIVE' || item.kind === 'EXCEPTION' ? 2 : 1.4}
              strokeDasharray={item.kind === 'CLASS_B_ACTIVE' ? undefined : '5 4'}
              style={{ opacity: 0, transition: 'opacity 140ms ease' }}
            />
            <circle
              ref={(node) => {
                overlayRefs.current.dotRefs.set(item.id, node);
              }}
              r={item.kind === 'CLASS_B_ACTIVE' ? 4.5 : 3.5}
              fill={item.color}
              stroke="#071524"
              strokeWidth={1.5}
              style={{ opacity: 0, transition: 'opacity 140ms ease' }}
            />
          </g>
        ))}
      </svg>

      {/* CLASS A & CLASS B Station Annotations */}
      {OPERATIONAL_STATIONS.map((station) => {
        const descriptor = items.find((i) => i.id === station.id);
        if (!descriptor) return null;
        const isClassB = descriptor.kind === 'CLASS_B_ACTIVE';
        const isJourneyActive = station.id === activeJourneyStationId;
        const isFocused = station.id === focusedStationId;

        if (isClassB) {
          return (
            <div
              key={station.id}
              ref={(node) => {
                overlayRefs.current.cardRefs.set(station.id, node);
              }}
              style={{ width: descriptor.width, opacity: 0 }}
              className="absolute left-0 top-0 rounded-xl border border-[#42C7E8]/80 bg-[#071524]/92 px-3.5 py-2.5 shadow-[0_14px_34px_rgba(3,10,18,0.68)] backdrop-blur-md transition-opacity duration-150"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-7 shrink-0 items-center justify-center rounded bg-[#42C7E8] font-mono text-[13px] font-bold text-[#071524]">
                    {station.number}
                  </span>
                  <h3 className="truncate text-[18px] font-bold leading-tight text-[#F4F7F8]">
                    {station.shortTitle}
                  </h3>
                </div>
                <span className="shrink-0 rounded bg-[#3CA77A]/20 px-2 py-0.5 font-mono text-[12px] font-semibold text-[#3CA77A]">
                  ACTIVE
                </span>
              </div>

              <div className="mt-2 space-y-1.5">
                {(flowMode === 'MATERIAL' || flowMode === 'COMBINED') && (
                  <p className="line-clamp-2 text-[14.5px] leading-snug text-[#EDF3F7]">
                    {station.materialMovement.actions[0]}
                  </p>
                )}
                {(flowMode === 'INFORMATION' || flowMode === 'COMBINED') && (
                  <div className="flex items-center gap-1.5 truncate font-mono text-[13px] text-[#7BE0F7]">
                    <Database className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{station.informationFlowSummary.primaryEntityId}</span>
                  </div>
                )}
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[#42C7E8]/20 pt-2">
                <span className="truncate font-mono text-[12px] text-[#A9E8F5]/85">
                  {station.zoneLabel.split(' ')[0]} {station.zoneLabel.split(' ')[1]}
                </span>
                <button
                  type="button"
                  onClick={() => onInspectFullStation(station.id)}
                  className="flex shrink-0 items-center gap-1.5 rounded-md bg-[#173B57] px-2.5 py-1 font-mono text-[13px] font-semibold text-[#F4F7F8] transition-colors hover:bg-[#42C7E8] hover:text-[#071524]"
                >
                  <span>Inspect</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        }

        // CLASS A — Compact, High-Legibility Station Marker
        return (
          <div
            key={station.id}
            ref={(node) => {
              overlayRefs.current.cardRefs.set(station.id, node);
            }}
            style={{ width: descriptor.width, opacity: 0 }}
            className="absolute left-0 top-0 transition-opacity duration-150"
          >
            <button
              type="button"
              onClick={() => onSelectStation(station.id)}
              className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left shadow-lg backdrop-blur-md transition-colors ${
                isFocused
                  ? 'border-[#42C7E8] bg-[#0B2239]/94 text-[#F4F7F8]'
                  : isJourneyActive
                  ? 'border-[#3CA77A]/85 bg-[#071524]/92 text-[#F4F7F8]'
                  : 'border-[#42C7E8]/45 bg-[#071524]/88 text-[#EDF3F7] hover:border-[#42C7E8] hover:bg-[#102A43]/95'
              }`}
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  isJourneyActive ? 'bg-[#3CA77A]' : isFocused ? 'bg-[#42C7E8]' : 'bg-[#27B7D8]'
                }`}
              />
              <span className="font-mono text-[14px] font-bold text-[#42C7E8]">{station.number}</span>
              <span className="truncate text-[15px] font-semibold leading-tight">{station.shortTitle}</span>
            </button>
          </div>
        );
      })}

      {/* PRIORITIZED NON-COMPETING EXCEPTION CALLOUTS */}
      {prioritizedExceptions.map(({ exc, extraCount }) => {
        const id = `EXC-${exc.id}`;
        const isCritical = exc.severity === 'CRITICAL';
        return (
          <div
            key={id}
            ref={(node) => {
              overlayRefs.current.cardRefs.set(id, node);
            }}
            style={{ width: 268, opacity: 0 }}
            className="absolute left-0 top-0 transition-opacity duration-150"
          >
            <button
              type="button"
              onClick={() => onSelectException(exc.id, exc.stationId)}
              className={`flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left shadow-xl backdrop-blur-md transition-colors ${
                isCritical
                  ? 'border-[#D9534F]/85 bg-[#1B0D14]/92 text-[#FFD6D5] hover:bg-[#2A111A]'
                  : 'border-[#E9A23B]/80 bg-[#1B160B]/92 text-[#FFE8C2] hover:bg-[#29200E]'
              }`}
            >
              <AlertTriangle
                className={`mt-0.5 h-4 w-4 shrink-0 ${isCritical ? 'text-[#FF6B66]' : 'text-[#F5B041]'}`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1 font-mono text-[12px] font-bold">
                  <span>
                    {exc.id} · {exc.severity}
                  </span>
                  {extraCount > 0 && (
                    <span className="rounded bg-white/10 px-1.5 py-0.2 text-[11px]">+{extraCount}</span>
                  )}
                </div>
                <div className="truncate text-[14px] font-medium text-[#F4F7F8]">{exc.title}</div>
              </div>
            </button>
          </div>
        );
      })}

      {/* TWO DISTINCT REVERSE-LOGISTICS LOOP CALLOUTS */}
      {(flowMode === 'MATERIAL' || flowMode === 'COMBINED') && (
        <>
          <div
            ref={(node) => {
              overlayRefs.current.cardRefs.set('LOOP-A-BADGE', node);
            }}
            style={{ width: 274, opacity: 0 }}
            className="absolute left-0 top-0 transition-opacity duration-150"
          >
            <button
              type="button"
              onClick={() => onSelectStation('ST-02')}
              className="flex w-full items-center gap-2 rounded-full border border-[#2DD4BF]/80 bg-[#071C22]/92 px-3 py-1.5 font-mono text-[13px] font-semibold text-[#5EEAD4] shadow-lg backdrop-blur-md hover:bg-[#0D2E36]"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">LOOP 1: Empty Crates → Farm</span>
            </button>
          </div>

          <div
            ref={(node) => {
              overlayRefs.current.cardRefs.set('LOOP-B-BADGE', node);
            }}
            style={{ width: 266, opacity: 0 }}
            className="absolute left-0 top-0 transition-opacity duration-150"
          >
            <button
              type="button"
              onClick={() => onSelectStation('ST-07')}
              className="flex w-full items-center gap-2 rounded-full border border-[#F59E0B]/80 bg-[#1F170A]/92 px-3 py-1.5 font-mono text-[13px] font-semibold text-[#FCD34D] shadow-lg backdrop-blur-md hover:bg-[#2F220D]"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">LOOP 2: Black Bag → MIDC</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
