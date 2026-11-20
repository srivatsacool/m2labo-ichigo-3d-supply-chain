import React, { lazy, Suspense, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ShieldAlert,
  GitBranch,
  QrCode,
  FileText,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { useBlueprint } from '../../context/BlueprintContext';
import { MILESTONES } from '../../data/milestonesData';
import { StatusBadge } from '../layout/StatusBadge';
import { StationIsometricSvg } from '../diagrams/StationIsometricSvg';

const SpatialSceneViewer = lazy(() => import('../three/SpatialSceneViewer'));

type DetailTabId = 'overview' | 'workflow' | 'checklists' | 'quality' | 'data' | 'governance';

export const MilestoneDetailView: React.FC = () => {
  const {
    activeMilestoneId,
    setActiveMilestoneId,
    setMilestoneDetailOpen,
    perspective,
    mode3D,
    checklistState,
    updateChecklistItem,
    setActiveModule,
  } = useBlueprint();

  const [activeTab, setActiveTab] = useState<DetailTabId>('overview');

  const idx = MILESTONES.findIndex((m) => m.id === activeMilestoneId);
  const milestone = MILESTONES[idx >= 0 ? idx : 0];
  const prevMilestone = idx > 0 ? MILESTONES[idx - 1] : null;
  const nextMilestone = idx < MILESTONES.length - 1 ? MILESTONES[idx + 1] : null;

  const tabs: { id: DetailTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: '01–05 Overview & Inputs', icon: FileText },
    { id: 'workflow', label: '06–09 Activities & Roles', icon: GitBranch },
    { id: 'checklists', label: '18–19 Checklists', icon: ClipboardCheck },
    { id: 'quality', label: '12–17 Gates, QC & Risks', icon: ShieldAlert },
    { id: 'data', label: '10–11, 20–23 Data, QR & KPIs', icon: QrCode },
    { id: 'governance', label: '24–26 Governance & Open Qs', icon: HelpCircle },
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
      {/* Breadcrumb & Prev/Next Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded border border-[#42C7E8]/25 bg-[#12334D] px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMilestoneDetailOpen(false)}
            className="flex items-center gap-1.5 rounded border border-[#42C7E8]/40 bg-[#0B1F33] px-2.5 py-1 font-mono text-xs text-[#42C7E8] hover:bg-[#173B57]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Horizontal Canvas</span>
          </button>
          <span className="text-[#9BB4C5]">/</span>
          <span className="font-mono text-[#9BB4C5]">{milestone.code}</span>
          <span className="text-[#9BB4C5]">/</span>
          <span className="font-semibold text-[#F5FAFC]">{milestone.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!prevMilestone}
            onClick={() => prevMilestone && setActiveMilestoneId(prevMilestone.id)}
            className="flex items-center gap-1 rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2.5 py-1 text-xs text-[#EAF5F8] disabled:opacity-40 hover:border-[#42C7E8]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>{prevMilestone ? `${prevMilestone.number}. ${prevMilestone.shortTitle}` : 'Start'}</span>
          </button>
          <button
            type="button"
            disabled={!nextMilestone}
            onClick={() => nextMilestone && setActiveMilestoneId(nextMilestone.id)}
            className="flex items-center gap-1 rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2.5 py-1 text-xs text-[#EAF5F8] disabled:opacity-40 hover:border-[#42C7E8]"
          >
            <span>{nextMilestone ? `${nextMilestone.number}. ${nextMilestone.shortTitle}` : 'End'}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Station Header Card */}
      <div className="mb-6 grid gap-4 rounded border border-[#42C7E8]/35 bg-[#102A43] p-5 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-[#42C7E8]/20 border border-[#42C7E8]/60 px-2.5 py-0.5 font-mono text-xs font-bold text-[#42C7E8]">
              MILESTONE {milestone.number}
            </span>
            <StatusBadge status={milestone.governance.status} />
            <span className="rounded border border-[#9BB4C5]/30 bg-[#0B1F33] px-2 py-0.5 font-mono text-[10px] text-[#9BB4C5]">
              STATE: {milestone.governance.processState}
            </span>
            <span className="rounded border border-[#1D9BF0]/40 bg-[#1D9BF0]/10 px-2 py-0.5 font-mono text-[10px] text-[#7FC6F8]">
              PERSPECTIVE: {perspective} VIEW
            </span>
          </div>

          <h2 className="text-2xl font-bold text-[#F5FAFC]">{milestone.title}</h2>
          <p className="text-sm leading-relaxed text-[#EAF5F8]/90">{milestone.sec01_processOverview}</p>

          {/* Perspective Highlight Callout */}
          <div className="rounded border border-[#42C7E8]/30 bg-[#0B1F33]/80 p-3 text-xs">
            {perspective === 'WORKER' && (
              <p className="text-[#86E1F7]">
                <strong className="font-mono uppercase">Worker Focus:</strong> Perform activities in Zone{' '}
                <span className="text-[#F5FAFC]">{milestone.facilityZone}</span>, complete Before/During/After checklists, and verify handover to{' '}
                <span className="text-[#F5FAFC]">{milestone.sec20_handoverRequirements.toRole}</span>.
              </p>
            )}
            {perspective === 'SUPERVISOR' && (
              <p className="text-[#F5C57B]">
                <strong className="font-mono uppercase">Supervisor Focus:</strong> Enforce QC responsibilities ({milestone.sec09_qcResponsibilities.length} checks), verify decision gates, and sign off checklist items before handover.
              </p>
            )}
            {perspective === 'MANAGEMENT' && (
              <p className="text-[#7AE0B3]">
                <strong className="font-mono uppercase">Management Focus:</strong> Track {milestone.sec23_kpis.length} stage KPIs, resolve {milestone.sec25_openQuestions.length} open governance questions, and monitor {milestone.sec14_failureAndExceptions.length} failure modes.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-3">
          <StationIsometricSvg milestoneId={milestone.id} className="h-32 w-full" />
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#42C7E8]/15 pt-2 font-mono text-[11px]">
            <div>
              <span className="block text-[9px] text-[#9BB4C5]">TEMP ENVELOPE</span>
              <span className="text-[#42C7E8]">{milestone.stationTelemetry.targetTemp}</span>
            </div>
            <div>
              <span className="block text-[9px] text-[#9BB4C5]">CYCLE WINDOW</span>
              <span className="text-[#F5FAFC]">{milestone.stationTelemetry.cycleWindow}</span>
            </div>
            <div>
              <span className="block text-[9px] text-[#9BB4C5]">QR ANCHOR</span>
              <span className="text-[#7AE0B3]">{milestone.stationTelemetry.qrAnchor}</span>
            </div>
            <div>
              <span className="block text-[9px] text-[#9BB4C5]">KEY OUTPUT</span>
              <span className="text-[#EAF5F8]">{milestone.stationTelemetry.keyOutput}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Lazy-Loaded 3D Spatial Context when 3D Mode is toggled ON */}
      {mode3D && milestone.has3DContext && (
        <div className="mb-6">
          <Suspense
            fallback={
              <div className="rounded border border-[#42C7E8]/30 bg-[#0B1F33] p-6 text-center font-mono text-xs text-[#42C7E8]">
                Lazy-loading 3D Spatial Blueprint Scene...
              </div>
            }
          >
            <SpatialSceneViewer sceneId={milestone.has3DContext} compact />
          </Suspense>
        </div>
      )}

      {/* 6 Engineering Detail Tabs Covering All 26 Standard Sections */}
      <div className="mb-4 flex flex-wrap gap-1.5 border-b border-[#42C7E8]/25 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded border px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? 'border-[#42C7E8] bg-[#173B57] text-[#F5FAFC]'
                  : 'border-[#42C7E8]/20 bg-[#0B1F33] text-[#9BB4C5] hover:text-[#F5FAFC]'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#42C7E8]' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Sections 01–05 */}
      {activeTab === 'overview' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              01 · Process Overview & 02 · Business Importance
            </h3>
            <p className="text-sm text-[#EAF5F8]">{milestone.sec01_processOverview}</p>
            <div className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 text-xs text-[#9BB4C5]">
              <strong className="text-[#F5FAFC]">Why this stage exists: </strong>
              {milestone.sec02_purposeAndImportance}
            </div>
            <div>
              <h4 className="mb-1.5 font-mono text-[11px] font-semibold uppercase text-[#42C7E8]">03 · Entry Conditions & Trigger</h4>
              <ul className="space-y-1 text-xs text-[#EAF5F8]">
                {milestone.sec03_entryConditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[#42C7E8]">→</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
              <h3 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
                04 · Inputs & Required Materials
              </h3>
              <div className="space-y-2">
                {milestone.sec04_inputsAndMaterials.map((inp, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5 text-xs">
                    <div>
                      <div className="font-semibold text-[#F5FAFC]">{inp.item}</div>
                      <div className="text-[#9BB4C5]">{inp.spec}</div>
                    </div>
                    <StatusBadge status={inp.status} compact />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
              <h3 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
                05 · Equipment & Tools
              </h3>
              <div className="space-y-2">
                {milestone.sec05_equipmentAndTools.map((eq, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5 text-xs">
                    <div>
                      <div className="font-semibold text-[#F5FAFC]">{eq.name}</div>
                      <div className="text-[#9BB4C5]">{eq.purpose}</div>
                    </div>
                    <StatusBadge status={eq.status} compact />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Sections 06–09 */}
      {activeTab === 'workflow' && (
        <div className="space-y-5">
          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
            <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              06 · Detailed Worker Activities (8-Point Operational Breakdown)
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {milestone.sec06_workerActivities.map((act) => (
                <div key={act.id} className="rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-4 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/15 pb-2">
                    <span className="font-semibold text-sm text-[#F5FAFC]">{act.title}</span>
                    <StatusBadge status={act.status} compact />
                  </div>
                  <div className="grid gap-1.5">
                    <p><strong className="text-[#42C7E8]">Who performs:</strong> {act.whoPerforms}</p>
                    <p><strong className="text-[#42C7E8]">What they do:</strong> {act.whatTheyDo}</p>
                    <p><strong className="text-[#42C7E8]">Equipment used:</strong> {act.equipmentUsed}</p>
                    <p><strong className="text-[#42C7E8]">What to inspect:</strong> {act.whatToInspect}</p>
                    <p><strong className="text-[#42C7E8]">What to record:</strong> {act.whatToRecord}</p>
                    <p className="text-[#F5C57B]"><strong>If it fails:</strong> {act.ifItFails}</p>
                    <p><strong className="text-[#7AE0B3]">Who approves next step:</strong> {act.whoApprovesNext}</p>
                    <p><strong className="text-[#7AE0B3]">What is handed over:</strong> {act.whatIsHandedOver}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
              <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
                07 · Step-by-Step Workflow Sequence
              </h3>
              <div className="space-y-2">
                {milestone.sec07_stepByStepWorkflow.map((step) => (
                  <div key={step.stepNo} className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="rounded bg-[#173B57] px-2 py-0.5 font-mono font-bold text-[#42C7E8]">{step.stepNo}</span>
                      <div>
                        <div className="text-[#F5FAFC]">{step.action}</div>
                        <div className="mt-0.5 font-mono text-[10px] text-[#9BB4C5]">
                          OWNER: {step.owner} · GATE: {step.gateType}
                          {step.note ? ` · NOTE: ${step.note}` : ''}
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={step.status} compact />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
                <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#F5C57B]">
                  08 · Supervisor Responsibilities
                </h3>
                <ul className="space-y-1.5 text-xs text-[#EAF5F8]">
                  {milestone.sec08_supervisorResponsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#F5C57B]">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
                <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#7AE0B3]">
                  09 · QC Responsibilities
                </h3>
                <ul className="space-y-1.5 text-xs text-[#EAF5F8]">
                  {milestone.sec09_qcResponsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#7AE0B3]">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Sections 18–19 Interactive Checklists */}
      {activeTab === 'checklists' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#E9A23B]/40 bg-[#E9A23B]/10 px-4 py-2 text-xs text-[#F5C57B]">
            <span>
              <strong>DEMONSTRATION MODE:</strong> Interactive checklist completions and readings save locally in your browser only. They do NOT transmit to a live ERP/WMS system.
            </span>
            <button
              type="button"
              onClick={() => setActiveModule('checklists')}
              className="font-mono underline hover:text-[#F5FAFC]"
            >
              Open Full Checklist Console →
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {(['BEFORE', 'DURING', 'AFTER'] as const).map((phase) => {
              const items = milestone.sec18_workerChecklist.filter((i) => i.phase === phase);
              return (
                <div key={phase} className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
                  <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
                    18 · Worker {phase}-Task Checklist
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => {
                      const state = checklistState[item.id] || { checked: false };
                      return (
                        <div key={item.id} className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 text-xs space-y-2">
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              checked={!!state.checked}
                              onChange={(e) =>
                                updateChecklistItem(item.id, milestone.id, { checked: e.target.checked, failed: false })
                              }
                              aria-label={item.instruction}
                              className="mt-0.5 h-4 w-4 accent-[#3CA77A]"
                            />
                            <div className="flex-1">
                              <div className={state.checked ? 'line-through text-[#9BB4C5]' : 'text-[#F5FAFC]'}>
                                {item.instruction}
                              </div>
                              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-[10px] text-[#9BB4C5]">Role: {item.assignedRole}</span>
                                <StatusBadge status={item.status} compact />
                              </div>
                            </div>
                          </div>

                          {item.mandatoryReadingLabel && (
                            <div className="flex items-center gap-2 pt-1">
                              <span className="font-mono text-[10px] text-[#42C7E8]">{item.mandatoryReadingLabel}:</span>
                              <input
                                type="text"
                                placeholder={`Demo (${item.mandatoryReadingUnit})`}
                                value={state.readingValue || ''}
                                onChange={(e) =>
                                  updateChecklistItem(item.id, milestone.id, { readingValue: e.target.value })
                                }
                                className="w-28 rounded border border-[#42C7E8]/30 bg-[#12334D] px-2 py-0.5 font-mono text-[11px] text-[#F5FAFC]"
                              />
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateChecklistItem(item.id, milestone.id, {
                                  failed: !state.failed,
                                  escalated: !state.failed,
                                  checked: false,
                                })
                              }
                              className={`rounded border px-2 py-0.5 font-mono text-[10px] ${
                                state.failed
                                  ? 'border-[#D9534F] bg-[#D9534F]/20 text-[#F69D9B]'
                                  : 'border-[#42C7E8]/25 text-[#9BB4C5]'
                              }`}
                            >
                              {state.failed ? 'EXCEPTION FLAGGED' : 'Flag Failure'}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                updateChecklistItem(item.id, milestone.id, {
                                  supervisorSignedOff: !state.supervisorSignedOff,
                                  supervisorName: item.supervisorRole,
                                })
                              }
                              className={`rounded border px-2 py-0.5 font-mono text-[10px] ${
                                state.supervisorSignedOff
                                  ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#7AE0B3]'
                                  : 'border-[#42C7E8]/25 text-[#9BB4C5]'
                              }`}
                            >
                              {state.supervisorSignedOff ? 'Supervisor Signed (Demo)' : 'Supervisor Sign-Off'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
            <h3 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#F5C57B]">
              19 · Supervisor Verification Checklist
            </h3>
            <div className="grid gap-2 md:grid-cols-2">
              {milestone.sec19_supervisorChecklist.map((s) => (
                <div key={s.id} className="flex items-start justify-between gap-2 rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 text-xs">
                  <div>
                    <div className="font-medium text-[#F5FAFC]">{s.check}</div>
                    <div className="mt-1 font-mono text-[10px] text-[#9BB4C5]">Criteria: {s.signOffCriteria}</div>
                  </div>
                  <StatusBadge status={s.status} compact />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Sections 12–17 Decision Gates, QC, Risks & Escalation */}
      {activeTab === 'quality' && (
        <div className="space-y-4">
          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
            <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              12 · Decision Gates & Pass / Hold / Rework / Reject Logic
            </h3>
            {milestone.sec12_decisionGates.map((gate) => (
              <div key={gate.id} className="rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-4">
                <div className="text-sm font-bold text-[#F5FAFC]">{gate.gateTitle}</div>
                <div className="mt-1 text-xs text-[#86E1F7]">{gate.question}</div>
                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  {gate.branches.map((b, i) => (
                    <div key={i} className="rounded border border-[#42C7E8]/20 bg-[#12334D] p-3 text-xs space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                            b.outcome === 'PASS'
                              ? 'bg-[#3CA77A]/20 text-[#7AE0B3]'
                              : b.outcome === 'REJECT'
                              ? 'bg-[#D9534F]/20 text-[#F69D9B]'
                              : 'bg-[#E9A23B]/20 text-[#F5C57B]'
                          }`}
                        >
                          {b.outcome}
                        </span>
                        <StatusBadge status={b.status} compact />
                      </div>
                      <div className="font-semibold text-[#F5FAFC]">{b.condition}</div>
                      <div className="text-[#EAF5F8]/85">{b.nextStep}</div>
                      <div className="font-mono text-[10px] text-[#9BB4C5]">Owner: {b.owner}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
              <h3 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
                13 · Acceptance Criteria (Unknown Thresholds Never Invented)
              </h3>
              <div className="space-y-2">
                {milestone.sec13_acceptanceCriteria.map((ac, i) => (
                  <div key={i} className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5 text-xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-[#F5FAFC]">{ac.parameter}</strong>
                      <StatusBadge status={ac.status} compact />
                    </div>
                    <div className="text-[#86E1F7]">Criterion: {ac.criterion}</div>
                    <div className="font-mono text-[10px] text-[#9BB4C5]">Sampling: {ac.sampling} · On Fail: {ac.failureAction}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9534F]">
                14–17 · Exceptions, Preventive/Corrective Controls & Escalation
              </h3>
              <div className="space-y-2">
                {milestone.sec14_failureAndExceptions.map((ex, i) => (
                  <div key={i} className="rounded border border-[#D9534F]/25 bg-[#0B1F33] p-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#F69D9B]">{ex.mode}</strong>
                      <StatusBadge status={ex.status} compact />
                    </div>
                    <div className="mt-0.5 text-[#9BB4C5]">Trigger: {ex.trigger} → Impact: {ex.impact}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                <div className="rounded border border-[#3CA77A]/25 bg-[#0B1F33] p-2.5">
                  <div className="font-mono text-[10px] font-bold text-[#7AE0B3]">15 · PREVENTIVE CONTROLS</div>
                  <ul className="mt-1 space-y-1 text-[#EAF5F8]">
                    {milestone.sec15_preventiveControls.map((p, i) => <li key={i}>• {p}</li>)}
                  </ul>
                </div>
                <div className="rounded border border-[#E9A23B]/25 bg-[#0B1F33] p-2.5">
                  <div className="font-mono text-[10px] font-bold text-[#F5C57B]">16 · CORRECTIVE ACTIONS</div>
                  <ul className="mt-1 space-y-1 text-[#EAF5F8]">
                    {milestone.sec16_correctiveActions.map((c, i) => <li key={i}>• {c}</li>)}
                  </ul>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] font-bold text-[#42C7E8]">17 · ESCALATION MATRIX</div>
                {milestone.sec17_escalationMatrix.map((esc, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-2 text-xs">
                    <span>
                      <strong className="font-mono text-[#42C7E8]">{esc.level}:</strong> {esc.trigger} → <em>{esc.notifyRole}</em>
                    </span>
                    <StatusBadge status={esc.status} compact />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Sections 10–11, 20–23 */}
      {activeTab === 'data' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              10 · Required Data & 11 · QR / Barcode Interactions
            </h3>
            {milestone.sec10_requiredDataAndRecords.map((rec, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5 text-xs">
                <div>
                  <div className="font-semibold text-[#F5FAFC]">{rec.field}</div>
                  <div className="text-[#9BB4C5]">{rec.format}</div>
                </div>
                <StatusBadge status={rec.status} compact />
              </div>
            ))}
            {milestone.sec11_qrBarcodeInteractions.map((qr, i) => (
              <div key={i} className="rounded border border-[#3CA77A]/30 bg-[#0B1F33] p-3 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-[#7AE0B3]">{qr.scanEvent}</strong>
                  <StatusBadge status={qr.status} compact />
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#42C7E8]">{qr.idLevel}</div>
                <div className="mt-1 text-[#EAF5F8]">{qr.direction}</div>
              </div>
            ))}
          </div>

          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              20 · Handover, 21 · Outputs, 22 · Dependencies & 23 · KPIs
            </h3>
            <div className="rounded border border-[#42C7E8]/25 bg-[#0B1F33] p-3 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <strong className="font-mono text-[#42C7E8]">HANDOVER PROTOCOL</strong>
                <StatusBadge status={milestone.sec20_handoverRequirements.status} compact />
              </div>
              <p><strong>From:</strong> {milestone.sec20_handoverRequirements.fromRole} → <strong>To:</strong> {milestone.sec20_handoverRequirements.toRole}</p>
              <p><strong>Physical:</strong> {milestone.sec20_handoverRequirements.physicalItem}</p>
              <p><strong>Digital:</strong> {milestone.sec20_handoverRequirements.digitalRecord}</p>
              <p><strong>Sign-off:</strong> {milestone.sec20_handoverRequirements.acknowledgement}</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              <div className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5">
                <div className="font-mono text-[10px] font-bold text-[#7AE0B3]">21 · OUTPUTS</div>
                <ul className="mt-1 space-y-1">{milestone.sec21_outputs.map((o, i) => <li key={i}>• {o}</li>)}</ul>
              </div>
              <div className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5">
                <div className="font-mono text-[10px] font-bold text-[#42C7E8]">22 · DEPENDENCIES</div>
                <p className="mt-1 text-[#9BB4C5]"><strong>Up:</strong> {milestone.sec22_dependencies.upstream.join('; ')}</p>
                <p className="mt-1 text-[#9BB4C5]"><strong>Down:</strong> {milestone.sec22_dependencies.downstream.join('; ')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-[10px] font-bold text-[#42C7E8]">23 · STAGE KPIs</div>
              {milestone.sec23_kpis.map((k) => (
                <div key={k.id} className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-[#F5FAFC]">{k.name}</strong>
                    <StatusBadge status={k.status} compact />
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-[#86E1F7]">{k.formula} ({k.unit})</div>
                  <div className="mt-0.5 font-mono text-[10px] text-[#9BB4C5]">Owner: {k.owner} · Target: {k.target}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Sections 24–26 Governance, Open Questions & Source Citations */}
      {activeTab === 'governance' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#7AE0B3]">
              24 · Process Improvement Opportunities
            </h3>
            <ul className="space-y-2 text-xs text-[#EAF5F8]">
              {milestone.sec24_improvementOpportunities.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 rounded border border-[#3CA77A]/20 bg-[#0B1F33] p-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3CA77A]" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>

            <h3 className="pt-2 font-mono text-xs font-bold uppercase tracking-wider text-[#F69D9B]">
              25 · Open Questions Requiring Verification
            </h3>
            <ul className="space-y-2 text-xs text-[#F69D9B]">
              {milestone.sec25_openQuestions.map((oq, i) => (
                <li key={i} className="flex items-start justify-between gap-2 rounded border border-[#D9534F]/30 bg-[#0B1F33] p-2.5">
                  <span>{oq}</span>
                  <button
                    type="button"
                    onClick={() => setActiveModule('questions')}
                    className="shrink-0 font-mono text-[10px] text-[#42C7E8] underline"
                  >
                    Open Register
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              26 · Source References, Discrepancies & Revision History
            </h3>
            <div className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 text-xs space-y-1 font-mono">
              <div>Source: {milestone.governance.sourceDocument} ({milestone.governance.pageOrRef})</div>
              <div>Validation Owner: {milestone.governance.validationOwner}</div>
              <div>Approval Status: {milestone.governance.approvalStatus}</div>
            </div>
            {milestone.sec26_sourceReferences.map((ref, i) => (
              <div key={i} className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-[#F5FAFC]">{ref.source}</strong>
                  <StatusBadge status={ref.status} compact />
                </div>
                <p className="text-[#EAF5F8]/90">{ref.excerpt}</p>
                {ref.conflictNote && (
                  <div className="flex items-start gap-2 rounded border border-[#E9A23B]/40 bg-[#E9A23B]/10 p-2 text-[#F5C57B]">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{ref.conflictNote}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
