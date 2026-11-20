import * as THREE from 'three';

function createMouldedPlasticBumpTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 2) {
    for (let x = 0; x < 128; x += 2) {
      const jitter = ((x * 37 + y * 91) % 19) - 9;
      const v = Math.max(100, Math.min(156, 128 + jitter));
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  ctx.fillStyle = 'rgba(200,200,200,0.22)';
  ctx.fillRect(0, 28, 128, 4);
  ctx.fillRect(0, 96, 128, 4);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function createWovenFabricBumpTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#787878';
  ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 4) {
    for (let x = 0; x < 128; x += 4) {
      const checker = ((x / 4 + y / 4) % 2) === 0;
      ctx.fillStyle = checker ? '#969696' : '#5e5e5e';
      ctx.fillRect(x, y, 3, 3);
    }
  }
  // Subtle fabric panel crease lines
  ctx.strokeStyle = 'rgba(40,40,40,0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 32);
  ctx.lineTo(128, 36);
  ctx.moveTo(0, 94);
  ctx.lineTo(128, 90);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createStrawberrySkinTexture(baseHex: string, deepHex: string): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, deepHex);
  grad.addColorStop(0.35, baseHex);
  grad.addColorStop(0.85, baseHex);
  grad.addColorStop(1, '#F24D4D');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Offset rows of natural golden achene seeds with dark dimple halos
  const rows = 9;
  const cols = 14;
  for (let r = 1; r < rows; r++) {
    const y = (r / rows) * 256;
    const rowOffset = (r % 2) * (256 / cols / 2);
    for (let c = 0; c < cols; c++) {
      const x = (c / cols) * 256 + rowOffset;
      ctx.fillStyle = 'rgba(110, 12, 18, 0.52)';
      ctx.beginPath();
      ctx.ellipse(x, y + 1, 3.6, 5.0, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F7DC88';
      ctx.beginPath();
      ctx.ellipse(x, y, 2.0, 3.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createConcreteApronTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#1D3247';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 900; i++) {
    const x = (i * 83) % 256;
    const y = (i * 59) % 256;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.05)';
    ctx.fillRect(x, y, 3, 3);
  }

  // Expansion joint lines (subtle architectural concrete slabs)
  ctx.strokeStyle = 'rgba(12, 24, 38, 0.42)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 254, 254);
  ctx.beginPath();
  ctx.moveTo(128, 0);
  ctx.lineTo(128, 256);
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 14);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createAsphaltRoadTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#172330';
  ctx.fillRect(0, 0, 256, 128);

  for (let i = 0; i < 700; i++) {
    const x = (i * 73) % 256;
    const y = (i * 41) % 128;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.09)';
    ctx.fillRect(x, y, 2, 2);
  }

  // Crisp road edge markings
  ctx.fillStyle = 'rgba(226, 236, 244, 0.34)';
  ctx.fillRect(0, 6, 256, 3);
  ctx.fillRect(0, 119, 256, 3);

  // Dashed lane divider
  ctx.fillStyle = 'rgba(240, 210, 120, 0.52)';
  for (let x = 10; x < 256; x += 46) {
    ctx.fillRect(x, 62, 24, 4);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createWindowFacadeTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Deep architectural charcoal-slate concrete masonry facade
  ctx.fillStyle = '#1C2E40';
  ctx.fillRect(0, 0, 256, 256);

  // Subtle architectural floor slab bands
  ctx.fillStyle = '#152433';
  for (let y = 0; y < 256; y += 32) {
    ctx.fillRect(0, y, 256, 6);
  }

  const cols = 5;
  const rows = 8;
  const cellW = 256 / cols;
  const cellH = 256 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = (r * 17 + c * 31) % 13;
      if (seed < 3) {
        ctx.fillStyle = '#E8BE78'; // Warm apartment window (tasteful twilight tone)
      } else if (seed === 4) {
        ctx.fillStyle = '#73BDD4'; // Subtle cool office glow
      } else {
        ctx.fillStyle = '#0F1C2A'; // Unlit dark glass pane (65%+ dark masonry/glass balance!)
      }
      ctx.fillRect(c * cellW + 12, r * cellH + 10, cellW - 24, cellH - 18);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function mat(
  color: string,
  options: {
    roughness?: number;
    metalness?: number;
    emissive?: string;
    emissiveIntensity?: number;
    transparent?: boolean;
    opacity?: number;
    flatShading?: boolean;
    bumpMap?: THREE.Texture | null;
    bumpScale?: number;
    map?: THREE.Texture | null;
    side?: THREE.Side;
  } = {}
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: options.flatShading ?? true,
    roughness: options.roughness ?? 0.68,
    metalness: options.metalness ?? 0.1,
    emissive: options.emissive ? new THREE.Color(options.emissive) : new THREE.Color('#000000'),
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    bumpMap: options.bumpMap ?? null,
    bumpScale: options.bumpScale ?? 0.01,
    map: options.map ?? null,
    side: options.side ?? THREE.FrontSide,
  });
}

const plasticBump = createMouldedPlasticBumpTexture();
const fabricBump = createWovenFabricBumpTexture();
const concreteTex = createConcreteApronTexture();
const roadTex = createAsphaltRoadTexture();
const windowTex = createWindowFacadeTexture();
const berrySkinRed = createStrawberrySkinTexture('#E62B35', '#A8151E');
const berrySkinDeep = createStrawberrySkinTexture('#C71F28', '#861017');

export const MAT = {
  // Architectural & Terrain Surfaces
  deepNavy: mat('#0D1E30', { roughness: 0.86, metalness: 0.08 }),
  industrialFloor: mat('#1F354A', {
    roughness: 0.84,
    metalness: 0.08,
    map: concreteTex,
    flatShading: false,
  }),
  concretePad: mat('#2C4054', { roughness: 0.88, metalness: 0.05 }),
  concreteCurb: mat('#6B7E8F', { roughness: 0.85, metalness: 0.06 }),
  secondaryNavy: mat('#1A3852', { roughness: 0.72, metalness: 0.16 }),
  warehouseWall: mat('#C9D6E0', { roughness: 0.62, metalness: 0.22 }),
  warehouseRoof: mat('#27435C', { roughness: 0.65, metalness: 0.34 }),
  insulatedPanel: mat('#DCE6EE', { roughness: 0.48, metalness: 0.18 }),
  slateDark: mat('#1F3346', { roughness: 0.8, metalness: 0.12 }),
  farmSoil: mat('#2D2621', { roughness: 0.96, metalness: 0.0 }),
  farmGrass: mat('#1F4638', { roughness: 0.92, metalness: 0.02 }),
  hillTerrain: mat('#16313E', { roughness: 0.92, metalness: 0.02 }),
  distantRidge: mat('#0F2334', { roughness: 0.95, metalness: 0.0 }),
  barnWood: mat('#5B3E31', { roughness: 0.86, metalness: 0.04 }),
  barnRoof: mat('#3B2A26', { roughness: 0.82, metalness: 0.14 }),
  urbanFacadeWarm: mat('#3A4A5B', { roughness: 0.76, metalness: 0.08 }),
  urbanFacadeLight: mat('#D8DFE6', { roughness: 0.7, metalness: 0.06 }),
  urbanWindows: mat('#FFFFFF', {
    roughness: 0.62,
    metalness: 0.16,
    map: windowTex,
    emissive: '#B88948',
    emissiveIntensity: 0.08,
    flatShading: false,
  }),
  distantCity: mat('#1A3248', { roughness: 0.82, metalness: 0.12 }),

  // Roads & Infrastructure
  asphalt: mat('#1C2836', {
    roughness: 0.92,
    metalness: 0.04,
    map: roadTex,
    flatShading: false,
  }),
  asphaltPlain: mat('#1A2532', { roughness: 0.92, metalness: 0.04 }),
  sidewalk: mat('#495B6B', { roughness: 0.88, metalness: 0.04 }),
  roadLine: mat('#DCE8F0', { roughness: 0.6, emissive: '#9BC8DC', emissiveIntensity: 0.1 }),

  // Accents & Flow Signifiers (Restrained, High-Contrast)
  cyan: mat('#42C7E8', { roughness: 0.36, metalness: 0.22, emissive: '#42C7E8', emissiveIntensity: 0.32 }),
  cyanSubtle: mat('#27B7D8', { roughness: 0.45, metalness: 0.2, emissive: '#27B7D8', emissiveIntensity: 0.15 }),
  lightCyan: mat('#A9E8F5', { roughness: 0.42, metalness: 0.16 }),
  turquoiseReturn: mat('#2DD4BF', { roughness: 0.42, metalness: 0.18, emissive: '#14B8A6', emissiveIntensity: 0.28 }),
  offWhite: mat('#EDF3F7', { roughness: 0.62, metalness: 0.06 }),
  neutralGrey: mat('#8C9BA5', { roughness: 0.72, metalness: 0.2 }),
  darkGrey: mat('#394856', { roughness: 0.76, metalness: 0.24 }),
  rubberBlack: mat('#151B22', { roughness: 0.94, metalness: 0.04 }),
  b2cBlackBox: mat('#151A22', { roughness: 0.52, metalness: 0.18 }),
  amber: mat('#E9A23B', { roughness: 0.48, emissive: '#E9A23B', emissiveIntensity: 0.24 }),
  red: mat('#D9534F', { roughness: 0.46, emissive: '#D9534F', emissiveIntensity: 0.26 }),
  green: mat('#3CA77A', { roughness: 0.5, emissive: '#3CA77A', emissiveIntensity: 0.2 }),

  // Black Insulated Delivery Bag Materials (Ballistic Nylon Fabric + Thermal Foil Liner)
  bagBlackFabric: mat('#1A1F26', {
    roughness: 0.86,
    metalness: 0.05,
    bumpMap: fabricBump,
    bumpScale: 0.012,
    flatShading: false,
  }),
  bagStrapWebbing: mat('#101419', {
    roughness: 0.78,
    metalness: 0.08,
  }),
  bagZipperTrim: mat('#343E4A', {
    roughness: 0.42,
    metalness: 0.65,
  }),
  bagFoilLiner: mat('#D8E2EC', {
    roughness: 0.26,
    metalness: 0.82,
    flatShading: true,
  }),
  bagThermalGlowCyan: mat('#42C7E8', {
    roughness: 0.2,
    emissive: '#42C7E8',
    emissiveIntensity: 0.85,
  }),
  bagThermalGlowAmber: mat('#F59E0B', {
    roughness: 0.2,
    emissive: '#F59E0B',
    emissiveIntensity: 0.85,
  }),

  // Reusable Transport Crate Material (Clearly distinguishable empty vs strawberry-filled)
  cratePlasticTeal: mat('#2C6E75', {
    roughness: 0.56,
    metalness: 0.08,
    bumpMap: plasticBump,
    bumpScale: 0.004,
  }),
  cratePlasticRim: mat('#3A8B94', {
    roughness: 0.5,
    metalness: 0.1,
  }),
  crateEmptyInner: mat('#194147', {
    roughness: 0.74,
    metalness: 0.05,
  }),

  // Supporting ICBOX Reusable Insulated Container Materials
  icboxYellowBody: mat('#E7C24E', {
    roughness: 0.44,
    metalness: 0.06,
    bumpMap: plasticBump,
    bumpScale: 0.004,
    emissive: '#8E6F16',
    emissiveIntensity: 0.05,
  }),
  icboxYellowRim: mat('#D5AC35', {
    roughness: 0.48,
    metalness: 0.08,
    bumpMap: plasticBump,
    bumpScale: 0.005,
  }),
  icboxYellowLight: mat('#F4D97B', { roughness: 0.38, metalness: 0.06 }),
  icboxInnerWell: mat('#1B3042', { roughness: 0.62, metalness: 0.12 }),
  icboxInnerLiner: mat('#D4DCE2', { roughness: 0.55, metalness: 0.08 }),
  icboxClipDark: mat('#202832', { roughness: 0.34, metalness: 0.68 }),
  icboxGripRecess: mat('#9E7A1F', { roughness: 0.68, metalness: 0.06 }),
  icboxCoolantBlue: mat('#53D3F0', {
    roughness: 0.26,
    metalness: 0.16,
    emissive: '#27B7D8',
    emissiveIntensity: 0.24,
  }),

  // HERO STRAWBERRY MATERIALS (Rich glossy natural red with golden seeds, vivid against twilight world)
  strawberryRed: mat('#FFFFFF', {
    roughness: 0.32,
    metalness: 0.04,
    map: berrySkinRed,
    emissive: '#6E0D14',
    emissiveIntensity: 0.22,
    flatShading: true,
  }),
  strawberryDeepRed: mat('#FFFFFF', {
    roughness: 0.36,
    metalness: 0.04,
    map: berrySkinDeep,
    emissive: '#580A10',
    emissiveIntensity: 0.18,
    flatShading: true,
  }),
  strawberrySolidRed: mat('#E52834', {
    roughness: 0.34,
    metalness: 0.04,
    emissive: '#6E0D14',
    emissiveIntensity: 0.22,
  }),
  strawberrySeed: mat('#F5D782', { roughness: 0.55, metalness: 0.05 }),
  calyxGreen: mat('#4CA64C', { roughness: 0.62, metalness: 0.03, emissive: '#163818', emissiveIntensity: 0.1 }),
  leafGreen: mat('#2E8B57', { roughness: 0.74, metalness: 0.03 }),
  foliageDark: mat('#1D5340', { roughness: 0.84, metalness: 0.02 }),
  foliageTeal: mat('#236459', { roughness: 0.82, metalness: 0.03 }),
  woodPallet: mat('#9E7B56', { roughness: 0.86, metalness: 0.02 }),
  skinTone: mat('#E0B59A', { roughness: 0.75, metalness: 0.02 }),
  glassIce: mat('#A9E8F5', {
    roughness: 0.18,
    metalness: 0.16,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
  }),
  greenhouseGlass: mat('#D8F3E6', {
    roughness: 0.28,
    metalness: 0.08,
    emissive: '#7FD9A8',
    emissiveIntensity: 0.16,
    transparent: true,
    opacity: 0.52,
    side: THREE.DoubleSide,
  }),
  zoneSellable: mat('#3CA77A', { roughness: 0.68, transparent: true, opacity: 0.34 }),
  zoneReshuffle: mat('#42C7E8', { roughness: 0.68, transparent: true, opacity: 0.32 }),
  zoneValueAdd: mat('#E9A23B', { roughness: 0.68, transparent: true, opacity: 0.32 }),
  zoneScrap: mat('#D9534F', { roughness: 0.68, transparent: true, opacity: 0.38 }),
  steelRack: mat('#738694', { roughness: 0.48, metalness: 0.52 }),
  goldAccent: mat('#D8B467', { roughness: 0.4, metalness: 0.45 }),
  warmLampGlow: mat('#FFE0A0', { roughness: 0.28, emissive: '#FFBE5C', emissiveIntensity: 0.8 }),
};
