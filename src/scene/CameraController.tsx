import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CameraMode, StationId } from '../data/types';
import { getStationById, OVERVIEW_CAMERA } from '../stations/stationsData';
import { getSubStepByProgress } from '../process/journeyPathData';
import { getShipmentWorldPos } from './ShipmentJourneyAnimator';
import { FirstPersonController } from './FirstPersonController';
import { ExplorerVirtualInput, ThirdPersonCameraController } from './ThirdPersonCameraController';

interface CameraControllerProps {
  cameraMode: CameraMode;
  selectedStationId: StationId | null;
  activeJourneyStationId: StationId;
  cameraResetNonce: number;
  followShipment: boolean;
  journeyProgressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  virtualInputRef: React.MutableRefObject<ExplorerVirtualInput>;
  pointerLockRequestNonce: number;
  onPointerLockChange?: (locked: boolean) => void;
  onSelectStation: (stationId: StationId) => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  cameraMode,
  selectedStationId,
  activeJourneyStationId,
  cameraResetNonce,
  followShipment,
  journeyProgressRef,
  reducedMotion,
  virtualInputRef,
  pointerLockRequestNonce,
  onPointerLockChange,
  onSelectStation,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();

  const desiredPos = useMemo(() => new THREE.Vector3(...OVERVIEW_CAMERA.position), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(...OVERVIEW_CAMERA.target), []);
  const isTransitioning = useRef(false);

  // Trigger smooth camera interpolation in OVERVIEW mode
  useEffect(() => {
    if (cameraMode !== 'OVERVIEW' || followShipment) return;

    if (selectedStationId) {
      const station = getStationById(selectedStationId);
      desiredPos.set(...station.cameraPos3D);
      desiredTarget.set(...station.cameraLookAt3D);
      isTransitioning.current = true;
    } else {
      desiredPos.set(...OVERVIEW_CAMERA.position);
      desiredTarget.set(...OVERVIEW_CAMERA.target);
      isTransitioning.current = true;
    }
  }, [cameraMode, selectedStationId, cameraResetNonce, followShipment, desiredPos, desiredTarget]);

  useFrame((_, delta) => {
    if (cameraMode !== 'OVERVIEW' || !controlsRef.current) return;

    if (followShipment) {
      const liveP = journeyProgressRef.current;
      const activeStep = getSubStepByProgress(liveP);
      if (activeStep.cinematicCloseUp) {
        desiredPos.set(...activeStep.focusCameraPos);
        desiredTarget.set(...activeStep.focusTarget);
      } else {
        const shipPos = getShipmentWorldPos(liveP);
        desiredTarget.set(shipPos[0], shipPos[1] + 0.9, shipPos[2]);
        desiredPos.set(shipPos[0] - 4.2, 11.2, shipPos[2] + 15.2);
      }
      const speed = reducedMotion ? 1 : Math.min(1, delta * 2.4);
      camera.position.lerp(desiredPos, speed);
      controlsRef.current.target.lerp(desiredTarget, speed);
      controlsRef.current.update();
      return;
    }

    if (isTransitioning.current) {
      if (reducedMotion) {
        camera.position.copy(desiredPos);
        controlsRef.current.target.copy(desiredTarget);
        controlsRef.current.update();
        isTransitioning.current = false;
      } else {
        const alpha = Math.min(1, delta * 4.5);
        camera.position.lerp(desiredPos, alpha);
        controlsRef.current.target.lerp(desiredTarget, alpha);
        controlsRef.current.update();

        if (
          camera.position.distanceTo(desiredPos) < 0.08 &&
          controlsRef.current.target.distanceTo(desiredTarget) < 0.08
        ) {
          isTransitioning.current = false;
        }
      }
    }
  });

  if (cameraMode === 'FIRST_PERSON') {
    return (
      <FirstPersonController
        selectedStationId={selectedStationId}
        activeJourneyStationId={activeJourneyStationId}
        reducedMotion={reducedMotion}
        virtualInputRef={virtualInputRef}
        pointerLockRequestNonce={pointerLockRequestNonce}
        onPointerLockChange={onPointerLockChange}
      />
    );
  }

  if (cameraMode === 'THIRD_PERSON') {
    return (
      <ThirdPersonCameraController
        selectedStationId={selectedStationId}
        activeJourneyStationId={activeJourneyStationId}
        followShipment={followShipment}
        journeyProgressRef={journeyProgressRef}
        reducedMotion={reducedMotion}
        virtualInputRef={virtualInputRef}
        onReachNearestStation={onSelectStation}
      />
    );
  }

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping={!reducedMotion}
      dampingFactor={0.07}
      enablePan
      enableZoom
      minDistance={3.0}
      maxDistance={155}
      maxPolarAngle={Math.PI / 2 - 0.06}
      minPolarAngle={0.18}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
