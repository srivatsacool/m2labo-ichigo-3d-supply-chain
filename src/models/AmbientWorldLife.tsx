import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAT } from './SharedMaterials';

/**
 * Purposeful subtle ambient activity in the 3D world:
 * - Cold-chain chilled air particles hovering near MIDC cold storage & receiving
 * - Status beacons over custody gate & quarantine firewall
 * Respects reducedMotion cleanly.
 */
export const AmbientWorldLife: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const mistRef = useRef<THREE.Points>(null);
  const beaconARef = useRef<THREE.Mesh>(null);
  const beaconBRef = useRef<THREE.Mesh>(null);

  const particleGeo = useMemo(() => {
    const count = 48;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Concentrate subtle chilled particles around ST-03 (-4,-16) and ST-04 (18,-16)
      const zoneX = i % 2 === 0 ? -4.0 : 18.0;
      const spreadX = ((i * 37) % 14) - 7;
      const spreadY = 0.8 + ((i * 19) % 28) * 0.1;
      const spreadZ = -16.0 + (((i * 29) % 12) - 6);
      positions[i * 3] = zoneX + spreadX;
      positions[i * 3 + 1] = spreadY;
      positions[i * 3 + 2] = spreadZ;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      particleGeo.dispose();
    };
  }, [particleGeo]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    if (mistRef.current) {
      mistRef.current.position.y = Math.sin(t * 0.7) * 0.25;
    }
    if (beaconARef.current) {
      const s = 1 + Math.sin(t * 3.2) * 0.15;
      beaconARef.current.scale.set(s, s, s);
    }
    if (beaconBRef.current) {
      const s = 1 + Math.cos(t * 3.8) * 0.18;
      beaconBRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Subtle Cold-Storage Air Particles */}
      <points ref={mistRef} geometry={particleGeo}>
        <pointsMaterial color="#A9E8F5" size={0.22} transparent opacity={0.42} sizeAttenuation />
      </points>

      {/* ST-01 Custody Gate Green Beacon */}
      <mesh ref={beaconARef} position={[-59.4, 5.85, -14.0]} material={MAT.green}>
        <octahedronGeometry args={[0.25, 0]} />
      </mesh>

      {/* ST-07 Quarantine Firewall Red Warning Beacon */}
      <mesh ref={beaconBRef} position={[-4.0, 2.75, 8.8]} material={MAT.red}>
        <octahedronGeometry args={[0.26, 0]} />
      </mesh>
    </group>
  );
};
