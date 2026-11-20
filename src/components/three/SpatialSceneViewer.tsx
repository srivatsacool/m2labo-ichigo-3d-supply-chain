import React, { Component, Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { Box, Eye, Layers, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../layout/StatusBadge';
import { PackagingBlueprintSvg } from '../diagrams/PackagingBlueprintSvg';

export type SpatialSceneId = 'farm' | 'cooler-packaging' | 'warehouse-transport';

interface SpatialSceneViewerProps {
  sceneId: SpatialSceneId;
  compact?: boolean;
}

class GlbErrorBoundary extends Component<
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

const PolyforkModel: React.FC<{
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  fallback: React.ReactNode;
}> = ({ url, position, rotation = [0, 0, 0], scale = 1, fallback }) => {
  return (
    <GlbErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <PolyforkModelInner url={url} position={position} rotation={rotation} scale={scale} />
      </Suspense>
    </GlbErrorBoundary>
  );
};

const PolyforkModelInner: React.FC<{
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({ url, position, rotation = [0, 0, 0], scale = 1 }) => {
  const gltf = useGLTF(url);
  const cloned = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
};

const HotspotPin: React.FC<{ position: [number, number, number]; label: string; tag?: string }> = ({
  position,
  label,
  tag,
}) => (
  <Html position={position} center distanceFactor={12}>
    <div className="pointer-events-none select-none whitespace-nowrap rounded border border-[#42C7E8]/70 bg-[#0B1F33]/90 px-2 py-1 font-mono text-[10px] text-[#F5FAFC] shadow-lg">
      {tag && <span className="mr-1 text-[#42C7E8] font-bold">[{tag}]</span>}
      <span>{label}</span>
    </div>
  </Html>
);

const ProceduralFarmFallback: React.FC = () => (
  <group>
    <mesh position={[0, 1.5, 0]}>
      <boxGeometry args={[4, 3, 6]} />
      <meshStandardMaterial color="#173B57" wireframe />
    </mesh>
    {[-1.2, 0, 1.2].map((x, idx) => (
      <mesh key={idx} position={[x, 0.25, 0]}>
        <boxGeometry args={[0.6, 0.4, 4.8]} />
        <meshStandardMaterial color="#3CA77A" />
      </mesh>
    ))}
  </group>
);

const FarmGreenhouseScene: React.FC<{ showLabels: boolean }> = ({ showLabels }) => (
  <group>
    <gridHelper args={[18, 18, '#27B7D8', '#12334D']} />
    <PolyforkModel
      url="https://polyfork.dev/cdn/greenhouse-53ab6d.glb"
      position={[0, 0, 0]}
      fallback={<ProceduralFarmFallback />}
    />
    {[-1.5, 0, 1.5].map((z) => (
      <PolyforkModel
        key={z}
        url="https://polyfork.dev/cdn/strawberry-crop-6bec33.glb"
        position={[-0.9, 0.05, z]}
        fallback={
          <mesh position={[-0.9, 0.25, z]}>
            <boxGeometry args={[0.5, 0.35, 0.5]} />
            <meshStandardMaterial color="#3CA77A" />
          </mesh>
        }
      />
    ))}
    {/* Conceptual AI Harvest Robot Frame (Procedural Placeholder — Vendor/Mechanism UNKNOWN) */}
    <group position={[0.9, 0, 0.4]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.9, 0.5, 1.1]} />
        <meshStandardMaterial color="#1D9BF0" />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.8, 12]} />
        <meshStandardMaterial color="#E9A23B" />
      </mesh>
      <mesh position={[-0.3, 1.3, 0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.65, 0.1, 0.1]} />
        <meshStandardMaterial color="#E9A23B" />
      </mesh>
    </group>
    {showLabels && (
      <>
        <HotspotPin position={[0, 4.6, 0]} tag="CC BY 4.0" label="HiMedia Greenhouse Concept (Polyfork)" />
        <HotspotPin position={[-1.1, 1.1, 0]} tag="M02" label="Ready vs Unready Crop Rows" />
        <HotspotPin position={[1.1, 1.7, 0.4]} tag="UNKNOWN" label="Semi-Auto Harvest Robot Concept" />
      </>
    )}
  </group>
);

const CoolerPackagingScene: React.FC<{ showLabels: boolean }> = ({ showLabels }) => (
  <group>
    <gridHelper args={[16, 16, '#27B7D8', '#12334D']} />
    {/* Blast Cooler Cutaway Frame */}
    <group position={[-3.2, 0, 0]}>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[3.6, 2.8, 3.6]} />
        <meshStandardMaterial color="#173B57" transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[3.62, 2.82, 3.62]} />
        <meshStandardMaterial color="#42C7E8" wireframe />
      </mesh>
      {[0.4, 1.1, 1.8].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]}>
          <boxGeometry args={[2.6, 0.12, 2.4]} />
          <meshStandardMaterial color="#27B7D8" />
        </mesh>
      ))}
    </group>

    {/* Exploded B2C Black 250g Boxes -> 500g Carton */}
    <group position={[1.5, 0, -1.2]}>
      <mesh position={[-0.5, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.5]} />
        <meshStandardMaterial color="#0A0F14" />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.5]} />
        <meshStandardMaterial color="#0A0F14" />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[1.9, 0.5, 0.7]} />
        <meshStandardMaterial color="#12334D" wireframe />
      </mesh>
      <PolyforkModel
        url="https://polyfork.dev/cdn/strawberry-57b7d5.glb"
        position={[-0.5, 0.55, 0]}
        scale={3.5}
        fallback={
          <mesh position={[-0.5, 0.55, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#D9534F" />
          </mesh>
        }
      />
    </group>

    {/* Exploded B2B Moulded Cavity Sheet + Crate */}
    <group position={[1.5, 0, 1.6]}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.8, 0.12, 1.2]} />
        <meshStandardMaterial color="#3CA77A" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.0, 0.65, 1.4]} />
        <meshStandardMaterial color="#3CA77A" wireframe />
      </mesh>
    </group>

    {showLabels && (
      <>
        <HotspotPin position={[-3.2, 3.1, 0]} tag="M04" label="Blast Cooler 5h / 5°C Target (Pending Validation)" />
        <HotspotPin position={[1.5, 1.9, -1.2]} tag="B2C" label="2 × 250g Black Boxes = 500g Carton" />
        <HotspotPin position={[1.5, 1.4, 1.6]} tag="B2B" label="Protective Cavity Sheet + Crate" />
      </>
    )}
  </group>
);

const WarehouseTransportScene: React.FC<{ showLabels: boolean }> = ({ showLabels }) => (
  <group>
    <gridHelper args={[20, 20, '#27B7D8', '#12334D']} />
    {/* Linehaul Delivery Van */}
    <PolyforkModel
      url="https://polyfork.dev/cdn/boxy-delivery-van-a3ceae.glb"
      position={[-5.2, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
      fallback={
        <mesh position={[-5.2, 1.2, 0]}>
          <boxGeometry args={[4.5, 2.2, 2.0]} />
          <meshStandardMaterial color="#1D9BF0" />
        </mesh>
      }
    />

    {/* 4 Segregated Andheri MIDC Floor Zones (Conceptual Layout) */}
    <mesh position={[1.2, 0.02, -2.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.8, 3.2]} />
      <meshStandardMaterial color="#3CA77A" transparent opacity={0.45} />
    </mesh>
    <mesh position={[5.4, 0.02, -2.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.8, 3.2]} />
      <meshStandardMaterial color="#42C7E8" transparent opacity={0.4} />
    </mesh>
    <mesh position={[1.2, 0.02, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.8, 3.2]} />
      <meshStandardMaterial color="#E9A23B" transparent opacity={0.4} />
    </mesh>
    <mesh position={[5.4, 0.02, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.8, 3.2]} />
      <meshStandardMaterial color="#D9534F" transparent opacity={0.45} />
    </mesh>

    <PolyforkModel
      url="https://polyfork.dev/cdn/timber-eur-pallet-a1f655.glb"
      position={[1.2, 0.05, -2.2]}
      fallback={
        <mesh position={[1.2, 0.15, -2.2]}>
          <boxGeometry args={[1.2, 0.2, 1.2]} />
          <meshStandardMaterial color="#9BB4C5" />
        </mesh>
      }
    />
    <PolyforkModel
      url="https://polyfork.dev/cdn/cargo-forklift-91f591.glb"
      position={[3.3, 0, 0]}
      fallback={
        <mesh position={[3.3, 0.9, 0]}>
          <boxGeometry args={[1.3, 1.8, 2.4]} />
          <meshStandardMaterial color="#E9A23B" />
        </mesh>
      }
    />

    {showLabels && (
      <>
        <HotspotPin position={[-5.2, 3.2, 0]} tag="M06" label="Option A Reefer / Option B Van (Polyfork CC BY 4.0)" />
        <HotspotPin position={[1.2, 1.2, -2.2]} tag="ZONE 1" label="Sellable Stock (FIFO/FEFO)" />
        <HotspotPin position={[5.4, 1.2, -2.2]} tag="ZONE 2" label="Reshuffling Buffer" />
        <HotspotPin position={[1.2, 1.2, 1.8]} tag="ZONE 3" label="Value-Addition Stock" />
        <HotspotPin position={[5.4, 1.2, 1.8]} tag="ZONE 4" label="Scrap / Quarantine" />
      </>
    )}
  </group>
);

export const SpatialSceneViewer: React.FC<SpatialSceneViewerProps> = ({ sceneId, compact = false }) => {
  const [showLabels, setShowLabels] = useState(true);
  const [force2DFallback, setForce2DFallback] = useState(false);

  const sceneTitle =
    sceneId === 'farm'
      ? '3D Spatial Context: HiMedia Greenhouse Bays & Robot Harvesting Concept'
      : sceneId === 'cooler-packaging'
      ? '3D Spatial Context: Blast Cooler Cutaway & Exploded B2C / B2B Packaging'
      : '3D Spatial Context: Farm-to-MIDC Transport & Andheri MIDC 4-Zone Warehouse';

  return (
    <div className="rounded border border-[#42C7E8]/35 bg-[#0B1F33] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/20 bg-[#12334D] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-[#42C7E8]" />
          <span className="font-mono text-xs font-semibold text-[#F5FAFC]">{sceneTitle}</span>
          <StatusBadge status="PROPOSED DESIGN" compact />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLabels(!showLabels)}
            className="flex items-center gap-1 rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2 py-1 font-mono text-[10px] text-[#EAF5F8] hover:border-[#42C7E8]"
          >
            <Eye className="h-3 w-3 text-[#42C7E8]" />
            <span>{showLabels ? 'Hide Callouts' : 'Show Callouts'}</span>
          </button>
          <button
            type="button"
            onClick={() => setForce2DFallback(!force2DFallback)}
            className="flex items-center gap-1 rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2 py-1 font-mono text-[10px] text-[#EAF5F8] hover:border-[#42C7E8]"
          >
            <Layers className="h-3 w-3 text-[#42C7E8]" />
            <span>{force2DFallback ? 'Load WebGL 3D' : '2D Blueprint Fallback'}</span>
          </button>
        </div>
      </div>

      <div className="border-b border-[#E9A23B]/25 bg-[#E9A23B]/10 px-4 py-1.5 font-mono text-[11px] text-[#F5C57B] flex items-center gap-2">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>
          CONCEPTUAL SPATIAL MODEL — Uses Polyfork CC BY 4.0 low-poly assets + procedural blueprint geometry. Does NOT depict actual verified HiMedia machinery or MIDC CAD floor plans.
        </span>
      </div>

      {force2DFallback ? (
        <div className="p-4 grid gap-4 md:grid-cols-2">
          <PackagingBlueprintSvg variant="B2C" />
          <PackagingBlueprintSvg variant="B2B" />
        </div>
      ) : (
        <div className={compact ? 'h-72 w-full' : 'h-[420px] w-full'}>
          <GlbErrorBoundary
            fallback={
              <div className="flex h-full flex-col items-center justify-center p-6 text-center text-[#9BB4C5]">
                <p className="font-mono text-xs text-[#F5C57B]">WebGL 3D context unavailable — showing 2D Blueprint fallback.</p>
                <div className="mt-4 w-full max-w-xl">
                  <PackagingBlueprintSvg variant="B2C" />
                </div>
              </div>
            }
          >
            <Canvas camera={{ position: [7, 5.5, 8.5], fov: 44 }}>
              <color attach="background" args={['#0B1F33']} />
              <ambientLight intensity={0.75} />
              <directionalLight position={[8, 12, 6]} intensity={1.1} color="#F5FAFC" />
              <pointLight position={[-6, 6, -4]} intensity={0.5} color="#42C7E8" />
              {sceneId === 'farm' && <FarmGreenhouseScene showLabels={showLabels} />}
              {sceneId === 'cooler-packaging' && <CoolerPackagingScene showLabels={showLabels} />}
              {sceneId === 'warehouse-transport' && <WarehouseTransportScene showLabels={showLabels} />}
              <OrbitControls enablePan enableZoom maxPolarAngle={Math.PI / 2 - 0.05} />
            </Canvas>
          </GlbErrorBoundary>
        </div>
      )}
    </div>
  );
};

export default SpatialSceneViewer;
