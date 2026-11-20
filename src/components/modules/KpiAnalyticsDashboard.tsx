import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { KPI_ANALYTICS_GROUPS } from '../../data/kpiAnalyticsData';
import { StatusBadge } from '../layout/StatusBadge';
import { useBlueprint } from '../../context/BlueprintContext';

export const KpiAnalyticsDashboard: React.FC = () => {
  const { openMilestoneWorkspace } = useBlueprint();
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const visibleGroups = KPI_ANALYTICS_GROUPS.filter(
    (g) => selectedDomain === 'ALL' || g.domain === selectedDomain
  );

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-6">
      <div className="rounded border border-[#E9A23B]/50 bg-[#E9A23B]/10 px-4 py-2.5 text-xs text-[#F5C57B]">
        <strong>ILLUSTRATIVE ANALYTICS & KPI DEFINITIONS:</strong> All numeric trends, rupee figures, yields and percentages displayed below are illustrative placeholder data only. Actual M2Labo / HiMedia operational metrics and targets are not yet connected and remain UNKNOWN / NEEDS VERIFICATION.
      </div>

      {/* Header & Domain Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#42C7E8]/30 bg-[#102A43] p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#42C7E8]">
            <BarChart3 className="h-4 w-4" />
            <span>9-DOMAIN SUPPLY CHAIN KPI & UNIT ECONOMICS ARCHITECTURE</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-[#F5FAFC]">
            Farm · Harvesting · Cold Chain · Transport · Warehouse · Fulfilment · Last-Mile · Customer · Finance
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedDomain('ALL')}
            className={`rounded border px-2.5 py-1 font-mono text-[11px] ${
              selectedDomain === 'ALL'
                ? 'border-[#42C7E8] bg-[#42C7E8]/20 text-[#F5FAFC]'
                : 'border-[#42C7E8]/25 bg-[#0B1F33] text-[#9BB4C5]'
            }`}
          >
            All 9 Domains
          </button>
          {KPI_ANALYTICS_GROUPS.map((g) => (
            <button
              key={g.domain}
              type="button"
              onClick={() => setSelectedDomain(g.domain)}
              className={`rounded border px-2.5 py-1 font-mono text-[11px] ${
                selectedDomain === g.domain
                  ? 'border-[#42C7E8] bg-[#42C7E8]/20 text-[#F5FAFC]'
                  : 'border-[#42C7E8]/25 bg-[#0B1F33] text-[#9BB4C5]'
              }`}
            >
              {g.domain}
            </button>
          ))}
        </div>
      </div>

      {/* Domain Sections */}
      <div className="space-y-6">
        {visibleGroups.map((group) => (
          <section key={group.domain} className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/20 pb-2.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#42C7E8]" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#F5FAFC]">
                  {group.domain} KPIs
                </h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#9BB4C5]">
                <span>MILESTONES:</span>
                {group.milestoneIds.map((mId) => (
                  <button
                    key={mId}
                    type="button"
                    onClick={() => openMilestoneWorkspace(mId)}
                    className="rounded border border-[#42C7E8]/35 bg-[#0B1F33] px-1.5 py-0.5 text-[#42C7E8] hover:bg-[#173B57]"
                  >
                    {mId}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {group.metrics.map((metric) => {
                const min = Math.min(...metric.illustrativeTrend);
                const max = Math.max(...metric.illustrativeTrend);
                const span = max - min || 1;
                const svgPoints = metric.illustrativeTrend
                  .map((val, i) => {
                    const x = 10 + (i / (metric.illustrativeTrend.length - 1)) * 180;
                    const y = 44 - ((val - min) / span) * 32;
                    return `${x},${y}`;
                  })
                  .join(' ');

                return (
                  <div key={metric.id} className="flex flex-col justify-between rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-[#42C7E8]">{metric.id}</span>
                        <StatusBadge status={metric.status} compact />
                      </div>
                      <h4 className="mt-1 text-sm font-bold text-[#F5FAFC]">{metric.name}</h4>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-mono text-2xl font-bold text-[#F5C57B]">{metric.illustrativeValue}</span>
                        <span className="font-mono text-[10px] text-[#9BB4C5]">(Illustrative)</span>
                      </div>
                    </div>

                    {/* SVG Technical Sparkline */}
                    <svg viewBox="0 0 200 54" className="h-14 w-full rounded border border-[#42C7E8]/15 bg-[#102A43]/60">
                      <polyline
                        fill="none"
                        stroke="#42C7E8"
                        strokeWidth="2"
                        points={svgPoints}
                      />
                      {metric.illustrativeTrend.map((val, i) => {
                        const x = 10 + (i / (metric.illustrativeTrend.length - 1)) * 180;
                        const y = 44 - ((val - min) / span) * 32;
                        return <circle key={i} cx={x} cy={y} r="2.5" fill="#F5FAFC" />;
                      })}
                    </svg>

                    <div className="space-y-1 border-t border-[#42C7E8]/15 pt-2 text-[11px]">
                      <p className="font-mono text-[10px] text-[#86E1F7]">
                        <strong>Formula:</strong> {metric.formula}
                      </p>
                      <p className="text-[#9BB4C5]"><strong>Owner:</strong> {metric.owner}</p>
                      <p className="font-mono text-[10px] text-[#F69D9B]">
                        <strong>Target:</strong> {metric.targetStatus}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
