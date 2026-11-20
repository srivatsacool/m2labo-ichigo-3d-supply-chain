import React from 'react';
import {
  Search,
  Printer,
  Box,
  Layers,
  Activity,
  ShieldCheck,
  UserCheck,
  Briefcase,
  HardHat,
  Image as ImageIcon,
} from 'lucide-react';
import { useBlueprint } from '../../context/BlueprintContext';
import { RolePerspective, VisualMode } from '../../types/blueprint';

const PERSPECTIVES: { id: RolePerspective; label: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'WORKER', label: 'Worker View', desc: 'Instructions, checklists, tools, handover', icon: HardHat },
  { id: 'SUPERVISOR', label: 'Supervisor View', desc: 'QC gates, team checks, approvals, exceptions', icon: UserCheck },
  { id: 'MANAGEMENT', label: 'Management View', desc: 'Overview, bottlenecks, FMEA risks, KPIs', icon: Briefcase },
];

const VISUAL_MODES: { id: VisualMode; label: string; shortLabel: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'PICTURE', label: 'Picture Mode', shortLabel: 'Pictures', desc: 'AI-generated conceptual station & packaging visuals', icon: ImageIcon },
  { id: '2D_CAD', label: '2D Blueprint', shortLabel: '2D CAD', desc: 'Lightweight engineering isometric & CAD diagrams', icon: Layers },
  { id: '3D_SPATIAL', label: '3D Spatial', shortLabel: '3D', desc: 'On-demand Three.js WebGL scenes (Polyfork CC BY 4.0)', icon: Box },
];

export const TopCommandBar: React.FC = () => {
  const {
    perspective,
    setPerspective,
    reducedMotion,
    setReducedMotion,
    visualMode,
    setVisualMode,
    setSearchOpen,
    questions,
  } = useBlueprint();

  const openCount = questions.filter((q) => q.currentStatus !== 'RESOLVED').length;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#42C7E8]/25 bg-[#0B1F33]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 lg:px-6">
        {/* Brand / Blueprint Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded border border-[#42C7E8]/60 bg-[#12334D] text-[#42C7E8]">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#42C7E8] uppercase">
                M2LABO BHARAT / ICHIGO®
              </span>
              <span className="hidden rounded border border-[#3CA77A]/50 bg-[#3CA77A]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#7AE0B3] sm:inline-block">
                BLUEPRINT REV 1.1
              </span>
            </div>
            <h1 className="text-sm font-bold tracking-wide text-[#F5FAFC] sm:text-base">
              THE COLD CHAIN — END-TO-END SUPPLY CHAIN OPERATING SYSTEM
            </h1>
          </div>
        </div>

        {/* Perspective Switcher (Preserves Current Milestone Context) */}
        <div className="flex items-center gap-1 rounded border border-[#42C7E8]/25 bg-[#102A43] p-1" role="group" aria-label="Role perspective switcher">
          {PERSPECTIVES.map((item) => {
            const Icon = item.icon;
            const active = perspective === item.id;
            return (
              <button
                key={item.id}
                type="button"
                title={item.desc}
                onClick={() => setPerspective(item.id)}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-[#1D9BF0]/25 text-[#F5FAFC] border border-[#42C7E8]/70'
                    : 'text-[#9BB4C5] hover:text-[#F5FAFC] hover:bg-[#173B57]/60 border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#42C7E8]' : ''}`} />
                <span className="hidden xl:inline">{item.label}</span>
                <span className="xl:hidden">{item.id.slice(0, 4)}</span>
              </button>
            );
          })}
        </div>

        {/* 3-Way Visual Mode Switcher: Picture Mode | 2D Blueprint | 3D Spatial */}
        <div className="flex items-center gap-1 rounded border border-[#42C7E8]/35 bg-[#102A43] p-1" role="group" aria-label="Visual display mode">
          {VISUAL_MODES.map((vm) => {
            const Icon = vm.icon;
            const active = visualMode === vm.id;
            return (
              <button
                key={vm.id}
                type="button"
                title={vm.desc}
                onClick={() => setVisualMode(vm.id)}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[11px] font-semibold transition-colors ${
                  active
                    ? 'border border-[#42C7E8] bg-[#42C7E8]/20 text-[#F5FAFC]'
                    : 'border border-transparent text-[#9BB4C5] hover:bg-[#173B57]/60 hover:text-[#F5FAFC]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#42C7E8]' : ''}`} />
                <span className="hidden lg:inline">{vm.label}</span>
                <span className="lg:hidden">{vm.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Global Utilities: Search, Reduced Motion, Open Questions Alert, Print/PDF */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded border border-[#42C7E8]/35 bg-[#12334D] px-2.5 py-1.5 text-xs text-[#EAF5F8] hover:border-[#42C7E8] hover:bg-[#173B57]"
            aria-label="Open global blueprint search"
          >
            <Search className="h-3.5 w-3.5 text-[#42C7E8]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded bg-[#0B1F33] px-1.5 py-0.5 font-mono text-[10px] text-[#9BB4C5] 2xl:inline">
              Ctrl+K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setReducedMotion(!reducedMotion)}
            title="Toggle Reduced Motion Accessibility Mode"
            aria-pressed={reducedMotion}
            className={`flex items-center gap-1.5 rounded border px-2 py-1.5 font-mono text-xs transition-colors ${
              reducedMotion
                ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#7AE0B3]'
                : 'border-[#42C7E8]/30 bg-[#12334D] text-[#9BB4C5] hover:text-[#F5FAFC]'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden 2xl:inline">{reducedMotion ? 'REDUCED' : 'MOTION'}</span>
          </button>

          <div
            className="hidden items-center gap-1.5 rounded border border-[#E9A23B]/40 bg-[#E9A23B]/10 px-2.5 py-1.5 font-mono text-[11px] text-[#F5C57B] 2xl:flex"
            title="Open Questions & Validation items requiring human sign-off"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{openCount} OPEN</span>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            title="Print or Export Blueprint Report as PDF"
            className="flex items-center gap-1.5 rounded border border-[#42C7E8]/40 bg-[#173B57] px-2.5 py-1.5 text-xs font-medium text-[#F5FAFC] hover:border-[#42C7E8]"
          >
            <Printer className="h-3.5 w-3.5 text-[#42C7E8]" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
