import React from 'react';
import { MAT } from './SharedMaterials';

export const LowPolyStrawberryCrate: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: 'standard' | 'b2c' | 'b2b' | 'quarantine';
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, variant = 'standard' }) => {
  const frameMat =
    variant === 'b2c'
      ? MAT.b2cBlackBox
      : variant === 'b2b'
      ? MAT.lightCyan
      : variant === 'quarantine'
      ? MAT.red
      : MAT.offWhite;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Outer crate tray */}
      <mesh position={[0, 0.11, 0]} material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[0.56, 0.22, 0.4]} />
      </mesh>
      {/* Top berry cavity layer */}
      <mesh position={[0, 0.225, 0]} material={MAT.secondaryNavy}>
        <boxGeometry args={[0.48, 0.03, 0.32]} />
      </mesh>
      {/* Low-poly strawberry cluster indicators */}
      {[-0.14, 0, 0.14].map((x) =>
        [-0.08, 0.08].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.26, z]} material={MAT.strawberryRed} castShadow>
            <dodecahedronGeometry args={[0.042, 0]} />
          </mesh>
        ))
      )}
    </group>
  );
};

export const LowPolyB2CBlackBoxStack: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    {/* Bottom 500g carton holding 2x 250g black boxes */}
    <mesh position={[0, 0.09, 0]} material={MAT.b2cBlackBox} castShadow receiveShadow>
      <boxGeometry args={[0.54, 0.18, 0.34]} />
    </mesh>
    <mesh position={[0, 0.185, 0]} material={MAT.cyan}>
      <boxGeometry args={[0.55, 0.015, 0.05]} />
    </mesh>
    {/* Top open pair of 250g black punnets */}
    <mesh position={[-0.13, 0.27, 0]} material={MAT.b2cBlackBox} castShadow>
      <boxGeometry args={[0.24, 0.14, 0.3]} />
    </mesh>
    <mesh position={[0.13, 0.27, 0]} material={MAT.b2cBlackBox} castShadow>
      <boxGeometry args={[0.24, 0.14, 0.3]} />
    </mesh>
    <mesh position={[-0.13, 0.345, 0]} material={MAT.strawberryRed}>
      <boxGeometry args={[0.18, 0.03, 0.22]} />
    </mesh>
    <mesh position={[0.13, 0.345, 0]} material={MAT.strawberryRed}>
      <boxGeometry args={[0.18, 0.03, 0.22]} />
    </mesh>
  </group>
);

export const LowPolyB2BCavityTray: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.06, 0]} material={MAT.offWhite} castShadow receiveShadow>
      <boxGeometry args={[0.62, 0.12, 0.44]} />
    </mesh>
    <mesh position={[0, 0.13, 0]} material={MAT.lightCyan}>
      <boxGeometry args={[0.56, 0.025, 0.38]} />
    </mesh>
    {[-0.18, 0, 0.18].map((x) =>
      [-0.1, 0.1].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.16, z]} material={MAT.strawberryRed}>
          <octahedronGeometry args={[0.048, 0]} />
        </mesh>
      ))
    )}
  </group>
);

export const LowPolyInsulatedBag: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh position={[0, 0.22, 0]} material={MAT.secondaryNavy} castShadow receiveShadow>
      <boxGeometry args={[0.48, 0.44, 0.42]} />
    </mesh>
    {/* Cyan thermal zipper & coolant strip */}
    <mesh position={[0, 0.38, 0]} material={MAT.cyan}>
      <boxGeometry args={[0.5, 0.04, 0.44]} />
    </mesh>
    {/* Coolant pack peeking on side */}
    <mesh position={[0.25, 0.22, 0]} material={MAT.lightCyan}>
      <boxGeometry args={[0.04, 0.26, 0.22]} />
    </mesh>
  </group>
);

export const LowPolyPalletStack: React.FC<{
  position?: [number, number, number];
  bucket?: 'sellable' | 'reshuffle' | 'valueAdd' | 'scrap';
  levels?: number;
}> = ({ position = [0, 0, 0], bucket = 'sellable', levels = 2 }) => {
  const variant =
    bucket === 'scrap' ? 'quarantine' : bucket === 'valueAdd' ? 'b2b' : bucket === 'reshuffle' ? 'b2c' : 'standard';
  const bandMat =
    bucket === 'sellable'
      ? MAT.green
      : bucket === 'reshuffle'
      ? MAT.cyan
      : bucket === 'valueAdd'
      ? MAT.amber
      : MAT.red;

  return (
    <group position={position}>
      {/* Timber EUR-style pallet base */}
      <mesh position={[0, 0.06, 0]} material={MAT.woodPallet} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.12, 1.05]} />
      </mesh>
      <mesh position={[0, 0.125, 0.53]} material={bandMat}>
        <boxGeometry args={[1.1, 0.03, 0.02]} />
      </mesh>
      {Array.from({ length: levels }).map((_, lvl) => (
        <group key={lvl} position={[0, 0.13 + lvl * 0.24, 0]}>
          <LowPolyStrawberryCrate position={[-0.3, 0, -0.22]} variant={variant} />
          <LowPolyStrawberryCrate position={[0.3, 0, -0.22]} variant={variant} />
          <LowPolyStrawberryCrate position={[-0.3, 0, 0.22]} variant={variant} />
          <LowPolyStrawberryCrate position={[0.3, 0, 0.22]} variant={variant} />
        </group>
      ))}
    </group>
  );
};
