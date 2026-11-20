import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box, Eye, Image as ImageIcon, Layers, X } from 'lucide-react';
import { ICBOXVariant } from '../data/types';
import { ICBOXContainer } from '../models/ICBOXModel';

interface ICBOXShowcaseModalProps {
  onClose: () => void;
  onFocusPresetInWorld: (preset: 'CLOSED' | 'OPEN') => void;
}

const VARIANT_META: { id: ICBOXVariant; code: string; label: string; desc: string }[] = [
  { id: 'closed', code: 'A', label: 'Lid Closed', desc: 'Latched insulated transport configuration.' },
  { id: 'open', code: 'B', label: 'Lid Open', desc: '105° hinged lid revealing deep insulated well.' },
  { id: 'empty', code: 'C', label: 'Empty Interior', desc: 'Sanitized hollow thick-walled body ready for reload.' },
  { id: 'strawberries', code: 'D', label: 'With Strawberries', desc: 'Holding 250g punnet bays with low-poly berries.' },
  { id: 'secured', code: 'E', label: 'Secured + Coolants', desc: 'Fitted with frozen blue coolant slabs and berry load.' },
  { id: 'handling', code: 'F', label: 'Active Handling', desc: 'Tagged for dock unloading / forklift transfer.' },
  { id: 'returned', code: 'G', label: 'Returned Empty', desc: 'Amber return tag routed from last-mile customer drop.' },
  { id: 'quarantine', code: 'H', label: 'Quarantine QC', desc: 'Red inspection tag isolated at ST-07 Quarantine Bay.' },
];

const REFERENCE_SHEETS = [
  { title: 'ICBOX Hero Render Reference', src: '/images/references/ref-b-icbox.jpg' },
  { title: 'B2C 250g/500g Black Box (Supplied)', src: '/images/pkg-b2c-black-box.jpg' },
  { title: 'Low-Poly Strawberry Reference', src: '/images/references/ref-c-strawberry.jpg' },
  { title: 'Industrial Campus Concept', src: '/images/references/ref-a-environment.jpg' },
  { title: 'Line-Haul Delivery Vehicle', src: '/images/references/ref-d-vehicle.jpg' },
  { title: 'Facility Equipment Pack', src: '/images/references/ref-e-facility-pack.jpg' },
  { title: 'Terrain & World Props', src: '/images/references/ref-f-terrain-pack.jpg' },
];

export const ICBOXShowcaseModal: React.FC<ICBOXShowcaseModalProps> = ({
  onClose,
  onFocusPresetInWorld,
}) => {
  const [variant, setVariant] = useState<ICBOXVariant>('strawberries');
  const [tab, setTab] = useState<'3D_ICBOX' | 'REFERENCES'>('3D_ICBOX');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#040D17]/80 p-3 backdrop-blur-md sm:p-6">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#42C7E8]/45 bg-[#0A1C2E] shadow-2xl">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#42C7E8]/25 bg-[#102A43] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E7C24E]/60 bg-[#E7C24E]/15">
              <Box className="h-4 w-4 text-[#F4D97B]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F4F7F8]">
                ICBOX Hero Container &amp; 3D Asset Reference Studio
              </h2>
              <p className="font-mono text-[10px] text-[#A9E8F5]">
                Inspect all 8 ICBOX reusable container variants or jump directly to the 3D campus showcase plinth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('3D_ICBOX')}
              className={`flex items-center gap-1 rounded-md border px-2.5 py-1 font-mono text-[10px] ${
                tab === '3D_ICBOX'
                  ? 'border-[#42C7E8] bg-[#42C7E8] text-[#071524] font-bold'
                  : 'border-[#42C7E8]/30 text-[#A9E8F5]'
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>3D ICBOX Variants</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('REFERENCES')}
              className={`flex items-center gap-1 rounded-md border px-2.5 py-1 font-mono text-[10px] ${
                tab === 'REFERENCES'
                  ? 'border-[#42C7E8] bg-[#42C7E8] text-[#071524] font-bold'
                  : 'border-[#42C7E8]/30 text-[#A9E8F5]'
              }`}
            >
              <ImageIcon className="h-3 w-3" />
              <span>Asset Reference Sheets</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close ICBOX Asset Studio"
              className="rounded-lg border border-[#42C7E8]/30 bg-[#173B57] p-1.5 text-[#A9E8F5] hover:text-[#F4F7F8]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        {tab === '3D_ICBOX' ? (
          <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-12">
            <div className="relative h-[320px] bg-[#071524] md:col-span-7 md:h-[480px]">
              <Canvas camera={{ position: [1.35, 1.1, 1.55], fov: 38 }} shadows>
                <color attach="background" args={['#071524']} />
                <ambientLight intensity={0.75} />
                <directionalLight position={[4, 6, 4]} intensity={1.5} castShadow />
                <directionalLight position={[-4, 3, -3]} intensity={0.55} color="#42C7E8" />
                <mesh position={[0, -0.04, 0]} receiveShadow>
                  <cylinderGeometry args={[1.25, 1.35, 0.08, 24]} />
                  <meshStandardMaterial color="#173B57" flatShading />
                </mesh>
                <ICBOXContainer position={[0, 0, 0]} scale={1.35} variant={variant} />
                <OrbitControls enablePan={false} minDistance={1.1} maxDistance={4.2} />
              </Canvas>

              <div className="pointer-events-none absolute bottom-3 left-3 rounded border border-[#42C7E8]/35 bg-[#071524]/85 px-2.5 py-1 font-mono text-[10px] text-[#A9E8F5]">
                Drag to orbit • Scroll to zoom • Variant: <strong className="text-[#F4D97B]">{variant.toUpperCase()}</strong>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-[#42C7E8]/20 p-4 md:col-span-5 md:border-l md:border-t-0">
              <div className="space-y-2">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
                  Select Reusable Container State (A–H)
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-1">
                  {VARIANT_META.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setVariant(item.id)}
                      className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors ${
                        variant === item.id
                          ? 'border-[#E7C24E] bg-[#E7C24E]/15 text-[#F4F7F8]'
                          : 'border-[#42C7E8]/20 bg-[#102A43]/70 text-[#A9E8F5] hover:border-[#42C7E8]/60'
                      }`}
                    >
                      <span className="rounded bg-[#071524] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#F4D97B]">
                        {item.code}
                      </span>
                      <div>
                        <div className="text-xs font-semibold">{item.label}</div>
                        <div className="text-[10px] text-[#8C9BA5]">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-[#42C7E8]/20 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    onFocusPresetInWorld('CLOSED');
                    onClose();
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E7C24E]/60 bg-[#E7C24E]/15 py-2 font-mono text-[10px] font-bold text-[#F4D97B] hover:bg-[#E7C24E] hover:text-[#071524]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Closed in World</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onFocusPresetInWorld('OPEN');
                    onClose();
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#42C7E8]/60 bg-[#42C7E8]/20 py-2 font-mono text-[10px] font-bold text-[#A9E8F5] hover:bg-[#42C7E8] hover:text-[#071524]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Open in World</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3">
            {REFERENCE_SHEETS.map((ref) => (
              <div
                key={ref.src}
                className="overflow-hidden rounded-xl border border-[#42C7E8]/30 bg-[#102A43]/80"
              >
                <img src={ref.src} alt={ref.title} className="h-44 w-full object-cover" loading="lazy" />
                <div className="px-3 py-2 font-mono text-[10px] font-semibold text-[#A9E8F5]">
                  {ref.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
