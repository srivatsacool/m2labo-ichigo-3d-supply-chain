import React from 'react';
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Layers,
  ShieldAlert,
  QrCode,
  Package,
} from 'lucide-react';
import { MILESTONES } from '../../data/milestonesData';
import { FMEA_RISK_LIBRARY, SCENARIO_SIMULATIONS } from '../../data/risksAndScenariosData';
import { CURRENT_VS_PROPOSED_MATRIX, DISCREPANCY_REGISTER } from '../../data/openQuestionsData';
import { useBlueprint } from '../../context/BlueprintContext';
import { StatusBadge } from '../layout/StatusBadge';

export const ExecutiveOverview: React.FC = () => {
  const { openMilestoneWorkspace, setActiveModule, questions } = useBlueprint();

  const confirmedCount = MILESTONES.filter((m) => m.governance.status === 'CONFIRMED IN PROJECT DISCUSSION').length;
  const openQuestionsCount = questions.filter((q) => q.currentStatus !== 'RESOLVED').length;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-6">
      {/* Executive Command Banner */}
      <section className="rounded border border-[#42C7E8]/35 bg-[#102A43] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#42C7E8] uppercase">
              M2LABO BHARAT / ICHIGO® · EXECUTIVE SUPPLY CHAIN COMMAND OVERVIEW
            </div>
            <h2 className="text-2xl font-bold text-[#F5FAFC] sm:text-3xl">
              End-to-End Japanese Strawberry Cold-Chain Operating Blueprint
            </h2>
            <p className="text-sm text-[#EAF5F8]/85 leading-relaxed">
              Documents the complete Pan-India launch backbone starting in Mumbai (HiMedia Farm → Blast Cooling → Grading & Packing → Linehaul → Andheri MIDC Hub → Last-Mile Delivery → Returns & Finance). Every process claim carries explicit validation governance separating confirmed operational facts from proposals, unknowns and illustrative simulations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModule('blueprint')}
            className="flex items-center gap-2 rounded border border-[#42C7E8] bg-[#42C7E8]/20 px-4 py-2.5 font-mono text-xs font-bold text-[#F5FAFC] hover:bg-[#42C7E8] hover:text-[#0B1F33] transition-colors"
          >
            <Layers className="h-4 w-4" />
            <span>Launch Horizontal Blueprint Spine</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* High-Level Blueprint Telemetry */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-3.5">
            <div className="font-mono text-[10px] text-[#9BB4C5]">MAPPED MILESTONES</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#42C7E8]">11 / 11</div>
            <div className="mt-1 text-[11px] text-[#9BB4C5]">{confirmedCount} Confirmed Baseline · Rest Proposed/Unverified</div>
          </div>
          <div className="rounded border border-[#E9A23B]/35 bg-[#0B1F33] p-3.5">
            <div className="font-mono text-[10px] text-[#9BB4C5]">COOLING PARAMETER</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#F5C57B]">5h → 5°C</div>
            <div className="mt-1 text-[11px] text-[#9BB4C5]">User-provided target pending validation (NOT freezing)</div>
          </div>
          <div className="rounded border border-[#D9534F]/35 bg-[#0B1F33] p-3.5">
            <div className="font-mono text-[10px] text-[#9BB4C5]">OPEN VALIDATIONS</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#F69D9B]">{openQuestionsCount} / {questions.length}</div>
            <div className="mt-1 text-[11px] text-[#9BB4C5]">{DISCREPANCY_REGISTER.length} Unresolved Discrepancies logged</div>
          </div>
          <div className="rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-3.5">
            <div className="font-mono text-[10px] text-[#9BB4C5]">RISK & SCENARIO ENGINE</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#F5FAFC]">{SCENARIO_SIMULATIONS.length} Scenarios</div>
            <div className="mt-1 text-[11px] text-[#9BB4C5]">{FMEA_RISK_LIBRARY.length} FMEA Risk Modes (Illustrative Sims)</div>
          </div>
          <div className="rounded border border-[#3CA77A]/35 bg-[#0B1F33] p-3.5">
            <div className="font-mono text-[10px] text-[#9BB4C5]">TRACEABILITY MODEL</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#7AE0B3]">14 Stages</div>
            <div className="mt-1 text-[11px] text-[#9BB4C5]">Demand ID → Batch → Punnet → POD → Credit Note</div>
          </div>
        </div>
      </section>

      {/* 11-Milestone Readiness Matrix */}
      <section className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
            End-to-End 11-Stage Process Architecture & Governance Status
          </h3>
          <span className="font-mono text-[11px] text-[#9BB4C5]">Click any row to open full 26-section SOP</span>
        </div>
        <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
          {MILESTONES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => openMilestoneWorkspace(m.id)}
              className="flex flex-col justify-between rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3.5 text-left hover:border-[#42C7E8] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#173B57] px-2 py-0.5 font-mono text-xs font-bold text-[#42C7E8]">
                    {m.number}
                  </span>
                  <span className="font-semibold text-sm text-[#F5FAFC]">{m.title}</span>
                </div>
                <StatusBadge status={m.governance.status} compact />
              </div>
              <p className="mt-2 text-xs text-[#9BB4C5] line-clamp-2">{m.sec01_processOverview}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#42C7E8]/15 pt-2 font-mono text-[10px] text-[#86E1F7]">
                <span>{m.stationTelemetry.keyOutput}</span>
                <span>Open Questions: {m.sec25_openQuestions.length} →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Current Operating State vs Proposed Future State + Discrepancy Highlights */}
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7 rounded border border-[#42C7E8]/25 bg-[#12334D] p-5">
          <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
            Current Operating State vs Proposed Target Architecture
          </h3>
          <div className="space-y-2.5">
            {CURRENT_VS_PROPOSED_MATRIX.map((row, idx) => (
              <div key={idx} className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-[#F5FAFC]">{row.domain}</strong>
                  <StatusBadge status={row.gapStatus as any} compact />
                </div>
                <p className="text-[#9BB4C5]">
                  <span className="font-mono text-[10px] text-[#F5C57B]">CURRENT: </span>
                  {row.currentState}
                </p>
                <p className="text-[#EAF5F8]">
                  <span className="font-mono text-[10px] text-[#7AE0B3]">PROPOSED: </span>
                  {row.proposedState}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-5 space-y-4">
          <div className="rounded border border-[#D9534F]/35 bg-[#12334D] p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#F69D9B]">
                <AlertTriangle className="h-4 w-4" />
                <span>Unresolved Document Discrepancies</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModule('questions')}
                className="font-mono text-[11px] text-[#42C7E8] underline"
              >
                Resolve All →
              </button>
            </div>
            <div className="space-y-2.5">
              {DISCREPANCY_REGISTER.map((d) => (
                <div key={d.id} className="rounded border border-[#D9534F]/30 bg-[#0B1F33] p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <strong className="text-[#F69D9B]">{d.id}: {d.topic}</strong>
                    <span className="rounded bg-[#D9534F]/20 px-1.5 py-0.5 text-[10px] text-[#F69D9B]">{d.status}</span>
                  </div>
                  <p className="text-[#EAF5F8]">• <strong>{d.statementA.source}:</strong> {d.statementA.text}</p>
                  <p className="text-[#9BB4C5]">• <strong>{d.statementB.source}:</strong> {d.statementB.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setActiveModule('scenarios')}
              className="flex flex-col gap-1 rounded border border-[#E9A23B]/40 bg-[#12334D] p-4 text-left hover:border-[#E9A23B]"
            >
              <ShieldAlert className="h-5 w-5 text-[#E9A23B]" />
              <span className="font-semibold text-sm text-[#F5FAFC]">24 Failure Scenarios</span>
              <span className="text-[11px] text-[#9BB4C5]">Simulate breakdowns, 15% QC fail & excursions</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('atlas')}
              className="flex flex-col gap-1 rounded border border-[#42C7E8]/40 bg-[#12334D] p-4 text-left hover:border-[#42C7E8]"
            >
              <Package className="h-5 w-5 text-[#42C7E8]" />
              <span className="font-semibold text-sm text-[#F5FAFC]">B2C vs B2B Packaging</span>
              <span className="text-[11px] text-[#9BB4C5]">Black 250g boxes vs B2B cavity trays + 3D</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('traceability')}
              className="flex flex-col gap-1 rounded border border-[#3CA77A]/40 bg-[#12334D] p-4 text-left hover:border-[#3CA77A]"
            >
              <QrCode className="h-5 w-5 text-[#3CA77A]" />
              <span className="font-semibold text-sm text-[#F5FAFC]">Traceability Chain</span>
              <span className="text-[11px] text-[#9BB4C5]">14-stage QR genealogy & temp history</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('questions')}
              className="flex flex-col gap-1 rounded border border-[#D9534F]/40 bg-[#12334D] p-4 text-left hover:border-[#D9534F]"
            >
              <HelpCircle className="h-5 w-5 text-[#D9534F]" />
              <span className="font-semibold text-sm text-[#F5FAFC]">25 Open Questions</span>
              <span className="text-[11px] text-[#9BB4C5]">Log answers, owners & approvals</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
