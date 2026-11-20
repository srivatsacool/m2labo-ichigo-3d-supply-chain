import React, { lazy, Suspense, useState } from 'react';
import { PackageOpen, Box, ShieldAlert, CheckCircle2, Layers, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { EQUIPMENT_AND_ASSET_CATALOG, PACKAGING_SPECS } from '../../data/equipmentAndPackagingData';
import { PACKAGING_PICTURE_ASSETS, STATION_PICTURE_ASSETS } from '../../data/visualAssetsData';
import { PackagingBlueprintSvg } from '../diagrams/PackagingBlueprintSvg';
import { StatusBadge } from '../layout/StatusBadge';
import { useBlueprint } from '../../context/BlueprintContext';
import type { SpatialSceneId } from '../three/SpatialSceneViewer';

const SpatialSceneViewer = lazy(() => import('../three/SpatialSceneViewer'));

export const EquipmentPackagingAtlas: React.FC = () => {
  const { visualMode, setVisualMode, setLightboxImage } = useBlueprint();
  const [selectedScene, setSelectedScene] = useState<SpatialSceneId>('cooler-packaging');
  const [show3DCanvas, setShow3DCanvas] = useState<boolean>(false);

  const allPictures = [
    ...Object.values(STATION_PICTURE_ASSETS),
    PACKAGING_PICTURE_ASSETS.B2C,
    PACKAGING_PICTURE_ASSETS.B2B,
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-6">
      {/* B2C vs B2B Separate Packaging Blueprint Section */}
      <section className="rounded border border-[#42C7E8]/35 bg-[#102A43] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#42C7E8]">
              <PackageOpen className="h-4 w-4" />
              <span>CHANNEL-SEPARATED PACKAGING ENGINEERING BLUEPRINTS</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-[#F5FAFC]">
              B2C Black 250g / 500g Retail Pack vs B2B Moulded Cavity Sheet/Tray
            </h2>
            <p className="mt-1 text-xs text-[#9BB4C5]">
              Per project rule: B2C black branded retail boxes are kept strictly separate from B2B moulded cavity packaging and never merged with EPS/thermocol transport insulation shells.
            </p>
          </div>
          <StatusBadge status="CONFIRMED IN PROJECT DISCUSSION" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {PACKAGING_SPECS.map((pkg) => (
            <div key={pkg.id} className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-[#0B1F33] border border-[#42C7E8]/40 px-2.5 py-0.5 font-mono text-xs font-bold text-[#42C7E8]">
                  {pkg.id} SPECIFICATION
                </span>
                <span className="font-mono text-[10px] text-[#9BB4C5]">{pkg.imageClassification}</span>
              </div>
              <h3 className="text-base font-bold text-[#F5FAFC]">{pkg.title}</h3>

              <PackagingBlueprintSvg variant={pkg.id} />

              <div className="grid gap-2 rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-3 text-xs">
                <p><strong className="text-[#42C7E8]">Target Channel:</strong> {pkg.channel}</p>
                <p><strong className="text-[#42C7E8]">Weight Spec:</strong> {pkg.unitWeight}</p>
                <p><strong className="text-[#42C7E8]">Configuration:</strong> {pkg.packConfiguration}</p>
                <p><strong className="text-[#42C7E8]">Berry Protection:</strong> {pkg.cavityProtection}</p>
                <p className="text-[#F69D9B]"><strong>Dimensions:</strong> {pkg.dimensions}</p>
              </div>

              <ul className="space-y-1 text-xs text-[#EAF5F8]">
                {pkg.notes.map((n, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#42C7E8] mt-0.5" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Full Visual & Picture Mode Gallery (All 11 Stations + B2C/B2B Packaging) */}
      <section className="rounded border border-[#42C7E8]/30 bg-[#102A43] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#42C7E8]">
              <ImageIcon className="h-4 w-4" />
              <span>PICTURE MODE VISUAL GALLERY (11 STATIONS + B2C / B2B PACKAGING)</span>
            </div>
            <p className="mt-1 text-xs text-[#9BB4C5]">
              All generated visuals are clearly marked as conceptual visuals/renders (never actual unverified HiMedia hardware photos). Click any picture to zoom.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {(['PICTURE', '2D_CAD', '3D_SPATIAL'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setVisualMode(m)}
                className={`rounded border px-2.5 py-1 font-mono text-[10px] font-semibold ${
                  visualMode === m
                    ? 'border-[#42C7E8] bg-[#42C7E8]/20 text-[#F5FAFC]'
                    : 'border-[#42C7E8]/25 bg-[#0B1F33] text-[#9BB4C5]'
                }`}
              >
                {m === 'PICTURE' ? 'Picture Mode' : m === '2D_CAD' ? '2D CAD Mode' : '3D Mode'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allPictures.map((pic) => (
            <button
              key={pic.key}
              type="button"
              onClick={() =>
                setLightboxImage({
                  src: pic.src,
                  title: pic.title,
                  caption: pic.caption,
                  classification: pic.classification,
                })
              }
              className="group flex flex-col overflow-hidden rounded border border-[#42C7E8]/25 bg-[#0B1F33] text-left hover:border-[#42C7E8] transition-colors"
            >
              <div className="relative h-36 w-full overflow-hidden bg-[#06121E]">
                <img
                  src={pic.src}
                  alt={pic.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded border border-[#E9A23B]/50 bg-[#0B1F33]/90 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-[#F5C57B]">
                  {pic.classification}
                </span>
                <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-[#0B1F33]/85 px-1.5 py-0.5 font-mono text-[9px] text-[#42C7E8]">
                  <ZoomIn className="h-3 w-3" />
                  Zoom
                </span>
              </div>
              <div className="p-3 space-y-1">
                <div className="text-xs font-bold text-[#F5FAFC]">{pic.title}</div>
                <p className="text-[11px] text-[#9BB4C5] line-clamp-2">{pic.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lazy-Loaded 3D Spatial Viewer with Scene Switcher */}
      <section className="rounded border border-[#42C7E8]/30 bg-[#102A43] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#42C7E8]">
              <Box className="h-4 w-4" />
              <span>ON-DEMAND 3D SPATIAL SCENES (POLYFORK CC BY 4.0 + CONCEPTUAL MODELS)</span>
            </div>
            <p className="mt-1 text-xs text-[#9BB4C5]">
              3D WebGL scenes load strictly on demand to preserve fast 2D first paint and low power usage.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'farm', label: '01 · Greenhouse & Robot' },
                { id: 'cooler-packaging', label: '02 · Blast Cooler & Packaging' },
                { id: 'warehouse-transport', label: '03 · Transport & MIDC 4-Zones' },
              ] as const
            ).map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setSelectedScene(sc.id);
                  setShow3DCanvas(true);
                }}
                className={`rounded border px-3 py-1.5 font-mono text-xs transition-colors ${
                  show3DCanvas && selectedScene === sc.id
                    ? 'border-[#42C7E8] bg-[#42C7E8]/20 text-[#F5FAFC]'
                    : 'border-[#42C7E8]/30 bg-[#0B1F33] text-[#9BB4C5] hover:text-[#F5FAFC]'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        {show3DCanvas ? (
          <Suspense
            fallback={
              <div className="rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-8 text-center font-mono text-xs text-[#42C7E8]">
                Loading Three.js Spatial Blueprint Scene & Polyfork CC BY 4.0 GLB assets...
              </div>
            }
          >
            <SpatialSceneViewer sceneId={selectedScene} />
          </Suspense>
        ) : (
          <div className="flex flex-col items-center justify-center rounded border border-dashed border-[#42C7E8]/35 bg-[#0B1F33] p-8 text-center">
            <Layers className="h-8 w-8 text-[#42C7E8]" />
            <p className="mt-2 text-sm font-semibold text-[#F5FAFC]">2D Fast Mode Active (Zero 3D Payload Loaded Yet)</p>
            <p className="mt-1 max-w-lg text-xs text-[#9BB4C5]">
              Select one of the three spatial scenes above to lazy-load interactive Three.js 3D models (Farm Greenhouse, Blast Cooler & Exploded Packaging, or Andheri MIDC 4-Zone Warehouse).
            </p>
            <button
              type="button"
              onClick={() => setShow3DCanvas(true)}
              className="mt-4 rounded border border-[#42C7E8] bg-[#42C7E8]/20 px-4 py-2 font-mono text-xs font-bold text-[#F5FAFC] hover:bg-[#42C7E8] hover:text-[#0B1F33]"
            >
              Load Selected 3D Scene
            </button>
          </div>
        )}
      </section>

      {/* Equipment & Polyfork CC BY 4.0 Asset License Manifest */}
      <section className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              Equipment, Facility & 3D Asset License Manifest (9 Items)
            </h3>
            <p className="mt-1 text-xs text-[#9BB4C5]">
              Explicitly distinguishes actual project specifications from conceptual 3D models. Polyfork free low-poly GLBs are used under CC BY 4.0 attribution.
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded border border-[#E9A23B]/40 bg-[#E9A23B]/10 px-2.5 py-1 font-mono text-[10px] text-[#F5C57B]">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Never claim conceptual models depict actual HiMedia hardware</span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {EQUIPMENT_AND_ASSET_CATALOG.map((item) => (
            <div key={item.id} className="flex flex-col justify-between rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-4 text-xs space-y-2.5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#42C7E8]">{item.id} · {item.category}</span>
                  <StatusBadge status={item.status} compact />
                </div>
                <h4 className="text-sm font-bold text-[#F5FAFC]">{item.name}</h4>
                <div className="font-mono text-[10px] text-[#86E1F7]">{item.assetClassification}</div>
                <p className="text-[#EAF5F8]/90">{item.description}</p>
              </div>

              <div className="space-y-1 border-t border-[#42C7E8]/15 pt-2 text-[11px]">
                <p><strong className="text-[#7AE0B3]">Known:</strong> {item.knownSpecs}</p>
                <p><strong className="text-[#F69D9B]">Unknown:</strong> {item.unknownSpecs}</p>
                {item.polyforkCredit && (
                  <div className="mt-1.5 rounded border border-[#42C7E8]/20 bg-[#12334D] p-2 font-mono text-[10px] text-[#9BB4C5]">
                    <div>License: {item.polyforkLicense} · {item.triangles} tris</div>
                    <div className="truncate" title={item.polyforkCredit}>Credit: {item.polyforkCredit}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
