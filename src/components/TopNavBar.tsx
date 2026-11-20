import React from 'react';
import {
  Activity,
  Compass,
  Crosshair,
  Database,
  Eye,
  EyeOff,
  FileSearch,
  GitBranch,
  HelpCircle,
  Layers,
  Maximize2,
  Minimize2,
  ShieldAlert,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CameraMode, FlowLayerMode, NavTabId, StationId } from '../data/types';
import { getStationById } from '../stations/stationsData';
import { EXCEPTION_BRANCHES } from '../exceptions/exceptionsData';

interface TopNavBarProps {
  activeNav: NavTabId;
  onChangeNav: (nav: NavTabId) => void;
  flowMode: FlowLayerMode;
  onChangeFlowMode: (mode: FlowLayerMode) => void;
  cameraMode: CameraMode;
  onChangeCameraMode: (mode: CameraMode) => void;
  activeStationId: StationId;
  force2D: boolean;
  onToggle2D: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  showExceptionPins: boolean;
  onToggleExceptionPins: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTutorial: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onResetView: () => void;
  onInspectSelected: () => void;
}

const NAV_ITEMS: { id: NavTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'JOURNEY', label: 'World Journey', icon: Compass },
  { id: 'INFORMATION_FLOW', label: 'Information Flow', icon: Database },
  { id: 'EXCEPTIONS', label: 'Exceptions', icon: ShieldAlert },
  { id: 'DATA_ARCHITECTURE', label: 'Data Architecture', icon: GitBranch },
];

const CAMERA_OPTIONS: { id: CameraMode; label: string }[] = [
  { id: 'FIRST_PERSON', label: 'FIRST PERSON' },
  { id: 'THIRD_PERSON', label: 'THIRD PERSON' },
  { id: 'OVERVIEW', label: 'OVERVIEW' },
];

const FLOW_OPTIONS: { id: FlowLayerMode; label: string }[] = [
  { id: 'MATERIAL', label: 'MATERIAL FLOW' },
  { id: 'INFORMATION', label: 'INFORMATION FLOW' },
  { id: 'COMBINED', label: 'COMBINED FLOW' },
];

/** Clean custom SVG strawberry brand emblem (no generic placeholder icons) */
const StrawberryEmblem: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 6.5C8.1 6.5 5.5 8.9 5.9 12.6C6.4 16.9 9.7 21.3 12 21.8C14.3 21.3 17.6 16.9 18.1 12.6C18.5 8.9 15.9 6.5 12 6.5Z"
      fill="#E52834"
      stroke="#FF6B74"
      strokeWidth="1.2"
    />
    <path d="M12 6.5L9.2 4.2L11.2 4.8L12 2.4L12.8 4.8L14.8 4.2L12 6.5Z" fill="#4CA64C" />
    <path d="M8.5 7.4C9.5 6.4 11 6.2 12 6.6C13 6.2 14.5 6.4 15.5 7.4" stroke="#4CA64C" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="9.6" cy="11.2" r="0.7" fill="#F7DC88" />
    <circle cx="12" cy="10.4" r="0.7" fill="#F7DC88" />
    <circle cx="14.4" cy="11.2" r="0.7" fill="#F7DC88" />
    <circle cx="10.4" cy="14.2" r="0.7" fill="#F7DC88" />
    <circle cx="13.6" cy="14.2" r="0.7" fill="#F7DC88" />
    <circle cx="12" cy="17.2" r="0.7" fill="#F7DC88" />
  </svg>
);

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeNav,
  onChangeNav,
  flowMode,
  onChangeFlowMode,
  cameraMode,
  onChangeCameraMode,
  activeStationId,
  force2D,
  onToggle2D,
  showLabels,
  onToggleLabels,
  showExceptionPins,
  onToggleExceptionPins,
  reducedMotion,
  onToggleReducedMotion,
  soundEnabled,
  onToggleSound,
  onOpenTutorial,
  isFullscreen,
  onToggleFullscreen,
  onResetView,
  onInspectSelected,
}) => {
  const activeStation = getStationById(activeStationId);
  const openDecisionCount = EXCEPTION_BRANCHES.filter((e) => !e.decisionDefinedInSource).length;

  return (
    <header className="z-30 border-b border-[#42C7E8]/25 bg-[#081726]/96 backdrop-blur-md">
      {/* ROW 1: Identity, Active Station, Primary Navigation & Utility Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 lg:flex-nowrap lg:px-4">
        <div className="flex items-center gap-2.5 min-w-0 shrink-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E52834]/55 bg-[#152B40]">
            <StrawberryEmblem className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="whitespace-nowrap text-[14.5px] font-bold tracking-tight text-[#F4F7F8]">
              M2LABO ICHIGO®
            </span>
            <span className="max-w-[168px] truncate rounded-md border border-[#42C7E8]/45 bg-[#14324B] px-2 py-0.5 font-mono text-[11.5px] font-semibold text-[#A9E8F5]">
              {activeStation.number} · {activeStation.shortTitle}
            </span>
          </div>
        </div>

        {/* Primary View Navigation */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 overflow-x-auto rounded-lg border border-[#42C7E8]/20 bg-[#061220] p-0.5"
        >
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeNav === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChangeNav(id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
                  active
                    ? 'bg-[#42C7E8] font-bold text-[#061220]'
                    : 'text-[#C6E8F5] hover:bg-[#14324B] hover:text-[#F4F7F8]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
                {id === 'EXCEPTIONS' && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10.5px] font-bold ${
                      active ? 'bg-[#061220]/20 text-[#061220]' : 'bg-[#E9A23B]/20 text-[#F5B041]'
                    }`}
                  >
                    {openDecisionCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Independent Utility Controls */}
        <div className="flex shrink-0 items-center gap-1">
          {activeNav === 'JOURNEY' && (
            <>
              <button
                type="button"
                onClick={onToggleLabels}
                title="Show or hide 3D annotations"
                className={`flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] font-medium transition-colors ${
                  showLabels
                    ? 'border-[#42C7E8]/55 bg-[#14324B] text-[#F4F7F8]'
                    : 'border-[#42C7E8]/20 bg-[#061220] text-[#8C9BA5] hover:text-[#F4F7F8]'
                }`}
              >
                {showLabels ? <Eye className="h-3.5 w-3.5 text-[#42C7E8]" /> : <EyeOff className="h-3.5 w-3.5" />}
                <span className="hidden xl:inline">Labels</span>
              </button>

              <button
                type="button"
                onClick={onInspectSelected}
                title="Inspect selected location details"
                className="flex items-center gap-1 rounded-md border border-[#42C7E8]/35 bg-[#102A43] px-2 py-1 text-[12px] font-medium text-[#A9E8F5] transition-colors hover:border-[#42C7E8] hover:text-[#F4F7F8]"
              >
                <FileSearch className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Inspect</span>
              </button>

              <button
                type="button"
                onClick={onResetView}
                title="Reset world view"
                className="flex items-center gap-1 rounded-md border border-[#42C7E8]/25 bg-[#061220] px-2 py-1 text-[12px] font-medium text-[#A9E8F5] transition-colors hover:border-[#42C7E8] hover:text-[#F4F7F8]"
              >
                <Crosshair className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Reset</span>
              </button>

              <button
                type="button"
                onClick={onToggle2D}
                title="Switch between 3D World and 2D Process Schematic"
                className={`flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] font-medium transition-colors ${
                  force2D
                    ? 'border-[#42C7E8] bg-[#42C7E8]/20 text-[#42C7E8]'
                    : 'border-[#42C7E8]/25 bg-[#061220] text-[#A9E8F5] hover:border-[#42C7E8]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{force2D ? '3D World' : '2D Map'}</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] font-medium transition-colors ${
              soundEnabled
                ? 'border-[#3CA77A]/60 bg-[#3CA77A]/15 text-[#5EE8A8]'
                : 'border-[#42C7E8]/25 bg-[#061220] text-[#8C9BA5] hover:text-[#F4F7F8]'
            }`}
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={onOpenTutorial}
            title="Open interactive app guide & feature tutorial"
            className="flex items-center gap-1 rounded-md border border-[#42C7E8]/40 bg-[#14324B] px-2 py-1 text-[12px] font-semibold text-[#A9E8F5] transition-colors hover:bg-[#42C7E8] hover:text-[#061220]"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span className="hidden 2xl:inline">Guide</span>
          </button>

          <button
            type="button"
            onClick={onToggleReducedMotion}
            title="Toggle reduced motion"
            className={`flex items-center gap-1 rounded-md border p-1.5 transition-colors ${
              reducedMotion
                ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#3CA77A]'
                : 'border-[#42C7E8]/25 bg-[#061220] text-[#8C9BA5] hover:text-[#F4F7F8]'
            }`}
          >
            {reducedMotion ? <Activity className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="flex items-center gap-1 rounded-md border border-[#42C7E8]/25 bg-[#061220] p-1.5 text-[#A9E8F5] transition-colors hover:border-[#42C7E8] hover:text-[#F4F7F8]"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* ROW 2: Strictly Separated CAMERA Selector (3 modes) & FLOW Selector (3 independent modes) */}
      {activeNav === 'JOURNEY' && !force2D && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-[#42C7E8]/15 bg-[#061321]/95 px-4 py-1.5">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
            {/* CAMERA MODE SELECTOR — EXACTLY THREE MODES */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] font-bold tracking-wider text-[#8C9BA5]">CAMERA</span>
              <div
                role="group"
                aria-label="Camera mode"
                className="flex items-center rounded-md border border-[#42C7E8]/35 bg-[#0A1C2E] p-0.5 font-mono text-[11.5px]"
              >
                {CAMERA_OPTIONS.map((opt) => {
                  const active = cameraMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onChangeCameraMode(opt.id)}
                      className={`rounded px-2 py-1 transition-colors ${
                        active
                          ? 'bg-[#42C7E8] font-bold text-[#061220]'
                          : 'text-[#C6E8F5] hover:bg-[#14324B] hover:text-[#F4F7F8]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FLOW MODE SELECTOR — EXACTLY THREE INDEPENDENT MODES */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] font-bold tracking-wider text-[#8C9BA5]">FLOW</span>
              <div
                role="group"
                aria-label="Flow visualization mode"
                className="flex items-center rounded-md border border-[#3CA77A]/40 bg-[#0A1C2E] p-0.5 font-mono text-[11.5px]"
              >
                {FLOW_OPTIONS.map((opt) => {
                  const active = flowMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onChangeFlowMode(opt.id)}
                      className={`rounded px-2 py-1 transition-colors ${
                        active
                          ? 'bg-[#3CA77A] font-bold text-[#061220]'
                          : 'text-[#C6E8F5] hover:bg-[#14324B] hover:text-[#F4F7F8]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clean Reverse-Logistics & Flow Legend + Optional World Exception Overlay Toggle */}
          <div className="flex items-center gap-2.5 font-mono text-[11px]">
            <div className="hidden items-center gap-2.5 2xl:flex xl:flex">
              <span className="flex items-center gap-1 text-[#5EE8A8]">
                <span className="h-2 w-2 rounded-full bg-[#3CA77A]" />
                Strawberries
              </span>
              <span className="flex items-center gap-1 text-[#5EEAD4]">
                <span className="h-2 w-2 rounded-full bg-[#2DD4BF]" />
                Loop 1: Crates→Farm
              </span>
              <span className="flex items-center gap-1 text-[#FCD34D]">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                Loop 2: Bag→MIDC
              </span>
              <span className="flex items-center gap-1 text-[#7BE0F7]">
                <span className="h-2 w-2 rounded-full bg-[#42C7E8]" />
                ERP/CRM
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleExceptionPins}
              className={`flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold transition-colors ${
                showExceptionPins
                  ? 'border-[#E9A23B] bg-[#E9A23B]/20 text-[#FCD34D]'
                  : 'border-[#42C7E8]/25 bg-[#0A1C2E] text-[#8C9BA5] hover:border-[#E9A23B]/60 hover:text-[#F4F7F8]'
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Warnings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
