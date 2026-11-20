import React from 'react';
import { MAT } from './SharedMaterials';
import { LowPolyInsulatedBag, LowPolyStrawberryCrate } from './LowPolyPackaging';

export const LowPolyLineHaulTruck: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  showCargoCutaway?: boolean;
  alertState?: 'normal' | 'warning' | 'critical';
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], showCargoCutaway = true, alertState = 'normal' }) => {
  const beaconMat = alertState === 'critical' ? MAT.red : alertState === 'warning' ? MAT.amber : MAT.cyan;

  return (
    <group position={position} rotation={rotation}>
      {/* Chassis */}
      <mesh position={[0, 0.34, 0]} material={MAT.deepNavy} castShadow receiveShadow>
        <boxGeometry args={[3.9, 0.18, 1.5]} />
      </mesh>

      {/* Cab (Front = +X) */}
      <mesh position={[1.45, 0.92, 0]} material={MAT.secondaryNavy} castShadow receiveShadow>
        <boxGeometry args={[1.05, 1.0, 1.44]} />
      </mesh>
      <mesh position={[1.76, 1.06, 0]} material={MAT.lightCyan}>
        <boxGeometry args={[0.48, 0.44, 1.32]} />
      </mesh>
      {/* Headlights */}
      <mesh position={[1.99, 0.56, 0.48]} material={MAT.offWhite}>
        <boxGeometry args={[0.04, 0.14, 0.22]} />
      </mesh>
      <mesh position={[1.99, 0.56, -0.48]} material={MAT.offWhite}>
        <boxGeometry args={[0.04, 0.14, 0.22]} />
      </mesh>

      {/* Insulated / Refrigerated Cargo Box */}
      <mesh position={[-0.45, 1.16, 0]} material={MAT.offWhite} castShadow receiveShadow>
        <boxGeometry args={[2.75, 1.48, 1.54]} />
      </mesh>
      {/* Cyan Cold-Chain Brand Stripe */}
      <mesh position={[-0.45, 1.24, 0]} material={MAT.cyan}>
        <boxGeometry args={[2.78, 0.16, 1.56]} />
      </mesh>
      {/* Roof Reefer Refrigeration Condenser Unit */}
      <mesh position={[0.75, 2.02, 0]} material={MAT.neutralGrey} castShadow>
        <boxGeometry args={[0.62, 0.32, 0.98]} />
      </mesh>
      <mesh position={[0.75, 2.22, 0]} material={beaconMat}>
        <cylinderGeometry args={[0.1, 0.1, 0.12, 8]} />
      </mesh>

      {/* Visible Stacked Strawberry Crates inside Cutaway Bay Window */}
      {showCargoCutaway && (
        <group position={[-0.55, 0.55, 0.46]}>
          <LowPolyStrawberryCrate position={[-0.45, 0, 0]} scale={0.78} />
          <LowPolyStrawberryCrate position={[0.2, 0, 0]} scale={0.78} />
          <LowPolyStrawberryCrate position={[-0.45, 0.24, 0]} scale={0.78} variant="b2c" />
          <LowPolyStrawberryCrate position={[0.2, 0.24, 0]} scale={0.78} variant="b2b" />
        </group>
      )}

      {/* 4 Wheels */}
      {[
        [1.4, 0.28, 0.78],
        [1.4, 0.28, -0.78],
        [-1.15, 0.28, 0.78],
        [-1.15, 0.28, -0.78],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.2, 10]} />
        </mesh>
      ))}
    </group>
  );
};

export const LowPolyDeliveryRider: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  isReturnRun?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], isReturnRun = false }) => {
  const accentMat = isReturnRun ? MAT.amber : MAT.cyan;

  return (
    <group position={position} rotation={rotation}>
      {/* Scooter body */}
      <mesh position={[0, 0.36, 0]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[1.18, 0.24, 0.38]} />
      </mesh>
      <mesh position={[0.42, 0.68, 0]} rotation={[0, 0, -0.25]} material={accentMat} castShadow>
        <boxGeometry args={[0.16, 0.56, 0.32]} />
      </mesh>
      <mesh position={[0.45, 0.96, 0]} material={MAT.darkGrey}>
        <boxGeometry args={[0.1, 0.06, 0.56]} />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.48, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.12, 8]} />
      </mesh>
      <mesh position={[-0.45, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.12, 8]} />
      </mesh>
      {/* Rider */}
      <mesh position={[0.04, 0.72, 0]} material={isReturnRun ? MAT.amber : MAT.cyan} castShadow>
        <boxGeometry args={[0.28, 0.42, 0.28]} />
      </mesh>
      <mesh position={[0.06, 1.06, 0]} material={MAT.offWhite} castShadow>
        <dodecahedronGeometry args={[0.13, 0]} />
      </mesh>
      {/* Mounted Insulated Delivery Bag */}
      <LowPolyInsulatedBag position={[-0.36, 0.48, 0]} scale={0.92} />
    </group>
  );
};

export const LowPolyLastMileVan: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.72, 0]} material={MAT.offWhite} castShadow receiveShadow>
      <boxGeometry args={[2.3, 1.0, 1.15]} />
    </mesh>
    <mesh position={[0.92, 0.65, 0]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.7, 0.85, 1.12]} />
    </mesh>
    <mesh position={[1.05, 0.82, 0]} material={MAT.lightCyan}>
      <boxGeometry args={[0.46, 0.34, 1.02]} />
    </mesh>
    <mesh position={[-0.2, 0.75, 0]} material={MAT.cyan}>
      <boxGeometry args={[1.7, 0.12, 1.17]} />
    </mesh>
    {[
      [0.75, 0.22, 0.6],
      [0.75, 0.22, -0.6],
      [-0.75, 0.22, 0.6],
      [-0.75, 0.22, -0.6],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.16, 8]} />
      </mesh>
    ))}
  </group>
);
