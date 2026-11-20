import React from 'react';
import { CONCEPTUAL_KPI_STRIP } from '../data/dataArchitectureMap';
import { EXCEPTION_BRANCHES } from '../exceptions/exceptionsData';

export const KpiStrip: React.FC<{ onOpenExceptions: () => void }> = ({ onOpenExceptions }) => {
  const openDecisionCount = EXCEPTION_BRANCHES.filter((e) => !e.decisionDefinedInSource).length;

  return (
    <div className="pointer-events-auto z-20 flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/20 bg-[#102A43]/85 px-3 py-1.5 backdrop-blur-md md:px-5">
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {CONCEPTUAL_KPI_STRIP.map((kpi) => {
          const valColor =
            kpi.tone === 'cyan'
              ? 'text-[#42C7E8]'
              : kpi.tone === 'green'
              ? 'text-[#3CA77A]'
              : kpi.tone === 'red'
              ? 'text-[#D9534F]'
              : 'text-[#F4F7F8]';
          return (
            <div key={kpi.label} className="flex items-baseline gap-1.5 border-r border-[#42C7E8]/15 pr-3 last:border-r-0">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C9BA5]">{kpi.label}:</span>
              <span className={`font-mono text-[11px] font-semibold ${valColor}`}>{kpi.value}</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onOpenExceptions}
        className="flex items-center gap-1.5 rounded border border-[#E9A23B]/50 bg-[#E9A23B]/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#E9A23B] hover:bg-[#E9A23B]/25 transition-colors"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#E9A23B]" />
        <span>{openDecisionCount} PROCESS DECISIONS REQUIRED</span>
      </button>
    </div>
  );
};
