import React, { useState } from 'react';
import { PlaySquare, GitBranch, AlertTriangle, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { SCENARIO_SIMULATIONS } from '../../data/risksAndScenariosData';
import { useBlueprint } from '../../context/BlueprintContext';
import { StatusBadge } from '../layout/StatusBadge';

export const ScenarioSimulator: React.FC = () => {
  const { selectedScenarioId, setSelectedScenarioId, openMilestoneWorkspace } = useBlueprint();
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [milestoneFilter, setMilestoneFilter] = useState<string>('ALL');

  const filteredList = SCENARIO_SIMULATIONS.filter(
    (s) => milestoneFilter === 'ALL' || s.milestoneId === milestoneFilter
  );

  const scenario =
    SCENARIO_SIMULATIONS.find((s) => s.id === selectedScenarioId) || SCENARIO_SIMULATIONS[0];

  const decisionNode = scenario.decisionTree[0];

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setActiveStepIdx(0);
    setSelectedOptionIdx(null);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 lg:px-6">
      <div className="rounded border border-[#E9A23B]/50 bg-[#E9A23B]/10 px-4 py-2.5 text-xs text-[#F5C57B]">
        <strong>ILLUSTRATIVE SIMULATION ENGINE (ALL 24 MANDATORY SCENARIOS):</strong> Trigger thresholds, step sequences, communication scripts and recovery trees below are illustrative until formally validated and signed off by M2Labo & HiMedia.
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Sidebar: All 24 Scenarios */}
        <aside className="lg:col-span-4 rounded border border-[#42C7E8]/25 bg-[#102A43] p-4 flex flex-col max-h-[820px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#42C7E8]">
              <PlaySquare className="h-4 w-4" />
              <span>24 SCENARIOS</span>
            </div>
            <select
              value={milestoneFilter}
              onChange={(e) => setMilestoneFilter(e.target.value)}
              aria-label="Filter scenarios by milestone"
              className="rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2 py-1 font-mono text-[10px] text-[#F5FAFC]"
            >
              <option value="ALL">All Stages</option>
              {['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11'].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredList.map((s) => {
              const active = s.id === scenario.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScenario(s.id)}
                  className={`w-full rounded border p-2.5 text-left transition-colors ${
                    active
                      ? 'border-[#42C7E8] bg-[#173B57] text-[#F5FAFC]'
                      : 'border-[#42C7E8]/15 bg-[#0B1F33] text-[#9BB4C5] hover:border-[#42C7E8]/40 hover:text-[#F5FAFC]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold text-[#42C7E8]">{s.id} · {s.milestoneId}</span>
                    <span
                      className={
                        s.severityBand === 'CRITICAL'
                          ? 'text-[#F69D9B]'
                          : s.severityBand === 'HIGH'
                          ? 'text-[#F5C57B]'
                          : 'text-[#86E1F7]'
                      }
                    >
                      {s.severityBand}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-[#F5FAFC]">{s.title}</div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Interactive Scenario Workspace */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded border border-[#42C7E8]/35 bg-[#12334D] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-[#E9A23B] px-2.5 py-0.5 font-mono text-xs font-bold text-[#0B1F33]">
                  {scenario.id}
                </span>
                <button
                  type="button"
                  onClick={() => openMilestoneWorkspace(scenario.milestoneId)}
                  className="rounded border border-[#42C7E8]/40 bg-[#0B1F33] px-2 py-0.5 font-mono text-xs text-[#42C7E8] hover:underline"
                >
                  Primary: {scenario.milestoneId}
                </button>
                <span className="font-mono text-[11px] text-[#9BB4C5]">
                  Linked: {scenario.linkedMilestones.join(' → ')}
                </span>
              </div>
              <StatusBadge status={scenario.status} />
            </div>

            <h2 className="text-2xl font-bold text-[#F5FAFC]">{scenario.title}</h2>
            <p className="text-sm text-[#EAF5F8]/90">{scenario.overview}</p>

            <div className="grid gap-3 sm:grid-cols-2 text-xs pt-1">
              <div className="rounded border border-[#D9534F]/35 bg-[#0B1F33] p-3">
                <div className="font-mono text-[10px] font-bold text-[#F69D9B]">TRIGGER & INITIAL WARNING</div>
                <p className="mt-1"><strong>Trigger:</strong> {scenario.trigger}</p>
                <p className="mt-1"><strong>Warning:</strong> {scenario.initialWarning}</p>
              </div>
              <div className="rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-3">
                <div className="font-mono text-[10px] font-bold text-[#42C7E8]">RESPONSIBLE ROLE & SLA</div>
                <p className="mt-1"><strong>Owner:</strong> {scenario.responsibleRole}</p>
                <p className="mt-1 text-[#F5C57B]"><strong>Response Target:</strong> {scenario.responseTimeTarget}</p>
              </div>
            </div>
          </div>

          {/* Interactive 8-Step Response Sequence */}
          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
                8-Phase Simulation Walkthrough (Click Step or Advance)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStepIdx(0)}
                  className="flex items-center gap-1 rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2.5 py-1 font-mono text-[10px] text-[#9BB4C5]"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStepIdx((p) => Math.min(scenario.sequence.length - 1, p + 1))}
                  className="flex items-center gap-1 rounded border border-[#42C7E8] bg-[#42C7E8]/20 px-3 py-1 font-mono text-[10px] font-bold text-[#F5FAFC]"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
              {scenario.sequence.map((step, i) => {
                const isCurrent = i === activeStepIdx;
                const isDone = i < activeStepIdx;
                return (
                  <button
                    key={step.phase}
                    type="button"
                    onClick={() => setActiveStepIdx(i)}
                    className={`rounded border p-2.5 text-left transition-all ${
                      isCurrent
                        ? 'border-[#42C7E8] bg-[#173B57] ring-1 ring-[#42C7E8]/50'
                        : isDone
                        ? 'border-[#3CA77A]/50 bg-[#0B1F33] text-[#7AE0B3]'
                        : 'border-[#42C7E8]/15 bg-[#0B1F33]/70 text-[#9BB4C5]'
                    }`}
                  >
                    <div className="font-mono text-[10px] font-bold">
                      {i + 1}. {step.phase}
                    </div>
                    <div className="mt-1 text-[11px] truncate text-[#EAF5F8]">{step.actor}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Readout */}
            <div className="rounded border border-[#42C7E8]/40 bg-[#0B1F33] p-4 text-xs space-y-1.5">
              <div className="font-mono text-[11px] font-bold text-[#42C7E8]">
                ACTIVE PHASE: {scenario.sequence[activeStepIdx].phase} · ACTOR: {scenario.sequence[activeStepIdx].actor}
              </div>
              <p className="text-sm text-[#F5FAFC]">{scenario.sequence[activeStepIdx].action}</p>
              <p className="font-mono text-[11px] text-[#7AE0B3]">
                REQUIRED EVIDENCE: {scenario.sequence[activeStepIdx].recordOrEvidence}
              </p>
            </div>
          </div>

          {/* Interactive Decision Tree */}
          {decisionNode && (
            <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#F5C57B]">
                <GitBranch className="h-4 w-4" />
                <span>Interactive Decision Tree (Illustrative Branching)</span>
              </div>
              <p className="text-sm font-semibold text-[#F5FAFC]">{decisionNode.question}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {decisionNode.options.map((opt, idx) => {
                  const chosen = selectedOptionIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedOptionIdx(idx)}
                      className={`rounded border p-3.5 text-left text-xs transition-all ${
                        chosen
                          ? 'border-[#3CA77A] bg-[#0B1F33] ring-1 ring-[#3CA77A]/60'
                          : 'border-[#42C7E8]/25 bg-[#0B1F33]/80 hover:border-[#42C7E8]'
                      }`}
                    >
                      <div className="font-semibold text-[#42C7E8]">{opt.label}</div>
                      <p className="mt-1.5 text-[#EAF5F8]"><strong>Consequence:</strong> {opt.consequence}</p>
                      <p className="mt-1 text-[#7AE0B3]"><strong>Recovery Path:</strong> {opt.recoveryPath}</p>
                      {chosen && opt.finalOutcome && (
                        <div className="mt-2 flex items-center gap-1.5 border-t border-[#3CA77A]/30 pt-2 font-mono text-[11px] text-[#7AE0B3]">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          <span>{opt.finalOutcome}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customer Comms, Financial Impact, Closure */}
          <div className="grid gap-4 md:grid-cols-3 text-xs">
            <div className="rounded border border-[#42C7E8]/25 bg-[#102A43] p-4 space-y-1.5">
              <div className="font-mono text-[10px] font-bold text-[#42C7E8]">RECOVERY & EVIDENCE</div>
              <ul className="space-y-1 text-[#EAF5F8]">
                {scenario.recoveryOptions.map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
              <div className="pt-1 text-[#9BB4C5]"><strong>Evidence:</strong> {scenario.requiredEvidence.join(', ')}</div>
            </div>
            <div className="rounded border border-[#E9A23B]/25 bg-[#102A43] p-4 space-y-1.5">
              <div className="font-mono text-[10px] font-bold text-[#F5C57B]">CUSTOMER & FINANCIAL IMPACT</div>
              <p><strong>Customer Comms:</strong> {scenario.customerCommunication}</p>
              <p className="text-[#F69D9B]"><strong>Financial Exposure:</strong> {scenario.financialImpact}</p>
            </div>
            <div className="rounded border border-[#3CA77A]/25 bg-[#102A43] p-4 space-y-1.5">
              <div className="font-mono text-[10px] font-bold text-[#7AE0B3]">CLOSURE CRITERIA</div>
              <p>{scenario.closureCriteria}</p>
              <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-[#F5C57B]">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>Pending formal validation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
