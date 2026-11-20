import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MAT } from './SharedMaterials';

/**
 * Deterministic terrain elevation function:
 * - Strictly flat (y = 0) across the core navigable operational valley (Farm, Highway, MIDC, Urban Drop)
 * - Smoothly rises into sculpted low-poly rolling hills, agricultural slopes & distant ridges outside the valley
 */
export function getWorldTerrainHeight(x: number, z: number): number {
  // Distance outside the core flat valley box: x in [-78, 76], z in [-34, 34]
  const dx = Math.max(0, Math.abs(x + 1) - 77);
  const dz = Math.max(0, Math.abs(z) - 34);
  const distOut = Math.hypot(dx, dz);
  if (distOut <= 0.001) return 0;

  const ramp = Math.min(1, distOut / 48);
  const smoothRamp = ramp * ramp * (3 - 2 * ramp);

  // Layered deterministic hills — higher scenic ridges on North & West Farm hills, gentle urban slope East
  const ridgeA = Math.sin(x * 0.024 + 0.6) * Math.cos(z * 0.028 - 0.4) * 11.5;
  const ridgeB = Math.sin(x * 0.055 - z * 0.04) * 4.2;
  const northBias = z < -34 ? Math.min(18, (-34 - z) * 0.16) : 0;
  const westFarmBias = x < -78 ? Math.min(12, (-78 - x) * 0.11) : 0;
  const southBias = z > 34 ? Math.min(8, (z - 34) * 0.08) : 0;
  const eastFlatten = x > 68 ? 0.32 : 1.0;

  return Math.max(0, (Math.abs(ridgeA) + ridgeB + northBias + westFarmBias + southBias) * smoothRamp * eastFlatten);
}

/**
 * Twilight atmospheric sky dome blending zenith midnight navy to misty horizon blue.
 */
const AtmosphericSkyDome: React.FC = () => {
  const skyMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color('#061220') },
        midColor: { value: new THREE.Color('#0E243B') },
        horizonColor: { value: new THREE.Color('#193856') },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 midColor;
        uniform vec3 horizonColor;
        varying vec3 vWorldPos;
        void main() {
          float h = normalize(vWorldPos).y;
          vec3 col = mix(horizonColor, midColor, smoothstep(-0.04, 0.24, h));
          col = mix(col, topColor, smoothstep(0.22, 0.78, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
  }, []);

  useEffect(() => {
    return () => {
      skyMat.dispose();
    };
  }, [skyMat]);

  return (
    <mesh material={skyMat} renderOrder={-1}>
      <sphereGeometry args={[360, 24, 16]} />
    </mesh>
  );
};

/**
 * Continuous 640x640 sculpted low-poly world terrain replacing the old floating flat board.
 * Vertex colors transition naturally from Farm Emerald (West) -> Industrial Slate (Center) -> Urban/Coastal (East).
 */
export const DioramaBaseIsland: React.FC = () => {
  const terrainGeo = useMemo(() => {
    const size = 640;
    const segs = 96;
    const geo = new THREE.PlaneGeometry(size, size, segs, segs);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const cFarm = new THREE.Color('#1F4636');
    const cMid = new THREE.Color('#172B3C');
    const cUrban = new THREE.Color('#192838');
    const cRidge = new THREE.Color('#122536');
    const tmp = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = getWorldTerrainHeight(x, z);
      pos.setY(i, y - 0.04);

      if (x < -38) {
        const t = Math.min(1, (-38 - x) / 45);
        tmp.copy(cMid).lerp(cFarm, t);
      } else if (x > 34) {
        const t = Math.min(1, (x - 34) / 45);
        tmp.copy(cMid).lerp(cUrban, t);
      } else {
        tmp.copy(cMid);
      }

      if (y > 4) {
        tmp.lerp(cRidge, Math.min(0.65, (y - 4) / 22));
      }

      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      terrainGeo.dispose();
    };
  }, [terrainGeo]);

  return (
    <group>
      <AtmosphericSkyDome />

      {/* Continuous Seamless Landscape Mesh */}
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors flatShading roughness={0.92} metalness={0.02} />
      </mesh>

      {/* MIDC Integrated Industrial Concrete Campus Yard */}
      <mesh position={[7.0, 0.015, -2.5]} material={MAT.industrialFloor} receiveShadow>
        <boxGeometry args={[52, 0.05, 58]} />
      </mesh>
      {/* Concrete Perimeter Curbs framing MIDC Campus */}
      <mesh position={[7.0, 0.08, -31.5]} material={MAT.concreteCurb} receiveShadow>
        <boxGeometry args={[52.4, 0.14, 0.35]} />
      </mesh>
      <mesh position={[7.0, 0.08, 26.5]} material={MAT.concreteCurb} receiveShadow>
        <boxGeometry args={[52.4, 0.14, 0.35]} />
      </mesh>

      {/* Landscaped Central MIDC Courtyard Island (replaces giant ICBOX plinth) */}
      <group position={[-14.0, 0.04, -1.5]}>
        <mesh position={[0, 0.04, 0]} material={MAT.concreteCurb} receiveShadow>
          <boxGeometry args={[12.8, 0.09, 10.6]} />
        </mesh>
        <mesh position={[0, 0.095, 0]} material={MAT.farmGrass} receiveShadow>
          <boxGeometry args={[11.8, 0.04, 9.6]} />
        </mesh>
      </group>

      {/* Farm Paved Receiving Forecourt (East of Custody Gate) */}
      <mesh position={[-55.0, 0.015, -17.5]} material={MAT.concretePad} receiveShadow>
        <boxGeometry args={[18.0, 0.04, 21.0]} />
      </mesh>

      {/* Mumbai Urban Delivery District Paved Block & Sidewalks */}
      <mesh position={[55.0, 0.015, 10.0]} material={MAT.sidewalk} receiveShadow>
        <boxGeometry args={[28.0, 0.05, 34.0]} />
      </mesh>
      {/* Eastern Urban Waterfront / Creek Strip adding geographical depth */}
      <mesh position={[98.0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 260]} />
        <meshStandardMaterial color="#0D2D46" roughness={0.22} metalness={0.35} />
      </mesh>
    </group>
  );
};

/**
 * Upstream Agricultural Strawberry Farm Environment (Strictly West of ST-01 Custody Gate):
 * Poly-tunnel greenhouses, terraced strawberry rows with instanced green foliage + bright red berries,
 * irrigation water tank, farm fencing. Clearly establishes this is a STRAWBERRY supply chain world!
 */
export const UpstreamStrawberryFarmLandscape: React.FC = () => {
  const bushRef = useRef<THREE.InstancedMesh>(null);
  const berryRef = useRef<THREE.InstancedMesh>(null);

  const bedSpecs = useMemo(() => {
    const beds: { x: number; z: number; length: number }[] = [];
    // South & West terraced strawberry rows (outside M2Labo custody boundary x < -65)
    for (let r = 0; r < 6; r++) {
      beds.push({ x: -82.0, z: -26.0 + r * 3.4, length: 24 });
    }
    for (let r = 0; r < 5; r++) {
      beds.push({ x: -80.0, z: 2.0 + r * 3.6, length: 26 });
    }
    return beds;
  }, []);

  const bushGeo = useMemo(() => new THREE.DodecahedronGeometry(0.42, 0), []);
  const berryGeo = useMemo(() => new THREE.ConeGeometry(0.11, 0.2, 5), []);

  const { bushMatrices, berryMatrices } = useMemo(() => {
    const bushes: THREE.Matrix4[] = [];
    const berries: THREE.Matrix4[] = [];
    const dummy = new THREE.Object3D();

    bedSpecs.forEach((bed, bi) => {
      const count = 13;
      for (let i = 0; i < count; i++) {
        const bx = bed.x - bed.length / 2 + 1.2 + i * (bed.length - 2.4) / (count - 1);
        const bz = bed.z + ((i + bi) % 2 === 0 ? -0.25 : 0.25);
        dummy.position.set(bx, 0.36, bz);
        dummy.rotation.set(0, (i * 0.9 + bi) % 6, 0);
        const s = 0.85 + ((i * 7 + bi * 3) % 4) * 0.08;
        dummy.scale.set(s * 1.15, s * 0.72, s);
        dummy.updateMatrix();
        bushes.push(dummy.matrix.clone());

        // Add 2 vivid visible strawberries per bush so farm rows unmistakably read as strawberry fields
        for (let k = 0; k < 2; k++) {
          dummy.position.set(
            bx + (k === 0 ? 0.22 : -0.22),
            0.44 + (k * 0.06),
            bz + (k === 0 ? 0.22 : -0.18)
          );
          dummy.rotation.set(Math.PI + 0.2, k * 1.4, 0.15);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          berries.push(dummy.matrix.clone());
        }
      }
    });
    return { bushMatrices: bushes, berryMatrices: berries };
  }, [bedSpecs]);

  useLayoutEffect(() => {
    if (bushRef.current) {
      bushMatrices.forEach((m, i) => bushRef.current!.setMatrixAt(i, m));
      bushRef.current.instanceMatrix.needsUpdate = true;
    }
    if (berryRef.current) {
      berryMatrices.forEach((m, i) => berryRef.current!.setMatrixAt(i, m));
      berryRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [bushMatrices, berryMatrices]);

  useEffect(() => {
    return () => {
      bushGeo.dispose();
      berryGeo.dispose();
    };
  }, [bushGeo, berryGeo]);

  return (
    <group>
      {/* Terraced raised soil beds */}
      {bedSpecs.map((bed, idx) => (
        <mesh key={idx} position={[bed.x, 0.12, bed.z]} material={MAT.farmSoil} receiveShadow>
          <boxGeometry args={[bed.length, 0.24, 1.5]} />
        </mesh>
      ))}

      {/* Instanced lush green strawberry bushes & vivid ruby strawberries */}
      <instancedMesh ref={bushRef} args={[bushGeo, MAT.leafGreen, bushMatrices.length]} castShadow />
      <instancedMesh ref={berryRef} args={[berryGeo, MAT.strawberrySolidRed, berryMatrices.length]} />

      {/* Three Illuminated Agricultural Poly-Tunnel Strawberry Greenhouses (visible from Overview & Farm approach) */}
      {[-3.0, -9.2, -15.4].map((gz, i) => (
        <group key={`gh-${i}`} position={[-86.0, 0, gz]}>
          {/* Curved glass/poly tunnel arch */}
          <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} material={MAT.greenhouseGlass}>
            <cylinderGeometry args={[2.1, 2.1, 14.0, 10, 1, false, 0, Math.PI]} />
          </mesh>
          {/* Steel arch ribs */}
          {[-5.5, -1.8, 1.8, 5.5].map((rx, ri) => (
            <mesh key={ri} position={[rx, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} material={MAT.steelRack}>
              <torusGeometry args={[2.12, 0.06, 5, 10, Math.PI]} />
            </mesh>
          ))}
          {/* Interior growing bed */}
          <mesh position={[0, 0.18, 0]} material={MAT.farmSoil}>
            <boxGeometry args={[13.2, 0.36, 3.2]} />
          </mesh>
        </group>
      ))}

      {/* Farm Irrigation Water Tower & Silo Landmark */}
      <group position={[-74.0, 0, -31.5]}>
        <mesh position={[0, 2.8, 0]} material={MAT.steelRack} castShadow>
          <cylinderGeometry args={[0.3, 0.45, 5.6, 6]} />
        </mesh>
        <mesh position={[0, 6.2, 0]} material={MAT.warehouseWall} castShadow>
          <cylinderGeometry args={[1.9, 1.9, 2.4, 10]} />
        </mesh>
        <mesh position={[0, 7.8, 0]} material={MAT.warehouseRoof} castShadow>
          <coneGeometry args={[2.1, 1.0, 10]} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Continuous Road Network connecting Farm, Dual-Carriageway Highway (Outbound + Flow A Empty Crate Return),
 * MIDC Service Lanes, Urban Last-Mile Avenue, Flow B Rider Return Boulevard, plus endless horizon roads.
 */
export const RoadNetwork3D: React.FC = () => (
  <group>
    {/* 1A. Outbound Strawberry Highway Lane (ST-01 -> ST-02 -> ST-03, z = -15.6) */}
    <mesh position={[-30.5, 0.04, -15.6]} material={MAT.asphalt} receiveShadow>
      <boxGeometry args={[46.0, 0.05, 5.0]} />
    </mesh>
    {/* Green subtle lane edge marker for Outbound Strawberries */}
    <mesh position={[-30.5, 0.072, -13.25]} material={MAT.green}>
      <boxGeometry args={[44.0, 0.015, 0.14]} />
    </mesh>

    {/* Raised Concrete Highway Median Divider separating Outbound vs Flow A Return */}
    <mesh position={[-30.5, 0.16, -19.9]} material={MAT.concreteCurb} castShadow receiveShadow>
      <boxGeometry args={[42.0, 0.28, 1.6]} />
    </mesh>
    <mesh position={[-30.5, 0.32, -19.9]} material={MAT.farmGrass}>
      <boxGeometry args={[41.0, 0.06, 1.1]} />
    </mesh>

    {/* 1B. FLOW A Return Highway Lane — Empty Crates (ST-03 -> ST-02 -> ST-01, z = -24.2) */}
    <mesh position={[-30.5, 0.04, -24.2]} material={MAT.asphalt} receiveShadow>
      <boxGeometry args={[46.0, 0.05, 4.8]} />
    </mesh>
    {/* Turquoise edge marker for Flow A Empty Crate Return */}
    <mesh position={[-30.5, 0.072, -26.45]} material={MAT.turquoiseReturn}>
      <boxGeometry args={[44.0, 0.015, 0.14]} />
    </mesh>

    {/* Connector turnaround aprons at ST-01 (Farm Empty Crate Receipt) and ST-03 (MIDC Empty Crate Bay) */}
    <mesh position={[-54.0, 0.04, -19.9]} material={MAT.asphaltPlain} receiveShadow>
      <boxGeometry args={[6.4, 0.05, 13.6]} />
    </mesh>
    <mesh position={[-11.2, 0.04, -19.9]} material={MAT.asphaltPlain} receiveShadow>
      <boxGeometry args={[6.2, 0.05, 13.6]} />
    </mesh>

    {/* Endless Highway Continuation off into North-West & North-East Horizon */}
    <mesh position={[-96.0, 0.035, -36.0]} rotation={[0, -0.32, 0]} material={MAT.asphalt} receiveShadow>
      <boxGeometry args={[95.0, 0.05, 6.2]} />
    </mesh>
    <mesh position={[55.0, 0.035, -44.0]} rotation={[0, 0.26, 0]} material={MAT.asphalt} receiveShadow>
      <boxGeometry args={[120.0, 0.05, 6.2]} />
    </mesh>

    {/* Highway Guardrails */}
    <mesh position={[-30.5, 0.34, -27.0]} material={MAT.steelRack} castShadow>
      <boxGeometry args={[43.0, 0.2, 0.16]} />
    </mesh>
    <mesh position={[-30.5, 0.34, -12.7]} material={MAT.steelRack} castShadow>
      <boxGeometry args={[43.0, 0.2, 0.16]} />
    </mesh>

    {/* GPS / Thermal Monitoring Pillars along Line-Haul */}
    {[-42.0, -34.0, -22.0, -14.0].map((x, idx) => (
      <group key={`gps-${idx}`} position={[x, 0, -19.9]}>
        <mesh position={[0, 1.5, 0]} material={MAT.steelRack} castShadow>
          <boxGeometry args={[0.18, 3.0, 0.18]} />
        </mesh>
        <mesh position={[0, 3.1, 0]} material={MAT.cyan}>
          <octahedronGeometry args={[0.26, 0]} />
        </mesh>
      </group>
    ))}

    {/* 2. Internal MIDC Concrete Material-Handling Corridor (ST-03 -> ST-04 -> ST-05) */}
    <mesh position={[7.0, 0.045, -16.0]} material={MAT.concretePad} receiveShadow>
      <boxGeometry args={[10.5, 0.04, 4.4]} />
    </mesh>
    <mesh position={[18.8, 0.045, -3.0]} material={MAT.concretePad} receiveShadow>
      <boxGeometry args={[4.8, 0.04, 17.5]} />
    </mesh>
    <mesh position={[16.55, 0.07, -3.0]} material={MAT.green}>
      <boxGeometry args={[0.14, 0.02, 16.5]} />
    </mesh>
    <mesh position={[21.05, 0.07, -3.0]} material={MAT.cyanSubtle}>
      <boxGeometry args={[0.14, 0.02, 16.5]} />
    </mesh>

    {/* 3. Mumbai Urban Last-Mile Avenue (ST-05 -> ST-06 -> Endless East City) */}
    <mesh position={[60.0, 0.04, 10.0]} material={MAT.asphalt} receiveShadow>
      <boxGeometry args={[76.0, 0.05, 6.0]} />
    </mesh>
    {/* Crosswalk stripes at Urban Customer District */}
    {[-1.8, -0.9, 0, 0.9, 1.8].map((cz, i) => (
      <mesh key={`cw-${i}`} position={[43.5, 0.072, 10.0 + cz]} material={MAT.offWhite}>
        <boxGeometry args={[2.1, 0.012, 0.42]} />
      </mesh>
    ))}
    {/* Urban North-South Cross Street extending into skyline */}
    <mesh position={[44.5, 0.038, 0.0]} rotation={[0, Math.PI / 2, 0]} material={MAT.asphalt} receiveShadow>
      <boxGeometry args={[150.0, 0.05, 6.2]} />
    </mesh>

    {/* 4. FLOW B Rider Return Boulevard (Customer ST-06 -> MIDC Returns ST-07) */}
    <mesh position={[22.0, 0.04, 24.4]} material={MAT.asphalt} receiveShadow>
      <boxGeometry args={[58.0, 0.05, 4.4]} />
    </mesh>
    <mesh position={[48.8, 0.04, 18.2]} material={MAT.asphaltPlain} receiveShadow>
      <boxGeometry args={[4.2, 0.05, 13.0]} />
    </mesh>
    <mesh position={[-4.0, 0.04, 21.0]} material={MAT.asphaltPlain} receiveShadow>
      <boxGeometry args={[4.2, 0.05, 7.8]} />
    </mesh>
    {/* Amber edge guide strip for Flow B Black Delivery Bag Return */}
    <mesh position={[22.0, 0.072, 26.4]} material={MAT.amber}>
      <boxGeometry args={[56.0, 0.015, 0.14]} />
    </mesh>

    {/* 5. Sanitized Black Delivery Bag Pool Lane (ST-07 -> ST-05) */}
    <mesh position={[8.0, 0.046, 13.5]} material={MAT.concretePad} receiveShadow>
      <boxGeometry args={[18.5, 0.04, 2.6]} />
    </mesh>
  </group>
);

/**
 * Distant Industrial Campus & Mumbai Urban Skyline + Forest Tree Lines + Streetlamps
 * Eliminates any sense of an isolated board and creates deep horizon layering from every camera angle.
 */
export const LowPolyTreesAndProps: React.FC = () => {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const crownLowRef = useRef<THREE.InstancedMesh>(null);
  const crownTopRef = useRef<THREE.InstancedMesh>(null);
  const lampPoleRef = useRef<THREE.InstancedMesh>(null);
  const lampHeadRef = useRef<THREE.InstancedMesh>(null);
  const cityBlockRef = useRef<THREE.InstancedMesh>(null);
  const cityRoofRef = useRef<THREE.InstancedMesh>(null);
  const indBlockRef = useRef<THREE.InstancedMesh>(null);
  const indRoofRef = useRef<THREE.InstancedMesh>(null);

  const treeData = useMemo<[number, number, number, number][]>(() => {
    const trees: [number, number, number, number][] = [];
    // Curated inner campus & roadside trees
    const inner: [number, number, number][] = [
      [-64, -30, 1.3], [-48, -31, 1.2], [-34, -31, 1.35], [-18, -32, 1.25],
      [6, -32, 1.3], [32, -31, 1.4], [38, -14, 1.15], [38, -4, 1.2],
      [38, 17, 1.1], [34, 30, 1.3], [14, 31, 1.25], [-16, 31, 1.3],
      [-42, 29, 1.25], [-58, 22, 1.35], [-66, 2, 1.2], [-17, -1, 1.05],
      [-11, -3, 0.95], [33, 5, 1.05], [33, 15, 1.05],
    ];
    inner.forEach(([x, z, s]) => trees.push([x, getWorldTerrainHeight(x, z), z, s]));

    // Deterministic forest bands along West Farm hills, North ridge & South foothills
    for (let i = 0; i < 185; i++) {
      const angle = (i * 2.39996) % (Math.PI * 2);
      const radius = 56 + ((i * 37) % 115);
      const x = Math.cos(angle) * radius * 1.28;
      const z = Math.sin(angle) * radius * 0.85;
      // Keep roads, core operational corridor, and eastern dense city clear
      if (x > -68 && x < 74 && z > -32 && z < 32) continue;
      if (x > 64 && z > -48 && z < 52) continue; // reserve east for urban skyline
      if (x < -64 && x > -112 && z > -28 && z < 20) continue; // reserve strawberry farm fields
      const y = getWorldTerrainHeight(x, z);
      const s = 1.1 + ((i * 13) % 7) * 0.16;
      trees.push([x, y, z, s]);
    }
    return trees;
  }, []);

  const lampData = useMemo<[number, number, number, number][]>(
    () => [
      [-44, 0, -12.4, Math.PI], [-32, 0, -12.4, Math.PI], [-20, 0, -12.4, Math.PI],
      [-44, 0, -27.2, 0], [-32, 0, -27.2, 0], [-20, 0, -27.2, 0],
      [32, 0, 6.2, 0], [39, 0, 6.2, 0], [50, 0, 6.2, 0],
      [32, 0, 13.8, Math.PI], [39, 0, 13.8, Math.PI],
      [14, 0, 27.2, Math.PI], [34, 0, 27.2, Math.PI], [-18, 0, 24.5, Math.PI],
    ],
    []
  );

  // Eastern Mumbai Urban Skyline Buildings (warm illuminated windows, varied heights)
  const urbanBlocks = useMemo<{ x: number; y: number; z: number; w: number; h: number; d: number }[]>(() => {
    const blocks: { x: number; y: number; z: number; w: number; h: number; d: number }[] = [];
    for (let gx = 0; gx < 6; gx++) {
      for (let gz = 0; gz < 9; gz++) {
        const x = 67 + gx * 12.5 + ((gz % 2) * 3.2);
        const z = -54 + gz * 13.5;
        // Keep main east avenue & waterway clear
        if (Math.abs(z - 10) < 7.2) continue;
        if (x > 87 && x < 109) continue;
        const seed = (gx * 19 + gz * 11) % 9;
        const w = 5.4 + (seed % 3) * 1.4;
        const d = 5.6 + ((seed + 1) % 3) * 1.5;
        const h = 7.5 + seed * 2.4 + (gx >= 3 ? 4 : 0);
        const y = getWorldTerrainHeight(x, z);
        blocks.push({ x, y, z, w, h, d });
      }
    }
    return blocks;
  }, []);

  // Distant MIDC / Background Industrial Warehouses (North & South-West industrial park continuation)
  const distantIndustrial = useMemo<{ x: number; y: number; z: number; w: number; h: number; d: number }[]>(() => {
    const list: { x: number; y: number; z: number; w: number; h: number; d: number }[] = [
      { x: -16, y: 0, z: -48, w: 22, h: 6.5, d: 13 },
      { x: 18, y: 0, z: -50, w: 26, h: 7.2, d: 14 },
      { x: 42, y: 0, z: -38, w: 16, h: 5.8, d: 11 },
      { x: -45, y: 0, z: -48, w: 18, h: 5.5, d: 11 },
      { x: -24, y: 0, z: 42, w: 20, h: 6.0, d: 12 },
      { x: 12, y: 0, z: 44, w: 24, h: 6.5, d: 13 },
      { x: 40, y: 0, z: 42, w: 18, h: 7.5, d: 12 },
      { x: -56, y: 0, z: 38, w: 16, h: 5.2, d: 10 },
      { x: -12, y: 0, z: -84, w: 30, h: 8.0, d: 16 },
      { x: 32, y: 0, z: -82, w: 28, h: 7.5, d: 15 },
    ];
    return list.map((b) => ({ ...b, y: getWorldTerrainHeight(b.x, b.z) }));
  }, []);

  const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.16, 0.24, 1.1, 5), []);
  const crownLowGeo = useMemo(() => new THREE.ConeGeometry(1.0, 2.1, 6), []);
  const crownTopGeo = useMemo(() => new THREE.ConeGeometry(0.68, 1.5, 6), []);
  const lampPoleGeo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.12, 4.2, 6), []);
  const lampHeadGeo = useMemo(() => new THREE.BoxGeometry(0.9, 0.16, 0.36), []);
  const unitBoxGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();

    if (trunkRef.current && crownLowRef.current && crownTopRef.current) {
      treeData.forEach(([x, y, z, s], idx) => {
        dummy.rotation.set(0, idx * 0.7, 0);
        dummy.scale.set(s, s, s);

        dummy.position.set(x, y + 0.52 * s, z);
        dummy.updateMatrix();
        trunkRef.current!.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(x, y + 1.65 * s, z);
        dummy.updateMatrix();
        crownLowRef.current!.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(x, y + 2.6 * s, z);
        dummy.updateMatrix();
        crownTopRef.current!.setMatrixAt(idx, dummy.matrix);
      });
      trunkRef.current.instanceMatrix.needsUpdate = true;
      crownLowRef.current.instanceMatrix.needsUpdate = true;
      crownTopRef.current.instanceMatrix.needsUpdate = true;
    }

    if (lampPoleRef.current && lampHeadRef.current) {
      lampData.forEach(([x, y, z, rotY], idx) => {
        dummy.rotation.set(0, rotY, 0);
        dummy.scale.set(1, 1, 1);

        dummy.position.set(x, y + 2.1, z);
        dummy.updateMatrix();
        lampPoleRef.current!.setMatrixAt(idx, dummy.matrix);

        const offsetZ = Math.cos(rotY) * 0.38;
        dummy.position.set(x, y + 4.22, z + offsetZ);
        dummy.updateMatrix();
        lampHeadRef.current!.setMatrixAt(idx, dummy.matrix);
      });
      lampPoleRef.current.instanceMatrix.needsUpdate = true;
      lampHeadRef.current.instanceMatrix.needsUpdate = true;
    }

    if (cityBlockRef.current && cityRoofRef.current) {
      urbanBlocks.forEach((b, idx) => {
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(b.w, b.h, b.d);
        dummy.position.set(b.x, b.y + b.h / 2 - 0.1, b.z);
        dummy.updateMatrix();
        cityBlockRef.current!.setMatrixAt(idx, dummy.matrix);

        dummy.scale.set(b.w + 0.25, 0.45, b.d + 0.25);
        dummy.position.set(b.x, b.y + b.h + 0.12, b.z);
        dummy.updateMatrix();
        cityRoofRef.current!.setMatrixAt(idx, dummy.matrix);
      });
      cityBlockRef.current.instanceMatrix.needsUpdate = true;
      cityRoofRef.current.instanceMatrix.needsUpdate = true;
    }

    if (indBlockRef.current && indRoofRef.current) {
      distantIndustrial.forEach((b, idx) => {
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(b.w, b.h, b.d);
        dummy.position.set(b.x, b.y + b.h / 2 - 0.1, b.z);
        dummy.updateMatrix();
        indBlockRef.current!.setMatrixAt(idx, dummy.matrix);

        dummy.scale.set(b.w + 0.3, 0.4, b.d + 0.3);
        dummy.position.set(b.x, b.y + b.h + 0.1, b.z);
        dummy.updateMatrix();
        indRoofRef.current!.setMatrixAt(idx, dummy.matrix);
      });
      indBlockRef.current.instanceMatrix.needsUpdate = true;
      indRoofRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [treeData, lampData, urbanBlocks, distantIndustrial]);

  useEffect(() => {
    return () => {
      trunkGeo.dispose();
      crownLowGeo.dispose();
      crownTopGeo.dispose();
      lampPoleGeo.dispose();
      lampHeadGeo.dispose();
      unitBoxGeo.dispose();
    };
  }, [trunkGeo, crownLowGeo, crownTopGeo, lampPoleGeo, lampHeadGeo, unitBoxGeo]);

  return (
    <group>
      <instancedMesh ref={trunkRef} args={[trunkGeo, MAT.woodPallet, treeData.length]} castShadow />
      <instancedMesh ref={crownLowRef} args={[crownLowGeo, MAT.foliageDark, treeData.length]} castShadow />
      <instancedMesh ref={crownTopRef} args={[crownTopGeo, MAT.foliageTeal, treeData.length]} castShadow />

      <instancedMesh ref={lampPoleRef} args={[lampPoleGeo, MAT.steelRack, lampData.length]} castShadow />
      <instancedMesh ref={lampHeadRef} args={[lampHeadGeo, MAT.warmLampGlow, lampData.length]} />

      <instancedMesh
        ref={cityBlockRef}
        args={[unitBoxGeo, MAT.urbanWindows, urbanBlocks.length]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={cityRoofRef}
        args={[unitBoxGeo, MAT.warehouseRoof, urbanBlocks.length]}
        castShadow
      />
      <instancedMesh
        ref={indBlockRef}
        args={[unitBoxGeo, MAT.distantCity, distantIndustrial.length]}
        receiveShadow
      />
      <instancedMesh
        ref={indRoofRef}
        args={[unitBoxGeo, MAT.secondaryNavy, distantIndustrial.length]}
      />
    </group>
  );
};
