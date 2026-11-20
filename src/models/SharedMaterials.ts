import * as THREE from 'three';

function mat(
  color: string,
  options: {
    roughness?: number;
    metalness?: number;
    emissive?: string;
    emissiveIntensity?: number;
    transparent?: boolean;
    opacity?: number;
  } = {}
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: options.roughness ?? 0.68,
    metalness: options.metalness ?? 0.12,
    emissive: options.emissive ? new THREE.Color(options.emissive) : new THREE.Color('#000000'),
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
  });
}

export const MAT = {
  deepNavy: mat('#102A43', { roughness: 0.78, metalness: 0.1 }),
  secondaryNavy: mat('#173B57', { roughness: 0.72, metalness: 0.14 }),
  slateDark: mat('#1E3A52', { roughness: 0.8 }),
  asphalt: mat('#1A2E40', { roughness: 0.9, metalness: 0.05 }),
  roadLine: mat('#A9E8F5', { roughness: 0.5, emissive: '#42C7E8', emissiveIntensity: 0.15 }),
  cyan: mat('#42C7E8', { roughness: 0.4, metalness: 0.25, emissive: '#42C7E8', emissiveIntensity: 0.28 }),
  lightCyan: mat('#A9E8F5', { roughness: 0.45, metalness: 0.18 }),
  offWhite: mat('#F4F7F8', { roughness: 0.62, metalness: 0.08 }),
  neutralGrey: mat('#8C9BA5', { roughness: 0.75, metalness: 0.18 }),
  darkGrey: mat('#465866', { roughness: 0.78, metalness: 0.22 }),
  rubberBlack: mat('#182026', { roughness: 0.92, metalness: 0.05 }),
  b2cBlackBox: mat('#141A21', { roughness: 0.52, metalness: 0.2 }),
  amber: mat('#E9A23B', { roughness: 0.48, emissive: '#E9A23B', emissiveIntensity: 0.22 }),
  red: mat('#D9534F', { roughness: 0.48, emissive: '#D9534F', emissiveIntensity: 0.22 }),
  green: mat('#3CA77A', { roughness: 0.5, emissive: '#3CA77A', emissiveIntensity: 0.18 }),
  strawberryRed: mat('#D93B3E', { roughness: 0.55, metalness: 0.05 }),
  leafGreen: mat('#2E8B57', { roughness: 0.76, metalness: 0.04 }),
  foliageTeal: mat('#2A6F72', { roughness: 0.82, metalness: 0.04 }),
  woodPallet: mat('#9E7B56', { roughness: 0.85, metalness: 0.03 }),
  skinTone: mat('#E0B59A', { roughness: 0.75, metalness: 0.02 }),
  glassIce: mat('#A9E8F5', { roughness: 0.25, metalness: 0.15, transparent: true, opacity: 0.42 }),
  zoneSellable: mat('#3CA77A', { roughness: 0.7, transparent: true, opacity: 0.32 }),
  zoneReshuffle: mat('#42C7E8', { roughness: 0.7, transparent: true, opacity: 0.30 }),
  zoneValueAdd: mat('#E9A23B', { roughness: 0.7, transparent: true, opacity: 0.30 }),
  zoneScrap: mat('#D9534F', { roughness: 0.7, transparent: true, opacity: 0.34 }),
  steelRack: mat('#6B7E8C', { roughness: 0.55, metalness: 0.45 }),
  goldAccent: mat('#D8B467', { roughness: 0.45, metalness: 0.38 }),
};
