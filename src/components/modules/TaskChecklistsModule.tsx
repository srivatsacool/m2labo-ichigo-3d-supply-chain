import React, { useState } from 'react';
import {
  ClipboardCheck,
  RotateCcw,
  QrCode,
  Upload,
  AlertTriangle,
  ShieldCheck,
  History,
} from 'lucide-react';
import { MILESTONES } from '../../data/milestonesData';
import { useBlueprint } from '../../context/BlueprintContext';
import { StatusBadge } from '../layout/StatusBadge';

export const TaskChecklistsModule: React.FC = () => {
  const {
    activeMilestoneId,
    setActiveMilestoneId,
    checklistState,
    updateChecklistItem,
    resetDemoChecklists,
    auditTrail,
  } = useBlueprint();

  const [selectedMId, setSelectedMId] = useState<string>(activeMilestoneId);
  const milestone = MILESTONES.find((m) => m.id === selectedMId) || MILESTONES[0];

  const items = milestone.sec18_workerChecklist;
  const completedCount = items.filter((i) => checklistState[i.id]?.checked).length;
  const completionPct = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 lg:px-6">
      {/* Header & Local Demo Notice */}
      <div className="rounded border border-[#E9A23B]/50 bg-[#E9A23B]/10 px-4 py-2.5 text-xs text-[#F5C57B] flex flex-wrap items-center justify-between gap-2">
        <span>
          <strong>LOCAL DEMONSTRATION CHECKLIST ENGINE:</strong> Task check-offs, temperature readings, QR scans, escalations and supervisor sign-offs are stored locally in browser storage for demonstration only — NOT connected to a live M2Labo ERP/WMS.
        </span>
        <button
          type="button"
          onClick={resetDemoChecklists}
          className="flex items-center gap-1 rounded border border-[#E9A23B]/60 bg-[#0B1F33] px-2.5 py-1 font-mono text-[11px] text-[#F5C57B] hover:bg-[#173B57]"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Milestone Selector & Completion Meter */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#42C7E8]/30 bg-[#102A43] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <ClipboardCheck className="h-6 w-6 text-[#42C7E8]" />
          <div>
            <h2 className="text-xl font-bold text-[#F5FAFC]">Interactive Worker & Supervisor Checklists</h2>
            <p className="text-xs text-[#9BB4C5]">Before-Task · During-Task · After-Task verification with escalation & supervisor sign-off</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <select
            value={selectedMId}
            onChange={(e) => {
              setSelectedMId(e.target.value);
              setActiveMilestoneId(e.target.value);
            }}
            aria-label="Select milestone checklist"
            className="rounded border border-[#42C7E8]/40 bg-[#0B1F33] px-3 py-2 font-mono text-xs text-[#F5FAFC]"
          >
            {MILESTONES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.number}. {m.title}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-3 py-2 font-mono text-xs">
            <span className="text-[#9BB4C5]">DEMO COMPLETION:</span>
            <span className="font-bold text-[#42C7E8]">{completionPct}%</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-[#173B57]">
              <div className="h-full bg-[#3CA77A] transition-all" style={{ width: `${completionPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Before / During / After Columns */}
        <div className="lg:col-span-8 space-y-4">
          {(['BEFORE', 'DURING', 'AFTER'] as const).map((phase) => {
            const phaseItems = items.filter((i) => i.phase === phase);
            return (
              <div key={phase} className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
                  {phase}-TASK CHECKLIST ({phaseItems.length})
                </h3>
                <div className="space-y-3">
                  {phaseItems.map((item) => {
                    const st = checklistState[item.id] || { checked: false };
                    return (
                      <div key={item.id} className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3.5 text-xs space-y-2.5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <label className="flex flex-1 cursor-pointer items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={!!st.checked}
                              onChange={(e) =>
                                updateChecklistItem(item.id, milestone.id, {
                                  checked: e.target.checked,
                                  failed: false,
                                })
                              }
                              className="mt-0.5 h-4 w-4 accent-[#3CA77A]"
                            />
                            <div>
                              <span className={`font-medium ${st.checked ? 'line-through text-[#9BB4C5]' : 'text-[#F5FAFC]'}`}>
                                {item.instruction}
                              </span>
                              <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[10px] text-[#9BB4C5]">
                                <span>Worker: {item.assignedRole}</span>
                                <span>·</span>
                                <span>Supervisor: {item.supervisorRole}</span>
                                <span>·</span>
                                <span className={item.required ? 'text-[#F5C57B]' : 'text-[#9BB4C5]'}>
                                  {item.required ? 'MANDATORY' : 'OPTIONAL'}
                                </span>
                              </div>
                            </div>
                          </label>
                          <StatusBadge status={item.status} compact />
                        </div>

                        {/* Interactive Inputs: Mandatory Reading, QR Scan, Evidence Placeholder */}
                        <div className="flex flex-wrap items-center gap-3 border-t border-[#42C7E8]/15 pt-2.5">
                          {item.mandatoryReadingLabel && (
                            <label className="flex items-center gap-1.5 font-mono text-[10px] text-[#86E1F7]">
                              <span>{item.mandatoryReadingLabel}:</span>
                              <input
                                type="text"
                                placeholder={`Demo (${item.mandatoryReadingUnit})`}
                                value={st.readingValue || ''}
                                onChange={(e) =>
                                  updateChecklistItem(item.id, milestone.id, { readingValue: e.target.value })
                                }
                                className="w-24 rounded border border-[#42C7E8]/35 bg-[#12334D] px-2 py-1 text-[#F5FAFC]"
                              />
                            </label>
                          )}

                          {item.qrRequired && (
                            <label className="flex items-center gap-1.5 font-mono text-[10px] text-[#7AE0B3]">
                              <QrCode className="h-3.5 w-3.5" />
                              <input
                                type="text"
                                placeholder="Demo QR Scan ID"
                                value={st.qrScanned || ''}
                                onChange={(e) =>
                                  updateChecklistItem(item.id, milestone.id, { qrScanned: e.target.value })
                                }
                                className="w-36 rounded border border-[#3CA77A]/40 bg-[#12334D] px-2 py-1 text-[#F5FAFC]"
                              />
                            </label>
                          )}

                          {item.evidenceRequired && (
                            <button
                              type="button"
                              onClick={() =>
                                updateChecklistItem(item.id, milestone.id, {
                                  evidenceNote: st.evidenceNote ? '' : 'Demo Photo Attached (Placeholder)',
                                })
                              }
                              className={`flex items-center gap-1 rounded border px-2 py-1 font-mono text-[10px] ${
                                st.evidenceNote
                                  ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#7AE0B3]'
                                  : 'border-[#42C7E8]/30 bg-[#12334D] text-[#9BB4C5]'
                              }`}
                            >
                              <Upload className="h-3 w-3" />
                              <span>{st.evidenceNote || 'Attach Evidence (Demo)'}</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              updateChecklistItem(item.id, milestone.id, {
                                failed: !st.failed,
                                escalated: !st.failed,
                                checked: false,
                              })
                            }
                            className={`flex items-center gap-1 rounded border px-2 py-1 font-mono text-[10px] ${
                              st.failed
                                ? 'border-[#D9534F] bg-[#D9534F]/20 text-[#F69D9B]'
                                : 'border-[#42C7E8]/25 text-[#9BB4C5]'
                            }`}
                          >
                            <AlertTriangle className="h-3 w-3" />
                            <span>{st.failed ? 'FAILED & ESCALATED' : 'Mark Fail / Escalate'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateChecklistItem(item.id, milestone.id, {
                                supervisorSignedOff: !st.supervisorSignedOff,
                                supervisorName: item.supervisorRole,
                              })
                            }
                            className={`ml-auto flex items-center gap-1 rounded border px-2 py-1 font-mono text-[10px] ${
                              st.supervisorSignedOff
                                ? 'border-[#3CA77A] bg-[#3CA77A]/20 text-[#7AE0B3]'
                                : 'border-[#42C7E8]/30 text-[#9BB4C5]'
                            }`}
                          >
                            <ShieldCheck className="h-3 w-3" />
                            <span>{st.supervisorSignedOff ? 'Signed Off (Demo)' : 'Supervisor Sign-Off'}</span>
                          </button>
                        </div>

                        {st.timestamp && (
                          <div className="font-mono text-[10px] text-[#9BB4C5]">
                            Last local demo event: {st.timestamp}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Supervisor Sign-offs & Local Audit Trail */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
            <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F5C57B]">
              Supervisor Station Checks ({milestone.number})
            </h3>
            <div className="space-y-2">
              {milestone.sec19_supervisorChecklist.map((sc) => (
                <div key={sc.id} className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 text-xs space-y-1">
                  <div className="font-semibold text-[#F5FAFC]">{sc.check}</div>
                  <div className="font-mono text-[10px] text-[#9BB4C5]">Criteria: {sc.signOffCriteria}</div>
                  <StatusBadge status={sc.status} compact />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-4">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              <History className="h-4 w-4" />
              <span>Local Demo Audit Trail</span>
            </div>
            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {auditTrail.map((entry) => (
                <div key={entry.id} className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-2.5 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-[#42C7E8]">
                    <span>{entry.milestoneId} · {entry.itemId}</span>
                    <span className="text-[#9BB4C5]">{entry.timestamp.slice(0, 16)}</span>
                  </div>
                  <div className="mt-1 text-[#EAF5F8]">{entry.action}</div>
                  <div className="text-[#9BB4C5]">{entry.actor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
