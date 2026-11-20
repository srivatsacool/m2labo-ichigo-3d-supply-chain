import React, { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { MAT } from './SharedMaterials';

const TREE_POSITIONS: [number, number, number, number][] = [
  [-24.5, 0, -9.8, 1.1],
  [-21.0, 0, -10.5, 0.95],
  [-15.5, 0, -10.0, 1.2],
  [-8.0, 0, -10.2, 1.05],
  [12.5, 0, -9.8, 1.15],
  [16.5, 0, -8.5, 0.9],
  [23.2, 0, -6.2, 1.1],
  [23.5, 0, 8.8, 1.05],
  [14.2, 0, 10.6, 0.95],
  [-17.8, 0, 9.6, 1.1],
  [-23.5, 0, 4.5, 1.0],
];

const BOLLARD_POSITIONS: [number, number, number][] = [
  [-17.5, 0, -2.5],
  [-17.5, 0, -6.2],
  [-6.5, 0, -3.5],
  [-6.5, 0, -6.8],
  [11.2, 0, 1.8],
  [11.2, 0, 4.6],
  [14.5, 0, 1.8],
  [14.5, 0, 4.6],
];

export const DioramaBaseIsland: React.FC = () => (
  <group>
    {/* Deep structural diorama base */}
    <mesh position={[0, -0.55, 0]} material={MAT.deepNavy} receiveShadow>
      <boxGeometry args={[56, 1.0, 27]} />
    </mesh>
    {/* Top blueprint terrain surface */}
    <mesh position={[0, -0.02, 0]} material={MAT.secondaryNavy} receiveShadow>
      <boxGeometry args={[55.2, 0.08, 26.2]} />
    </mesh>
    {/* Subtle technical architectural floor grid */}
    <gridHelper args={[54, 27, '#42C7E8', '#173B57']} position={[0, 0.03, 0]} />
  </group>
);

export const RoadNetwork3D: React.FC = () => {
  const highwayPoints = useMemo<[number, number, number][]>(
    () => [
      [-18.5, 0.06, -4.0],
      [-14.5, 0.06, -4.8],
      [-11.0, 0.06, -5.2],
      [-6.5, 0.06, -4.8],
      [-3.2, 0.06, -4.5],
    ],
    []
  );

  const lastMileRoadPoints = useMemo<[number, number, number][]>(
    () => [
      [8.2, 0.06, 3.2],
      [12.5, 0.06, 3.2],
      [16.0, 0.06, 3.2],
    ],
    []
  );

  const reverseRoadPoints = useMemo<[number, number, number][]>(
    () => [
      [16.8, 0.055, 5.2],
      [15.8, 0.055, 8.2],
      [8.0, 0.055, 8.8],
      [0.5, 0.055, 8.2],
      [-1.5, 0.055, 6.5],
    ],
    []
  );

  return (
    <group>
      {/* Highway Corridor Road Slab (ST-01 -> ST-02 -> ST-03) */}
      <mesh position={[-11.0, 0.04, -4.8]} rotation={[0, 0.06, 0]} material={MAT.asphalt} receiveShadow>
        <boxGeometry args={[16.2, 0.06, 2.4]} />
      </mesh>
      <Line points={highwayPoints} color="#A9E8F5" lineWidth={1.5} dashed dashSize={0.6} gapSize={0.4} />

      {/* GPS / Route Kilometre Monitoring Pillars along Line-Haul */}
      {[-15.0, -11.0, -7.0].map((x, idx) => (
        <group key={idx} position={[x, 0, -6.5]}>
          <mesh position={[0, 0.7, 0]} material={MAT.steelRack} castShadow>
            <boxGeometry args={[0.12, 1.4, 0.12]} />
          </mesh>
          <mesh position={[0, 1.45, 0]} material={MAT.cyan}>
            <octahedronGeometry args={[0.18, 0]} />
          </mesh>
        </group>
      ))}

      {/* Urban Last-Mile Road (ST-05 -> ST-06) */}
      <mesh position={[12.5, 0.04, 3.2]} material={MAT.asphalt} receiveShadow>
        <boxGeometry args={[8.8, 0.06, 2.2]} />
      </mesh>
      <Line points={lastMileRoadPoints} color="#A9E8F5" lineWidth={1.5} dashed dashSize={0.5} gapSize={0.35} />

      {/* Reverse Logistics Return Loop Road (ST-06 -> ST-07) */}
      <mesh position={[7.2, 0.035, 8.6]} material={MAT.asphalt} receiveShadow>
        <boxGeometry args={[18.2, 0.05, 1.5]} />
      </mesh>
      <mesh position={[16.2, 0.035, 6.8]} material={MAT.asphalt} receiveShadow>
        <boxGeometry args={[1.5, 0.05, 4.2]} />
      </mesh>
      <mesh position={[-1.5, 0.035, 7.6]} material={MAT.asphalt} receiveShadow>
        <boxGeometry args={[1.5, 0.05, 2.8]} />
      </mesh>
      <Line points={reverseRoadPoints} color="#E9A23B" lineWidth={1.5} dashed dashSize={0.45} gapSize={0.35} />
    </group>
  );
};

export const LowPolyTreesAndProps: React.FC = () => {
  const bollardRef = useRef<THREE.InstancedMesh>(null);
  const bollardGeo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.1, 0.55, 6), []);

  useLayoutEffect(() => {
    if (!bollardRef.current) return;
    const dummy = new THREE.Object3D();
    BOLLARD_POSITIONS.forEach(([x, y, z], idx) => {
      dummy.position.set(x, y + 0.28, z);
      dummy.updateMatrix();
      bollardRef.current!.setMatrixAt(idx, dummy.matrix);
    });
    bollardRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {TREE_POSITIONS.map(([x, y, z, scale], idx) => (
        <group key={idx} position={[x, y, z]} scale={scale}>
          <mesh position={[0, 0.35, 0]} material={MAT.woodPallet} castShadow>
            <cylinderGeometry args={[0.1, 0.14, 0.7, 5]} />
          </mesh>
          <mesh position={[0, 1.05, 0]} material={MAT.foliageTeal} castShadow>
            <coneGeometry args={[0.58, 1.25, 6]} />
          </mesh>
          <mesh position={[0, 1.65, 0]} material={MAT.leafGreen} castShadow>
            <coneGeometry args={[0.4, 0.9, 6]} />
          </mesh>
        </group>
      ))}

      <instancedMesh
        ref={bollardRef}
        args={[bollardGeo, MAT.amber, BOLLARD_POSITIONS.length]}
        castShadow
      />
    </group>
  );
};
