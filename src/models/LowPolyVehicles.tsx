import React from 'react';
import { MAT } from './SharedMaterials';
import { ICBOXContainer } from './ICBOXModel';
import { EmptyReusableCrate, StrawberryCrateFilled } from './StrawberryAssetSystem';
import { InsulatedDeliveryBagAsset } from './InsulatedDeliveryBagAsset';

export const LowPolyLineHaulTruck: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  showCargoCutaway?: boolean;
  cargoMode?: 'STRAWBERRIES' | 'EMPTY_CRATES';
  alertState?: 'normal' | 'warning' | 'critical';
}> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  showCargoCutaway = true,
  cargoMode = 'STRAWBERRIES',
  alertState = 'normal',
}) => {
  const isEmptyReturn = cargoMode === 'EMPTY_CRATES';
  const stripeMat = isEmptyReturn ? MAT.turquoiseReturn : MAT.green;
  const beaconMat =
    alertState === 'critical'
      ? MAT.red
      : alertState === 'warning'
      ? MAT.amber
      : isEmptyReturn
      ? MAT.turquoiseReturn
      : MAT.green;

  return (
    <group position={position} rotation={rotation} scale={1.18}>
      {/* Chassis */}
      <mesh position={[0, 0.34, 0]} material={MAT.deepNavy} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.22, 1.66]} />
      </mesh>

      {/* Cab (Front = +X) */}
      <mesh position={[1.7, 1.0, 0]} material={MAT.secondaryNavy} castShadow receiveShadow>
        <boxGeometry args={[1.18, 1.12, 1.56]} />
      </mesh>
      <mesh position={[2.06, 1.16, 0]} material={MAT.lightCyan}>
        <boxGeometry args={[0.46, 0.48, 1.44]} />
      </mesh>
      {/* Side accent skirt */}
      <mesh position={[0.1, 0.38, 0]} material={stripeMat}>
        <boxGeometry args={[2.4, 0.08, 1.68]} />
      </mesh>
      {/* Headlights */}
      <mesh position={[2.3, 0.58, 0.54]} material={MAT.warmLampGlow}>
        <boxGeometry args={[0.05, 0.16, 0.24]} />
      </mesh>
      <mesh position={[2.3, 0.58, -0.54]} material={MAT.warmLampGlow}>
        <boxGeometry args={[0.05, 0.16, 0.24]} />
      </mesh>
      {/* Tail lights */}
      <mesh position={[-2.2, 0.56, 0.56]} material={MAT.red}>
        <boxGeometry args={[0.05, 0.14, 0.22]} />
      </mesh>
      <mesh position={[-2.2, 0.56, -0.56]} material={MAT.red}>
        <boxGeometry args={[0.05, 0.14, 0.22]} />
      </mesh>

      {/* Insulated / Refrigerated Cargo Box — dual-sided architectural cutaway (+Z and -Z) so cargo is clearly visible from EVERY direction (Eastbound OR Westbound)! */}
      {showCargoCutaway ? (
        <group position={[-0.55, 0.48, 0]}>
          {/* Floor */}
          <mesh position={[0, 0.05, 0]} material={MAT.insulatedPanel} castShadow receiveShadow>
            <boxGeometry args={[3.24, 0.1, 1.68]} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, 1.68, 0]} material={MAT.offWhite} castShadow>
            <boxGeometry args={[3.26, 0.1, 1.7]} />
          </mesh>
          {/* Front bulkhead (+X) */}
          <mesh position={[1.58, 0.86, 0]} material={MAT.offWhite} castShadow>
            <boxGeometry args={[0.1, 1.56, 1.66]} />
          </mesh>
          {/* Rear frame pillars (-X) */}
          <mesh position={[-1.58, 0.86, -0.78]} material={MAT.secondaryNavy} castShadow>
            <boxGeometry args={[0.12, 1.56, 0.12]} />
          </mesh>
          <mesh position={[-1.58, 0.86, 0.78]} material={MAT.secondaryNavy} castShadow>
            <boxGeometry args={[0.12, 1.56, 0.12]} />
          </mesh>
          {/* Dual-Sided Protective Lower Rails, Flow Stripes & Translucent Chilled Glass Windows */}
          {[1, -1].map((side) => (
            <React.Fragment key={`side-${side}`}>
              <mesh position={[0, 0.2, side * 0.82]} material={MAT.offWhite}>
                <boxGeometry args={[3.24, 0.22, 0.06]} />
              </mesh>
              <mesh position={[0, 0.26, side * 0.855]} material={stripeMat}>
                <boxGeometry args={[3.2, 0.08, 0.02]} />
              </mesh>
              <mesh position={[0, 1.6, side * 0.855]} material={stripeMat}>
                <boxGeometry args={[3.2, 0.09, 0.02]} />
              </mesh>
              <mesh position={[0, 0.96, side * 0.83]} material={MAT.glassIce}>
                <boxGeometry args={[3.14, 1.24, 0.02]} />
              </mesh>
            </React.Fragment>
          ))}

          {/* VISIBLE CARGO: Outbound Fresh Strawberries vs Flow A Return Empty Crates */}
          {isEmptyReturn ? (
            <group position={[0, 0.12, 0]}>
              {/* Stacked EMPTY reusable crates ONLY — zero strawberries! Clearly visible from both sides */}
              {[-0.95, 0.0, 0.95].map((cx, ci) => (
                <React.Fragment key={ci}>
                  <EmptyReusableCrate position={[cx, 0.0, 0.3]} scale={0.92} />
                  <EmptyReusableCrate position={[cx, 0.24, 0.3]} scale={0.92} />
                  <EmptyReusableCrate position={[cx, 0.48, 0.3]} scale={0.92} />
                  <EmptyReusableCrate position={[cx, 0.72, 0.3]} scale={0.92} />
                  <EmptyReusableCrate position={[cx, 0.0, -0.3]} scale={0.92} />
                  <EmptyReusableCrate position={[cx, 0.24, -0.3]} scale={0.92} />
                  <EmptyReusableCrate position={[cx, 0.48, -0.3]} scale={0.92} />
                  <EmptyReusableCrate position={[cx, 0.72, -0.3]} scale={0.92} />
                </React.Fragment>
              ))}
            </group>
          ) : (
            <group position={[0, 0.12, 0]}>
              {/* Vivid fresh strawberry-filled crates visible on BOTH sides + supporting yellow ICBOX units */}
              <StrawberryCrateFilled position={[-0.95, 0.0, 0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[0.0, 0.0, 0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[0.95, 0.0, 0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[-0.95, 0.34, 0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[0.0, 0.34, 0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[0.95, 0.34, 0.3]} scale={0.96} />
              <ICBOXContainer position={[-0.9, 0.0, -0.34]} scale={0.78} variant="closed" animateLid={false} />
              <StrawberryCrateFilled position={[0.0, 0.0, -0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[0.95, 0.0, -0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[0.0, 0.34, -0.3]} scale={0.96} />
              <StrawberryCrateFilled position={[0.95, 0.34, -0.3]} scale={0.96} />
            </group>
          )}
        </group>
      ) : (
        <mesh position={[-0.55, 1.32, 0]} material={MAT.offWhite} castShadow receiveShadow>
          <boxGeometry args={[3.24, 1.66, 1.68]} />
        </mesh>
      )}

      {/* Roof Reefer Refrigeration Condenser Unit */}
      <mesh position={[0.95, 2.38, 0]} material={MAT.neutralGrey} castShadow>
        <boxGeometry args={[0.74, 0.36, 1.1]} />
      </mesh>
      <mesh position={[1.34, 2.38, 0]} material={MAT.cyan}>
        <boxGeometry args={[0.04, 0.22, 0.72]} />
      </mesh>
      <mesh position={[0.95, 2.62, 0]} material={beaconMat}>
        <cylinderGeometry args={[0.12, 0.12, 0.14, 8]} />
      </mesh>

      {/* 4 Wheels */}
      {[
        [1.62, 0.3, 0.86],
        [1.62, 0.3, -0.86],
        [-1.35, 0.3, 0.86],
        [-1.35, 0.3, -0.86],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.24, 10]} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Two-Wheeler Last-Mile Delivery Rider carrying ONLY the Black Insulated Delivery Bag (Flow B).
 * Never mounts an ICBOX on the scooter!
 */
export const LowPolyDeliveryRider: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  isReturnRun?: boolean;
  bagOpenAtHandover?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], isReturnRun = false, bagOpenAtHandover = false }) => {
  const jacketMat = isReturnRun ? MAT.amber : MAT.secondaryNavy;
  const trimMat = isReturnRun ? MAT.amber : MAT.cyan;

  return (
    <group position={position} rotation={rotation} scale={1.18}>
      {/* Two-wheeler scooter body & footboard */}
      <mesh position={[0, 0.34, 0]} material={MAT.slateDark} castShadow>
        <boxGeometry args={[1.32, 0.24, 0.44]} />
      </mesh>
      {/* Front steering cowl & fairing */}
      <mesh position={[0.48, 0.68, 0]} rotation={[0, 0, -0.22]} material={MAT.secondaryNavy} castShadow>
        <boxGeometry args={[0.2, 0.58, 0.38]} />
      </mesh>
      {/* Headlight */}
      <mesh position={[0.62, 0.82, 0]} material={MAT.warmLampGlow}>
        <boxGeometry args={[0.05, 0.12, 0.18]} />
      </mesh>
      {/* Handlebars */}
      <mesh position={[0.5, 0.98, 0]} material={MAT.darkGrey}>
        <boxGeometry args={[0.09, 0.06, 0.62]} />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.54, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.13, 10]} />
      </mesh>
      <mesh position={[-0.48, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.13, 10]} />
      </mesh>
      {/* Rear steel carrier rack */}
      <mesh position={[-0.5, 0.49, 0]} material={MAT.steelRack} castShadow>
        <boxGeometry args={[0.62, 0.05, 0.54]} />
      </mesh>

      {/* Helmeted Rider Silhouette */}
      {/* Rider Legs */}
      <mesh position={[0.14, 0.48, 0.14]} rotation={[0, 0, -0.3]} material={MAT.deepNavy} castShadow>
        <boxGeometry args={[0.14, 0.42, 0.14]} />
      </mesh>
      <mesh position={[0.14, 0.48, -0.14]} rotation={[0, 0, -0.3]} material={MAT.deepNavy} castShadow>
        <boxGeometry args={[0.14, 0.42, 0.14]} />
      </mesh>
      {/* Rider Jacket */}
      <mesh position={[0.04, 0.82, 0]} rotation={[0, 0, -0.14]} material={jacketMat} castShadow>
        <boxGeometry args={[0.3, 0.46, 0.34]} />
      </mesh>
      {/* Reflective vest band */}
      <mesh position={[0.04, 0.84, 0]} rotation={[0, 0, -0.14]} material={trimMat}>
        <boxGeometry args={[0.32, 0.09, 0.36]} />
      </mesh>
      {/* Rider Arms reaching handlebars */}
      <mesh position={[0.28, 0.88, 0.18]} rotation={[0, 0, -0.9]} material={jacketMat} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
      </mesh>
      <mesh position={[0.28, 0.88, -0.18]} rotation={[0, 0, -0.9]} material={jacketMat} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
      </mesh>
      {/* Rider Protective Helmet + Visor */}
      <mesh position={[0.1, 1.18, 0]} material={MAT.offWhite} castShadow>
        <dodecahedronGeometry args={[0.16, 0]} />
      </mesh>
      <mesh position={[0.21, 1.17, 0]} material={MAT.rubberBlack}>
        <boxGeometry args={[0.1, 0.11, 0.22]} />
      </mesh>

      {/* BLACK INSULATED DELIVERY BAG securely mounted on rear carrier rack */}
      <InsulatedDeliveryBagAsset
        position={[-0.5, 0.52, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.96}
        variant={bagOpenAtHandover ? 'open_strawberries' : isReturnRun ? 'empty_return' : 'closed'}
      />
    </group>
  );
};

export const LowPolyLastMileVan: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation} scale={1.15}>
    <mesh position={[0, 0.74, 0]} material={MAT.offWhite} castShadow receiveShadow>
      <boxGeometry args={[2.55, 1.08, 1.28]} />
    </mesh>
    <mesh position={[1.0, 0.68, 0]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.76, 0.92, 1.22]} />
    </mesh>
    <mesh position={[1.16, 0.86, 0]} material={MAT.lightCyan}>
      <boxGeometry args={[0.46, 0.36, 1.1]} />
    </mesh>
    <mesh position={[-0.2, 0.8, 0]} material={MAT.green}>
      <boxGeometry args={[1.88, 0.12, 1.3]} />
    </mesh>
    {/* Black Insulated Delivery Bag staged beside van */}
    <InsulatedDeliveryBagAsset position={[-1.12, 0.0, 0.82]} scale={0.9} variant="closed" />
    {[
      [0.82, 0.24, 0.66],
      [0.82, 0.24, -0.66],
      [-0.82, 0.24, 0.66],
      [-0.82, 0.24, -0.66],
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} material={MAT.rubberBlack} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.18, 8]} />
      </mesh>
    ))}
  </group>
);
