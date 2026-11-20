import React from 'react';
import { MAT } from './SharedMaterials';

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
    <group position={position} rotation={rotation}>
      {/* Legs */}
      <mesh position={[-0.08, 0.24, 0]} material={MAT.deepNavy} castShadow>
        <boxGeometry args={[0.12, 0.48, 0.14]} />
      </mesh>
      <mesh position={[0.08, 0.24, 0]} material={MAT.deepNavy} castShadow>
        <boxGeometry args={[0.12, 0.48, 0.14]} />
      </mesh>
      {/* Torso / Uniform Vest */}
      <mesh position={[0, 0.7, 0]} material={vestMat} castShadow>
        <boxGeometry args={[0.34, 0.44, 0.22]} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.22, 0.68, 0.04]} rotation={[-0.35, 0, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.1, 0.36, 0.1]} />
      </mesh>
      <mesh position={[0.22, 0.68, 0.08]} rotation={[-0.55, 0, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.1, 0.36, 0.1]} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.06, 0]} material={MAT.skinTone} castShadow>
        <dodecahedronGeometry args={[0.13, 0]} />
      </mesh>
      {/* Cap / Hardhat */}
      <mesh position={[0, 1.15, 0.02]} material={capMat} castShadow>
        <boxGeometry args={[0.24, 0.08, 0.26]} />
      </mesh>
      {/* Optional Handheld QR Scanner */}
      {holdingScanner && (
        <group position={[0.22, 0.68, 0.24]}>
          <mesh material={MAT.darkGrey}>
            <boxGeometry args={[0.08, 0.1, 0.14]} />
          </mesh>
          <mesh position={[0, 0, 0.09]} material={MAT.cyan}>
            <boxGeometry args={[0.05, 0.03, 0.04]} />
          </mesh>
        </group>
      )}
      {/* Optional Carried Punnet Box */}
      {holdingBox && (
        <mesh position={[0, 0.7, 0.26]} material={MAT.b2cBlackBox} castShadow>
          <boxGeometry args={[0.32, 0.16, 0.22]} />
        </mesh>
      )}
    </group>
  );
};
