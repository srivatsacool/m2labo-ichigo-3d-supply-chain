import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { StationId } from '../data/types';
import { getStationById, OPERATIONAL_STATIONS } from '../stations/stationsData';
import { WORLD_BUILDING_COLLIDERS } from '../models/LowPolyBuildings';
import { getWorldTerrainHeight } from '../models/LowPolyEnvironment';
import { MAT } from '../models/SharedMaterials';
import { getShipmentWorldPos } from './ShipmentJourneyAnimator';

export interface ExplorerVirtualInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

interface ThirdPersonCameraControllerProps {
  selectedStationId: StationId | null;
  activeJourneyStationId: StationId;
  followShipment: boolean;
  journeyProgressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  virtualInputRef: React.MutableRefObject<ExplorerVirtualInput>;
  onReachNearestStation?: (stationId: StationId) => void;
}

function resolveCollisionAndBounds(x: number, z: number): [number, number] {
  let nx = Math.max(-100, Math.min(82, x));
  let nz = Math.max(-38, Math.min(36, z));
  const radius = 0.85;

  for (const box of WORLD_BUILDING_COLLIDERS) {
    const minX = box.minX - radius;
    const maxX = box.maxX + radius;
    const minZ = box.minZ - radius;
    const maxZ = box.maxZ + radius;

    if (nx > minX && nx < maxX && nz > minZ && nz < maxZ) {
      const dxLeft = Math.abs(nx - minX);
      const dxRight = Math.abs(maxX - nx);
      const dzTop = Math.abs(nz - minZ);
      const dzBottom = Math.abs(maxZ - nz);
      const m = Math.min(dxLeft, dxRight, dzTop, dzBottom);
      if (m === dxLeft) nx = minX;
      else if (m === dxRight) nx = maxX;
      else if (m === dzTop) nz = minZ;
      else nz = maxZ;
    }
  }
  return [nx, nz];
}

function isPointInsideCollider(x: number, z: number, pad = 0.45): boolean {
  for (const box of WORLD_BUILDING_COLLIDERS) {
    if (x > box.minX - pad && x < box.maxX + pad && z > box.minZ - pad && z < box.maxZ + pad) {
      return true;
    }
  }
  return false;
}

const ExplorerAvatar3D: React.FC<{
  avatarRef: React.RefObject<THREE.Group>;
  ringRef: React.RefObject<THREE.Mesh>;
  leftLegRef: React.RefObject<THREE.Mesh>;
  rightLegRef: React.RefObject<THREE.Mesh>;
  leftArmRef: React.RefObject<THREE.Mesh>;
  rightArmRef: React.RefObject<THREE.Mesh>;
}> = ({ avatarRef, ringRef, leftLegRef, rightLegRef, leftArmRef, rightArmRef }) => (
  <group ref={avatarRef} position={[-47.5, 0, -8.5]}>
    {/* Ground Direction Ring */}
    <mesh ref={ringRef} position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} material={MAT.cyan}>
      <ringGeometry args={[0.68, 0.84, 24]} />
    </mesh>
    <mesh position={[0, 0.09, 0.94]} rotation={[Math.PI / 2, 0, 0]} material={MAT.strawberrySolidRed}>
      <coneGeometry args={[0.16, 0.28, 3]} />
    </mesh>

    {/* Articulated Legs */}
    <mesh ref={leftLegRef} position={[-0.12, 0.34, 0]} material={MAT.deepNavy} castShadow>
      <boxGeometry args={[0.16, 0.68, 0.18]} />
    </mesh>
    <mesh ref={rightLegRef} position={[0.12, 0.34, 0]} material={MAT.deepNavy} castShadow>
      <boxGeometry args={[0.16, 0.68, 0.18]} />
    </mesh>
    {/* Operations Jacket & High-Vis Vest */}
    <mesh position={[0, 0.98, 0]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.48, 0.62, 0.3]} />
    </mesh>
    <mesh position={[0, 1.0, 0]} material={MAT.cyan}>
      <boxGeometry args={[0.5, 0.16, 0.32]} />
    </mesh>
    {/* Articulated Arms */}
    <mesh ref={leftArmRef} position={[-0.31, 0.94, 0.04]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.14, 0.48, 0.14]} />
    </mesh>
    <mesh ref={rightArmRef} position={[0.31, 0.94, 0.04]} material={MAT.secondaryNavy} castShadow>
      <boxGeometry args={[0.14, 0.48, 0.14]} />
    </mesh>
    {/* Head & Safety Helmet */}
    <mesh position={[0, 1.46, 0]} material={MAT.skinTone} castShadow>
      <dodecahedronGeometry args={[0.18, 0]} />
    </mesh>
    <mesh position={[0, 1.59, 0.02]} material={MAT.offWhite} castShadow>
      <boxGeometry args={[0.32, 0.11, 0.36]} />
    </mesh>
    <mesh position={[0, 1.65, 0.02]} material={MAT.cyan}>
      <boxGeometry args={[0.12, 0.04, 0.34]} />
    </mesh>
  </group>
);

export const ThirdPersonCameraController: React.FC<ThirdPersonCameraControllerProps> = ({
  selectedStationId,
  activeJourneyStationId,
  followShipment,
  journeyProgressRef,
  reducedMotion,
  virtualInputRef,
  onReachNearestStation,
}) => {
  const { camera, gl } = useThree();
  const avatarRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  const initialStation = getStationById(selectedStationId ?? activeJourneyStationId);
  const initialWaypoint = initialStation.explorerWaypoint3D ?? [
    initialStation.position3D[0],
    0,
    initialStation.position3D[2] + 7.5,
  ];

  const explorerPos = useRef(
    new THREE.Vector3(initialWaypoint[0], getWorldTerrainHeight(initialWaypoint[0], initialWaypoint[2]), initialWaypoint[2])
  );
  const explorerYaw = useRef(Math.PI);
  const autopilotTarget = useRef<THREE.Vector3 | null>(null);
  const autopilotLookAt = useRef<THREE.Vector3 | null>(
    new THREE.Vector3(...(initialStation.explorerLookAt3D ?? initialStation.position3D))
  );

  const orbitYaw = useRef(0);
  const orbitPitch = useRef(0.38);
  const orbitDistance = useRef(10.8);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const keysPressed = useRef<Record<string, boolean>>({});

  const _forward = useMemo(() => new THREE.Vector3(), []);
  const _right = useMemo(() => new THREE.Vector3(), []);
  const _moveDir = useMemo(() => new THREE.Vector3(), []);
  const _camTarget = useMemo(() => new THREE.Vector3(), []);
  const _desiredCamPos = useMemo(() => new THREE.Vector3(), []);
  const _desiredLook = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (followShipment || !selectedStationId) return;
    const st = getStationById(selectedStationId);
    const wp = st.explorerWaypoint3D ?? [st.position3D[0], 0, st.position3D[2] + 7.5];
    const look = st.explorerLookAt3D ?? st.position3D;
    autopilotTarget.current = new THREE.Vector3(wp[0], getWorldTerrainHeight(wp[0], wp[2]), wp[2]);
    autopilotLookAt.current = new THREE.Vector3(...look);
    orbitYaw.current = Math.atan2(look[0] - wp[0], look[2] - wp[2]);
  }, [selectedStationId, followShipment]);

  useEffect(() => {
    const dom = gl.domElement;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      keysPressed.current[e.code] = true;

      if (e.code === 'Space') {
        e.preventDefault();
        let bestId: StationId = selectedStationId ?? activeJourneyStationId;
        let minDist = Infinity;
        for (const st of OPERATIONAL_STATIONS) {
          const d = Math.hypot(
            st.position3D[0] - explorerPos.current.x,
            st.position3D[2] - explorerPos.current.z
          );
          if (d < minDist) {
            minDist = d;
            bestId = st.id;
          }
        }
        const st = getStationById(bestId);
        const wp = st.explorerWaypoint3D ?? [st.position3D[0], 0, st.position3D[2] + 7.5];
        const look = st.explorerLookAt3D ?? st.position3D;
        autopilotTarget.current = new THREE.Vector3(wp[0], getWorldTerrainHeight(wp[0], wp[2]), wp[2]);
        autopilotLookAt.current = new THREE.Vector3(...look);
        orbitYaw.current = Math.atan2(look[0] - wp[0], look[2] - wp[2]);
        onReachNearestStation?.(bestId);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.button !== 2) return;
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      orbitYaw.current -= dx * 0.0062;
      orbitPitch.current = Math.max(0.16, Math.min(1.08, orbitPitch.current + dy * 0.005));
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      orbitDistance.current = Math.max(5.2, Math.min(22, orbitDistance.current + e.deltaY * 0.01));
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      keysPressed.current = {};
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [gl, selectedStationId, activeJourneyStationId, onReachNearestStation]);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(0.08, delta);
    const k = keysPressed.current;
    const v = virtualInputRef.current;

    const moveForward = (k['KeyW'] || k['ArrowUp'] || v.forward ? 1 : 0) - (k['KeyS'] || k['ArrowDown'] || v.backward ? 1 : 0);
    const moveRight = (k['KeyD'] || k['ArrowRight'] || v.right ? 1 : 0) - (k['KeyA'] || k['ArrowLeft'] || v.left ? 1 : 0);
    const isManualMoving = moveForward !== 0 || moveRight !== 0;

    if (isManualMoving) {
      autopilotTarget.current = null;
      _forward.set(Math.sin(orbitYaw.current), 0, Math.cos(orbitYaw.current)).normalize();
      _right.set(-_forward.z, 0, _forward.x).normalize();

      _moveDir.set(0, 0, 0);
      _moveDir.addScaledVector(_forward, moveForward);
      _moveDir.addScaledVector(_right, moveRight);

      if (_moveDir.lengthSq() > 0.001) {
        _moveDir.normalize();
        const speed = k['ShiftLeft'] || k['ShiftRight'] ? 21.0 : 14.5;
        const nextX = explorerPos.current.x + _moveDir.x * speed * dt;
        const nextZ = explorerPos.current.z + _moveDir.z * speed * dt;
        const [clampedX, clampedZ] = resolveCollisionAndBounds(nextX, nextZ);
        explorerPos.current.set(clampedX, getWorldTerrainHeight(clampedX, clampedZ), clampedZ);
        explorerYaw.current = Math.atan2(_moveDir.x, _moveDir.z);
      }
    } else if (followShipment) {
      const ship = getShipmentWorldPos(journeyProgressRef.current);
      const [clampedX, clampedZ] = resolveCollisionAndBounds(ship[0] - 2.4, ship[2] + 5.4);
      _camTarget.set(clampedX, getWorldTerrainHeight(clampedX, clampedZ), clampedZ);
      explorerPos.current.lerp(_camTarget, reducedMotion ? 1 : Math.min(1, dt * 4.5));
      explorerYaw.current = Math.atan2(ship[0] - explorerPos.current.x, ship[2] - explorerPos.current.z);
      orbitYaw.current = explorerYaw.current;
    } else if (autopilotTarget.current) {
      const dist = explorerPos.current.distanceTo(autopilotTarget.current);
      if (dist < 0.2 || reducedMotion) {
        explorerPos.current.copy(autopilotTarget.current);
        if (autopilotLookAt.current) {
          explorerYaw.current = Math.atan2(
            autopilotLookAt.current.x - explorerPos.current.x,
            autopilotLookAt.current.z - explorerPos.current.z
          );
        }
        autopilotTarget.current = null;
      } else {
        _moveDir.subVectors(autopilotTarget.current, explorerPos.current).normalize();
        explorerYaw.current = Math.atan2(_moveDir.x, _moveDir.z);
        explorerPos.current.lerp(autopilotTarget.current, Math.min(1, dt * 4.5));
        explorerPos.current.y = getWorldTerrainHeight(explorerPos.current.x, explorerPos.current.z);
      }
    }

    const moving = isManualMoving || autopilotTarget.current !== null || followShipment;
    const t = clock.getElapsedTime();

    // Update Avatar Mesh Transform & Articulated Stride Animation
    if (avatarRef.current) {
      avatarRef.current.position.x = explorerPos.current.x;
      avatarRef.current.position.z = explorerPos.current.z;
      avatarRef.current.position.y =
        explorerPos.current.y + (moving && !reducedMotion ? Math.abs(Math.sin(t * 10)) * 0.08 : 0);
      avatarRef.current.rotation.y = explorerYaw.current;
    }
    const swing = moving && !reducedMotion ? Math.sin(t * 10) * 0.45 : 0;
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = swing;
      rightLegRef.current.rotation.x = -swing;
    }
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -swing * 0.85;
      rightArmRef.current.rotation.x = swing * 0.85;
    }

    if (ringRef.current && !reducedMotion) {
      const pulse = 1 + Math.sin(t * 3.5) * 0.06;
      ringRef.current.scale.set(pulse, pulse, 1);
    }

    // Camera Wall-Collision Aware Third-Person Orbit Spring
    let effDist = orbitDistance.current;
    const sinY = Math.sin(orbitYaw.current);
    const cosY = Math.cos(orbitYaw.current);
    const cosP = Math.cos(orbitPitch.current);

    for (let frac = 1.0; frac >= 0.35; frac -= 0.15) {
      const testDist = orbitDistance.current * frac;
      const testX = explorerPos.current.x - sinY * cosP * testDist;
      const testZ = explorerPos.current.z - cosY * cosP * testDist;
      if (!isPointInsideCollider(testX, testZ, 0.5)) {
        effDist = testDist;
        break;
      }
    }

    const horizDist = cosP * effDist;
    const rawCamX = explorerPos.current.x - sinY * horizDist;
    const rawCamZ = explorerPos.current.z - cosY * horizDist;
    const groundAtCam = getWorldTerrainHeight(rawCamX, rawCamZ);
    const vertDist = Math.max(groundAtCam + 1.8, explorerPos.current.y + Math.sin(orbitPitch.current) * effDist + 1.9);

    _desiredCamPos.set(rawCamX, vertDist, rawCamZ);
    _desiredLook.set(
      explorerPos.current.x + sinY * 3.0,
      explorerPos.current.y + 1.65,
      explorerPos.current.z + cosY * 3.0
    );

    const camAlpha = reducedMotion ? 1 : Math.min(1, dt * 6.8);
    camera.position.lerp(_desiredCamPos, camAlpha);
    camera.lookAt(_desiredLook);
  });

  return (
    <ExplorerAvatar3D
      avatarRef={avatarRef}
      ringRef={ringRef}
      leftLegRef={leftLegRef}
      rightLegRef={rightLegRef}
      leftArmRef={leftArmRef}
      rightArmRef={rightArmRef}
    />
  );
};
