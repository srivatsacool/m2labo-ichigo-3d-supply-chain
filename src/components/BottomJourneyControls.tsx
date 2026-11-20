import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Crosshair,
  FileText,
  Pause,
  Play,
  RotateCcw,
  Video,
} from 'lucide-react';
import { JourneySubStep, StationId } from '../data/types';
import { JOURNEY_SUB_STEPS } from '../process/journeyPathData';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';

interface BottomJourneyControlsProps {
  journeyProgress: number;
  isPlaying: boolean;
  playbackSpeed: 0.5 | 1 | 2;
  activeSubStep: JourneySubStep;
  selectedStationId: StationId | null;
  followShipment: boolean;
  isDetailOpen: boolean;
  onTogglePlay: () => void;
  onCycleSpeed: () => void;
  onRestart: () => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  onSelectStationStage: (stationId: StationId) => void;
  onScrubProgress: (progress: number) => void;
  onToggleFollow: () => void;
  onResetCamera: () => void;
  onToggleDetailPanel: () => void;
}

export const BottomJourneyControls: React.FC<BottomJourneyControlsProps> = ({
  journeyProgress,
  isPlaying,
  playbackSpeed,
  activeSubStep,
  selectedStationId,
  followShipment,
  isDetailOpen,
  onTogglePlay,
  onCycleSpeed,
  onRestart,
  onPrevStage,
  onNextStage,
  onSelectStationStage,
  onScrubProgress,
  onToggleFollow,
  onResetCamera,
  onToggleDetailPanel,
}) => {
  const pct = Math.round(journeyProgress * 100);

  return (
    <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 z-20 flex justify-center sm:bottom-3 sm:left-4 sm:right-4">
      <div
        aria-label="Process stage timeline"
        className="pointer-events-auto w-full max-w-6xl rounded-xl glass-panel px-3 py-2 md:px-4"
      >
        {/* Stage Timeline Selector Pills (01..08) */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1.5">
          {OPERATIONAL_STATIONS.map((station) => {
            const isSelected = selectedStationId === station.id;
            const isActiveStep = activeSubStep.stationId === station.id;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => onSelectStationStage(station.id)}
                className={`flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-[11.5px] font-medium transition-all ${
                  isSelected
                    ? 'border-[#42C7E8] bg-[#42C7E8]/22 font-bold text-[#F4F7F8]'
                    : isActiveStep
                    ? 'border-[#3CA77A] bg-[#3CA77A]/20 font-semibold text-[#5EE8A8]'
                    : 'border-[#42C7E8]/20 bg-[#071524]/70 text-[#A9C2D4] hover:border-[#42C7E8]/60 hover:text-[#F4F7F8]'
                }`}
              >
                <span className={`font-mono font-bold ${isActiveStep ? 'text-[#5EE8A8]' : 'text-[#42C7E8]'}`}>
                  {station.number}
                </span>
                <span>{station.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Scrubber & Step Progress */}
        <div className="flex items-center gap-3 py-0.5">
          <span className="w-10 shrink-0 font-mono text-[12px] font-bold tabular-nums text-[#42C7E8]">{pct}%</span>
          <input
            type="range"
            aria-label="Strawberry cold-chain journey progress"
            min={0}
            max={1000}
            value={Math.round(journeyProgress * 1000)}
            onChange={(e) => onScrubProgress(Number(e.target.value) / 1000)}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#173B57] accent-[#42C7E8]"
          />
          <span className="hidden shrink-0 font-mono text-[12px] text-[#A9E8F5] sm:inline">
            {activeSubStep.stationId} · Step {activeSubStep.index + 1}/{JOURNEY_SUB_STEPS.length}
          </span>
        </div>

        {/* Bottom Controls + Active Operational Story Readout */}
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2.5 border-t border-[#42C7E8]/15 pt-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPrevStage}
              title="Previous stage"
              className="rounded-md border border-[#42C7E8]/30 bg-[#14324B] p-1.5 text-[#A9E8F5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onTogglePlay}
              className="flex items-center gap-1.5 rounded-md bg-[#42C7E8] px-3 py-1.5 font-mono text-[12.5px] font-bold text-[#061220] transition-colors hover:bg-[#A9E8F5]"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Journey'}</span>
            </button>

            <button
              type="button"
              onClick={onNextStage}
              title="Next stage"
              className="rounded-md border border-[#42C7E8]/30 bg-[#14324B] p-1.5 text-[#A9E8F5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onCycleSpeed}
              title="Cycle playback speed (0.5x / 1x / 2x)"
              className="rounded-md border border-[#42C7E8]/30 bg-[#071524]/80 px-2 py-1.5 font-mono text-[12px] font-bold text-[#A9E8F5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
            >
              {playbackSpeed}x
            </button>

            <button
              type="button"
              onClick={onRestart}
              title="Restart strawberry journey"
              className="flex items-center gap-1 rounded-md border border-[#42C7E8]/30 bg-[#071524]/80 px-2.5 py-1.5 font-mono text-[12px] text-[#A9E8F5] hover:border-[#42C7E8]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Restart</span>
            </button>
          </div>

          {/* Active Sub-Step Headline & Digital Event */}
          <div className="hidden min-w-[200px] flex-1 px-2 md:block">
            <div className="flex items-center gap-2">
              {activeSubStep.reverseLoop === 'LOOP_A_CRATES' && (
                <span className="shrink-0 rounded bg-[#2DD4BF]/20 px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#5EEAD4]">
                  FLOW A · CRATE RETURN
                </span>
              )}
              {activeSubStep.reverseLoop === 'LOOP_B_BAGS' && (
                <span className="shrink-0 rounded bg-[#F59E0B]/20 px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#FCD34D]">
                  FLOW B · BAG RETURN
                </span>
              )}
              <div className="truncate text-[14px] font-semibold text-[#F4F7F8]">{activeSubStep.title}</div>
            </div>
            <div className="truncate font-mono text-[12px] text-[#9BB4C7]">{activeSubStep.digitalEvent}</div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleDetailPanel}
              className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[12px] transition-colors ${
                isDetailOpen
                  ? 'border-[#42C7E8] bg-[#42C7E8]/22 font-semibold text-[#F4F7F8]'
                  : 'border-[#42C7E8]/30 bg-[#071524]/80 text-[#A9E8F5] hover:border-[#42C7E8]'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Stage Details</span>
            </button>

            <button
              type="button"
              onClick={onToggleFollow}
              className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[12px] transition-colors ${
                followShipment
                  ? 'border-[#3CA77A] bg-[#3CA77A]/22 font-semibold text-[#5EE8A8]'
                  : 'border-[#42C7E8]/30 bg-[#071524]/80 text-[#A9E8F5] hover:border-[#42C7E8]'
              }`}
            >
              <Video className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Follow Shipment</span>
            </button>

            <button
              type="button"
              onClick={onResetCamera}
              title="Reset world overview"
              className="flex items-center gap-1.5 rounded-md border border-[#42C7E8]/30 bg-[#071524]/80 px-2.5 py-1.5 font-mono text-[12px] text-[#A9E8F5] hover:border-[#42C7E8]"
            >
              <Crosshair className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
