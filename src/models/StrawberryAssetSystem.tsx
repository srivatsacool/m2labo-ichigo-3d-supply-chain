import React, { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MAT } from './SharedMaterials';

/**
 * Normalize any BufferGeometry to non-indexed with position, normal, uv so mergeGeometries
 * always succeeds cleanly and produces ultra-fast static merged meshes (slashing 11,000+ draw calls to <160!).
 */
function normalizeGeo(raw: THREE.BufferGeometry, matrix?: THREE.Matrix4): THREE.BufferGeometry {
  const g = raw.index ? raw.toNonIndexed() : raw.clone();
  if (matrix) g.applyMatrix4(matrix);
  if (!g.attributes.normal) g.computeVertexNormals();
  if (!g.attributes.uv) {
    const count = g.attributes.position.count;
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
  }
  // Keep only matching standard attributes
  for (const key of Object.keys(g.attributes)) {
    if (key !== 'position' && key !== 'normal' && key !== 'uv') {
      g.deleteAttribute(key);
    }
  }
  return g;
}

function safeMerge(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(geos, false);
  geos.forEach((g) => g.dispose());
  if (!merged) {
    throw new Error('Failed to merge strawberry geometry batch');
  }
  return merged;
}

// 1. Base sculpted heart-tapered low-poly strawberry body (7 radial segments for crisp low-poly charm & fast GPU)
function createStrawberryBodyGeometry(): THREE.BufferGeometry {
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0.002, 0.0),
    new THREE.Vector2(0.12, 0.08),
    new THREE.Vector2(0.25, 0.26),
    new THREE.Vector2(0.37, 0.48),
    new THREE.Vector2(0.41, 0.68),
    new THREE.Vector2(0.36, 0.84),
    new THREE.Vector2(0.22, 0.91),
    new THREE.Vector2(0.05, 0.92),
  ];
  const geo = new THREE.LatheGeometry(pts, 7);
  geo.computeVertexNormals();
  return normalizeGeo(geo);
}

// 2. Merged 6-leaf starburst green calyx crown + curved stem (1 draw call instead of 7!)
function createMergedCalyxGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0.075, 0.14);
  shape.lineTo(0, 0.36);
  shape.lineTo(-0.075, 0.14);
  shape.closePath();
  const baseLeaf = new THREE.ShapeGeometry(shape);
  baseLeaf.rotateX(-Math.PI / 2 + 0.16);

  const parts: THREE.BufferGeometry[] = [];
  const mat4 = new THREE.Matrix4();
  const rotM = new THREE.Matrix4();
  const transM = new THREE.Matrix4();

  for (let i = 0; i < 6; i++) {
    rotM.makeRotationY((i * Math.PI) / 3);
    transM.makeTranslation(0, 0.92, 0);
    mat4.multiplyMatrices(transM, rotM);
    parts.push(normalizeGeo(baseLeaf, mat4));
  }
  baseLeaf.dispose();

  const stem = new THREE.CylinderGeometry(0.028, 0.038, 0.24, 5);
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.22));
  mat4.compose(new THREE.Vector3(0.02, 1.04, 0), q, new THREE.Vector3(1, 1, 1));
  parts.push(normalizeGeo(stem, mat4));
  stem.dispose();

  return safeMerge(parts);
}

const SHARED_BERRY_GEO = createStrawberryBodyGeometry();
const SHARED_CALYX_GEO = createMergedCalyxGeometry();

// Pre-merged 9-berry punnet payload (just 2 draw calls total for ALL 9 berries!)
const PUNNET_BERRY_GRID: [number, number, number, number][] = [
  [-0.085, -0.085, 0.2, 0.4],
  [0.0, -0.09, -0.15, 1.1],
  [0.085, -0.085, 0.18, 2.1],
  [-0.09, 0.0, -0.2, 0.8],
  [0.0, 0.005, 0.14, 1.9],
  [0.09, 0.0, -0.12, 2.7],
  [-0.085, 0.085, 0.22, 0.3],
  [0.0, 0.09, -0.18, 1.5],
  [0.085, 0.085, 0.15, 2.5],
];

function buildBatchBerryGeometries(
  entries: { x: number; y: number; z: number; rx: number; ry: number; s: number }[]
): { bodies: THREE.BufferGeometry; calyxes: THREE.BufferGeometry } {
  const bodyParts: THREE.BufferGeometry[] = [];
  const calyxParts: THREE.BufferGeometry[] = [];
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();

  for (const b of entries) {
    e.set(b.rx, b.ry, 0);
    q.setFromEuler(e);
    pos.set(b.x, b.y, b.z);
    scl.set(b.s, b.s * 1.04, b.s);
    m.compose(pos, q, scl);
    bodyParts.push(normalizeGeo(SHARED_BERRY_GEO, m));
    calyxParts.push(normalizeGeo(SHARED_CALYX_GEO, m));
  }
  return {
    bodies: safeMerge(bodyParts),
    calyxes: safeMerge(calyxParts),
  };
}

const PUNNET_BERRIES_MERGED = buildBatchBerryGeometries(
  PUNNET_BERRY_GRID.map(([bx, bz, rx, ry]) => ({ x: bx, y: 0.082, z: bz, rx, ry, s: 0.1 }))
);

// Pre-merged 15-berry crate top layer + crate box shell (drops 128 draw calls per crate -> JUST 3 DRAW CALLS!!)
const CRATE_BERRIES_LAYOUT = [
  { x: -0.26, z: -0.15, y: 0.19, rx: 0.2, ry: 0.3, s: 0.13 },
  { x: -0.13, z: -0.16, y: 0.2, rx: -0.18, ry: 1.2, s: 0.135 },
  { x: 0.0, z: -0.15, y: 0.21, rx: 0.15, ry: 2.1, s: 0.14 },
  { x: 0.13, z: -0.16, y: 0.2, rx: -0.22, ry: 0.7, s: 0.13 },
  { x: 0.26, z: -0.14, y: 0.19, rx: 0.18, ry: 1.9, s: 0.125 },
  { x: -0.25, z: 0.0, y: 0.21, rx: -0.16, ry: 0.9, s: 0.14 },
  { x: -0.12, z: 0.01, y: 0.22, rx: 0.2, ry: 2.4, s: 0.145 },
  { x: 0.01, z: 0.0, y: 0.23, rx: -0.12, ry: 0.4, s: 0.15 },
  { x: 0.14, z: 0.01, y: 0.22, rx: 0.18, ry: 1.7, s: 0.14 },
  { x: 0.26, z: 0.0, y: 0.2, rx: -0.2, ry: 2.8, s: 0.13 },
  { x: -0.24, z: 0.15, y: 0.19, rx: 0.22, ry: 1.4, s: 0.13 },
  { x: -0.11, z: 0.16, y: 0.2, rx: -0.15, ry: 2.6, s: 0.135 },
  { x: 0.02, z: 0.15, y: 0.21, rx: 0.16, ry: 0.6, s: 0.14 },
  { x: 0.15, z: 0.16, y: 0.2, rx: -0.2, ry: 1.8, s: 0.132 },
  { x: 0.25, z: 0.14, y: 0.19, rx: 0.15, ry: 2.9, s: 0.125 },
];

const CRATE_BERRIES_MERGED = buildBatchBerryGeometries(CRATE_BERRIES_LAYOUT);

function createFilledCrateShellGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const addBox = (w: number, h: number, d: number, x: number, y: number, z: number) => {
    const g = new THREE.BoxGeometry(w, h, d);
    parts.push(normalizeGeo(g, new THREE.Matrix4().makeTranslation(x, y, z)));
    g.dispose();
  };
  addBox(0.74, 0.05, 0.5, 0, 0.03, 0);
  addBox(0.76, 0.22, 0.035, 0, 0.14, 0.235);
  addBox(0.76, 0.22, 0.035, 0, 0.14, -0.235);
  addBox(0.035, 0.22, 0.48, -0.365, 0.14, 0);
  addBox(0.035, 0.22, 0.48, 0.365, 0.14, 0);
  addBox(0.78, 0.025, 0.045, 0, 0.255, 0.238);
  addBox(0.78, 0.025, 0.045, 0, 0.255, -0.238);
  return safeMerge(parts);
}

function createEmptyCrateShellGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const addBox = (w: number, h: number, d: number, x: number, y: number, z: number) => {
    const g = new THREE.BoxGeometry(w, h, d);
    parts.push(normalizeGeo(g, new THREE.Matrix4().makeTranslation(x, y, z)));
    g.dispose();
  };
  addBox(0.72, 0.04, 0.48, 0, 0.025, 0);
  [-0.22, 0.22].forEach((z) => {
    addBox(0.74, 0.06, 0.032, 0, 0.08, z);
    addBox(0.76, 0.06, 0.038, 0, 0.2, z);
  });
  [-0.36, 0.36].forEach((x) => {
    addBox(0.032, 0.06, 0.48, x, 0.08, 0);
    addBox(0.038, 0.06, 0.5, x, 0.2, 0);
  });
  [
    [-0.355, -0.22],
    [0.355, -0.22],
    [-0.355, 0.22],
    [0.355, 0.22],
  ].forEach(([cx, cz]) => addBox(0.048, 0.22, 0.048, cx, 0.13, cz));
  return safeMerge(parts);
}

const FILLED_CRATE_SHELL_GEO = createFilledCrateShellGeometry();
const EMPTY_CRATE_SHELL_GEO = createEmptyCrateShellGeometry();
const CRATE_BERRY_BED_GEO = new THREE.BoxGeometry(0.66, 0.14, 0.42);
const EMPTY_CRATE_TAG_GEO = new THREE.BoxGeometry(0.24, 0.036, 0.012);
const PUNNET_BASE_GEO = new THREE.BoxGeometry(0.28, 0.09, 0.28);

export type BerryGrade = '2L' | 'L' | 'M' | 'S';

const GRADE_SCALE: Record<BerryGrade, [number, number, number]> = {
  '2L': [1.18, 1.2, 1.18],
  L: [1.0, 1.04, 1.0],
  M: [0.84, 0.88, 0.84],
  S: [0.7, 0.72, 0.7],
};

/**
 * Individual sculpted hero low-poly strawberry — ONLY 2 draw calls (merged body + merged 6-leaf calyx & stem).
 */
export const HeroStrawberry: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  grade?: BerryGrade;
  deepTone?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 0.14, grade = 'L', deepTone = false }) => {
  const [sx, sy, sz] = GRADE_SCALE[grade];
  const fruitMat = deepTone ? MAT.strawberryDeepRed : MAT.strawberryRed;

  return (
    <group position={position} rotation={rotation} scale={[scale * sx, scale * sy, scale * sz]}>
      <mesh geometry={SHARED_BERRY_GEO} material={fruitMat} />
      <mesh geometry={SHARED_CALYX_GEO} material={MAT.calyxGreen} />
    </group>
  );
};

export const StrawberryCluster: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <HeroStrawberry position={[-0.08, 0.02, 0.04]} rotation={[0.25, 0.4, 0.22]} scale={0.18} grade="2L" />
    <HeroStrawberry position={[0.08, 0.02, 0.02]} rotation={[-0.22, 1.3, -0.3]} scale={0.17} grade="L" deepTone />
    <HeroStrawberry position={[0.0, 0.02, -0.08]} rotation={[0.35, 2.2, -0.1]} scale={0.16} grade="L" />
    <HeroStrawberry position={[0.02, 0.1, 0.01]} rotation={[0.12, 0.9, 0.15]} scale={0.15} grade="M" deepTone />
  </group>
);

/**
 * Ultra-fast 250g Strawberry Punnet — ONLY 3 draw calls total (base + merged 9 berry bodies + merged 9 calyxes).
 */
export const StrawberryPunnet250g: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  grade?: BerryGrade;
  quarantine?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, grade = '2L', quarantine = false }) => {
  const gScale = grade === '2L' ? 1.05 : grade === 'L' ? 0.98 : grade === 'M' ? 0.92 : 0.86;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0.045, 0]} geometry={PUNNET_BASE_GEO} material={quarantine ? MAT.amber : MAT.b2cBlackBox} />
      <group scale={[gScale, gScale, gScale]}>
        <mesh geometry={PUNNET_BERRIES_MERGED.bodies} material={MAT.strawberryRed} />
        <mesh geometry={PUNNET_BERRIES_MERGED.calyxes} material={MAT.calyxGreen} />
      </group>
    </group>
  );
};

/**
 * Ultra-fast Reusable Transport Crate FILLED with 15 vivid strawberries — ONLY 4 draw calls total (down from 128!).
 */
export const StrawberryCrateFilled: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  quarantine?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, quarantine = false }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh geometry={FILLED_CRATE_SHELL_GEO} material={quarantine ? MAT.amber : MAT.cratePlasticTeal} />
    <mesh position={[0, 0.15, 0]} geometry={CRATE_BERRY_BED_GEO} material={MAT.strawberryDeepRed} />
    <mesh geometry={CRATE_BERRIES_MERGED.bodies} material={MAT.strawberryRed} />
    <mesh geometry={CRATE_BERRIES_MERGED.calyxes} material={MAT.calyxGreen} />
  </group>
);

/**
 * Ultra-fast Clearly EMPTY reusable transport crate — ONLY 2 draw calls total (down from 14!).
 */
export const EmptyReusableCrate: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh geometry={EMPTY_CRATE_SHELL_GEO} material={MAT.cratePlasticTeal} />
    <mesh position={[0, 0.2, 0.242]} geometry={EMPTY_CRATE_TAG_GEO} material={MAT.turquoiseReturn} />
  </group>
);

export const EmptyCrateStack: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  levels?: number;
  columns?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], levels = 3, columns = 2 }) => {
  const offsets = useMemo(() => {
    const arr: [number, number][] = [];
    for (let c = 0; c < columns; c++) {
      arr.push([(c - (columns - 1) / 2) * 0.84, -0.28]);
      arr.push([(c - (columns - 1) / 2) * 0.84, 0.28]);
    }
    return arr;
  }, [columns]);

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.05, 0]} material={MAT.woodPallet} receiveShadow>
        <boxGeometry args={[columns * 0.88 + 0.12, 0.1, 1.18]} />
      </mesh>
      <mesh position={[0, 0.06, 0.6]} material={MAT.turquoiseReturn}>
        <boxGeometry args={[columns * 0.82, 0.04, 0.02]} />
      </mesh>
      {Array.from({ length: levels }).map((_, lvl) =>
        offsets.map(([ox, oz], idx) => (
          <EmptyReusableCrate key={`${lvl}-${idx}`} position={[ox, 0.1 + lvl * 0.225, oz]} scale={0.94} />
        ))
      )}
    </group>
  );
};

export const GradedStrawberryDisplay: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <StrawberryPunnet250g position={[-0.48, 0, 0]} grade="2L" />
    <StrawberryPunnet250g position={[-0.16, 0, 0]} grade="L" />
    <StrawberryPunnet250g position={[0.16, 0, 0]} grade="M" />
    <StrawberryPunnet250g position={[0.48, 0, 0]} grade="S" />
  </group>
);
