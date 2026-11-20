import React, { useMemo, useState } from 'react';
import { Box, Database, Filter, Layers, Search } from 'lucide-react';
import { FieldCategory, FlowLayerMode, StationId } from '../data/types';
import { ERP_CRM_FIELDS } from './erpCrmData';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';

interface InformationFlowViewProps {
  selectedStationFilter: StationId | 'ALL';
  flowMode: FlowLayerMode;
  onChangeFlowMode: (mode: FlowLayerMode) => void;
  onFocusStationIn3D: (stationId: StationId) => void;
}

export const InformationFlowView: React.FC<InformationFlowViewProps> = ({
  selectedStationFilter,
  flowMode,
  onChangeFlowMode,
  onFocusStationIn3D,
}) => {
  const [stationFilter, setStationFilter] = useState<StationId | 'ALL'>(selectedStationFilter);
  const [categoryFilter, setCategoryFilter] = useState<FieldCategory | 'ALL'>('ALL');
  const [systemFilter, setSystemFilter] = useState<'ALL' | 'ERP' | 'CRM' | 'SHARED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFields = useMemo(() => {
    return ERP_CRM_FIELDS.filter((fld) => {
      if (stationFilter !== 'ALL' && fld.stationId !== stationFilter) return false;
      if (categoryFilter !== 'ALL' && fld.category !== categoryFilter) return false;
      if (systemFilter === 'ERP' && !fld.systemOwnership.startsWith('ERP')) return false;
      if (systemFilter === 'CRM' && !fld.systemOwnership.startsWith('CRM')) return false;
      if (systemFilter === 'SHARED' && !fld.systemOwnership.startsWith('Shared')) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          fld.eventName.toLowerCase().includes(q) ||
          fld.fieldName.toLowerCase().includes(q) ||
          fld.relatedEntity.toLowerCase().includes(q) ||
          fld.analyticalPurpose.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [stationFilter, categoryFilter, systemFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      source: filteredFields.filter((f) => f.category === 'SOURCE_DEFINED').length,
      proposed: filteredFields.filter((f) => f.category === 'PROPOSED_DEVELOPMENT').length,
      derived: filteredFields.filter((f) => f.category === 'DERIVED_METRIC').length,
    };
  }, [filteredFields]);

  const focusedStation = stationFilter === 'ALL' ? null : OPERATIONAL_STATIONS.find((s) => s.id === stationFilter);

  return (
    <div className="h-full overflow-y-auto bg-blueprint-grid p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5 pb-12">
        {/* Header & Flow Layer Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#42C7E8]/35 bg-[#173B57]/90 p-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
              <Database className="h-3.5 w-3.5" />
              <span>ERP &amp; CRM Information Flow Explorer</span>
            </div>
            <h1 className="mt-1 text-lg font-bold text-[#F4F7F8]">
              Stage-by-Stage Digital Events, Capture Specifications &amp; Governance Separation
            </h1>
            <p className="mt-1 text-xs text-[#A9E8F5]">
              Explicitly separates <span className="font-semibold text-[#3CA77A]">Source-Defined Fields</span> from{' '}
              <span className="font-semibold text-[#42C7E8]">Proposed Development Fields</span> and{' '}
              <span className="font-semibold text-[#E9A23B]">Derived Analytical Metrics</span>. No internal company field IDs are fabricated.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(
              [
                { id: 'MATERIAL', label: 'Material Flow' },
                { id: 'INFORMATION', label: 'Information Flow' },
                { id: 'COMBINED', label: 'Combined Flow' },
              ] as { id: FlowLayerMode; label: string }[]
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onChangeFlowMode(m.id)}
                className={`rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  flowMode === m.id
                    ? 'border-[#42C7E8] bg-[#42C7E8] text-[#102A43] font-bold'
                    : 'border-[#42C7E8]/30 bg-[#102A43] text-[#A9E8F5] hover:border-[#42C7E8]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Station Selector Strip */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setStationFilter('ALL')}
            className={`rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
              stationFilter === 'ALL'
                ? 'border-[#42C7E8] bg-[#42C7E8] text-[#102A43] font-bold'
                : 'border-[#42C7E8]/25 bg-[#102A43] text-[#A9E8F5] hover:border-[#42C7E8]'
            }`}
          >
            All 8 Stations
          </button>
          {OPERATIONAL_STATIONS.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStationFilter(st.id)}
              className={`rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                stationFilter === st.id
                  ? 'border-[#42C7E8] bg-[#173B57] text-[#F4F7F8] font-bold ring-1 ring-[#42C7E8]'
                  : 'border-[#42C7E8]/25 bg-[#102A43] text-[#8C9BA5] hover:text-[#F4F7F8]'
              }`}
            >
              {st.number} • {st.shortTitle}
            </button>
          ))}
        </div>

        {/* Material vs Information Bridge Summary for Selected Station */}
        {focusedStation && (
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-[#42C7E8]/30 bg-[#102A43]/90 p-4 md:grid-cols-3">
            {(flowMode === 'MATERIAL' || flowMode === 'COMBINED') && (
              <div className="rounded-lg border border-[#3CA77A]/40 bg-[#3CA77A]/10 p-3">
                <div className="font-mono text-[10px] font-bold text-[#3CA77A]">PHYSICAL MATERIAL MOVEMENT</div>
                <div className="mt-1 text-xs font-semibold text-[#F4F7F8]">{focusedStation.title}</div>
                <ul className="mt-2 space-y-1 text-[11px] text-[#F4F7F8]/85">
                  {focusedStation.materialMovement.actions.slice(0, 3).map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>
            )}
            {(flowMode === 'INFORMATION' || flowMode === 'COMBINED') && (
              <div className="rounded-lg border border-[#42C7E8]/40 bg-[#42C7E8]/10 p-3 md:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-mono text-[10px] font-bold text-[#42C7E8]">
                    DIGITAL RECORD &amp; ERP/CRM SYNC ({focusedStation.informationFlowSummary.primaryEntityId})
                  </div>
                  <button
                    type="button"
                    onClick={() => onFocusStationIn3D(focusedStation.id)}
                    className="flex items-center gap-1 rounded border border-[#42C7E8] bg-[#173B57] px-2 py-1 font-mono text-[10px] font-bold text-[#F4F7F8] hover:bg-[#42C7E8] hover:text-[#102A43]"
                  >
                    <Box className="h-3 w-3" />
                    <span>Inspect Station in 3D</span>
                  </button>
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2 text-[11px]">
                  <div>
                    <div className="font-mono text-[9px] text-[#8C9BA5]">ERP EVENTS:</div>
                    {focusedStation.informationFlowSummary.erpEvents.map((e) => (
                      <div key={e} className="text-[#F4F7F8]">
                        • {e}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-[#8C9BA5]">CRM EVENTS:</div>
                    {focusedStation.informationFlowSummary.crmEvents.map((e) => (
                      <div key={e} className="text-[#A9E8F5]">
                        • {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filter Bar + Governance Counters */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#42C7E8]/25 bg-[#102A43]/90 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#8C9BA5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event, field, entity..."
                className="w-56 rounded border border-[#42C7E8]/30 bg-[#0A1C2E] py-1.5 pl-8 pr-3 text-xs text-[#F4F7F8] placeholder-[#8C9BA5] focus:border-[#42C7E8] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 font-mono text-[10px]">
              <Filter className="mr-1 h-3.5 w-3.5 text-[#42C7E8]" />
              {(
                [
                  { id: 'ALL', label: 'All Governance' },
                  { id: 'SOURCE_DEFINED', label: 'Source-Defined' },
                  { id: 'PROPOSED_DEVELOPMENT', label: 'Proposed Dev' },
                  { id: 'DERIVED_METRIC', label: 'Derived Metrics' },
                ] as { id: FieldCategory | 'ALL'; label: string }[]
              ).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryFilter(c.id)}
                  className={`rounded border px-2 py-1 ${
                    categoryFilter === c.id
                      ? 'border-[#42C7E8] bg-[#173B57] text-[#F4F7F8] font-bold'
                      : 'border-[#42C7E8]/20 text-[#8C9BA5] hover:text-[#F4F7F8]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 font-mono text-[10px]">
              <Layers className="mr-1 h-3.5 w-3.5 text-[#42C7E8]" />
              {(['ALL', 'ERP', 'CRM', 'SHARED'] as const).map((sys) => (
                <button
                  key={sys}
                  type="button"
                  onClick={() => setSystemFilter(sys)}
                  className={`rounded border px-2 py-1 ${
                    systemFilter === sys
                      ? 'border-[#42C7E8] bg-[#173B57] text-[#F4F7F8] font-bold'
                      : 'border-[#42C7E8]/20 text-[#8C9BA5] hover:text-[#F4F7F8]'
                  }`}
                >
                  {sys}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="text-[#3CA77A]">Source-Defined: {counts.source}</span>
            <span className="text-[#42C7E8]">Proposed Dev: {counts.proposed}</span>
            <span className="text-[#E9A23B]">Derived Metrics: {counts.derived}</span>
          </div>
        </div>

        {/* 10-Attribute ERP / CRM Dictionary Table */}
        <div className="overflow-x-auto rounded-xl border border-[#42C7E8]/30 bg-[#102A43]/95 shadow-xl">
          <table className="w-full min-w-[1150px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#42C7E8]/30 bg-[#173B57] font-mono text-[10px] uppercase tracking-wider text-[#A9E8F5]">
                <th className="p-3">Stage</th>
                <th className="p-3">1. Event Name &amp; 2. Trigger</th>
                <th className="p-3">3. Data Field &amp; Classification</th>
                <th className="p-3">4. Type / 5. Req</th>
                <th className="p-3">6. Capture Method</th>
                <th className="p-3">7. ERP / CRM Owner</th>
                <th className="p-3">8. Related Entity</th>
                <th className="p-3">9. Analytical Purpose</th>
                <th className="p-3">10. Validation Rules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#42C7E8]/15">
              {filteredFields.map((fld) => (
                <tr key={fld.id} className="hover:bg-[#173B57]/45 transition-colors">
                  <td className="p-3 align-top">
                    <button
                      type="button"
                      onClick={() => onFocusStationIn3D(fld.stationId)}
                      className="rounded border border-[#42C7E8]/40 bg-[#0A1C2E] px-2 py-1 font-mono text-[10px] font-bold text-[#42C7E8] hover:bg-[#42C7E8] hover:text-[#102A43]"
                      title="Focus this station in 3D World"
                    >
                      {fld.stationId}
                    </button>
                  </td>
                  <td className="p-3 align-top">
                    <div className="font-semibold text-[#F4F7F8]">{fld.eventName}</div>
                    <div className="mt-1 text-[11px] text-[#8C9BA5]">Trigger: {fld.eventTrigger}</div>
                  </td>
                  <td className="p-3 align-top">
                    <div className="font-semibold text-[#A9E8F5]">{fld.fieldName}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#8C9BA5]">{fld.fieldKey}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                          fld.category === 'SOURCE_DEFINED'
                            ? 'bg-[#3CA77A]/20 text-[#3CA77A]'
                            : fld.category === 'PROPOSED_DEVELOPMENT'
                            ? 'bg-[#42C7E8]/20 text-[#42C7E8]'
                            : 'bg-[#E9A23B]/20 text-[#E9A23B]'
                        }`}
                      >
                        {fld.category === 'SOURCE_DEFINED'
                          ? 'SOURCE-DEFINED'
                          : fld.category === 'PROPOSED_DEVELOPMENT'
                          ? 'PROPOSED DEV'
                          : 'DERIVED METRIC'}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 align-top font-mono text-[10px]">
                    <div className="text-[#F4F7F8]">{fld.dataType}</div>
                    <div
                      className={`mt-1 inline-block rounded px-1.5 py-0.5 ${
                        fld.requiredStatus === 'Required'
                          ? 'bg-[#3CA77A]/20 text-[#3CA77A]'
                          : fld.requiredStatus === 'Conditional'
                          ? 'bg-[#E9A23B]/20 text-[#E9A23B]'
                          : 'bg-[#8C9BA5]/20 text-[#8C9BA5]'
                      }`}
                    >
                      {fld.requiredStatus}
                    </div>
                  </td>
                  <td className="p-3 align-top text-[11px] text-[#F4F7F8]">{fld.captureMethod}</td>
                  <td className="p-3 align-top">
                    <span
                      className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] ${
                        fld.systemOwnership.startsWith('CRM')
                          ? 'bg-[#E9A23B]/20 text-[#E9A23B]'
                          : fld.systemOwnership.startsWith('Shared')
                          ? 'bg-[#A9E8F5]/20 text-[#A9E8F5]'
                          : 'bg-[#42C7E8]/20 text-[#42C7E8]'
                      }`}
                    >
                      {fld.systemOwnership}
                    </span>
                  </td>
                  <td className="p-3 align-top font-mono text-[11px] text-[#A9E8F5]">{fld.relatedEntity}</td>
                  <td className="p-3 align-top text-[11px] text-[#F4F7F8]/90">{fld.analyticalPurpose}</td>
                  <td className="p-3 align-top text-[11px] text-[#8C9BA5]">
                    <div>{fld.validationRules}</div>
                    <div className="mt-1 font-mono text-[9px] text-[#42C7E8]/80">{fld.sourceNote}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
