import React, { Component, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { FlowLayerMode, StationId } from '../data/types';
import { OPERATIONAL_STATIONS, OVERVIEW_CAMERA } from '../stations/stationsData';
import { DioramaBaseIsland, LowPolyTreesAndProps, RoadNetwork3D } from '../models/LowPolyEnvironment';
import {
  CustomerDestinationBuildings,
  FinancialReconciliationStation3D,
  MidcWarehouseComplex,
  UpstreamFarmCounterpartyGate,
} from '../models/LowPolyBuildings';
import { LowPolyLastMileVan } from '../models/LowPolyVehicles';
import { CameraController } from './CameraController';
import { ShipmentJourneyAnimator } from './ShipmentJourneyAnimator';
import { FlowOverlays3D } from './FlowOverlays3D';
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

interface IchigoWorldSceneProps {
  selectedStationId: StationId | null;
  activeJourneyStationId: StationId;
  journeyProgress: number;
  flowMode: FlowLayerMode;
  showLabels: boolean;
  showExceptionPins: boolean;
  selectedExceptionId: string | null;
  followShipment: boolean;
  cameraResetNonce: number;
  reducedMotion: boolean;
  force2D: boolean;
  onSelectStation: (id: StationId) => void;
  onSelectException: (exceptionId: string, stationId: StationId) => void;
}

const StationHitboxPedestal: React.FC<{
  stationId: StationId;
  number: string;
  shortTitle: string;
  position: [number, number, number];
  isSelected: boolean;
  isJourneyActive: boolean;
  isDigital?: boolean;
  showLabels: boolean;
  onSelect: (id: StationId) => void;
}> = ({
  stationId,
  number,
  shortTitle,
  position,
  isSelected,
  isJourneyActive,
  isDigital,
  showLabels,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const ringRadius = isDigital ? 3.1 : 3.4;

  const badgeClass = isSelected
    ? 'border-[#42C7E8] bg-[#173B57] text-[#F4F7F8] ring-2 ring-[#42C7E8]/50 scale-105'
    : isJourneyActive
    ? 'border-[#3CA77A] bg-[#102A43]/95 text-[#3CA77A]'
    : hovered
    ? 'border-[#A9E8F5] bg-[#173B57]/95 text-[#F4F7F8]'
    : 'border-[#42C7E8]/50 bg-[#102A43]/88 text-[#A9E8F5]';

  return (
    <group position={position}>
      {/* Interactive selection & hover ground ring */}
      <mesh
        position={[0, 0.22, 0]}
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
        <ringGeometry args={[ringRadius - 0.18, ringRadius, 24]} />
        <meshStandardMaterial
          color={isSelected ? '#42C7E8' : isJourneyActive ? '#3CA77A' : hovered ? '#A9E8F5' : '#27B7D8'}
          emissive={isSelected ? '#42C7E8' : isJourneyActive ? '#3CA77A' : '#000000'}
          emissiveIntensity={isSelected ? 0.6 : isJourneyActive ? 0.45 : 0}
          transparent
          opacity={isSelected || hovered || isJourneyActive ? 0.92 : 0.36}
        />
      </mesh>

      {/* Transparent floor click disc for forgiving mouse hit-testing */}
      <mesh
        position={[0, 0.12, 0]}
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

      {/* Highlight Pillar when Selected */}
      {isSelected && (
        <mesh position={[0, 0.2, 0]} material={MAT.cyan}>
          <cylinderGeometry args={[0.14, 0.14, 0.2, 8]} />
        </mesh>
      )}

      {/* Clickable 3D Station Callout Pin */}
      {showLabels && (
        <Html position={[0, isDigital ? 4.25 : 3.9, 0]} center distanceFactor={25}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(stationId);
            }}
            className={`pointer-events-auto cursor-pointer select-none whitespace-nowrap rounded-md border px-2.5 py-1 font-mono text-[10px] font-semibold shadow-lg transition-all ${badgeClass}`}
          >
            <span className="mr-1.5 font-bold text-[#42C7E8]">{number}</span>
            <span>{shortTitle}</span>
          </button>
        </Html>
      )}
    </group>
  );
};

export const IchigoWorldScene: React.FC<IchigoWorldSceneProps> = ({
  selectedStationId,
  activeJourneyStationId,
  journeyProgress,
  flowMode,
  showLabels,
  showExceptionPins,
  selectedExceptionId,
  followShipment,
  cameraResetNonce,
  reducedMotion,
  force2D,
  onSelectStation,
  onSelectException,
}) => {
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    setWebglReady(detectWebGLSupport());
    return () => {
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
      <div className="relative h-full w-full bg-[#0A1C2E]">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: OVERVIEW_CAMERA.position, fov: 42, near: 0.5, far: 160 }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              setWebglReady(false);
            });
          }}
        >
          <color attach="background" args={['#0A1C2E']} />
          <fog attach="fog" args={['#0A1C2E', 52, 115]} />

          {/* Soft Architectural Lighting */}
          <ambientLight intensity={0.62} color="#F4F7F8" />
          <hemisphereLight args={['#A9E8F5', '#102A43', 0.45]} />
          <directionalLight
            position={[22, 32, 18]}
            intensity={1.35}
            color="#FFFDF9"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-32}
            shadow-camera-right={32}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-camera-near={5}
            shadow-camera-far={90}
            shadow-bias={-0.0005}
          />
          <directionalLight position={[-18, 14, -14]} intensity={0.42} color="#42C7E8" />

          <Suspense fallback={null}>
            {/* Diorama Foundation, Roads & Environmental Props */}
            <DioramaBaseIsland />
            <RoadNetwork3D />
            <LowPolyTreesAndProps />

            {/* Station 01: Upstream Farm Counterparty Boundary & Custody Handover Gate */}
            <UpstreamFarmCounterpartyGate showSignage={showLabels} />

            {/* Stations 03, 04, 05, 07: Andheri MIDC Warehouse Complex */}
            <MidcWarehouseComplex showZones={showLabels} />

            {/* Station 06: Last-Mile Customer Destination Buildings & Parked B2B Urban Van */}
            <CustomerDestinationBuildings />
            <LowPolyLastMileVan position={[14.8, 0.06, 1.2]} rotation={[0, -0.35, 0]} />

            {/* Station 08: Compact Digital Financial Reconciliation Nexus */}
            <FinancialReconciliationStation3D />

            {/* Interactive Clickable Hitboxes & Station Labels for ST-01 .. ST-08 */}
            {OPERATIONAL_STATIONS.map((station) => (
              <StationHitboxPedestal
                key={station.id}
                stationId={station.id}
                number={station.number}
                shortTitle={station.shortTitle}
                position={station.position3D}
                isSelected={selectedStationId === station.id}
                isJourneyActive={activeJourneyStationId === station.id}
                isDigital={station.isDigitalStation}
                showLabels={showLabels}
                onSelect={onSelectStation}
              />
            ))}

            {/* Animated Product Journey (Vehicles, Highlighted Shipment, Return Loop) */}
            <ShipmentJourneyAnimator
              journeyProgress={journeyProgress}
              flowMode={flowMode}
              showLabels={showLabels}
              reducedMotion={reducedMotion}
            />

            {/* Material / Information / Combined Overlays & Exception Branches */}
            <FlowOverlays3D
              flowMode={flowMode}
              selectedStationId={selectedStationId}
              showExceptionPins={showExceptionPins}
              selectedExceptionId={selectedExceptionId}
              onSelectException={onSelectException}
              reducedMotion={reducedMotion}
            />

            {/* Smooth Camera Orbit & Auto-Focus Controller */}
            <CameraController
              selectedStationId={selectedStationId}
              cameraResetNonce={cameraResetNonce}
              followShipment={followShipment}
              journeyProgress={journeyProgress}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};

export default IchigoWorldScene;
