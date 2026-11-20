import React from 'react';
import {
  Activity,
  Box,
  Compass,
  Database,
  Eye,
  EyeOff,
  GitBranch,
  Layers,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { FlowLayerMode, NavTabId } from '../data/types';

interface TopNavBarProps {
  activeNav: NavTabId;
  onChangeNav: (nav: NavTabId) => void;
  flowMode: FlowLayerMode;
  onChangeFlowMode: (mode: FlowLayerMode) => void;
  force2D: boolean;
  onToggle2D: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  showExceptionPins: boolean;
  onToggleExceptionPins: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

const NAV_ITEMS: { id: NavTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'JOURNEY', label: 'Journey', icon: Compass },
  { id: 'INFORMATION_FLOW', label: 'Information Flow', icon: Database },
  { id: 'EXCEPTIONS', label: 'Exceptions', icon: ShieldAlert },
  { id: 'DATA_ARCHITECTURE', label: 'Data Architecture', icon: GitBranch },
];

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeNav,
  onChangeNav,
  flowMode,
  onChangeFlowMode,
  force2D,
  onToggle2D,
  showLabels,
  onToggleLabels,
  showExceptionPins,
  onToggleExceptionPins,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  return (
    <header className="z-30 flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/25 bg-[#102A43]/95 px-3 py-2 backdrop-blur-md md:px-5">
      {/* Brand Title & Custody Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#42C7E8]/60 bg-[#173B57]">
          <Box className="h-4 w-4 text-[#42C7E8]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-[#F4F7F8]">M2LABO ICHIGO®</span>
            <span className="hidden rounded border border-[#3CA77A]/50 bg-[#3CA77A]/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#3CA77A] sm:inline-block">
              ICHIGO FLOW 3D
            </span>
            <span className="hidden rounded border border-[#E9A23B]/45 bg-[#E9A23B]/15 px-1.5 py-0.5 font-mono text-[9px] text-[#E9A23B] lg:inline-block">
              CONCEPTUAL SIMULATION
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#8C9BA5]">
            Downstream Supply Chain &amp; ERP/CRM Architecture • Farm Handover → Financial Close
          </p>
        </div>
      </div>

      {/* Minimal 4-Tab Primary Navigation */}
      <nav aria-label="Primary navigation" className="flex items-center gap-1 rounded-lg border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeNav === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChangeNav(id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'bg-[#42C7E8] text-[#102A43] font-semibold shadow-sm'
                  : 'text-[#A9E8F5] hover:bg-[#173B57] hover:text-[#F4F7F8]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Process Layer Switch & Scene Utilities */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* Material / Information / Combined Flow Toggle */}
        <div
          role="group"
          aria-label="Process flow layer"
          className="flex items-center rounded-md border border-[#42C7E8]/25 bg-[#0A1C2E]/80 p-0.5 font-mono text-[10px]"
        >
          {(
            [
              { id: 'MATERIAL', label: 'Material' },
              { id: 'INFORMATION', label: 'Information' },
              { id: 'COMBINED', label: 'Combined' },
            ] as { id: FlowLayerMode; label: string }[]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeFlowMode(item.id)}
              className={`rounded px-2 py-1 transition-colors ${
                flowMode === item.id
                  ? 'bg-[#173B57] text-[#42C7E8] font-bold border border-[#42C7E8]/40'
                  : 'text-[#8C9BA5] hover:text-[#F4F7F8]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {activeNav === 'JOURNEY' && (
          <>
            <button
              type="button"
              onClick={onToggleExceptionPins}
              title="Toggle all 3D exception branch markers"
              className={`flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] transition-colors ${
                showExceptionPins
                  ? 'border-[#E9A23B] bg-[#E9A23B]/20 text-[#E9A23B]'
                  : 'border-[#42C7E8]/25 bg-[#0A1C2E]/70 text-[#8C9BA5] hover:text-[#F4F7F8]'
              }`}
            >
              <ShieldAlert className="h-3 w-3" />
              <span className="hidden xl:inline">Exceptions</span>
            </button>

            <button
              type="button"
              onClick={onToggleLabels}
              title="Toggle 3D station labels"
              className="flex items-center gap-1 rounded-md border border-[#42C7E8]/25 bg-[#0A1C2E]/70 px-2 py-1 font-mono text-[10px] text-[#A9E8F5] hover:border-[#42C7E8]"
            >
              {showLabels ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              <span className="hidden xl:inline">Labels</span>
            </button>

            <button
              type="button"
              onClick={onToggle2D}
              title="Switch between 3D Diorama and 2D Process Fallback"
              className={`flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] transition-colors ${
                force2D
                  ? 'border-[#42C7E8] bg-[#42C7E8]/20 text-[#42C7E8]'
                  : 'border-[#42C7E8]/25 bg-[#0A1C2E]/70 text-[#A9E8F5] hover:border-[#42C7E8]'
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>{force2D ? '3D World' : '2D Fallback'}</span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onToggleReducedMotion}
          title="Toggle reduced motion"
          className={`flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] transition-colors ${
            reducedMotion
              ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#3CA77A]'
              : 'border-[#42C7E8]/25 bg-[#0A1C2E]/70 text-[#8C9BA5] hover:text-[#F4F7F8]'
          }`}
        >
          {reducedMotion ? <Activity className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
          <span className="hidden 2xl:inline">{reducedMotion ? 'Motion Off' : 'Motion On'}</span>
        </button>
      </div>
    </header>
  );
};
