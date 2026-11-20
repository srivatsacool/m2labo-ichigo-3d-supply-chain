import React, { useMemo, useState } from 'react';
import { HelpCircle, AlertTriangle, CheckCircle2, Filter } from 'lucide-react';
import { useBlueprint } from '../../context/BlueprintContext';
import { DISCREPANCY_REGISTER } from '../../data/openQuestionsData';
import { StatusBadge } from '../layout/StatusBadge';

export const OpenQuestionsRegister: React.FC = () => {
  const { questions, updateQuestion, openMilestoneWorkspace } = useBlueprint();
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'IN REVIEW' | 'RESOLVED'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const sOk = statusFilter === 'ALL' || q.currentStatus === statusFilter;
      const pOk = priorityFilter === 'ALL' || q.priority === priorityFilter;
      return sOk && pOk;
    });
  }, [questions, statusFilter, priorityFilter]);

  const openCount = questions.filter((q) => q.currentStatus !== 'RESOLVED').length;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#42C7E8]/30 bg-[#102A43] p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F69D9B]">
            <HelpCircle className="h-4 w-4" />
            <span>GOVERNANCE & OPEN QUESTIONS REGISTER ({openCount} UNRESOLVED / {questions.length} TOTAL)</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-[#F5FAFC]">
            Process Decisions, Discrepancies & Validation Ownership
          </h2>
          <p className="mt-1 text-xs text-[#9BB4C5]">
            Unknowns are explicitly preserved here and never silently converted into confirmed SOPs. Answers & decisions recorded below persist locally in your browser prototype.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-[#42C7E8]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            aria-label="Filter questions by status"
            className="rounded border border-[#42C7E8]/35 bg-[#0B1F33] px-3 py-1.5 font-mono text-xs text-[#F5FAFC]"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="IN REVIEW">IN REVIEW</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter questions by priority"
            className="rounded border border-[#42C7E8]/35 bg-[#0B1F33] px-3 py-1.5 font-mono text-xs text-[#F5FAFC]"
          >
            <option value="ALL">All Priorities</option>
            <option value="P0 - Critical">P0 - Critical</option>
            <option value="P1 - High">P1 - High</option>
            <option value="P2 - Medium">P2 - Medium</option>
          </select>
        </div>
      </div>

      {/* Document Discrepancy Register */}
      <section className="rounded border border-[#D9534F]/40 bg-[#12334D] p-5 space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#F69D9B]">
          <AlertTriangle className="h-4 w-4" />
          <span>Preserved Discrepancies Between Source Statements (Unresolved)</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {DISCREPANCY_REGISTER.map((d) => (
            <div key={d.id} className="rounded border border-[#D9534F]/35 bg-[#0B1F33] p-4 text-xs space-y-2">
              <div className="flex items-center justify-between font-mono">
                <strong className="text-[#F69D9B]">{d.id} · {d.topic}</strong>
                <span className="rounded bg-[#D9534F]/20 px-1.5 py-0.5 text-[10px] text-[#F69D9B]">{d.status}</span>
              </div>
              <p className="text-[#EAF5F8]"><strong>Statement A ({d.statementA.source}):</strong> {d.statementA.text}</p>
              <p className="text-[#9BB4C5]"><strong>Statement B ({d.statementB.source}):</strong> {d.statementB.text}</p>
              <div className="border-t border-[#42C7E8]/15 pt-2 font-mono text-[10px] text-[#42C7E8]">
                Owner: {d.resolutionOwner} · Linked: {d.linkedQuestionId}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 25 Mandatory Question Categories */}
      <section className="space-y-3">
        {filtered.map((q) => (
          <div key={q.id} className="rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#42C7E8]/20 pb-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-[#0B1F33] border border-[#42C7E8]/50 px-2 py-0.5 font-mono text-xs font-bold text-[#42C7E8]">
                  {q.id}
                </span>
                <span className="font-semibold text-sm text-[#F5FAFC]">{q.category}</span>
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                    q.priority.startsWith('P0')
                      ? 'bg-[#D9534F]/20 text-[#F69D9B]'
                      : 'bg-[#E9A23B]/20 text-[#F5C57B]'
                  }`}
                >
                  {q.priority}
                </span>
                {q.milestoneIds.map((mId) => (
                  <button
                    key={mId}
                    type="button"
                    onClick={() => openMilestoneWorkspace(mId)}
                    className="rounded border border-[#42C7E8]/30 bg-[#0B1F33] px-1.5 py-0.5 font-mono text-[10px] text-[#42C7E8] hover:underline"
                  >
                    {mId}
                  </button>
                ))}
              </div>
              <StatusBadge status={q.status} compact />
            </div>

            <p className="text-sm font-medium text-[#F5FAFC]">{q.question}</p>
            <div className="grid gap-3 text-xs md:grid-cols-2">
              <div className="rounded border border-[#42C7E8]/15 bg-[#0B1F33] p-3 space-y-1">
                <p><strong className="text-[#42C7E8]">Why It Matters:</strong> {q.whyItMatters}</p>
                <p><strong className="text-[#86E1F7]">Proposed Interim Design:</strong> {q.proposedDefault}</p>
                <p className="font-mono text-[10px] text-[#9BB4C5]">
                  Owner: {q.questionOwner} · Target Due: {q.dueDate} · Evidence: {q.evidenceAttachmentNote}
                </p>
              </div>

              {/* Interactive Local Decision Capture */}
              <div className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#F5C57B]">
                    LOCAL VALIDATION CAPTURE
                  </span>
                  <select
                    value={q.currentStatus}
                    onChange={(e) =>
                      updateQuestion(q.id, {
                        currentStatus: e.target.value as any,
                        approvalStatus: e.target.value === 'RESOLVED' ? 'Approved' : 'Pending Sign-off',
                      })
                    }
                    aria-label={`Status for ${q.id}`}
                    className="rounded border border-[#42C7E8]/35 bg-[#12334D] px-2 py-0.5 font-mono text-[10px] text-[#F5FAFC]"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN REVIEW">IN REVIEW</option>
                    <option value="RESOLVED">RESOLVED (LOCAL)</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Enter verified answer or field observation (saved locally)..."
                  value={q.answer}
                  onChange={(e) => updateQuestion(q.id, { answer: e.target.value })}
                  className="w-full rounded border border-[#42C7E8]/25 bg-[#12334D] px-2.5 py-1.5 text-xs text-[#F5FAFC] placeholder-[#9BB4C5]/60"
                />

                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Decision / Sign-off note..."
                    value={q.decision}
                    onChange={(e) => updateQuestion(q.id, { decision: e.target.value })}
                    className="flex-1 rounded border border-[#42C7E8]/25 bg-[#12334D] px-2.5 py-1 text-xs text-[#F5FAFC] placeholder-[#9BB4C5]/60"
                  />
                  {q.currentStatus === 'RESOLVED' && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#7AE0B3]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{q.approvalStatus}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
