import React from 'react';
import { MAT } from './SharedMaterials';
import { StrawberryPunnet250g } from './StrawberryAssetSystem';

export type WorkerRoleColor = 'm2labo' | 'qc' | 'picker' | 'driver' | 'counterparty';

export const LowPolyWorker: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  role?: WorkerRoleColor;
  holdingScanner?: boolean;
  holdingBox?: boolean;
}> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  role = 'm2labo',
  holdingScanner = false,
  holdingBox = false,
}) => {
  const vestMat =
    role === 'm2labo'
      ? MAT.cyan
      : role === 'qc'
      ? MAT.green
      : role === 'picker'
      ? MAT.offWhite
      : role === 'driver'
      ? MAT.amber
      : MAT.neutralGrey;

  const capMat =
    role === 'qc' ? MAT.green : role === 'm2labo' ? MAT.secondaryNavy : role === 'driver' ? MAT.amber : MAT.darkGrey;

  return (
    <group position={position} rotation={rotation} scale={1.12}>
      {/* Boots & Legs */}
      <mesh position={[-0.08, 0.26, 0]} material={MAT.deepNavy} castShadow>
        <boxGeometry args={[0.13, 0.52, 0.15]} />
      </mesh>
      <mesh position={[0.08, 0.26, 0]} material={MAT.deepNavy} castShadow>
        <boxGeometry args={[0.13, 0.52, 0.15]} />
      </mesh>
      {/* Torso / Uniform Jacket + High-Vis Safety Vest */}
      <mesh position={[0, 0.74, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.36, 0.46, 0.22]} />
      </mesh>
      <mesh position={[0, 0.75, 0]} material={vestMat} castShadow>
        <boxGeometry args={[0.38, 0.34, 0.24]} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.23, 0.72, 0.05]} rotation={[-0.35, 0, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.11, 0.38, 0.11]} />
      </mesh>
      <mesh position={[0.23, 0.72, 0.09]} rotation={[-0.55, 0, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.11, 0.38, 0.11]} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]} material={MAT.skinTone} castShadow>
        <dodecahedronGeometry args={[0.14, 0]} />
      </mesh>
      {/* Cap / Hardhat */}
      <mesh position={[0, 1.2, 0.02]} material={capMat} castShadow>
        <boxGeometry args={[0.25, 0.085, 0.28]} />
      </mesh>
      {/* Optional Handheld QR Scanner */}
      {holdingScanner && (
        <group position={[0.23, 0.72, 0.26]}>
          <mesh material={MAT.darkGrey}>
            <boxGeometry args={[0.08, 0.11, 0.15]} />
          </mesh>
          <mesh position={[0, 0, 0.09]} material={MAT.cyan}>
            <boxGeometry args={[0.05, 0.03, 0.04]} />
          </mesh>
        </group>
      )}
      {/* Optional Carried Fresh Strawberry Punnet */}
      {holdingBox && (
        <StrawberryPunnet250g position={[0, 0.68, 0.32]} scale={0.95} />
      )}
    </group>
  );
};
