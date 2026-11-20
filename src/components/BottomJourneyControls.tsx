import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Pause,
  Play,
  RotateCcw,
  Video,
} from 'lucide-react';
import { JourneySubStep, StationId } from '../data/types';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';

interface BottomJourneyControlsProps {
  journeyProgress: number;
  isPlaying: boolean;
  activeSubStep: JourneySubStep;
  selectedStationId: StationId | null;
  followShipment: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  onSelectStationStage: (stationId: StationId) => void;
  onScrubProgress: (progress: number) => void;
  onToggleFollow: () => void;
  onResetCamera: () => void;
}

export const BottomJourneyControls: React.FC<BottomJourneyControlsProps> = ({
  journeyProgress,
  isPlaying,
  activeSubStep,
  selectedStationId,
  followShipment,
  onTogglePlay,
  onRestart,
  onPrevStage,
  onNextStage,
  onSelectStationStage,
  onScrubProgress,
  onToggleFollow,
  onResetCamera,
}) => {
  const pct = Math.round(journeyProgress * 100);

  return (
    <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex justify-center">
      <div className="pointer-events-auto w-full max-w-5xl rounded-xl glass-panel px-3.5 py-2.5 md:px-4">
        {/* Stage Progress Selector Pills (01..08) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {OPERATIONAL_STATIONS.map((station) => {
            const isSelected = selectedStationId === station.id;
            const isActiveStep = activeSubStep.stationId === station.id;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => onSelectStationStage(station.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] transition-all ${
                  isSelected
                    ? 'border-[#42C7E8] bg-[#42C7E8]/20 text-[#F4F7F8] font-bold'
                    : isActiveStep
                    ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#3CA77A] font-semibold'
                    : 'border-[#42C7E8]/20 bg-[#0A1C2E]/60 text-[#8C9BA5] hover:border-[#42C7E8]/60 hover:text-[#F4F7F8]'
                }`}
              >
                <span className={isActiveStep ? 'text-[#3CA77A]' : 'text-[#42C7E8]'}>{station.number}</span>
                <span>{station.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Scrubber & Progress Indicator */}
        <div className="flex items-center gap-3 py-1">
          <span className="w-10 shrink-0 font-mono text-[10px] font-bold text-[#42C7E8]">{pct}%</span>
          <input
            type="range"
            aria-label="Shipment journey progress"
            min={0}
            max={1000}
            value={Math.round(journeyProgress * 1000)}
            onChange={(e) => onScrubProgress(Number(e.target.value) / 1000)}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#173B57] accent-[#42C7E8]"
          />
          <span className="hidden shrink-0 font-mono text-[10px] text-[#A9E8F5] sm:inline">
            {activeSubStep.stationId} • Step {activeSubStep.index + 1}/11
          </span>
        </div>

        {/* Bottom Controls + Active Step Readout */}
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#42C7E8]/15 pt-2">
          {/* Playback Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPrevStage}
              title="Previous stage"
              className="rounded border border-[#42C7E8]/30 bg-[#173B57]/70 p-1.5 text-[#A9E8F5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={onTogglePlay}
              className="flex items-center gap-1.5 rounded bg-[#42C7E8] px-3 py-1.5 font-mono text-[11px] font-bold text-[#102A43] hover:bg-[#A9E8F5] transition-colors"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Journey'}</span>
            </button>

            <button
              type="button"
              onClick={onNextStage}
              title="Next stage"
              className="rounded border border-[#42C7E8]/30 bg-[#173B57]/70 p-1.5 text-[#A9E8F5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={onRestart}
              title="Restart journey from Farm Handover"
              className="flex items-center gap-1 rounded border border-[#42C7E8]/30 bg-[#0A1C2E]/70 px-2 py-1.5 font-mono text-[10px] text-[#A9E8F5] hover:border-[#42C7E8]"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>

          {/* Current Sub-Step Summary */}
          <div className="min-w-[200px] flex-1 px-2">
            <div className="truncate text-xs font-semibold text-[#F4F7F8]">{activeSubStep.title}</div>
            <div className="truncate font-mono text-[10px] text-[#8C9BA5]">
              {activeSubStep.digitalEvent}
            </div>
          </div>

          {/* Camera Follow & Reset */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleFollow}
              className={`flex items-center gap-1 rounded border px-2.5 py-1.5 font-mono text-[10px] transition-colors ${
                followShipment
                  ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#3CA77A] font-semibold'
                  : 'border-[#42C7E8]/30 bg-[#0A1C2E]/70 text-[#A9E8F5] hover:border-[#42C7E8]'
              }`}
            >
              <Video className="h-3 w-3" />
              <span>Follow Shipment</span>
            </button>

            <button
              type="button"
              onClick={onResetCamera}
              title="Reset overview camera"
              className="flex items-center gap-1 rounded border border-[#42C7E8]/30 bg-[#0A1C2E]/70 px-2.5 py-1.5 font-mono text-[10px] text-[#A9E8F5] hover:border-[#42C7E8]"
            >
              <Crosshair className="h-3 w-3" />
              <span className="hidden sm:inline">Overview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
