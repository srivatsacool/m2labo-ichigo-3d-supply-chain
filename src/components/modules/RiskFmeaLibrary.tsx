import React, { useMemo, useState } from 'react';
import { ShieldAlert, Filter, ArrowRight } from 'lucide-react';
import { FMEA_RISK_LIBRARY, SCENARIO_SIMULATIONS } from '../../data/risksAndScenariosData';
import { MILESTONES } from '../../data/milestonesData';
import { StatusBadge } from '../layout/StatusBadge';
import { useBlueprint } from '../../context/BlueprintContext';

export const RiskFmeaLibrary: React.FC = () => {
  const { setActiveModule, setSelectedScenarioId, openMilestoneWorkspace } = useBlueprint();
  const [milestoneFilter, setMilestoneFilter] = useState<string>('ALL');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredRisks = useMemo(() => {
    return FMEA_RISK_LIBRARY.filter((r) => {
      const mOk = milestoneFilter === 'ALL' || r.milestoneId === milestoneFilter;
      const sOk = severityFilter === 'ALL' || r.riskPriorityLevel === severityFilter;
      return mOk && sOk;
    });
  }, [milestoneFilter, severityFilter]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#42C7E8]/30 bg-[#102A43] p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#D9534F]">
            <ShieldAlert className="h-4 w-4" />
            <span>FMEA RISK REGISTER — NO INVENTED RISK PRIORITY NUMBERS</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-[#F5FAFC]">
            Supply Chain Failure Modes, Triggers, Controls & Recovery
          </h2>
          <p className="mt-1 text-xs text-[#9BB4C5]">
            Numerical Probability/Severity/Detectability RPN scores remain UNSCORED until M2Labo & HiMedia approve a formal quantitative FMEA scoring rubric.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-[#42C7E8]" />
          <select
            value={milestoneFilter}
            onChange={(e) => setMilestoneFilter(e.target.value)}
            aria-label="Filter risks by milestone"
            className="rounded border border-[#42C7E8]/35 bg-[#0B1F33] px-3 py-1.5 font-mono text-xs text-[#F5FAFC]"
          >
            <option value="ALL">All Milestones (01–11)</option>
            {MILESTONES.map((m) => (
              <option key={m.id} value={m.id}>{m.number}. {m.shortTitle}</option>
            ))}
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            aria-label="Filter risks by priority band"
            className="rounded border border-[#42C7E8]/35 bg-[#0B1F33] px-3 py-1.5 font-mono text-xs text-[#F5FAFC]"
          >
            <option value="ALL">All Priority Levels</option>
            <option value="HIGH">HIGH Priority</option>
            <option value="MEDIUM">MEDIUM Priority</option>
            <option value="LOW">LOW Priority</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const linkedScenarios = SCENARIO_SIMULATIONS.filter((s) => s.milestoneId === risk.milestoneId);
          return (
            <div key={risk.id} className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/20 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#0B1F33] border border-[#42C7E8]/40 px-2 py-0.5 font-mono text-xs font-bold text-[#42C7E8]">
                    {risk.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => openMilestoneWorkspace(risk.milestoneId)}
                    className="rounded bg-[#173B57] px-2 py-0.5 font-mono text-xs text-[#EAF5F8] hover:text-[#42C7E8]"
                  >
                    {risk.milestoneId} · {risk.milestoneTitle}
                  </button>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                      risk.riskPriorityLevel === 'HIGH'
                        ? 'bg-[#D9534F]/20 text-[#F69D9B] border border-[#D9534F]/50'
                        : 'bg-[#E9A23B]/20 text-[#F5C57B] border border-[#E9A23B]/50'
                    }`}
                  >
                    BAND: {risk.riskPriorityLevel}
                  </span>
                </div>
                <StatusBadge status={risk.status} compact />
              </div>

              <h3 className="text-base font-bold text-[#F5FAFC]">{risk.failureMode}</h3>

              <div className="grid gap-3 text-xs md:grid-cols-3">
                <div className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-3 space-y-1">
                  <div className="font-mono text-[10px] text-[#42C7E8]">CAUSE & DETECTION</div>
                  <p><strong>Trigger:</strong> {risk.trigger}</p>
                  <p><strong>Cause:</strong> {risk.cause}</p>
                  <p><strong>Effect:</strong> {risk.potentialEffect}</p>
                  <p><strong>Detection:</strong> {risk.detectionMethod}</p>
                </div>

                <div className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-3 space-y-1">
                  <div className="font-mono text-[10px] text-[#F5C57B]">CONTROLS & IMMEDIATE ACTION</div>
                  <p><strong>Preventive:</strong> {risk.preventiveControl}</p>
                  <p><strong>Immediate Action:</strong> {risk.immediateAction}</p>
                  <p><strong>Recovery:</strong> {risk.recoveryProcedure}</p>
                </div>

                <div className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-3 space-y-1">
                  <div className="font-mono text-[10px] text-[#7AE0B3]">OWNERSHIP & CLOSURE</div>
                  <p><strong>Escalation Owner:</strong> {risk.escalationOwner}</p>
                  <p><strong>Required Records:</strong> {risk.requiredRecords}</p>
                  <p><strong>Closure Criteria:</strong> {risk.closureCriteria}</p>
                  <p className="font-mono text-[10px] text-[#9BB4C5]">
                    P: {risk.probability} · S: {risk.severity} · D: {risk.detectability}
                  </p>
                </div>
              </div>

              {linkedScenarios.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-mono text-[10px] text-[#9BB4C5]">LINKED SIMULATIONS:</span>
                  {linkedScenarios.map((scn) => (
                    <button
                      key={scn.id}
                      type="button"
                      onClick={() => {
                        setSelectedScenarioId(scn.id);
                        setActiveModule('scenarios');
                      }}
                      className="flex items-center gap-1 rounded border border-[#E9A23B]/40 bg-[#E9A23B]/10 px-2 py-0.5 font-mono text-[10px] text-[#F5C57B] hover:bg-[#E9A23B]/25"
                    >
                      <span>{scn.id}: {scn.title}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
