import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { DeliveryBagVariant } from '../data/types';
import { MAT } from './SharedMaterials';
import { StrawberryPunnet250g } from './StrawberryAssetSystem';

function normBox(w: number, h: number, d: number, x: number, y: number, z: number): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(w, h, d);
  const ni = g.index ? g.toNonIndexed() : g.clone();
  g.dispose();
  ni.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
  return ni;
}

// Pre-merged bag fabric shell, webbing straps, and silver thermal liner (slashing 32 meshes -> 5 draw calls!)
const W = 0.62;
const H = 0.44;
const D = 0.46;
const WT = 0.042;

const BAG_FABRIC_BODY_GEO = (() => {
  const parts = [
    normBox(W, H - 0.04, WT, 0, H / 2, D / 2 - WT / 2),
    normBox(W, H - 0.04, WT, 0, H / 2, -D / 2 + WT / 2),
    normBox(WT, H - 0.04, D - 0.02, -W / 2 + WT / 2, H / 2, 0),
    normBox(WT, H - 0.04, D - 0.02, W / 2 - WT / 2, H / 2, 0),
    normBox(0.016, 0.2, D * 0.72, -(W / 2 + 0.008), H * 0.42, 0),
    normBox(0.016, 0.2, D * 0.72, W / 2 + 0.008, H * 0.42, 0),
  ];
  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  return merged;
})();

const BAG_STRAPS_GEO = (() => {
  const parts = [
    normBox(W + 0.015, 0.05, D + 0.015, 0, 0.025, 0),
    normBox(0.055, H - 0.02, 0.012, -0.17, H / 2, D / 2 + 0.006),
    normBox(0.055, H - 0.02, 0.012, 0.17, H / 2, D / 2 + 0.006),
    normBox(0.055, H - 0.02, 0.012, -0.17, H / 2, -D / 2 - 0.006),
    normBox(0.055, H - 0.02, 0.012, 0.17, H / 2, -D / 2 - 0.006),
    normBox(0.022, 0.042, 0.18, -(W / 2 + 0.032), H * 0.53, 0),
    normBox(0.022, 0.042, 0.18, W / 2 + 0.032, H * 0.53, 0),
  ];
  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  return merged;
})();

const BAG_FOIL_LINER_GEO = (() => {
  const parts = [
    normBox(W - WT * 2, 0.015, D - WT * 2, 0, 0.055, 0),
    normBox(W - WT * 2 - 0.01, H - 0.1, 0.006, 0, H / 2, -D / 2 + WT + 0.004),
    normBox(0.006, H - 0.1, D - WT * 2 - 0.01, -W / 2 + WT + 0.004, H / 2, 0),
    normBox(0.006, H - 0.1, D - WT * 2 - 0.01, W / 2 - WT - 0.004, H / 2, 0),
  ];
  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  return merged;
})();

const BAG_ZIPPER_GEO = new THREE.BoxGeometry(W + 0.024, 0.022, D + 0.024);
const BAG_LED_GEO = new THREE.BoxGeometry(0.24, 0.018, 0.012);
const BAG_LID_GEO = new THREE.BoxGeometry(W + 0.018, 0.072, D + 0.018);
const BAG_LID_FOIL_GEO = new THREE.BoxGeometry(W - 0.05, 0.008, D - 0.05);
const BAG_HANDLE_GEO = new THREE.BoxGeometry(0.32, 0.028, 0.068);

export interface InsulatedDeliveryBagProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: DeliveryBagVariant;
  lidOpenProgress?: number;
  animateLid?: boolean;
}

export const InsulatedDeliveryBagAsset: React.FC<InsulatedDeliveryBagProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  variant = 'closed',
  lidOpenProgress,
  animateLid = false,
}) => {
  const lidRef = useRef<THREE.Group>(null);

  const targetOpen = useMemo(() => {
    if (lidOpenProgress !== undefined) return lidOpenProgress;
    if (variant === 'open_strawberries') return 1;
    return 0;
  }, [variant, lidOpenProgress]);

  const currentOpen = useRef(targetOpen);

  useFrame((_, delta) => {
    if (!lidRef.current) return;
    if (animateLid) {
      currentOpen.current = THREE.MathUtils.lerp(currentOpen.current, targetOpen, Math.min(1, delta * 5.2));
    } else {
      currentOpen.current = targetOpen;
    }
    lidRef.current.rotation.x = -currentOpen.current * 1.72;
  });

  const isEmptyReturn = variant === 'empty_return';
  const showStrawberries = variant === 'open_strawberries';

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={BAG_FABRIC_BODY_GEO} material={MAT.bagBlackFabric} castShadow />
      <mesh geometry={BAG_STRAPS_GEO} material={MAT.bagStrapWebbing} />
      <mesh geometry={BAG_FOIL_LINER_GEO} material={MAT.bagFoilLiner} />
      <mesh position={[0, H - 0.01, 0]} geometry={BAG_ZIPPER_GEO} material={MAT.bagZipperTrim} />
      <mesh
        position={[0, H - 0.035, D / 2 + 0.01]}
        geometry={BAG_LED_GEO}
        material={isEmptyReturn ? MAT.bagThermalGlowAmber : MAT.bagThermalGlowCyan}
      />

      {showStrawberries && (
        <group position={[0, 0.07, 0]}>
          <StrawberryPunnet250g position={[-0.145, 0, -0.09]} scale={0.78} grade="2L" />
          <StrawberryPunnet250g position={[0.145, 0, -0.09]} scale={0.78} grade="2L" />
          <StrawberryPunnet250g position={[-0.145, 0, 0.09]} scale={0.78} grade="L" />
          <StrawberryPunnet250g position={[0.145, 0, 0.09]} scale={0.78} grade="L" />
        </group>
      )}

      {/* Hinged Insulated Fabric Top Flap */}
      <group ref={lidRef} position={[0, H + 0.005, -D / 2]}>
        <group position={[0, 0.038, D / 2]}>
          <mesh geometry={BAG_LID_GEO} material={MAT.bagBlackFabric} />
          <mesh position={[0, -0.038, 0]} geometry={BAG_LID_FOIL_GEO} material={MAT.bagFoilLiner} />
          <mesh position={[0, 0.048, 0]} geometry={BAG_HANDLE_GEO} material={MAT.bagStrapWebbing} />
        </group>
      </group>
    </group>
  );
};
