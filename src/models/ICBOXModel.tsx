import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ICBOXVariant } from '../data/types';
import { MAT } from './SharedMaterials';
import { HeroStrawberry, StrawberryPunnet250g } from './StrawberryAssetSystem';

/**
 * Re-exported alias for backwards compatibility, backed by the upgraded sculpted HeroStrawberry.
 */
export const LowPolyStrawberry: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  deepTone?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, deepTone = false }) => (
  <HeroStrawberry position={position} rotation={rotation} scale={0.075 * scale} deepTone={deepTone} />
);

/**
 * Optimized Tray insert holding two merged 250g punnet bays (6 draw calls total instead of 125!).
 */
export const StrawberryTrayInsert: React.FC<{
  position?: [number, number, number];
  withCoolants?: boolean;
  quarantine?: boolean;
}> = ({ position = [0, 0, 0], withCoolants = false, quarantine = false }) => (
  <group position={position}>
    <StrawberryPunnet250g position={[-0.145, 0.01, 0]} scale={0.94} quarantine={quarantine} />
    <StrawberryPunnet250g position={[0.145, 0.01, 0]} scale={0.94} quarantine={quarantine} />
    {withCoolants && (
      <>
        <mesh position={[-0.285, 0.09, 0]} material={MAT.icboxCoolantBlue}>
          <boxGeometry args={[0.028, 0.15, 0.34]} />
        </mesh>
        <mesh position={[0.285, 0.09, 0]} material={MAT.icboxCoolantBlue}>
          <boxGeometry args={[0.028, 0.15, 0.34]} />
        </mesh>
      </>
    )}
  </group>
);

export interface ICBOXContainerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: ICBOXVariant;
  /** Optional explicit override 0 (closed) .. 1 (open ~105 deg). */
  lidOpenProgress?: number;
  /** Smoothly animate lid transitions if lidOpenProgress changes over time. */
  animateLid?: boolean;
  /** Optional status beacon strip for handling/returned/quarantine variants. */
  showTag?: boolean;
}

/**
 * Hero 3D ICBOX Reusable Insulated Transport Container.
 * Matches the real pale mustard-yellow moulded insulated container:
 * - Wide rectangular body with tapered side walls and rounded corner ribs
 * - Thick double-walled hollow interior well when lid is open
 * - Thick fitted rimmed lid with bevelled edges & corner stacking pads
 * - Distinct dark metallic fastening clips on sides + recessed side grip handles
 */
export const ICBOXContainer: React.FC<ICBOXContainerProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  variant = 'closed',
  lidOpenProgress,
  animateLid = true,
  showTag = true,
}) => {
  const lidHingeRef = useRef<THREE.Group>(null);

  const defaultOpen = useMemo(() => {
    if (lidOpenProgress !== undefined) return lidOpenProgress;
    switch (variant) {
      case 'open':
      case 'strawberries':
      case 'empty':
      case 'quarantine':
        return 1;
      case 'returned':
        return 0.45;
      case 'closed':
      case 'secured':
      case 'handling':
      default:
        return 0;
    }
  }, [variant, lidOpenProgress]);

  const currentOpenRef = useRef(defaultOpen);

  useFrame((_, delta) => {
    if (!lidHingeRef.current) return;
    const target = defaultOpen;
    if (animateLid) {
      currentOpenRef.current = THREE.MathUtils.lerp(
        currentOpenRef.current,
        target,
        Math.min(1, delta * 5.5)
      );
    } else {
      currentOpenRef.current = target;
    }
    // Hinge opens backward around the rear rim (-Z hinge) up to -102 degrees
    lidHingeRef.current.rotation.x = -currentOpenRef.current * 1.78;
  });

  const hasStrawberries =
    variant === 'open' ||
    variant === 'strawberries' ||
    variant === 'secured' ||
    variant === 'quarantine' ||
    variant === 'handling';
  const hasCoolants = variant === 'secured' || variant === 'handling';
  const isQuarantine = variant === 'quarantine';
  const isReturned = variant === 'returned';
  const isHandling = variant === 'handling';

  // Dimensions (meters-like diorama scale, ~0.80w x 0.48h x 0.56d)
  const bodyW = 0.78;
  const bodyD = 0.54;
  const bodyH = 0.38;
  const wallT = 0.055;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Slightly tapered lower base plinth + 4 corner feet pads */}
      <mesh position={[0, 0.035, 0]} material={MAT.icboxYellowRim} castShadow receiveShadow>
        <boxGeometry args={[bodyW - 0.08, 0.07, bodyD - 0.06]} />
      </mesh>
      {[
        [-bodyW / 2 + 0.065, -bodyD / 2 + 0.055],
        [bodyW / 2 - 0.065, -bodyD / 2 + 0.055],
        [-bodyW / 2 + 0.065, bodyD / 2 - 0.055],
        [bodyW / 2 - 0.065, bodyD / 2 - 0.055],
      ].map(([fx, fz], idx) => (
        <mesh key={`foot-${idx}`} position={[fx, 0.015, fz]} material={MAT.icboxYellowBody} castShadow>
          <boxGeometry args={[0.11, 0.03, 0.09]} />
        </mesh>
      ))}

      {/* Vertical Moulded Structural Ribs on Front (+Z) and Back (-Z) Walls */}
      {[-0.21, 0, 0.21].map((rx, idx) => (
        <React.Fragment key={`rib-${idx}`}>
          <mesh position={[rx, 0.21, bodyD / 2 + 0.004]} rotation={[0.04, 0, 0]} material={MAT.icboxYellowRim} castShadow>
            <boxGeometry args={[0.038, bodyH - 0.09, 0.018]} />
          </mesh>
          <mesh position={[rx, 0.21, -bodyD / 2 - 0.004]} rotation={[-0.04, 0, 0]} material={MAT.icboxYellowRim} castShadow>
            <boxGeometry args={[0.038, bodyH - 0.09, 0.018]} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Recessed Insulated Bottom Floor inside the hollow well */}
      <mesh position={[0, 0.082, 0]} material={MAT.icboxInnerLiner} receiveShadow>
        <boxGeometry args={[bodyW - wallT * 2, 0.025, bodyD - wallT * 2]} />
      </mesh>

      {/* 4 Thick Moulded Insulated Walls forming a genuine deep interior cavity */}
      {/* Front Wall (+Z) */}
      <mesh position={[0, 0.22, bodyD / 2 - wallT / 2]} rotation={[0.04, 0, 0]} material={MAT.icboxYellowBody} castShadow receiveShadow>
        <boxGeometry args={[bodyW - 0.03, bodyH - 0.06, wallT]} />
      </mesh>
      {/* Back Wall (-Z) */}
      <mesh position={[0, 0.22, -bodyD / 2 + wallT / 2]} rotation={[-0.04, 0, 0]} material={MAT.icboxYellowBody} castShadow receiveShadow>
        <boxGeometry args={[bodyW - 0.03, bodyH - 0.06, wallT]} />
      </mesh>
      {/* Left Wall (-X) */}
      <mesh position={[-bodyW / 2 + wallT / 2, 0.22, 0]} rotation={[0, 0, 0.04]} material={MAT.icboxYellowBody} castShadow receiveShadow>
        <boxGeometry args={[wallT, bodyH - 0.06, bodyD - 0.03]} />
      </mesh>
      {/* Right Wall (+X) */}
      <mesh position={[bodyW / 2 - wallT / 2, 0.22, 0]} rotation={[0, 0, -0.04]} material={MAT.icboxYellowBody} castShadow receiveShadow>
        <boxGeometry args={[wallT, bodyH - 0.06, bodyD - 0.03]} />
      </mesh>

      {/* Inner insulated cavity wall trim */}
      <mesh position={[0, 0.21, -bodyD / 2 + wallT + 0.004]} material={MAT.icboxInnerWell}>
        <boxGeometry args={[bodyW - wallT * 2 - 0.01, bodyH - 0.1, 0.008]} />
      </mesh>
      <mesh position={[0, 0.21, bodyD / 2 - wallT - 0.004]} material={MAT.icboxInnerWell}>
        <boxGeometry args={[bodyW - wallT * 2 - 0.01, bodyH - 0.1, 0.008]} />
      </mesh>

      {/* 4 Rounded / Softened Vertical Structural Corner Ribs */}
      {[
        [-bodyW / 2 + 0.025, -bodyD / 2 + 0.025],
        [bodyW / 2 - 0.025, -bodyD / 2 + 0.025],
        [-bodyW / 2 + 0.025, bodyD / 2 - 0.025],
        [bodyW / 2 - 0.025, bodyD / 2 - 0.025],
      ].map(([cx, cz], idx) => (
        <mesh key={idx} position={[cx, 0.22, cz]} material={MAT.icboxYellowRim} castShadow>
          <cylinderGeometry args={[0.044, 0.036, bodyH - 0.05, 8]} />
        </mesh>
      ))}

      {/* Upper Moulded Perimeter Collar Rim */}
      {/* Front & Back rim */}
      <mesh position={[0, bodyH + 0.005, bodyD / 2 - 0.018]} material={MAT.icboxYellowLight} castShadow>
        <boxGeometry args={[bodyW + 0.03, 0.045, 0.065]} />
      </mesh>
      <mesh position={[0, bodyH + 0.005, -bodyD / 2 + 0.018]} material={MAT.icboxYellowLight} castShadow>
        <boxGeometry args={[bodyW + 0.03, 0.045, 0.065]} />
      </mesh>
      {/* Left & Right rim */}
      <mesh position={[-bodyW / 2 + 0.018, bodyH + 0.005, 0]} material={MAT.icboxYellowLight} castShadow>
        <boxGeometry args={[0.065, 0.045, bodyD + 0.03]} />
      </mesh>
      <mesh position={[bodyW / 2 - 0.018, bodyH + 0.005, 0]} material={MAT.icboxYellowLight} castShadow>
        <boxGeometry args={[0.065, 0.045, bodyD + 0.03]} />
      </mesh>

      {/* Recessed Side Grip Handles on Left & Right Ends */}
      {[-1, 1].map((dir) => (
        <group key={`grip-${dir}`} position={[dir * (bodyW / 2 + 0.005), 0.25, 0]}>
          {/* Handle pocket shadow */}
          <mesh material={MAT.icboxGripRecess}>
            <boxGeometry args={[0.022, 0.075, 0.2]} />
          </mesh>
          {/* Upper moulded grip bar */}
          <mesh position={[dir * 0.008, 0.042, 0]} material={MAT.icboxYellowLight} castShadow>
            <boxGeometry args={[0.028, 0.025, 0.22]} />
          </mesh>
        </group>
      ))}

      {/* Visible Dark Metallic Fastening Clips on Front & Side Latch Points */}
      {[-0.21, 0.21].map((lx, idx) => (
        <group key={`front-clip-${idx}`} position={[lx, bodyH - 0.02, bodyD / 2 + 0.018]}>
          {/* Lower base bracket */}
          <mesh position={[0, -0.025, 0]} material={MAT.icboxClipDark} castShadow>
            <boxGeometry args={[0.068, 0.055, 0.026]} />
          </mesh>
          {/* Toggle buckle clasp */}
          <mesh
            position={[0, 0.028, defaultOpen > 0.25 ? 0.016 : 0.004]}
            rotation={[defaultOpen > 0.25 ? 0.45 : 0, 0, 0]}
            material={MAT.icboxClipDark}
            castShadow
          >
            <boxGeometry args={[0.052, 0.068, 0.022]} />
          </mesh>
        </group>
      ))}

      {/* Side Metallic Latch Plates (Matching reference photo profile) */}
      {[-1, 1].map((dir) => (
        <group key={`side-clip-${dir}`} position={[dir * (bodyW / 2 + 0.016), bodyH - 0.02, 0]}>
          <mesh position={[0, -0.02, 0]} material={MAT.icboxClipDark} castShadow>
            <boxGeometry args={[0.024, 0.05, 0.075]} />
          </mesh>
          <mesh
            position={[dir * (defaultOpen > 0.25 ? 0.012 : 0.004), 0.026, 0]}
            rotation={[0, 0, defaultOpen > 0.25 ? -dir * 0.42 : 0]}
            material={MAT.icboxClipDark}
          >
            <boxGeometry args={[0.02, 0.058, 0.056]} />
          </mesh>
        </group>
      ))}

      {/* Interior Payload: Strawberries + Punnets + Coolants */}
      {hasStrawberries && (
        <StrawberryTrayInsert
          position={[0, 0.095, 0]}
          withCoolants={hasCoolants}
          quarantine={isQuarantine}
        />
      )}

      {/* Optional Status Strip for Returned / Quarantine / Handling Variants */}
      {showTag && (isQuarantine || isReturned || isHandling) && (
        <mesh
          position={[0, 0.19, bodyD / 2 + 0.008]}
          material={isQuarantine ? MAT.red : isReturned ? MAT.amber : MAT.cyan}
        >
          <boxGeometry args={[0.34, 0.045, 0.012]} />
        </mesh>
      )}

      {/* Thick Fitted Insulated Lid Hinged at Rear (-Z = -bodyD/2) */}
      <group ref={lidHingeRef} position={[0, bodyH + 0.026, -bodyD / 2]}>
        {/* Offset forward so lid centers cleanly over the container when rotation.x = 0 */}
        <group position={[0, 0.026, bodyD / 2]}>
          {/* Main Lid Rim */}
          <mesh material={MAT.icboxYellowBody} castShadow receiveShadow>
            <boxGeometry args={[bodyW + 0.05, 0.058, bodyD + 0.05]} />
          </mesh>
          {/* Upper Stepped Lid Crown */}
          <mesh position={[0, 0.036, 0]} material={MAT.icboxYellowLight} castShadow receiveShadow>
            <boxGeometry args={[bodyW - 0.03, 0.024, bodyD - 0.03]} />
          </mesh>
          {/* Corner Stacking Pads on Top of Lid */}
          {[
            [-bodyW * 0.34, -bodyD * 0.31],
            [bodyW * 0.34, -bodyD * 0.31],
            [-bodyW * 0.34, bodyD * 0.31],
            [bodyW * 0.34, bodyD * 0.31],
          ].map(([px, pz], idx) => (
            <mesh key={idx} position={[px, 0.051, pz]} material={MAT.icboxYellowRim}>
              <boxGeometry args={[0.11, 0.01, 0.085]} />
            </mesh>
          ))}
          {/* Inner Seal Gasket Under Lid */}
          <mesh position={[0, -0.03, 0]} material={MAT.icboxInnerWell}>
            <boxGeometry args={[bodyW - 0.1, 0.014, bodyD - 0.1]} />
          </mesh>
          {/* Lid-side clip catch lugs */}
          {[-0.21, 0.21].map((lx, idx) => (
            <mesh key={idx} position={[lx, -0.01, bodyD / 2 + 0.026]} material={MAT.icboxClipDark}>
              <boxGeometry args={[0.058, 0.028, 0.018]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
