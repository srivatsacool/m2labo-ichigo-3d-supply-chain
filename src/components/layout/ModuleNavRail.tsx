import React from 'react';
import {
  LayoutDashboard,
  GitCommitHorizontal,
  BookOpen,
  ClipboardCheck,
  ShieldAlert,
  PlaySquare,
  QrCode,
  PackageOpen,
  BarChart3,
  HelpCircle,
} from 'lucide-react';
import { useBlueprint } from '../../context/BlueprintContext';
import { ModuleId } from '../../types/blueprint';
import { MILESTONES } from '../../data/milestonesData';

const MODULES: { id: ModuleId; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'overview', label: 'Executive Overview', shortLabel: 'Overview', icon: LayoutDashboard },
  { id: 'blueprint', label: 'Horizontal Process Explorer', shortLabel: 'Blueprint Spine', icon: GitCommitHorizontal },
  { id: 'handbook', label: 'Worker Handbook', shortLabel: 'Handbook', icon: BookOpen },
  { id: 'checklists', label: 'Task Checklists', shortLabel: 'Checklists', icon: ClipboardCheck },
  { id: 'risks', label: 'Risk & FMEA Library', shortLabel: 'FMEA Risks', icon: ShieldAlert },
  { id: 'scenarios', label: 'Scenario Simulator (24)', shortLabel: 'Scenarios', icon: PlaySquare },
  { id: 'traceability', label: 'Traceability Explorer', shortLabel: 'Traceability', icon: QrCode },
  { id: 'atlas', label: 'Equipment & Packaging Atlas', shortLabel: 'Pack & 3D Atlas', icon: PackageOpen },
  { id: 'kpis', label: 'KPI & Analytics', shortLabel: 'KPIs', icon: BarChart3 },
  { id: 'questions', label: 'Decisions & Open Questions', shortLabel: 'Open Questions', icon: HelpCircle },
];

export const ModuleNavRail: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    activeMilestoneId,
    setActiveMilestoneId,
    setMilestoneDetailOpen,
  } = useBlueprint();

  return (
    <div className="no-print border-b border-[#42C7E8]/20 bg-[#102A43]/95">
      {/* Primary 10-Module Navigation */}
      <nav aria-label="Blueprint Modules" className="mx-auto flex max-w-[1920px] items-center gap-1 overflow-x-auto px-4 py-2 lg:px-6">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const active = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                setActiveModule(mod.id);
                if (mod.id !== 'blueprint') setMilestoneDetailOpen(false);
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? 'border-[#42C7E8] bg-[#173B57] text-[#F5FAFC] shadow-[0_0_12px_rgba(66,199,232,0.18)]'
                  : 'border-transparent bg-transparent text-[#9BB4C5] hover:border-[#42C7E8]/30 hover:bg-[#12334D] hover:text-[#F5FAFC]'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#42C7E8]' : ''}`} />
              <span>{mod.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Persistent 11-Milestone Quick-Jump Context Strip */}
      <div className="border-t border-[#42C7E8]/15 bg-[#0B1F33]/80 px-4 py-1.5 lg:px-6">
        <div className="mx-auto flex max-w-[1920px] items-center gap-1.5 overflow-x-auto">
          <span className="mr-1 shrink-0 font-mono text-[10px] font-semibold tracking-wider text-[#9BB4C5] uppercase">
            MILESTONE CONTEXT:
          </span>
          {MILESTONES.map((m) => {
            const active = activeMilestoneId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setActiveMilestoneId(m.id);
                  if (activeModule === 'blueprint') {
                    const el = document.getElementById(`station-card-${m.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                  }
                }}
                title={`${m.number}. ${m.title}`}
                className={`flex shrink-0 items-center gap-1 rounded px-2 py-0.5 font-mono text-[11px] transition-colors ${
                  active
                    ? 'border border-[#42C7E8]/70 bg-[#42C7E8]/20 text-[#F5FAFC]'
                    : 'border border-transparent text-[#9BB4C5] hover:border-[#42C7E8]/30 hover:text-[#EAF5F8]'
                }`}
              >
                <span className={active ? 'text-[#42C7E8] font-bold' : ''}>{m.number}</span>
                <span className="hidden sm:inline">{m.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
