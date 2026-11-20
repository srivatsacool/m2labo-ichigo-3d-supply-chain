import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAT } from './SharedMaterials';
import { ICBOXContainer } from './ICBOXModel';
import {
  GradedStrawberryDisplay,
  StrawberryCluster,
  StrawberryCrateFilled,
} from './StrawberryAssetSystem';
import { InsulatedDeliveryBagAsset } from './InsulatedDeliveryBagAsset';
import {
  LowPolyB2CBlackBoxStack,
  LowPolyB2BCavityTray,
} from './LowPolyPackaging';

export const LowPolyQrScannerStation: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  accent?: 'cyan' | 'red' | 'green';
  animated?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], accent = 'cyan', animated = true }) => {
  const beamRef = useRef<THREE.Mesh>(null);
  const beamMat = accent === 'red' ? MAT.red : accent === 'green' ? MAT.green : MAT.cyan;

  useFrame(({ clock }) => {
    if (!beamRef.current || !animated) return;
    beamRef.current.position.y = 1.2 + Math.sin(clock.getElapsedTime() * 3.2) * 0.05;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.07, 0]} material={MAT.darkGrey} castShadow receiveShadow>
        <boxGeometry args={[0.58, 0.14, 0.58]} />
      </mesh>
      <mesh position={[0, 0.7, -0.16]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.12, 1.25, 0.12]} />
      </mesh>
      <mesh position={[0, 1.24, 0.05]} rotation={[-0.35, 0, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.44, 0.3, 0.1]} />
      </mesh>
      <mesh position={[0, 1.24, 0.11]} rotation={[-0.35, 0, 0]} material={beamMat}>
        <boxGeometry args={[0.34, 0.2, 0.02]} />
      </mesh>
      <mesh ref={beamRef} position={[0, 1.36, 0.22]} material={beamMat}>
        <boxGeometry args={[0.48, 0.04, 0.18]} />
      </mesh>
    </group>
  );
};

export const LowPolyWeighingScale: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.09, 0]} material={MAT.steelRack} castShadow receiveShadow>
      <boxGeometry args={[1.15, 0.18, 1.02]} />
    </mesh>
    <mesh position={[0, 0.19, 0]} material={MAT.offWhite}>
      <boxGeometry args={[0.98, 0.03, 0.88]} />
    </mesh>
    <mesh position={[0, 0.72, -0.45]} material={MAT.darkGrey} castShadow>
      <boxGeometry args={[0.09, 1.25, 0.09]} />
    </mesh>
    <mesh position={[0, 1.34, -0.4]} material={MAT.cyan}>
      <boxGeometry args={[0.42, 0.24, 0.07]} />
    </mesh>
    {/* Fresh strawberry crate being checkweighed */}
    <StrawberryCrateFilled position={[0, 0.21, 0]} scale={1.08} />
  </group>
);

export const LowPolyQcInspectionTable: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  quarantine?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], quarantine = false }) => (
  <group position={position} rotation={rotation}>
    {[
      [-1.15, 0.42, -0.5],
      [1.15, 0.42, -0.5],
      [-1.15, 0.42, 0.5],
      [1.15, 0.42, 0.5],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.1, 0.84, 0.1]} />
      </mesh>
    ))}
    <mesh position={[0, 0.86, 0]} material={quarantine ? MAT.amber : MAT.insulatedPanel} castShadow receiveShadow>
      <boxGeometry args={[2.55, 0.09, 1.24]} />
    </mesh>
    {/* Prominent fresh strawberries under QC inspection */}
    <StrawberryCrateFilled position={[-0.65, 0.91, 0.04]} scale={1.02} quarantine={quarantine} />
    {quarantine ? (
      <StrawberryCrateFilled position={[0.55, 0.91, 0.04]} scale={0.96} quarantine />
    ) : (
      <>
        <GradedStrawberryDisplay position={[0.45, 0.91, -0.18]} />
        <StrawberryCluster position={[0.55, 0.91, 0.34]} scale={1.35} />
      </>
    )}
  </group>
);

export const LowPolyWarehouseRack: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  bucket?: 'sellable' | 'reshuffle' | 'valueAdd' | 'scrap';
  showFifoMarker?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], bucket = 'sellable', showFifoMarker = false }) => {
  const accentMat =
    bucket === 'sellable'
      ? MAT.green
      : bucket === 'reshuffle'
      ? MAT.cyan
      : bucket === 'valueAdd'
      ? MAT.amber
      : MAT.red;

  const isQuarantine = bucket === 'scrap';

  return (
    <group position={position} rotation={rotation}>
      {[
        [-1.48, 1.4, -0.52],
        [1.48, 1.4, -0.52],
        [-1.48, 1.4, 0.52],
        [1.48, 1.4, 0.52],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} material={MAT.steelRack} castShadow>
          <boxGeometry args={[0.11, 2.8, 0.11]} />
        </mesh>
      ))}

      {[0.28, 1.38, 2.48].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          <mesh material={MAT.secondaryNavy} castShadow receiveShadow>
            <boxGeometry args={[3.1, 0.08, 1.12]} />
          </mesh>
          <mesh position={[0, 0, 0.57]} material={accentMat}>
            <boxGeometry args={[3.1, 0.07, 0.03]} />
          </mesh>
          {idx < 2 && (
            <>
              <StrawberryCrateFilled position={[-0.96, 0.04, 0]} scale={0.96} quarantine={isQuarantine} />
              {idx === 0 && bucket === 'sellable' ? (
                <ICBOXContainer position={[0.0, 0.04, 0]} scale={0.82} variant="closed" animateLid={false} />
              ) : (
                <StrawberryCrateFilled position={[0.0, 0.04, 0]} scale={0.96} quarantine={isQuarantine} />
              )}
              <StrawberryCrateFilled position={[0.96, 0.04, 0]} scale={0.96} quarantine={isQuarantine} />
            </>
          )}
        </group>
      ))}

      {showFifoMarker && (
        <group position={[0, 3.0, 0.45]}>
          <mesh material={MAT.green}>
            <boxGeometry args={[1.65, 0.16, 0.07]} />
          </mesh>
          <mesh position={[0.95, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={MAT.green}>
            <coneGeometry args={[0.16, 0.3, 4]} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export const LowPolyPackingBench: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    {[
      [-1.45, 0.42, -0.55],
      [1.45, 0.42, -0.55],
      [-1.45, 0.42, 0.55],
      [1.45, 0.42, 0.55],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.1, 0.84, 0.1]} />
      </mesh>
    ))}
    <mesh position={[0, 0.86, 0]} material={MAT.insulatedPanel} castShadow receiveShadow>
      <boxGeometry args={[3.1, 0.09, 1.32]} />
    </mesh>
    {/* Strawberry-first packing flow: bulk crate -> B2C black boxes + B2B tray -> open BLACK INSULATED DELIVERY BAG */}
    <StrawberryCrateFilled position={[-1.02, 0.91, 0.02]} scale={0.94} />
    <LowPolyB2CBlackBoxStack position={[-0.18, 0.91, 0.04]} />
    <LowPolyB2BCavityTray position={[0.48, 0.91, -0.18]} />
    <InsulatedDeliveryBagAsset
      position={[1.08, 0.91, 0.1]}
      rotation={[0, -0.3, 0]}
      scale={0.86}
      variant="open_strawberries"
    />
  </group>
);

export const LowPolyRollerConveyor: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
  withBoxes?: boolean;
  withBags?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], length = 4.6, withBoxes = true, withBags = false }) => {
  const rollerCount = Math.max(4, Math.floor(length / 0.45));
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.48, -0.44]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[length, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0, 0.48, 0.44]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[length, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0, 0.55, 0.44]} material={MAT.cyanSubtle}>
        <boxGeometry args={[length, 0.025, 0.06]} />
      </mesh>
      {[-length * 0.4, 0, length * 0.4].map((lx, i) => (
        <React.Fragment key={i}>
          <mesh position={[lx, 0.24, -0.4]} material={MAT.steelRack} castShadow>
            <boxGeometry args={[0.08, 0.48, 0.08]} />
          </mesh>
          <mesh position={[lx, 0.24, 0.4]} material={MAT.steelRack} castShadow>
            <boxGeometry args={[0.08, 0.48, 0.08]} />
          </mesh>
        </React.Fragment>
      ))}
      {Array.from({ length: rollerCount }).map((_, idx) => {
        const rx = -length / 2 + 0.25 + (idx * (length - 0.5)) / Math.max(1, rollerCount - 1);
        return (
          <mesh key={idx} position={[rx, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} material={MAT.neutralGrey}>
            <cylinderGeometry args={[0.045, 0.045, 0.8, 6]} />
          </mesh>
        );
      })}
      {withBoxes && !withBags && (
        <>
          <StrawberryCrateFilled position={[-length * 0.28, 0.54, 0]} scale={0.96} />
          <StrawberryCrateFilled position={[0, 0.54, 0]} scale={0.96} />
          <ICBOXContainer position={[length * 0.28, 0.54, 0]} scale={0.78} variant="open" animateLid={false} />
        </>
      )}
      {withBags && (
        <>
          <InsulatedDeliveryBagAsset position={[-length * 0.24, 0.54, 0]} scale={0.86} variant="open_strawberries" />
          <InsulatedDeliveryBagAsset position={[length * 0.22, 0.54, 0]} scale={0.86} variant="closed" />
        </>
      )}
    </group>
  );
};

export const LowPolyForkliftStacker: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  carryingBox?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], carryingBox = true }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[-0.25, 0.42, 0]} material={MAT.secondaryNavy} castShadow receiveShadow>
      <boxGeometry args={[1.3, 0.56, 0.92]} />
    </mesh>
    <mesh position={[-0.65, 0.65, 0]} material={MAT.amber} castShadow>
      <boxGeometry args={[0.45, 0.42, 0.88]} />
    </mesh>
    <mesh position={[-0.2, 1.38, 0]} material={MAT.darkGrey} castShadow>
      <boxGeometry args={[0.92, 0.08, 0.86]} />
    </mesh>
    {[
      [-0.6, 1.0, -0.38],
      [-0.6, 1.0, 0.38],
      [0.2, 1.0, -0.38],
      [0.2, 1.0, 0.38],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} material={MAT.steelRack}>
        <boxGeometry args={[0.06, 0.72, 0.06]} />
      </mesh>
    ))}
    <mesh position={[0.48, 1.15, -0.32]} material={MAT.steelRack} castShadow>
      <boxGeometry args={[0.1, 2.1, 0.1]} />
    </mesh>
    <mesh position={[0.48, 1.15, 0.32]} material={MAT.steelRack} castShadow>
      <boxGeometry args={[0.1, 2.1, 0.1]} />
    </mesh>
    <mesh position={[0.92, 0.16, -0.22]} material={MAT.darkGrey} castShadow>
      <boxGeometry args={[0.88, 0.05, 0.12]} />
    </mesh>
    <mesh position={[0.92, 0.16, 0.22]} material={MAT.darkGrey} castShadow>
      <boxGeometry args={[0.88, 0.05, 0.12]} />
    </mesh>
    {[
      [0.28, 0.18, 0.46],
      [0.28, 0.18, -0.46],
      [-0.65, 0.18, 0.44],
      [-0.65, 0.18, -0.44],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.14, 8]} />
      </mesh>
    ))}
    {carryingBox && (
      <group position={[0.95, 0.19, 0]}>
        <mesh position={[0, 0.04, 0]} material={MAT.woodPallet} castShadow>
          <boxGeometry args={[0.92, 0.08, 0.76]} />
        </mesh>
        <StrawberryCrateFilled position={[0, 0.08, 0]} scale={1.0} />
        <StrawberryCrateFilled position={[0, 0.38, 0]} scale={1.0} />
      </group>
    )}
  </group>
);

export const LowPolyCoolingChillerUnit: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  animated?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], animated = true }) => {
  const fanRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!fanRef.current || !animated) return;
    fanRef.current.rotation.z += delta * 5.0;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh material={MAT.neutralGrey} castShadow>
        <boxGeometry args={[1.8, 0.72, 0.72]} />
      </mesh>
      <mesh position={[0, 0, 0.37]} material={MAT.cyanSubtle}>
        <boxGeometry args={[1.62, 0.56, 0.03]} />
      </mesh>
      <mesh ref={fanRef} position={[0, 0, 0.4]} material={MAT.darkGrey}>
        <cylinderGeometry args={[0.24, 0.24, 0.04, 6]} />
      </mesh>
    </group>
  );
};
