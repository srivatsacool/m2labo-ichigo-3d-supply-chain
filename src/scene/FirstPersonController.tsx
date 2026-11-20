import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { StationId } from '../data/types';
import { getStationById } from '../stations/stationsData';
import { WORLD_BUILDING_COLLIDERS } from '../models/LowPolyBuildings';
import { getWorldTerrainHeight } from '../models/LowPolyEnvironment';
import { ExplorerVirtualInput } from './ThirdPersonCameraController';

interface FirstPersonControllerProps {
  selectedStationId: StationId | null;
  activeJourneyStationId: StationId;
  reducedMotion: boolean;
  virtualInputRef: React.MutableRefObject<ExplorerVirtualInput>;
  pointerLockRequestNonce: number;
  onPointerLockChange?: (locked: boolean) => void;
}

const EYE_HEIGHT = 1.68;

function resolveFpCollision(x: number, z: number): [number, number] {
  // Generous explorable world bounds across Farm, Highway, MIDC & Urban Delivery District
  let nx = Math.max(-102, Math.min(82, x));
  let nz = Math.max(-38, Math.min(36, z));
  const radius = 0.72;

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

export const FirstPersonController: React.FC<FirstPersonControllerProps> = ({
  selectedStationId,
  activeJourneyStationId,
  reducedMotion,
  virtualInputRef,
  pointerLockRequestNonce,
  onPointerLockChange,
}) => {
  const { camera, gl } = useThree();

  const initialStation = getStationById(selectedStationId ?? activeJourneyStationId);
  const spawn = initialStation.firstPersonSpawn3D ?? [
    initialStation.position3D[0],
    EYE_HEIGHT,
    initialStation.position3D[2] + 7.5,
  ];
  const initialLook = initialStation.firstPersonLookAt3D ?? initialStation.position3D;

  const posRef = useRef(new THREE.Vector3(spawn[0], getWorldTerrainHeight(spawn[0], spawn[2]) + EYE_HEIGHT, spawn[2]));
  const yawRef = useRef(Math.atan2(initialLook[0] - spawn[0], initialLook[2] - spawn[2]));
  const pitchRef = useRef(-0.08);
  const targetPosRef = useRef<THREE.Vector3 | null>(posRef.current.clone());
  const keysRef = useRef<Record<string, boolean>>({});
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const isPointerLockedRef = useRef(false);

  const _forward = useMemo(() => new THREE.Vector3(), []);
  const _right = useMemo(() => new THREE.Vector3(), []);
  const _move = useMemo(() => new THREE.Vector3(), []);
  const _lookTarget = useMemo(() => new THREE.Vector3(), []);

  // Smoothly reposition when user selects a station from timeline or map while in First Person
  useEffect(() => {
    const st = getStationById(selectedStationId ?? activeJourneyStationId);
    const sp = st.firstPersonSpawn3D ?? [st.position3D[0], EYE_HEIGHT, st.position3D[2] + 7.5];
    const lk = st.firstPersonLookAt3D ?? st.position3D;
    targetPosRef.current = new THREE.Vector3(sp[0], getWorldTerrainHeight(sp[0], sp[2]) + EYE_HEIGHT, sp[2]);
    yawRef.current = Math.atan2(lk[0] - sp[0], lk[2] - sp[2]);
    pitchRef.current = -0.06;
  }, [selectedStationId, activeJourneyStationId]);

  // Optional Pointer Lock request from HUD button
  useEffect(() => {
    if (pointerLockRequestNonce === 0) return;
    const dom = gl.domElement;
    try {
      if (document.pointerLockElement === dom) {
        document.exitPointerLock?.();
      } else {
        dom.requestPointerLock?.();
      }
    } catch {
      // Gracefully fall back to click-drag look in restricted contexts
    }
  }, [pointerLockRequestNonce, gl]);

  useEffect(() => {
    const dom = gl.domElement;

    const onPointerLockChanged = () => {
      const locked = document.pointerLockElement === dom;
      isPointerLockedRef.current = locked;
      onPointerLockChange?.(locked);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      keysRef.current[e.code] = true;
      if (e.code === 'Escape' && document.pointerLockElement === dom) {
        document.exitPointerLock?.();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.button !== 2) return;
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isPointerLockedRef.current) {
        yawRef.current -= e.movementX * 0.0028;
        pitchRef.current = Math.max(-0.82, Math.min(0.75, pitchRef.current - e.movementY * 0.0024));
        return;
      }
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      yawRef.current -= dx * 0.0052;
      pitchRef.current = Math.max(-0.82, Math.min(0.75, pitchRef.current - dy * 0.0044));
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    document.addEventListener('pointerlockchange', onPointerLockChanged);
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      keysRef.current = {};
      if (document.pointerLockElement === dom) {
        document.exitPointerLock?.();
      }
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('pointerlockchange', onPointerLockChanged);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [gl, onPointerLockChange]);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(0.08, delta);
    const k = keysRef.current;
    const v = virtualInputRef.current;

    const moveF = (k['KeyW'] || k['ArrowUp'] || v.forward ? 1 : 0) - (k['KeyS'] || k['ArrowDown'] || v.backward ? 1 : 0);
    const moveR = (k['KeyD'] || k['ArrowRight'] || v.right ? 1 : 0) - (k['KeyA'] || k['ArrowLeft'] || v.left ? 1 : 0);
    const isMoving = moveF !== 0 || moveR !== 0;

    if (isMoving) {
      targetPosRef.current = null;
      _forward.set(Math.sin(yawRef.current), 0, Math.cos(yawRef.current)).normalize();
      _right.set(-_forward.z, 0, _forward.x).normalize();

      _move.set(0, 0, 0);
      _move.addScaledVector(_forward, moveF);
      _move.addScaledVector(_right, moveR);

      if (_move.lengthSq() > 0.001) {
        _move.normalize();
        const sprint = k['ShiftLeft'] || k['ShiftRight'] ? 16.5 : 9.2;
        const nextX = posRef.current.x + _move.x * sprint * dt;
        const nextZ = posRef.current.z + _move.z * sprint * dt;
        const [cx, cz] = resolveFpCollision(nextX, nextZ);
        const groundY = getWorldTerrainHeight(cx, cz);
        const headBob = reducedMotion ? 0 : Math.sin(clock.getElapsedTime() * 9.5) * 0.035;
        posRef.current.set(cx, groundY + EYE_HEIGHT + headBob, cz);
      }
    } else if (targetPosRef.current) {
      const dist = posRef.current.distanceTo(targetPosRef.current);
      if (dist < 0.08 || reducedMotion) {
        posRef.current.copy(targetPosRef.current);
        targetPosRef.current = null;
      } else {
        posRef.current.lerp(targetPosRef.current, Math.min(1, dt * 5.2));
      }
    }

    const alpha = reducedMotion ? 1 : Math.min(1, dt * 11);
    camera.position.lerp(posRef.current, alpha);

    const cosP = Math.cos(pitchRef.current);
    _lookTarget.set(
      camera.position.x + Math.sin(yawRef.current) * cosP * 8,
      camera.position.y + Math.sin(pitchRef.current) * 8,
      camera.position.z + Math.cos(yawRef.current) * cosP * 8
    );
    camera.lookAt(_lookTarget);
  });

  return null;
};
