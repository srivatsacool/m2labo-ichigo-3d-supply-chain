import React, { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Compass, Eye, Lock, Unlock } from 'lucide-react';
import { CameraMode, FlowLayerMode, StationId } from '../data/types';
import { OPERATIONAL_STATIONS, OVERVIEW_CAMERA } from '../stations/stationsData';
import {
  DioramaBaseIsland,
  LowPolyTreesAndProps,
  RoadNetwork3D,
  UpstreamStrawberryFarmLandscape,
} from '../models/LowPolyEnvironment';
import {
  CustomerDestinationDistrict,
  FinancialReconciliationStation3D,
  LineHaulHighwayCorridorStation,
  MidcFourBucketColdStorageBuilding,
  MidcOrderPackingFulfilmentHall,
  MidcReceivingAndQcBuilding,
  QuarantineReturnsAndSanitizationFacility,
  UpstreamFarmCounterpartyGate,
} from '../models/LowPolyBuildings';
import { AmbientWorldLife } from '../models/AmbientWorldLife';
import { CameraController } from './CameraController';
import { ExplorerVirtualInput } from './ThirdPersonCameraController';
import { ShipmentJourneyAnimator } from './ShipmentJourneyAnimator';
import { FlowOverlays3D } from './FlowOverlays3D';
import {
  AnnotationOverlayRefs,
  AnnotationProjectionBridge,
  buildAnnotationDescriptors,
  ScreenSpaceAnnotationOverlay,
} from './AnnotationManager';
import { Fallback2DProcessMap } from './Fallback2DProcessMap';
import { MAT } from '../models/SharedMaterials';

class WebGLErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

/**
 * Memoized static 3D world geometry — never re-renders when UI state or journeyProgress ticks!
 */
const StaticWorldEnvironment = React.memo<{ progressiveTier: 1 | 2; reducedMotion: boolean }>(
  ({ progressiveTier, reducedMotion }) => (
    <>
      <DioramaBaseIsland />
      <RoadNetwork3D />
      <UpstreamStrawberryFarmLandscape />
      <UpstreamFarmCounterpartyGate />

      {progressiveTier >= 2 && (
        <>
          <LowPolyTreesAndProps />
          <LineHaulHighwayCorridorStation animated={!reducedMotion} />
          <MidcReceivingAndQcBuilding animated={!reducedMotion} />
          <MidcFourBucketColdStorageBuilding animated={!reducedMotion} />
          <MidcOrderPackingFulfilmentHall animated={!reducedMotion} />
          <CustomerDestinationDistrict />
          <QuarantineReturnsAndSanitizationFacility animated={!reducedMotion} />
          <FinancialReconciliationStation3D animated={!reducedMotion} />
          <AmbientWorldLife reducedMotion={reducedMotion} />
        </>
      )}
    </>
  )
);

interface IchigoWorldSceneProps {
  cameraMode: CameraMode;
  selectedStationId: StationId | null;
  activeJourneyStationId: StationId;
  journeyProgressRef: React.MutableRefObject<number>;
  flowMode: FlowLayerMode;
  showLabels: boolean;
  showExceptionPins: boolean;
  isDetailOpen: boolean;
  selectedExceptionId: string | null;
  followShipment: boolean;
  cameraResetNonce: number;
  reducedMotion: boolean;
  force2D: boolean;
  onSelectStation: (id: StationId) => void;
  onInspectFullStation: (id: StationId) => void;
  onSelectException: (exceptionId: string, stationId: StationId) => void;
}

const StationHitboxPedestal = React.memo<{
  stationId: StationId;
  position: [number, number, number];
  isSelected: boolean;
  isJourneyActive: boolean;
  isDigital?: boolean;
  onSelect: (id: StationId) => void;
}>(({ stationId, position, isSelected, isJourneyActive, isDigital, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const ringRadius = isDigital ? 5.8 : 7.0;

  return (
    <group position={position}>
      <mesh
        position={[0, 0.34, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(stationId);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <ringGeometry args={[ringRadius - 0.25, ringRadius, 28]} />
        <meshStandardMaterial
          color={isSelected ? '#42C7E8' : isJourneyActive ? '#3CA77A' : hovered ? '#A9E8F5' : '#27B7D8'}
          emissive={isSelected ? '#42C7E8' : isJourneyActive ? '#3CA77A' : '#000000'}
          emissiveIntensity={isSelected ? 0.6 : isJourneyActive ? 0.45 : 0}
          transparent
          opacity={isSelected || hovered || isJourneyActive ? 0.88 : 0.22}
        />
      </mesh>

      <mesh
        position={[0, 0.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(stationId);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <circleGeometry args={[ringRadius, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {isSelected && (
        <mesh position={[0, 0.32, 0]} material={MAT.cyan}>
          <cylinderGeometry args={[0.2, 0.2, 0.28, 8]} />
        </mesh>
      )}
    </group>
  );
});

export const IchigoWorldScene: React.FC<IchigoWorldSceneProps> = React.memo(
  ({
    cameraMode,
    selectedStationId,
    activeJourneyStationId,
    journeyProgressRef,
    flowMode,
    showLabels,
    showExceptionPins,
    isDetailOpen,
    selectedExceptionId,
    followShipment,
    cameraResetNonce,
    reducedMotion,
    force2D,
    onSelectStation,
    onInspectFullStation,
    onSelectException,
  }) => {
    const [webglReady, setWebglReady] = useState(true);
    const [sceneInitialized, setSceneInitialized] = useState(false);
    const [progressiveTier, setProgressiveTier] = useState<1 | 2>(1);
    const [pointerLockRequestNonce, setPointerLockRequestNonce] = useState(0);
    const [isPointerLocked, setIsPointerLocked] = useState(false);

    const virtualInputRef = useRef<ExplorerVirtualInput>({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });

    const overlayRefs = useRef<AnnotationOverlayRefs>({
      cardRefs: new Map(),
      lineRefs: new Map(),
      dotRefs: new Map(),
    });

    const { items: annotationItems, prioritizedExceptions, focusedStationId } = useMemo(
      () =>
        buildAnnotationDescriptors(
          selectedStationId,
          activeJourneyStationId,
          flowMode,
          showExceptionPins,
          isDetailOpen
        ),
      [selectedStationId, activeJourneyStationId, flowMode, showExceptionPins, isDetailOpen]
    );

    useEffect(() => {
      setWebglReady(detectWebGLSupport());
      const timer = window.setTimeout(() => setProgressiveTier(2), 120);
      return () => {
        window.clearTimeout(timer);
        document.body.style.cursor = 'auto';
      };
    }, []);

    if (force2D || !webglReady) {
      return (
        <Fallback2DProcessMap
          selectedStationId={selectedStationId}
          activeJourneyStationId={activeJourneyStationId}
          flowMode={flowMode}
          onSelectStation={onSelectStation}
          reason={!webglReady ? 'WebGL Unavailable — Auto Fallback' : undefined}
        />
      );
    }

    const setVirtualDir = (dir: keyof ExplorerVirtualInput, active: boolean) => {
      virtualInputRef.current[dir] = active;
    };

    return (
      <WebGLErrorBoundary
        fallback={
          <Fallback2DProcessMap
            selectedStationId={selectedStationId}
            activeJourneyStationId={activeJourneyStationId}
            flowMode={flowMode}
            onSelectStation={onSelectStation}
            reason="3D Context Recovery Fallback"
          />
        }
      >
        <div className="relative h-full w-full bg-[#091A2B]">
          {!sceneInitialized && (
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#091A2B]/95 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#42C7E8] border-t-transparent" />
              <p className="mt-3 text-sm font-semibold text-[#F4F7F8]">
                Loading M2Labo ICHIGO® Strawberry Cold-Chain World…
              </p>
              <p className="mt-1 font-mono text-xs text-[#8C9BA5]">
                Preparing optimized farm valley, MIDC hub &amp; live strawberry tracking
              </p>
            </div>
          )}

          <Canvas
            shadows="percentage"
            dpr={[1, 1.5]}
            gl={{ powerPreference: 'high-performance', antialias: true }}
            camera={{ position: OVERVIEW_CAMERA.position, fov: 44, near: 0.4, far: 420 }}
            onCreated={({ gl }) => {
              setSceneInitialized(true);
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                setWebglReady(false);
              });
            }}
          >
            <color attach="background" args={['#0E2338']} />
            <fog attach="fog" args={['#122B43', 105, 315]} />

            <AdaptiveDpr pixelated />
            <AdaptiveEvents />

            {/* High-Performance Balanced Lighting Rig (zero expensive per-pixel pointLight loops!) */}
            <ambientLight intensity={0.85} color="#EEF5FA" />
            <hemisphereLight args={['#C6EBFA', '#1A3244', 0.72]} />
            <directionalLight
              position={[54, 74, 46]}
              intensity={1.65}
              color="#FFF9ED"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-left={-90}
              shadow-camera-right={90}
              shadow-camera-top={58}
              shadow-camera-bottom={-58}
              shadow-camera-near={14}
              shadow-camera-far={220}
              shadow-bias={-0.0005}
            />
            <directionalLight position={[-56, 38, -36]} intensity={0.62} color="#8CE0F7" />

            <Suspense fallback={null}>
              <StaticWorldEnvironment progressiveTier={progressiveTier} reducedMotion={reducedMotion} />

              {OPERATIONAL_STATIONS.map((station) => (
                <StationHitboxPedestal
                  key={station.id}
                  stationId={station.id}
                  position={station.position3D}
                  isSelected={selectedStationId === station.id}
                  isJourneyActive={activeJourneyStationId === station.id}
                  isDigital={station.isDigitalStation}
                  onSelect={onSelectStation}
                />
              ))}

              <ShipmentJourneyAnimator
                journeyProgressRef={journeyProgressRef}
                flowMode={flowMode}
                reducedMotion={reducedMotion}
              />

              <FlowOverlays3D
                flowMode={flowMode}
                selectedStationId={selectedStationId}
                showExceptionPins={showExceptionPins}
                selectedExceptionId={selectedExceptionId}
                onSelectException={onSelectException}
                reducedMotion={reducedMotion}
              />

              <AnnotationProjectionBridge
                items={annotationItems}
                overlayRefs={overlayRefs}
                cameraMode={cameraMode}
                showLabels={showLabels}
                isDetailOpen={isDetailOpen}
              />

              <CameraController
                cameraMode={cameraMode}
                selectedStationId={selectedStationId}
                activeJourneyStationId={activeJourneyStationId}
                cameraResetNonce={cameraResetNonce}
                followShipment={followShipment}
                journeyProgressRef={journeyProgressRef}
                reducedMotion={reducedMotion}
                virtualInputRef={virtualInputRef}
                pointerLockRequestNonce={pointerLockRequestNonce}
                onPointerLockChange={setIsPointerLocked}
                onSelectStation={onSelectStation}
              />
            </Suspense>
          </Canvas>

          <ScreenSpaceAnnotationOverlay
            items={annotationItems}
            prioritizedExceptions={prioritizedExceptions}
            focusedStationId={focusedStationId}
            activeJourneyStationId={activeJourneyStationId}
            flowMode={flowMode}
            showLabels={showLabels}
            overlayRefs={overlayRefs}
            onSelectStation={onSelectStation}
            onInspectFullStation={onInspectFullStation}
            onSelectException={onSelectException}
          />

          {(cameraMode === 'FIRST_PERSON' || cameraMode === 'THIRD_PERSON') && (
            <div className="pointer-events-auto absolute bottom-32 left-3 z-20 flex items-center gap-3 rounded-xl glass-panel px-3.5 py-2.5 sm:bottom-36">
              <div className="grid grid-cols-3 gap-1">
                <div />
                <button
                  type="button"
                  aria-label="Move Forward"
                  onPointerDown={() => setVirtualDir('forward', true)}
                  onPointerUp={() => setVirtualDir('forward', false)}
                  onPointerLeave={() => setVirtualDir('forward', false)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#42C7E8]/40 bg-[#102A43] text-[#A9E8F5] active:bg-[#42C7E8] active:text-[#071524]"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <div />
                <button
                  type="button"
                  aria-label="Move Left"
                  onPointerDown={() => setVirtualDir('left', true)}
                  onPointerUp={() => setVirtualDir('left', false)}
                  onPointerLeave={() => setVirtualDir('left', false)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#42C7E8]/40 bg-[#102A43] text-[#A9E8F5] active:bg-[#42C7E8] active:text-[#071524]"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Move Backward"
                  onPointerDown={() => setVirtualDir('backward', true)}
                  onPointerUp={() => setVirtualDir('backward', false)}
                  onPointerLeave={() => setVirtualDir('backward', false)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#42C7E8]/40 bg-[#102A43] text-[#A9E8F5] active:bg-[#42C7E8] active:text-[#071524]"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Move Right"
                  onPointerDown={() => setVirtualDir('right', true)}
                  onPointerUp={() => setVirtualDir('right', false)}
                  onPointerLeave={() => setVirtualDir('right', false)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#42C7E8]/40 bg-[#102A43] text-[#A9E8F5] active:bg-[#42C7E8] active:text-[#071524]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-mono font-bold text-[#3CA77A]">
                  {cameraMode === 'FIRST_PERSON' ? (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      <span>FIRST PERSON</span>
                    </>
                  ) : (
                    <>
                      <Compass className="h-3.5 w-3.5" />
                      <span>THIRD PERSON</span>
                    </>
                  )}
                </div>
                <div className="text-[12.5px] text-[#EDF3F7]">WASD / Arrows: Walk • Shift: Sprint</div>
                <div className="text-[11.5px] text-[#A9E8F5]/80">
                  {cameraMode === 'FIRST_PERSON'
                    ? 'Drag mouse to look around'
                    : 'Drag: Orbit • Wheel: Zoom • Space: Nearest Station'}
                </div>
                {cameraMode === 'FIRST_PERSON' && (
                  <button
                    type="button"
                    onClick={() => setPointerLockRequestNonce((n) => n + 1)}
                    className="mt-1 inline-flex items-center gap-1.5 rounded border border-[#42C7E8]/50 bg-[#173B57] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#A9E8F5] hover:bg-[#42C7E8] hover:text-[#071524]"
                  >
                    {isPointerLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    <span>{isPointerLocked ? 'Esc to Unlock Mouse' : 'Mouse Look Lock'}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </WebGLErrorBoundary>
    );
  }
);

export default IchigoWorldScene;
