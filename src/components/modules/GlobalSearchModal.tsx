import React, { useMemo } from 'react';
import { X, Search, ArrowRight, Filter } from 'lucide-react';
import { useBlueprint } from '../../context/BlueprintContext';
import { MILESTONES } from '../../data/milestonesData';
import { FMEA_RISK_LIBRARY, SCENARIO_SIMULATIONS } from '../../data/risksAndScenariosData';
import { EQUIPMENT_AND_ASSET_CATALOG } from '../../data/equipmentAndPackagingData';
import { StatusBadge } from '../layout/StatusBadge';
import { ValidationStatus } from '../../types/blueprint';

const STATUS_OPTIONS: (ValidationStatus | 'ALL')[] = [
  'ALL',
  'CONFIRMED IN PROJECT DISCUSSION',
  'SOURCE DOCUMENT PROPOSAL',
  'PROPOSED DESIGN',
  'UNKNOWN / NEEDS VERIFICATION',
  'ILLUSTRATIVE SIMULATION',
];

export const GlobalSearchModal: React.FC = () => {
  const {
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    questions,
    openMilestoneWorkspace,
    setActiveModule,
    setSelectedScenarioId,
  } = useBlueprint();

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matchesStatus = (status: ValidationStatus) => filters.status === 'ALL' || filters.status === status;
    const matchesMilestone = (mId: string) => filters.milestoneId === 'ALL' || filters.milestoneId === mId;

    const milestoneMatches = MILESTONES.filter(
      (m) =>
        matchesMilestone(m.id) &&
        matchesStatus(m.governance.status) &&
        (filters.processState === 'ALL' || m.governance.processState === filters.processState) &&
        (!q ||
          m.title.toLowerCase().includes(q) ||
          m.sec01_processOverview.toLowerCase().includes(q) ||
          m.primaryOwner.toLowerCase().includes(q))
    );

    const taskMatches = MILESTONES.flatMap((m) =>
      m.sec18_workerChecklist
        .filter(
          (t) =>
            matchesMilestone(m.id) &&
            matchesStatus(t.status) &&
            (filters.roleKeyword === 'ALL' || t.assignedRole.toLowerCase().includes(filters.roleKeyword.toLowerCase())) &&
            (!q || t.instruction.toLowerCase().includes(q) || t.assignedRole.toLowerCase().includes(q))
        )
        .map((t) => ({ milestoneId: m.id, milestoneTitle: m.shortTitle, ...t }))
    );

    const riskMatches = FMEA_RISK_LIBRARY.filter(
      (r) =>
        matchesMilestone(r.milestoneId) &&
        matchesStatus(r.status) &&
        (!q || r.failureMode.toLowerCase().includes(q) || r.cause.toLowerCase().includes(q))
    );

    const scenarioMatches = SCENARIO_SIMULATIONS.filter(
      (s) =>
        matchesMilestone(s.milestoneId) &&
        matchesStatus(s.status) &&
        (!q || s.title.toLowerCase().includes(q) || s.overview.toLowerCase().includes(q))
    );

    const equipmentMatches = EQUIPMENT_AND_ASSET_CATALOG.filter(
      (e) =>
        (filters.milestoneId === 'ALL' || e.milestones.includes(filters.milestoneId)) &&
        matchesStatus(e.status) &&
        (!q || e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
    );

    const questionMatches = questions.filter(
      (oq) =>
        (filters.milestoneId === 'ALL' || oq.milestoneIds.includes(filters.milestoneId)) &&
        matchesStatus(oq.status) &&
        (filters.questionState === 'ALL' ||
          (filters.questionState === 'OPEN' && oq.currentStatus !== 'RESOLVED') ||
          (filters.questionState === 'RESOLVED' && oq.currentStatus === 'RESOLVED')) &&
        (!q || oq.question.toLowerCase().includes(q) || oq.category.toLowerCase().includes(q))
    );

    return {
      milestoneMatches,
      taskMatches,
      riskMatches,
      scenarioMatches,
      equipmentMatches,
      questionMatches,
    };
  }, [searchQuery, filters, questions]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#06121E]/80 p-4 pt-14 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Global Blueprint Search">
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded border border-[#42C7E8]/50 bg-[#102A43] shadow-2xl">
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-[#42C7E8]/25 bg-[#0B1F33] px-4 py-3">
          <Search className="h-4 w-4 text-[#42C7E8]" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 11 milestones, tasks, FMEA risks, 24 scenarios, equipment & 25 open questions..."
            className="w-full bg-transparent text-sm text-[#F5FAFC] placeholder-[#9BB4C5]/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="rounded border border-[#42C7E8]/30 p-1 text-[#9BB4C5] hover:text-[#F5FAFC]"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Multi-Dimensional Filter Strip */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#42C7E8]/20 bg-[#12334D] px-4 py-2 text-xs">
          <Filter className="h-3.5 w-3.5 text-[#42C7E8]" />
          <select
            value={filters.milestoneId}
            onChange={(e) => setFilters((f) => ({ ...f, milestoneId: e.target.value }))}
            aria-label="Filter by milestone"
            className="rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2 py-1 font-mono text-[11px] text-[#F5FAFC]"
          >
            <option value="ALL">All Milestones (01–11)</option>
            {MILESTONES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.number}. {m.shortTitle}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as ValidationStatus | 'ALL' }))}
            aria-label="Filter by validation status"
            className="rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2 py-1 font-mono text-[11px] text-[#F5FAFC]"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st === 'ALL' ? 'All Validation Statuses' : st}
              </option>
            ))}
          </select>

          <select
            value={filters.processState}
            onChange={(e) => setFilters((f) => ({ ...f, processState: e.target.value as any }))}
            aria-label="Filter by current vs proposed process"
            className="rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2 py-1 font-mono text-[11px] text-[#F5FAFC]"
          >
            <option value="ALL">Current & Proposed</option>
            <option value="CURRENT">Current State Only</option>
            <option value="PROPOSED">Proposed Future State</option>
            <option value="HYBRID">Hybrid</option>
          </select>

          <select
            value={filters.questionState}
            onChange={(e) => setFilters((f) => ({ ...f, questionState: e.target.value as any }))}
            aria-label="Filter open vs closed questions"
            className="rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-2 py-1 font-mono text-[11px] text-[#F5FAFC]"
          >
            <option value="ALL">Questions: Open & Closed</option>
            <option value="OPEN">Questions: Open Only</option>
            <option value="RESOLVED">Questions: Resolved</option>
          </select>

          <button
            type="button"
            onClick={() =>
              setFilters({ milestoneId: 'ALL', status: 'ALL', roleKeyword: 'ALL', processState: 'ALL', questionState: 'ALL' })
            }
            className="ml-auto font-mono text-[11px] text-[#42C7E8] hover:underline"
          >
            Reset Filters
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-4 space-y-5">
          {/* Milestones */}
          <section>
            <h3 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#42C7E8]">
              Milestones ({results.milestoneMatches.length})
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {results.milestoneMatches.slice(0, 6).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    openMilestoneWorkspace(m.id);
                    setSearchOpen(false);
                  }}
                  className="flex items-start justify-between gap-2 rounded border border-[#42C7E8]/25 bg-[#12334D] p-2.5 text-left hover:border-[#42C7E8]"
                >
                  <div>
                    <div className="font-mono text-xs font-bold text-[#F5FAFC]">
                      {m.number}. {m.title}
                    </div>
                    <div className="mt-1 text-[11px] text-[#9BB4C5] line-clamp-1">{m.primaryOwner}</div>
                  </div>
                  <StatusBadge status={m.governance.status} compact />
                </button>
              ))}
            </div>
          </section>

          {/* Scenarios & Risks */}
          <section className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#E9A23B]">
                Failure Scenarios ({results.scenarioMatches.length})
              </h3>
              <div className="space-y-1.5">
                {results.scenarioMatches.slice(0, 5).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedScenarioId(s.id);
                      setActiveModule('scenarios');
                      setSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded border border-[#E9A23B]/25 bg-[#0B1F33] px-2.5 py-2 text-left text-xs hover:border-[#E9A23B]"
                  >
                    <span className="truncate">
                      <strong className="font-mono text-[#F5C57B]">{s.id}</strong> · {s.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#9BB4C5]" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D9534F]">
                Open Questions ({results.questionMatches.length})
              </h3>
              <div className="space-y-1.5">
                {results.questionMatches.slice(0, 5).map((oq) => (
                  <button
                    key={oq.id}
                    type="button"
                    onClick={() => {
                      setActiveModule('questions');
                      setSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded border border-[#D9534F]/25 bg-[#0B1F33] px-2.5 py-2 text-left text-xs hover:border-[#D9534F]"
                  >
                    <span className="truncate">
                      <strong className="font-mono text-[#F69D9B]">{oq.id}</strong> · {oq.category}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#9BB4C5]" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tasks & Equipment */}
          <section className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#3CA77A]">
                Worker Tasks ({results.taskMatches.length})
              </h3>
              <div className="space-y-1.5">
                {results.taskMatches.slice(0, 4).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      openMilestoneWorkspace(t.milestoneId);
                      setSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded border border-[#3CA77A]/25 bg-[#0B1F33] px-2.5 py-2 text-left text-xs hover:border-[#3CA77A]"
                  >
                    <span className="truncate">
                      <strong className="font-mono text-[#7AE0B3]">{t.milestoneId}</strong> · {t.instruction}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#42C7E8]">
                Equipment & Assets ({results.equipmentMatches.length})
              </h3>
              <div className="space-y-1.5">
                {results.equipmentMatches.slice(0, 4).map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => {
                      setActiveModule('atlas');
                      setSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded border border-[#42C7E8]/25 bg-[#0B1F33] px-2.5 py-2 text-left text-xs hover:border-[#42C7E8]"
                  >
                    <span className="truncate">
                      <strong className="font-mono text-[#86E1F7]">{e.id}</strong> · {e.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
