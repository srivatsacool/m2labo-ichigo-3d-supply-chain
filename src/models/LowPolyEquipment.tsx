import React from 'react';
import { MAT } from './SharedMaterials';
import { LowPolyB2CBlackBoxStack, LowPolyB2BCavityTray, LowPolyInsulatedBag, LowPolyStrawberryCrate } from './LowPolyPackaging';

export const LowPolyQrScannerStation: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  accent?: 'cyan' | 'red' | 'green';
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], accent = 'cyan' }) => {
  const beamMat = accent === 'red' ? MAT.red : accent === 'green' ? MAT.green : MAT.cyan;
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.06, 0]} material={MAT.darkGrey} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
      </mesh>
      <mesh position={[0, 0.62, -0.14]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
      </mesh>
      <mesh position={[0, 1.12, 0.04]} rotation={[-0.35, 0, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.38, 0.26, 0.08]} />
      </mesh>
      <mesh position={[0, 1.12, 0.09]} rotation={[-0.35, 0, 0]} material={beamMat}>
        <boxGeometry args={[0.3, 0.18, 0.02]} />
      </mesh>
      {/* Subtle overhead scan arch */}
      <mesh position={[0, 1.24, 0.18]} material={beamMat}>
        <boxGeometry args={[0.42, 0.04, 0.16]} />
      </mesh>
    </group>
  );
};

export const LowPolyWeighingScale: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.08, 0]} material={MAT.steelRack} castShadow receiveShadow>
      <boxGeometry args={[0.9, 0.16, 0.9]} />
    </mesh>
    <mesh position={[0, 0.17, 0]} material={MAT.offWhite}>
      <boxGeometry args={[0.78, 0.03, 0.78]} />
    </mesh>
    <mesh position={[0, 0.65, -0.4]} material={MAT.darkGrey} castShadow>
      <boxGeometry args={[0.08, 1.1, 0.08]} />
    </mesh>
    <mesh position={[0, 1.2, -0.36]} material={MAT.cyan}>
      <boxGeometry args={[0.34, 0.2, 0.06]} />
    </mesh>
    <LowPolyStrawberryCrate position={[0, 0.18, 0]} scale={0.9} />
  </group>
);

export const LowPolyQcInspectionTable: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  quarantine?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], quarantine = false }) => (
  <group position={position} rotation={rotation}>
    {/* Table legs */}
    {[
      [-0.85, 0.38, -0.42],
      [0.85, 0.38, -0.42],
      [-0.85, 0.38, 0.42],
      [0.85, 0.38, 0.42],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.09, 0.76, 0.09]} />
      </mesh>
    ))}
    {/* Table top */}
    <mesh position={[0, 0.78, 0]} material={quarantine ? MAT.amber : MAT.lightCyan} castShadow receiveShadow>
      <boxGeometry args={[1.9, 0.08, 1.0]} />
    </mesh>
    {/* Sample trays */}
    <LowPolyStrawberryCrate position={[-0.45, 0.82, 0]} scale={0.85} variant={quarantine ? 'quarantine' : 'standard'} />
    <LowPolyStrawberryCrate position={[0.45, 0.82, 0]} scale={0.85} variant={quarantine ? 'quarantine' : 'b2b'} />
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
  const crateVariant =
    bucket === 'scrap' ? 'quarantine' : bucket === 'valueAdd' ? 'b2b' : bucket === 'reshuffle' ? 'b2c' : 'standard';

  return (
    <group position={position} rotation={rotation}>
      {/* Four upright steel posts */}
      {[
        [-1.1, 1.1, -0.48],
        [1.1, 1.1, -0.48],
        [-1.1, 1.1, 0.48],
        [1.1, 1.1, 0.48],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} material={MAT.steelRack} castShadow>
          <boxGeometry args={[0.09, 2.2, 0.09]} />
        </mesh>
      ))}
      {/* Two shelf levels */}
      {[0.25, 1.15, 2.05].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          <mesh material={MAT.secondaryNavy} castShadow receiveShadow>
            <boxGeometry args={[2.3, 0.07, 1.05]} />
          </mesh>
          <mesh position={[0, 0, 0.53]} material={accentMat}>
            <boxGeometry args={[2.3, 0.05, 0.02]} />
          </mesh>
          {idx < 2 && (
            <>
              <LowPolyStrawberryCrate position={[-0.65, 0.04, 0]} scale={0.95} variant={crateVariant} />
              <LowPolyStrawberryCrate position={[0.0, 0.04, 0]} scale={0.95} variant={crateVariant} />
              <LowPolyStrawberryCrate position={[0.65, 0.04, 0]} scale={0.95} variant={crateVariant} />
            </>
          )}
        </group>
      ))}
      {/* FIFO direction arrow rail */}
      {showFifoMarker && (
        <group position={[0, 2.38, 0.42]}>
          <mesh material={MAT.green}>
            <boxGeometry args={[1.3, 0.14, 0.06]} />
          </mesh>
          <mesh position={[0.76, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={MAT.green}>
            <coneGeometry args={[0.14, 0.26, 4]} />
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
      [-1.05, 0.38, -0.45],
      [1.05, 0.38, -0.45],
      [-1.05, 0.38, 0.45],
      [1.05, 0.38, 0.45],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.09, 0.76, 0.09]} />
      </mesh>
    ))}
    <mesh position={[0, 0.78, 0]} material={MAT.offWhite} castShadow receiveShadow>
      <boxGeometry args={[2.3, 0.08, 1.1]} />
    </mesh>
    <LowPolyB2CBlackBoxStack position={[-0.68, 0.82, 0]} />
    <LowPolyB2BCavityTray position={[0.05, 0.82, 0]} />
    <LowPolyInsulatedBag position={[0.75, 0.82, 0]} scale={0.85} />
  </group>
);
