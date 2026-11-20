import React from 'react';
import { ICBOXVariant } from '../data/types';
import { ICBOXContainer } from './ICBOXModel';
import {
  HeroStrawberry,
  StrawberryCrateFilled,
  StrawberryPunnet250g,
} from './StrawberryAssetSystem';
import { InsulatedDeliveryBagAsset } from './InsulatedDeliveryBagAsset';
import { MAT } from './SharedMaterials';

export { ICBOXContainer } from './ICBOXModel';
export { HeroStrawberry as LowPolyStrawberry } from './StrawberryAssetSystem';

export const LowPolyStrawberryCrate: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: 'standard' | 'b2c' | 'b2b' | 'quarantine';
  icboxVariant?: ICBOXVariant;
}> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  variant = 'standard',
}) => (
  <StrawberryCrateFilled
    position={position}
    rotation={rotation}
    scale={scale}
    quarantine={variant === 'quarantine'}
  />
);

export const LowPolyB2CBlackBoxStack: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    {/* Bottom 500g matte-black outer carton holding 2x 250g black boxes */}
    <mesh position={[0, 0.08, 0]} material={MAT.b2cBlackBox} castShadow receiveShadow>
      <boxGeometry args={[0.62, 0.16, 0.34]} />
    </mesh>
    <mesh position={[0, 0.165, 0.172]} material={MAT.strawberrySolidRed}>
      <boxGeometry args={[0.52, 0.022, 0.01]} />
    </mesh>
    {/* Top open pair of 250g black branded punnets overflowing with vivid fresh strawberries */}
    <StrawberryPunnet250g position={[-0.15, 0.16, 0]} scale={0.96} grade="2L" />
    <StrawberryPunnet250g position={[0.15, 0.16, 0]} scale={0.96} grade="2L" />
  </group>
);

export const LowPolyB2BCavityTray: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.045, 0]} material={MAT.offWhite} castShadow receiveShadow>
      <boxGeometry args={[0.68, 0.09, 0.46]} />
    </mesh>
    <mesh position={[0, 0.095, 0]} material={MAT.b2cBlackBox}>
      <boxGeometry args={[0.62, 0.02, 0.4]} />
    </mesh>
    {[-0.2, 0, 0.2].map((x, ix) =>
      [-0.11, 0.11].map((z, iz) => (
        <HeroStrawberry
          key={`${x}-${z}`}
          position={[x, 0.105, z]}
          rotation={[0.14 * (iz === 0 ? -1 : 1), (ix + iz) * 0.9, 0.08]}
          scale={0.145}
          grade="2L"
          deepTone={(ix + iz) % 2 === 1}
        />
      ))
    )}
  </group>
);

export const LowPolyInsulatedBag: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: 'closed' | 'open_strawberries' | 'empty_return';
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, variant = 'closed' }) => (
  <InsulatedDeliveryBagAsset position={position} rotation={rotation} scale={scale} variant={variant} />
);

/**
 * Strawberry-first warehouse pallet stack showing vibrant fresh strawberry-filled crates on top
 * alongside supporting yellow ICBOX units on lower bays where appropriate.
 */
export const LowPolyPalletStack: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  bucket?: 'sellable' | 'reshuffle' | 'valueAdd' | 'scrap';
  levels?: number;
  includeIcbox?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], bucket = 'sellable', levels = 2, includeIcbox = false }) => {
  const bandMat =
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
      {/* Industrial timber pallet base */}
      <mesh position={[0, 0.08, 0]} material={MAT.woodPallet} castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.07, 1.24]} />
      </mesh>
      {[-0.68, 0, 0.68].map((px, i) => (
        <mesh key={i} position={[px, 0.03, 0]} material={MAT.woodPallet} castShadow>
          <boxGeometry args={[0.16, 0.06, 1.2]} />
        </mesh>
      ))}
      <mesh position={[0, 0.09, 0.63]} material={bandMat}>
        <boxGeometry args={[1.48, 0.04, 0.02]} />
      </mesh>
      {Array.from({ length: levels }).map((_, lvl) => {
        const y = 0.115 + lvl * 0.34;
        const useIcboxRow = includeIcbox && lvl === 0 && levels > 1;
        return (
          <group key={lvl} position={[0, y, 0]}>
            {useIcboxRow ? (
              <>
                <ICBOXContainer position={[-0.4, 0, -0.28]} scale={0.82} variant="closed" animateLid={false} />
                <ICBOXContainer position={[0.4, 0, -0.28]} scale={0.82} variant="closed" animateLid={false} />
                <StrawberryCrateFilled position={[-0.4, 0, 0.28]} scale={0.94} quarantine={isQuarantine} />
                <StrawberryCrateFilled position={[0.4, 0, 0.28]} scale={0.94} quarantine={isQuarantine} />
              </>
            ) : (
              <>
                <StrawberryCrateFilled position={[-0.4, 0, -0.28]} scale={0.94} quarantine={isQuarantine} />
                <StrawberryCrateFilled position={[0.4, 0, -0.28]} scale={0.94} quarantine={isQuarantine} />
                <StrawberryCrateFilled position={[-0.4, 0, 0.28]} scale={0.94} quarantine={isQuarantine} />
                <StrawberryCrateFilled position={[0.4, 0, 0.28]} scale={0.94} quarantine={isQuarantine} />
              </>
            )}
          </group>
        );
      })}
    </group>
  );
};
