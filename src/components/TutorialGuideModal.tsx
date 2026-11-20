import React, { useState } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Play,
  RotateCcw,
  Volume2,
  X,
} from 'lucide-react';
import { CameraMode, FlowLayerMode } from '../data/types';

interface TutorialGuideModalProps {
  cameraMode: CameraMode;
  flowMode: FlowLayerMode;
  onChangeCameraMode: (mode: CameraMode) => void;
  onChangeFlowMode: (mode: FlowLayerMode) => void;
  onStartGuidedJourney: () => void;
  onClose: () => void;
}

export const TutorialGuideModal: React.FC<TutorialGuideModalProps> = ({
  cameraMode,
  flowMode,
  onChangeCameraMode,
  onChangeFlowMode,
  onStartGuidedJourney,
  onClose,
}) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to M2Labo ICHIGO® 3D Cold-Chain World',
      icon: Compass,
      accent: '#3CA77A',
      summary:
        'Explore the live strawberry cold-chain from Farm Custody Handover through Andheri MIDC to Mumbai customers — and back.',
      highlights: [
        {
          toggle: 'Default Experience Active',
          result:
            'Play Journey, Material Flow, and Track Shipment are enabled by default so you immediately follow fresh strawberries along every stage.',
        },
        {
          toggle: 'Custody Boundary (Stage 01)',
          result:
            'M2Labo responsibility strictly begins at the Farm Handover Gate. Upstream growing beds and greenhouses provide visual context only.',
        },
        {
          toggle: 'Sound Effects Included',
          result:
            'Tactile QR scan chimes, highway transit cues, delivery POD tones, and subtle cold-chain ambience activate as soon as you start (toggle anytime in the top bar).',
        },
      ],
      quickTry: null,
    },
    {
      title: 'Switch Camera Perspectives Anytime',
      icon: Camera,
      accent: '#42C7E8',
      summary:
        'Use the CAMERA bar in the top-left to switch between three independent perspectives without losing your active stage or flow layer.',
      highlights: [
        {
          toggle: 'OVERVIEW',
          result:
            'Elevated world view with mouse drag to orbit, scroll to zoom, and automatic close-up tracking when Follow Shipment is active.',
        },
        {
          toggle: 'THIRD PERSON',
          result:
            'Walk through the farm, MIDC warehouse, and city with an articulated operations avatar using WASD / Arrow keys, mouse orbit, and Shift to sprint.',
        },
        {
          toggle: 'FIRST PERSON',
          result:
            'Step directly inside facilities at eye level with building collision, WASD navigation, drag-to-look (or Mouse Look Lock), and touch D-pad.',
        },
      ],
      quickTry: 'CAMERA' as const,
    },
    {
      title: 'Toggle Flow Visualization Layers',
      icon: Layers,
      accent: '#3CA77A',
      summary:
        'Use the FLOW bar next to CAMERA to isolate physical strawberry movement, digital ERP/CRM records, or view both together.',
      highlights: [
        {
          toggle: 'MATERIAL FLOW (Default)',
          result:
            'Shows only physical assets: fresh strawberry crates, supporting yellow ICBOX containers, black insulated delivery bags, trucks, and riders.',
        },
        {
          toggle: 'INFORMATION FLOW',
          result:
            'Highlights elevated cyan ERP & CRM data conduits (SHP-ID, TRP-ID, RCV-ID, INV-TXN, ORD-ID, POD-ID, CMP-ID, FIN-INV) converging on Finance Nexus.',
        },
        {
          toggle: 'COMBINED FLOW',
          result:
            'Overlays physical ground routes and elevated digital ERP/CRM arches simultaneously with clean vertical separation.',
        },
      ],
      quickTry: 'FLOW' as const,
    },
    {
      title: 'Two Distinct Reverse-Logistics Loops',
      icon: RotateCcw,
      accent: '#2DD4BF',
      summary:
        'Physical return assets never mix — empty farm crates and last-mile delivery bags follow separate vehicles, routes, and accountability records.',
      highlights: [
        {
          toggle: 'LOOP 1 (Turquoise) — Truck & Empty Crates → Farm',
          result:
            'After unloading strawberries at MIDC Receiving (Stage 03), emptied reusable crates are consolidated and hauled back west to the Farm Receipt Bay (Stage 01).',
        },
        {
          toggle: 'LOOP 2 (Amber) — Rider & Black Delivery Bag → MIDC',
          result:
            'Packed strawberry orders travel inside a reusable black insulated fabric delivery bag (Stage 05 → 06). After handover, the rider returns the empty black bag to MIDC (Stage 07).',
        },
        {
          toggle: 'Quarantine Firewall Rule',
          result:
            'Any returned fruit enters the red walled Quarantine Bay and NEVER automatically re-enters Zone 1 Full Sellable stock.',
        },
      ],
      quickTry: null,
    },
    {
      title: 'Controls, Inspection, Warnings & Sound',
      icon: Volume2,
      accent: '#F59E0B',
      summary:
        'Every control in the top and bottom rails updates the live 3D world immediately:',
      highlights: [
        {
          toggle: 'Play / Pause · Scrubber · Stage Pills (01–08)',
          result:
            'Jump directly to any operational stage, scrub through all 13 beats (including Flow A & Flow B returns), or let the journey play automatically.',
        },
        {
          toggle: 'Follow Shipment · Stage Details · Story Chapters',
          result:
            'Toggle Follow Shipment to lock onto moving strawberries/vehicles; click Inspect or Stage Details for full ERP/CRM SOPs; open Story Chapters for scroll-driven narration.',
        },
        {
          toggle: 'Labels · Warnings · 2D Map · Sound',
          result:
            'Hide/show collision-free 3D labels, toggle prioritized critical exception beacons, switch to 2D schematic view, or mute/unmute sound effects anytime.',
        },
      ],
      quickTry: null,
    },
  ];

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive App Guide"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#040D17]/65 p-3 backdrop-blur-sm sm:p-6"
    >
      <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#42C7E8]/45 bg-[#08192A]/96 shadow-[0_24px_64px_rgba(2,8,16,0.82)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#42C7E8]/20 bg-[#0C2237] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15"
              style={{ backgroundColor: `${current.accent}22`, color: current.accent }}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#42C7E8]">
                Interactive Guide · Step {step + 1} of {steps.length}
              </div>
              <h2 className="text-[17px] font-bold leading-tight text-[#F4F7F8]">{current.title}</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            className="rounded-md border border-[#42C7E8]/25 bg-[#102A43] p-1.5 text-[#A9E8F5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <p className="text-[14px] leading-relaxed text-[#D8EEF7]">{current.summary}</p>

          <div className="divide-y divide-[#42C7E8]/15 rounded-xl border border-[#42C7E8]/20 bg-[#061321]/85 px-4">
            {current.highlights.map((item) => (
              <div key={item.toggle} className="py-3">
                <div className="font-mono text-[12.5px] font-bold text-[#7BE0F7]">{item.toggle}</div>
                <p className="mt-1 text-[13.5px] leading-snug text-[#E2EDF5]">{item.result}</p>
              </div>
            ))}
          </div>

          {/* Live Interactive Toggle Preview right inside the tutorial */}
          {current.quickTry === 'CAMERA' && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#42C7E8]/30 bg-[#0E263D]/80 px-3.5 py-2.5">
              <span className="font-mono text-[12px] text-[#A9E8F5]">Try switching camera live:</span>
              <div className="flex gap-1.5 font-mono text-[11.5px]">
                {(['FIRST_PERSON', 'THIRD_PERSON', 'OVERVIEW'] as CameraMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onChangeCameraMode(m)}
                    className={`rounded px-2.5 py-1 transition-colors ${
                      cameraMode === m
                        ? 'bg-[#42C7E8] font-bold text-[#061220]'
                        : 'border border-[#42C7E8]/35 text-[#C6E8F5] hover:bg-[#173B57]'
                    }`}
                  >
                    {m.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {current.quickTry === 'FLOW' && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#3CA77A]/35 bg-[#0C2624]/80 px-3.5 py-2.5">
              <span className="font-mono text-[12px] text-[#5EE8A8]">Try toggling flow layer live:</span>
              <div className="flex gap-1.5 font-mono text-[11.5px]">
                {(
                  [
                    { id: 'MATERIAL', label: 'MATERIAL FLOW' },
                    { id: 'INFORMATION', label: 'INFORMATION FLOW' },
                    { id: 'COMBINED', label: 'COMBINED FLOW' },
                  ] as { id: FlowLayerMode; label: string }[]
                ).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onChangeFlowMode(f.id)}
                    className={`rounded px-2.5 py-1 transition-colors ${
                      flowMode === f.id
                        ? 'bg-[#3CA77A] font-bold text-[#061220]'
                        : 'border border-[#3CA77A]/35 text-[#C6E8F5] hover:bg-[#143B34]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#42C7E8]/20 bg-[#061321] px-5 py-3">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to step ${idx + 1}`}
                onClick={() => setStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === step ? 'w-6 bg-[#42C7E8]' : 'w-2 bg-[#2B4C66] hover:bg-[#42C7E8]/60'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartGuidedJourney}
              className="rounded-md px-3 py-1.5 font-mono text-[12px] text-[#8C9BA5] hover:text-[#F4F7F8]"
            >
              Skip Tour
            </button>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1 rounded-md border border-[#42C7E8]/35 bg-[#102A43] px-3 py-1.5 font-mono text-[12px] font-semibold text-[#A9E8F5] hover:border-[#42C7E8]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            )}

            {!isLast ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-1 rounded-md bg-[#42C7E8] px-3.5 py-1.5 font-mono text-[12.5px] font-bold text-[#061220] hover:bg-[#A9E8F5]"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onStartGuidedJourney}
                className="flex items-center gap-1.5 rounded-md bg-[#3CA77A] px-4 py-1.5 font-mono text-[12.5px] font-bold text-[#061220] hover:bg-[#5EE8A8]"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Start Journey &amp; Track Shipment</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
