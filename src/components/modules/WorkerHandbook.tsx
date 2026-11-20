import React, { useState } from 'react';
import { HardHat, AlertOctagon, ArrowRight, Wrench, CheckSquare } from 'lucide-react';
import { MILESTONES } from '../../data/milestonesData';
import { useBlueprint } from '../../context/BlueprintContext';
import { StatusBadge } from '../layout/StatusBadge';

export const WorkerHandbook: React.FC = () => {
  const { activeMilestoneId, setActiveMilestoneId, openMilestoneWorkspace } = useBlueprint();
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const filtered = MILESTONES.filter((m) =>
    roleFilter === 'ALL'
      ? true
      : m.primaryOwner.toLowerCase().includes(roleFilter.toLowerCase()) ||
        m.sec06_workerActivities.some((a) => a.whoPerforms.toLowerCase().includes(roleFilter.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#42C7E8]/30 bg-[#102A43] p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#42C7E8]">
            <HardHat className="h-4 w-4" />
            <span>FRONTLINE WORKER HANDBOOK — CONCISE FIELD SOP CARDS</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-[#F5FAFC]">
            Actionable Shift Instructions Across All 11 Stations
          </h2>
          <p className="mt-1 text-xs text-[#9BB4C5]">
            Answers who acts, exact actions, equipment, inspection points, failure containment and handover sign-off. Items marked UNKNOWN await owner verification before becoming mandatory plant rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#9BB4C5]">FILTER ROLE:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Filter handbook by worker role"
            className="rounded border border-[#42C7E8]/35 bg-[#0B1F33] px-3 py-1.5 font-mono text-xs text-[#F5FAFC]"
          >
            <option value="ALL">All Frontline Roles</option>
            <option value="HiMedia">HiMedia Farm / Harvest</option>
            <option value="QC">QC Inspectors</option>
            <option value="Driver">Transport / Delivery Drivers</option>
            <option value="MIDC">Andheri MIDC Warehouse</option>
            <option value="Finance">Finance / CRM</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((m) => (
          <section
            key={m.id}
            onClick={() => setActiveMilestoneId(m.id)}
            className={`rounded border p-5 transition-colors ${
              activeMilestoneId === m.id ? 'border-[#42C7E8]/70 bg-[#12334D]' : 'border-[#42C7E8]/25 bg-[#102A43]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="rounded bg-[#42C7E8] px-2.5 py-0.5 font-mono text-xs font-bold text-[#0B1F33]">
                  {m.number}
                </span>
                <h3 className="text-lg font-bold text-[#F5FAFC]">{m.title}</h3>
                <span className="hidden sm:inline font-mono text-xs text-[#9BB4C5]">· {m.facilityZone}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={m.governance.status} compact />
                <button
                  type="button"
                  onClick={() => openMilestoneWorkspace(m.id)}
                  className="rounded border border-[#42C7E8]/40 bg-[#0B1F33] px-2.5 py-1 font-mono text-[11px] text-[#42C7E8] hover:bg-[#173B57]"
                >
                  Full 26-Sec SOP →
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-3">
                {m.sec06_workerActivities.map((act) => (
                  <div key={act.id} className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3.5 text-xs space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-sm text-[#42C7E8]">{act.title}</span>
                      <StatusBadge status={act.status} compact />
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <p><strong className="text-[#9BB4C5]">WHO:</strong> {act.whoPerforms}</p>
                      <p><strong className="text-[#9BB4C5]">TOOLS:</strong> {act.equipmentUsed}</p>
                      <p className="sm:col-span-2"><strong className="text-[#F5FAFC]">DO THIS:</strong> {act.whatTheyDo}</p>
                      <p><strong className="text-[#7AE0B3]">INSPECT:</strong> {act.whatToInspect}</p>
                      <p><strong className="text-[#86E1F7]">RECORD:</strong> {act.whatToRecord}</p>
                    </div>
                    <div className="flex items-start gap-2 rounded border border-[#E9A23B]/35 bg-[#E9A23B]/10 p-2 text-[#F5C57B]">
                      <AlertOctagon className="h-4 w-4 shrink-0" />
                      <span><strong>IF IT FAILS:</strong> {act.ifItFails}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 space-y-3 text-xs">
                <div className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3">
                  <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#42C7E8]">
                    <Wrench className="h-3.5 w-3.5" />
                    <span>REQUIRED EQUIPMENT</span>
                  </div>
                  <ul className="space-y-1 text-[#EAF5F8]">
                    {m.sec05_equipmentAndTools.map((eq, idx) => (
                      <li key={idx}>• {eq.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded border border-[#3CA77A]/30 bg-[#0B1F33] p-3 space-y-1">
                  <div className="mb-1 flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#7AE0B3]">
                    <CheckSquare className="h-3.5 w-3.5" />
                    <span>HANDOVER & APPROVAL</span>
                  </div>
                  <p><strong>Approves Next:</strong> {m.sec06_workerActivities[0]?.whoApprovesNext}</p>
                  <p><strong>Handover To:</strong> {m.sec20_handoverRequirements.toRole}</p>
                  <p className="text-[#9BB4C5]">{m.sec20_handoverRequirements.physicalItem}</p>
                  <div className="flex items-center gap-1 pt-1 font-mono text-[10px] text-[#42C7E8]">
                    <ArrowRight className="h-3 w-3" />
                    <span>{m.sec20_handoverRequirements.acknowledgement}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
