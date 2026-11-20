import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { StationId } from '../data/types';
import { getStationById, OVERVIEW_CAMERA } from '../stations/stationsData';
import { getShipmentWorldPos } from './ShipmentJourneyAnimator';

interface CameraControllerProps {
  selectedStationId: StationId | null;
  cameraResetNonce: number;
  followShipment: boolean;
  journeyProgress: number;
  reducedMotion: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedStationId,
  cameraResetNonce,
  followShipment,
  journeyProgress,
  reducedMotion,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();

  const desiredPos = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.position));
  const desiredTarget = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.target));
  const isTransitioning = useRef(false);

  // Trigger camera transition when station selection or reset nonce changes
  useEffect(() => {
    if (followShipment) return;
    if (selectedStationId) {
      const station = getStationById(selectedStationId);
      desiredPos.current.set(...station.cameraPos3D);
      desiredTarget.current.set(...station.cameraLookAt3D);
      isTransitioning.current = true;
    } else {
      desiredPos.current.set(...OVERVIEW_CAMERA.position);
      desiredTarget.current.set(...OVERVIEW_CAMERA.target);
      isTransitioning.current = true;
    }
  }, [selectedStationId, cameraResetNonce, followShipment]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (followShipment) {
      const shipPos = getShipmentWorldPos(journeyProgress);
      desiredTarget.current.set(shipPos[0], shipPos[1] + 0.8, shipPos[2]);
      desiredPos.current.set(shipPos[0] - 2.5, 8.8, shipPos[2] + 10.5);
      const speed = reducedMotion ? 1 : Math.min(1, delta * 3.5);
      camera.position.lerp(desiredPos.current, speed);
      controlsRef.current.target.lerp(desiredTarget.current, speed);
      controlsRef.current.update();
      return;
    }

    if (isTransitioning.current) {
      if (reducedMotion) {
        camera.position.copy(desiredPos.current);
        controlsRef.current.target.copy(desiredTarget.current);
        controlsRef.current.update();
        isTransitioning.current = false;
      } else {
        const alpha = Math.min(1, delta * 4.5);
        camera.position.lerp(desiredPos.current, alpha);
        controlsRef.current.target.lerp(desiredTarget.current, alpha);
        controlsRef.current.update();

        if (
          camera.position.distanceTo(desiredPos.current) < 0.08 &&
          controlsRef.current.target.distanceTo(desiredTarget.current) < 0.08
        ) {
          isTransitioning.current = false;
        }
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping={!reducedMotion}
      dampingFactor={0.07}
      enablePan
      enableZoom
      minDistance={6}
      maxDistance={52}
      maxPolarAngle={Math.PI / 2 - 0.06}
      minPolarAngle={0.2}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
