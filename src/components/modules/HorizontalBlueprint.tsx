import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Thermometer,
  Clock,
  QrCode,
  ArrowRight,
  Keyboard,
} from 'lucide-react';
import { MILESTONES } from '../../data/milestonesData';
import { useBlueprint } from '../../context/BlueprintContext';
import { StatusBadge } from '../layout/StatusBadge';
import { StationIsometricSvg } from '../diagrams/StationIsometricSvg';
import { MilestoneDetailView } from './MilestoneDetailView';

export const HorizontalBlueprint: React.FC = () => {
  const {
    activeMilestoneId,
    setActiveMilestoneId,
    milestoneDetailOpen,
    openMilestoneWorkspace,
    perspective,
    reducedMotion,
    checklistState,
  } = useBlueprint();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeIdx = Math.max(
    0,
    MILESTONES.findIndex((m) => m.id === activeMilestoneId)
  );
  const progressPct = Math.round(((activeIdx + 1) / MILESTONES.length) * 100);

  const scrollToMilestone = (index: number) => {
    const clamped = Math.max(0, Math.min(MILESTONES.length - 1, index));
    const target = MILESTONES[clamped];
    setActiveMilestoneId(target.id);
    const el = document.getElementById(`station-card-${target.id}`);
    el?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  useEffect(() => {
    if (milestoneDetailOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToMilestone(activeIdx + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToMilestone(activeIdx - 1);
      } else if (e.key === 'Enter' && document.activeElement === document.body) {
        openMilestoneWorkspace(activeMilestoneId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, milestoneDetailOpen, activeMilestoneId]);

  if (milestoneDetailOpen) {
    return <MilestoneDetailView />;
  }

  return (
    <div className="flex flex-col">
      {/* Blueprint Telemetry & Navigation Strip */}
      <div className="border-b border-[#42C7E8]/20 bg-[#102A43]/90 px-4 py-3 lg:px-6">
        <div className="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#42C7E8]">
              <span>PROCESS SPINE: FARM → ANDHERI MIDC → CUSTOMER → FINANCE</span>
              <span className="hidden sm:inline text-[#9BB4C5]">|</span>
              <span className="hidden sm:inline text-[#EAF5F8]">11 CONNECTED MILESTONES</span>
            </div>
            <p className="mt-0.5 text-xs text-[#9BB4C5]">
              Click any station card to launch its full 26-section SOP & engineering workspace. Use{' '}
              <Keyboard className="inline h-3.5 w-3.5 text-[#42C7E8]" /> Left/Right arrows or horizontal scroll.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress Rail Readout */}
            <div className="hidden sm:flex items-center gap-2 rounded border border-[#42C7E8]/25 bg-[#0B1F33] px-3 py-1.5 font-mono text-xs">
              <span className="text-[#9BB4C5]">STATION</span>
              <span className="font-bold text-[#42C7E8]">
                {String(activeIdx + 1).padStart(2, '0')}/11
              </span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#173B57]">
                <div
                  className="h-full bg-[#42C7E8] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollToMilestone(activeIdx - 1)}
                disabled={activeIdx === 0}
                aria-label="Previous milestone"
                className="flex items-center gap-1 rounded border border-[#42C7E8]/35 bg-[#12334D] px-2.5 py-1.5 text-xs text-[#F5FAFC] disabled:opacity-40 hover:border-[#42C7E8]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden md:inline">Prev</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToMilestone(activeIdx + 1)}
                disabled={activeIdx === MILESTONES.length - 1}
                aria-label="Next milestone"
                className="flex items-center gap-1 rounded border border-[#42C7E8]/35 bg-[#12334D] px-2.5 py-1.5 text-xs text-[#F5FAFC] disabled:opacity-40 hover:border-[#42C7E8]"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP / TABLET: Full-Width Horizontally Scrollable Process Canvas */}
      <div
        ref={scrollRef}
        className="horizontal-canvas-scroll relative hidden md:block w-full overflow-x-auto py-10 px-8 snap-x snap-mandatory"
        tabIndex={0}
        aria-label="Horizontal 11-milestone cold-chain blueprint canvas"
      >
        <div className="relative flex min-w-max items-stretch gap-8 px-6">
          {/* Animated Cyan Process Spine Behind Stations */}
          <div className="pointer-events-none absolute left-10 right-10 top-[148px] z-0 h-8">
            <svg className="h-full w-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#173B57"
                strokeWidth="4"
              />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#42C7E8"
                strokeWidth="2"
                className={reducedMotion ? '' : 'animate-spine-flow'}
              />
            </svg>
            {/* Animated Strawberry Batch Packet Indicator */}
            {!reducedMotion && (
              <div
                className="absolute top-[10px] h-3 w-3 rounded-full bg-[#D9534F] ring-4 ring-[#42C7E8]/40 shadow-[0_0_12px_#42C7E8]"
                style={{
                  left: `${Math.min(96, Math.max(2, (activeIdx / 10) * 94 + 2))}%`,
                  transition: 'left 500ms ease-out',
                }}
              />
            )}
          </div>

          {MILESTONES.map((m, idx) => {
            const isActive = m.id === activeMilestoneId;
            const isHovered = hoveredId === m.id;
            const completedTasks = m.sec18_workerChecklist.filter((c) => checklistState[c.id]?.checked).length;

            return (
              <article
                id={`station-card-${m.id}`}
                key={m.id}
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative z-10 flex w-[340px] shrink-0 snap-center flex-col rounded border transition-all duration-200 ${
                  isActive
                    ? 'tech-border-active bg-[#12334D]'
                    : 'tech-border bg-[#102A43]/95 hover:border-[#42C7E8]/60 hover:bg-[#12334D]'
                }`}
              >
                {/* Top Blueprint Registration Header */}
                <div className="flex items-center justify-between border-b border-[#42C7E8]/20 bg-[#0B1F33] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-sm font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-[#42C7E8] text-[#0B1F33]'
                          : 'border border-[#42C7E8]/50 bg-[#173B57] text-[#42C7E8]'
                      }`}
                    >
                      {m.number}
                    </span>
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#9BB4C5]">
                      {m.code}
                    </span>
                  </div>
                  <StatusBadge status={m.governance.status} compact />
                </div>

                {/* Isometric Station Diagram */}
                <div
                  onClick={() => openMilestoneWorkspace(m.id)}
                  className="cursor-pointer border-b border-[#42C7E8]/15 bg-[#0B1F33]/65 px-4 pt-3 pb-2"
                >
                  <StationIsometricSvg milestoneId={m.id} className="h-28 w-full" />
                </div>

                {/* Technical Tooltip Overlay on Hover */}
                {isHovered && (
                  <div className="pointer-events-none absolute -top-11 left-3 right-3 z-20 rounded border border-[#42C7E8]/60 bg-[#0B1F33]/95 px-2.5 py-1.5 font-mono text-[10px] text-[#EAF5F8] shadow-xl">
                    <span className="text-[#42C7E8]">HANDOVER → </span>
                    {m.sec20_handoverRequirements.toRole}
                  </div>
                )}

                {/* Concise Station Metadata (Never overcrowded with raw SOP walls) */}
                <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-[#F5FAFC] leading-snug">{m.title}</h3>
                    <p className="mt-1 font-mono text-[11px] text-[#42C7E8]">{m.facilityZone}</p>
                    <p className="mt-2 text-xs text-[#9BB4C5] line-clamp-2">
                      {perspective === 'WORKER'
                        ? `Key Action: ${m.sec06_workerActivities[0]?.whatTheyDo}`
                        : perspective === 'SUPERVISOR'
                        ? `QC Focus: ${m.sec09_qcResponsibilities[0]}`
                        : m.sec01_processOverview}
                    </p>
                  </div>

                  {/* Telemetry Specs */}
                  <div className="grid grid-cols-2 gap-2 rounded border border-[#42C7E8]/20 bg-[#0B1F33]/75 p-2.5 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#EAF5F8]">
                      <Thermometer className="h-3 w-3 text-[#42C7E8] shrink-0" />
                      <span className="truncate">{m.stationTelemetry.targetTemp}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#EAF5F8]">
                      <Clock className="h-3 w-3 text-[#42C7E8] shrink-0" />
                      <span className="truncate">{m.stationTelemetry.cycleWindow}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 border-t border-[#42C7E8]/15 pt-1.5 text-[#7AE0B3]">
                      <QrCode className="h-3 w-3 shrink-0" />
                      <span className="truncate">{m.stationTelemetry.qrAnchor}</span>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[10px] text-[#9BB4C5]">
                      Demo Checks: {completedTasks}/{m.sec18_workerChecklist.length} · Risks: {m.sec14_failureAndExceptions.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => openMilestoneWorkspace(m.id)}
                      className="flex items-center gap-1.5 rounded border border-[#42C7E8]/60 bg-[#173B57] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#F5FAFC] hover:bg-[#42C7E8] hover:text-[#0B1F33] transition-colors"
                    >
                      <span>Open SOP</span>
                      <Maximize2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Next Station Connector Indicator */}
                {idx < MILESTONES.length - 1 && (
                  <div className="pointer-events-none absolute -right-7 top-[102px] z-20 flex h-6 w-6 items-center justify-center rounded-full border border-[#42C7E8]/70 bg-[#0B1F33] text-[#42C7E8]">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* MOBILE FALLBACK: Clear Vertical / Card Journey */}
      <div className="md:hidden space-y-3 p-4">
        <div className="rounded border border-[#42C7E8]/30 bg-[#12334D] p-3 font-mono text-[11px] text-[#86E1F7]">
          MOBILE VERTICAL BLUEPRINT MODE — Tap any milestone to open its full 26-section SOP & checklists.
        </div>
        {MILESTONES.map((m) => (
          <div
            key={m.id}
            onClick={() => openMilestoneWorkspace(m.id)}
            className={`rounded border p-4 space-y-2.5 cursor-pointer ${
              m.id === activeMilestoneId ? 'tech-border-active bg-[#12334D]' : 'tech-border bg-[#102A43]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#42C7E8] px-2 py-0.5 font-mono text-xs font-bold text-[#0B1F33]">
                  {m.number}
                </span>
                <span className="font-semibold text-sm text-[#F5FAFC]">{m.title}</span>
              </div>
              <StatusBadge status={m.governance.status} compact />
            </div>
            <p className="text-xs text-[#9BB4C5]">{m.sec01_processOverview}</p>
            <div className="flex items-center justify-between font-mono text-[10px] text-[#42C7E8]">
              <span>{m.stationTelemetry.targetTemp}</span>
              <span>Tap to Open Workspace →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
