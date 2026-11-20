import React, { useMemo, useState } from 'react';
import { AlertTriangle, Box, CheckCircle2, FileText, GitBranch, Search, ShieldAlert, UserCheck } from 'lucide-react';
import { ExceptionBranch, StationId } from '../data/types';
import { EXCEPTION_BRANCHES } from './exceptionsData';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';

interface ExceptionsExplorerViewProps {
  onFocusExceptionIn3D: (exceptionId: string, stationId: StationId) => void;
}

export const ExceptionsExplorerView: React.FC<ExceptionsExplorerViewProps> = ({ onFocusExceptionIn3D }) => {
  const [stationFilter, setStationFilter] = useState<StationId | 'ALL'>('ALL');
  const [onlyDecisionRequired, setOnlyDecisionRequired] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExc, setSelectedExc] = useState<ExceptionBranch>(EXCEPTION_BRANCHES[0]);

  const filtered = useMemo(() => {
    return EXCEPTION_BRANCHES.filter((exc) => {
      if (stationFilter !== 'ALL' && exc.stationId !== stationFilter) return false;
      if (onlyDecisionRequired && exc.decisionDefinedInSource) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          exc.title.toLowerCase().includes(q) ||
          exc.trigger.toLowerCase().includes(q) ||
          exc.affectedEntity.toLowerCase().includes(q) ||
          exc.responsibleRole.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [stationFilter, onlyDecisionRequired, searchQuery]);

  const decisionRequiredCount = EXCEPTION_BRANCHES.filter((e) => !e.decisionDefinedInSource).length;

  return (
    <div className="h-full overflow-y-auto bg-blueprint-grid p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5 pb-12">
        {/* Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E9A23B]/45 bg-[#173B57]/90 p-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#E9A23B]">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Downstream Exception Branches &amp; Open Process Decisions</span>
            </div>
            <h1 className="mt-1 text-lg font-bold text-[#F4F7F8]">
              Operational Failure Pathways, Required Data Capture &amp; Decision Gates
            </h1>
            <p className="mt-1 text-xs text-[#A9E8F5]">
              Every undefined M2Labo contingency SOP is explicitly marked{' '}
              <span className="rounded border border-[#E9A23B] bg-[#E9A23B]/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#E9A23B]">
                PROCESS DECISION REQUIRED
              </span>{' '}
              rather than inventing unapproved operating procedures.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="rounded-lg border border-[#E9A23B]/50 bg-[#102A43] px-3 py-2 text-center">
              <div className="text-[10px] text-[#8C9BA5]">UNFINALIZED GATES</div>
              <div className="text-base font-bold text-[#E9A23B]">{decisionRequiredCount} / {EXCEPTION_BRANCHES.length}</div>
            </div>
          </div>
        </div>

        {/* Station Branch Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#42C7E8]/25 bg-[#102A43]/90 p-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setStationFilter('ALL')}
              className={`rounded border px-2.5 py-1 font-mono text-[10px] ${
                stationFilter === 'ALL'
                  ? 'border-[#42C7E8] bg-[#42C7E8] text-[#102A43] font-bold'
                  : 'border-[#42C7E8]/25 text-[#A9E8F5] hover:border-[#42C7E8]'
              }`}
            >
              All Stages ({EXCEPTION_BRANCHES.length})
            </button>
            {OPERATIONAL_STATIONS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStationFilter(st.id)}
                className={`rounded border px-2 py-1 font-mono text-[10px] ${
                  stationFilter === st.id
                    ? 'border-[#42C7E8] bg-[#173B57] text-[#F4F7F8] font-bold'
                    : 'border-[#42C7E8]/25 text-[#8C9BA5] hover:text-[#F4F7F8]'
                }`}
              >
                {st.number} {st.shortTitle}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#8C9BA5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter exceptions..."
                className="w-48 rounded border border-[#42C7E8]/30 bg-[#0A1C2E] py-1.5 pl-8 pr-3 text-xs text-[#F4F7F8] placeholder-[#8C9BA5] focus:border-[#42C7E8] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setOnlyDecisionRequired(!onlyDecisionRequired)}
              className={`rounded border px-2.5 py-1.5 font-mono text-[10px] transition-colors ${
                onlyDecisionRequired
                  ? 'border-[#E9A23B] bg-[#E9A23B]/20 text-[#E9A23B] font-bold'
                  : 'border-[#42C7E8]/25 text-[#8C9BA5] hover:text-[#F4F7F8]'
              }`}
            >
              Only Process Decision Required
            </button>
          </div>
        </div>

        {/* Split Master-Detail Exception Inspector */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left Branch List */}
          <div className="space-y-2 lg:col-span-5">
            {filtered.map((exc) => {
              const isSelected = selectedExc.id === exc.id;
              return (
                <button
                  key={exc.id}
                  type="button"
                  onClick={() => setSelectedExc(exc)}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-[#42C7E8] bg-[#173B57] ring-2 ring-[#42C7E8]/35'
                      : 'border-[#42C7E8]/25 bg-[#102A43]/90 hover:border-[#42C7E8]/60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <span className="font-bold text-[#42C7E8]">{exc.id}</span>
                      <span className="rounded bg-[#0A1C2E] px-1.5 py-0.5 text-[#A9E8F5]">{exc.stationId}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-bold ${
                          exc.severity === 'CRITICAL'
                            ? 'bg-[#D9534F]/20 text-[#D9534F]'
                            : 'bg-[#E9A23B]/20 text-[#E9A23B]'
                        }`}
                      >
                        {exc.severity}
                      </span>
                    </div>
                    {!exc.decisionDefinedInSource && (
                      <span className="rounded border border-[#E9A23B]/70 bg-[#E9A23B]/15 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#E9A23B]">
                        PROCESS DECISION REQUIRED
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-[#F4F7F8]">{exc.title}</div>
                  <div className="mt-1 line-clamp-1 text-xs text-[#8C9BA5]">{exc.trigger}</div>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Decision Flow Card */}
          <div className="lg:col-span-7">
            <div className="sticky top-4 rounded-xl border border-[#42C7E8]/35 bg-[#102A43]/95 p-5 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#42C7E8]/20 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="rounded bg-[#42C7E8] px-2 py-0.5 font-bold text-[#102A43]">{selectedExc.id}</span>
                    <span className="rounded border border-[#42C7E8]/40 bg-[#173B57] px-2 py-0.5 text-[#A9E8F5]">
                      {selectedExc.stationId}
                    </span>
                    {!selectedExc.decisionDefinedInSource ? (
                      <span className="flex items-center gap-1 rounded border border-[#E9A23B] bg-[#E9A23B]/20 px-2 py-0.5 font-bold text-[#E9A23B]">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>PROCESS DECISION REQUIRED</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded border border-[#3CA77A] bg-[#3CA77A]/20 px-2 py-0.5 font-bold text-[#3CA77A]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>HARD GUARDRAIL CONFIRMED</span>
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 text-lg font-bold text-[#F4F7F8]">{selectedExc.title}</h2>
                </div>

                <button
                  type="button"
                  onClick={() => onFocusExceptionIn3D(selectedExc.id, selectedExc.stationId)}
                  className="flex items-center gap-1.5 rounded-md border border-[#42C7E8] bg-[#173B57] px-3 py-1.5 font-mono text-xs font-semibold text-[#F4F7F8] hover:bg-[#42C7E8] hover:text-[#102A43] transition-colors"
                >
                  <Box className="h-4 w-4" />
                  <span>Inspect Branch in 3D</span>
                </button>
              </div>

              {/* Structured Exception Attributes */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-lg border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-3">
                  <div className="font-mono text-[10px] font-bold text-[#42C7E8]">1. TRIGGER</div>
                  <p className="mt-1 text-[#F4F7F8]">{selectedExc.trigger}</p>
                </div>

                <div className="rounded-lg border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-3">
                  <div className="font-mono text-[10px] font-bold text-[#42C7E8]">2. AFFECTED SHIPMENT / BATCH / ORDER</div>
                  <p className="mt-1 font-mono text-[#A9E8F5]">{selectedExc.affectedEntity}</p>
                </div>

                <div className="rounded-lg border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#42C7E8]">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>3. RESPONSIBLE ROLE</span>
                  </div>
                  <p className="mt-1 text-[#F4F7F8]">{selectedExc.responsibleRole}</p>
                </div>

                <div className="rounded-lg border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#42C7E8]">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>4. CURRENT PROCESS STATUS</span>
                  </div>
                  <p className="mt-1 text-[#A9E8F5]">{selectedExc.currentProcessStatus}</p>
                </div>
              </div>

              <div className="rounded-lg border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-3 text-xs">
                <div className="font-mono text-[10px] font-bold text-[#42C7E8]">5. DATA TO CAPTURE</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedExc.dataToCapture.map((d) => (
                    <span
                      key={d}
                      className="rounded border border-[#42C7E8]/35 bg-[#173B57]/70 px-2 py-1 font-mono text-[10px] text-[#F4F7F8]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#3CA77A]/40 bg-[#3CA77A]/10 p-3 text-xs">
                <div className="font-mono text-[10px] font-bold text-[#3CA77A]">6. REQUIRED DECISION</div>
                <p className="mt-1 text-[#F4F7F8]">{selectedExc.requiredDecision}</p>
              </div>

              <div
                className={`rounded-lg border p-3 text-xs ${
                  selectedExc.decisionDefinedInSource
                    ? 'border-[#3CA77A]/50 bg-[#3CA77A]/10 text-[#3CA77A]'
                    : 'border-[#E9A23B]/60 bg-[#E9A23B]/15 text-[#E9A23B]'
                }`}
              >
                <div className="font-mono text-[10px] font-bold">GOVERNANCE &amp; UNDEFINED PROCEDURE FLAG</div>
                <p className="mt-1 text-[#F4F7F8]">{selectedExc.processDecisionNote}</p>
              </div>

              <div className="rounded-lg border border-[#42C7E8]/25 bg-[#173B57]/60 p-3 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#A9E8F5]">
                  <FileText className="h-3.5 w-3.5" />
                  <span>7. RESOLUTION RECORD</span>
                </div>
                <p className="mt-1 text-[#F4F7F8]">{selectedExc.resolutionRecord}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
