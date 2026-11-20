import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Package,
  ShieldAlert,
  X,
} from 'lucide-react';
import { FieldCategory, FlowLayerMode, StationId } from '../data/types';
import { getStationById, OPERATIONAL_STATIONS } from '../stations/stationsData';
import { ERP_CRM_FIELDS } from '../information/erpCrmData';
import { getExceptionsForStation } from '../exceptions/exceptionsData';

interface StationDetailPanelProps {
  stationId: StationId;
  flowMode: FlowLayerMode;
  selectedExceptionId: string | null;
  onClose: () => void;
  onOpenInfoExplorer: (stationId: StationId) => void;
  onSelectException: (exceptionId: string) => void;
  onSelectNextStation?: (stationId: StationId) => void;
}

type PanelTab = 'MATERIAL' | 'INFO' | 'EXCEPTIONS' | 'ANALYSIS';

function CategoryTag({ category }: { category: FieldCategory }) {
  if (category === 'SOURCE_DEFINED') {
    return (
      <span className="font-mono text-[11px] font-semibold text-[#5EE8A8]">SOURCE-DEFINED</span>
    );
  }
  if (category === 'PROPOSED_DEVELOPMENT') {
    return (
      <span className="font-mono text-[11px] font-semibold text-[#7BE0F7]">PROPOSED DEV</span>
    );
  }
  return (
    <span className="font-mono text-[11px] font-semibold text-[#FCD34D]">DERIVED METRIC</span>
  );
}

/**
 * CLASS C — Detailed Inspection Panel
 * High-legibility editorial industrial typography without nested box clutter.
 */
export const StationDetailPanel: React.FC<StationDetailPanelProps> = ({
  stationId,
  flowMode,
  selectedExceptionId,
  onClose,
  onOpenInfoExplorer,
  onSelectException,
  onSelectNextStation,
}) => {
  const station = getStationById(stationId);
  const stationIdx = OPERATIONAL_STATIONS.findIndex((s) => s.id === station.id);
  const nextStation =
    stationIdx >= 0 && stationIdx < OPERATIONAL_STATIONS.length - 1
      ? OPERATIONAL_STATIONS[stationIdx + 1]
      : null;
  const stationFields = ERP_CRM_FIELDS.filter((f) => f.stationId === station.id);
  const stationExceptions = getExceptionsForStation(station.id);

  const [activeTab, setActiveTab] = useState<PanelTab>(
    selectedExceptionId ? 'EXCEPTIONS' : flowMode === 'INFORMATION' ? 'INFO' : 'MATERIAL'
  );

  useEffect(() => {
    if (selectedExceptionId) {
      setActiveTab('EXCEPTIONS');
    } else if (flowMode === 'INFORMATION') {
      setActiveTab('INFO');
    }
  }, [selectedExceptionId, flowMode, stationId]);

  return (
    <aside
      aria-label={`Station ${station.number} inspection panel`}
      className="pointer-events-auto absolute bottom-32 left-2.5 right-2.5 top-2.5 z-30 flex flex-col overflow-hidden rounded-xl glass-panel-elevated sm:bottom-36 sm:left-auto sm:right-4 sm:top-3 sm:w-[460px]"
    >
      {/* Header */}
      <div className="border-b border-[#42C7E8]/25 bg-[#08192A]/95 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#42C7E8] px-2 py-0.5 font-mono text-[12px] font-bold text-[#061220]">
                STAGE {station.number}
              </span>
              <span className="font-mono text-[12px] text-[#A9E8F5]">{station.zoneLabel}</span>
            </div>
            <h2 className="mt-2 text-[22px] font-bold leading-tight text-[#F4F7F8]">{station.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inspection panel"
            className="rounded-md border border-[#42C7E8]/30 bg-[#14324B] p-1.5 text-[#A9E8F5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {station.custodyBanner && (
          <div className="mt-3 flex items-center gap-2 rounded-md border border-[#3CA77A]/60 bg-[#3CA77A]/15 px-3 py-1.5 font-mono text-[12px] font-bold text-[#5EE8A8]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{station.custodyBanner} (Upstream farm ops excluded)</span>
          </div>
        )}

        {station.isDigitalStation && (
          <div className="mt-3 flex items-center gap-2 rounded-md border border-[#42C7E8]/50 bg-[#42C7E8]/15 px-3 py-1.5 font-mono text-[12px] font-semibold text-[#A9E8F5]">
            <Database className="h-4 w-4 shrink-0" />
            <span>Digital Information Station (No Physical Production)</span>
          </div>
        )}

        <p className="mt-3 text-[14px] leading-relaxed text-[#E2EDF5]">{station.summary}</p>
      </div>

      {/* Sub-Tabs */}
      <div className="grid grid-cols-4 border-b border-[#42C7E8]/20 bg-[#061220] font-mono text-[12px]">
        {(
          [
            { id: 'MATERIAL', label: 'Process', icon: Package },
            { id: 'INFO', label: 'ERP / CRM', icon: Database },
            { id: 'EXCEPTIONS', label: `Exc (${stationExceptions.length})`, icon: ShieldAlert },
            { id: 'ANALYSIS', label: 'Metrics', icon: BarChart3 },
          ] as { id: PanelTab; label: string; icon: React.ComponentType<{ className?: string }> }[]
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center justify-center gap-1.5 border-b-2 py-2.5 transition-colors ${
              activeTab === id
                ? 'border-[#42C7E8] bg-[#14324B]/80 font-bold text-[#F4F7F8]'
                : 'border-transparent text-[#8C9BA5] hover:text-[#A9E8F5]'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Clean Typographic Body (Minimal Nested Containers) */}
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-4 text-[14px]">
        {activeTab === 'MATERIAL' && (
          <>
            <section className="space-y-4">
              <div>
                <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#42C7E8]">
                  Inputs
                </h3>
                <ul className="mt-2 space-y-1.5 text-[#EDF3F7]">
                  {station.materialMovement.inputs.map((inp, i) => (
                    <li key={i} className="flex items-start gap-2 leading-snug">
                      <span className="text-[#42C7E8]">•</span>
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#42C7E8]/15 pt-4">
                <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#42C7E8]">
                  Operational Activities
                </h3>
                <ol className="mt-2 space-y-2 text-[#D8EEF7]">
                  {station.materialMovement.actions.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 leading-snug">
                      <span className="font-mono text-[12.5px] font-bold text-[#42C7E8]">{i + 1}.</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-[#42C7E8]/15 pt-4">
                <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#5EE8A8]">
                  Outputs
                </h3>
                <ul className="mt-2 space-y-1.5 text-[#C8F7E0]">
                  {station.materialMovement.outputs.map((out, i) => (
                    <li key={i} className="flex items-start gap-2 leading-snug">
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#3CA77A]" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="border-t border-[#42C7E8]/20 pt-4">
              <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#42C7E8]">
                Responsible Roles
              </h3>
              <div className="mt-2.5 space-y-3">
                {station.operationalRoles.map((r) => (
                  <div key={r.role} className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-[#F4F7F8]">{r.role}</span>
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          r.status === 'Confirmed Concept' ? 'text-[#5EE8A8]' : 'text-[#FCD34D]'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#A5BAC9]">{r.responsibility}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-[#42C7E8]/20 pt-4">
              <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#5EE8A8]">
                Next Dependency
              </h3>
              {nextStation ? (
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[15px] font-semibold text-[#F4F7F8]">
                      Stage {nextStation.number}: {nextStation.title}
                    </div>
                    <div className="font-mono text-[12px] text-[#9BB4C7]">{nextStation.zoneLabel}</div>
                  </div>
                  {onSelectNextStation && (
                    <button
                      type="button"
                      onClick={() => onSelectNextStation(nextStation.id)}
                      className="flex shrink-0 items-center gap-1 rounded-md border border-[#3CA77A] bg-[#102A43] px-3 py-1.5 font-mono text-[12px] font-bold text-[#5EE8A8] hover:bg-[#3CA77A] hover:text-[#061220]"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-[13.5px] text-[#D8EEF7]">
                  Closed-loop financial reconciliation complete; contribution margin feeds upstream planning.
                </p>
              )}
            </section>
          </>
        )}

        {activeTab === 'INFO' && (
          <>
            <section className="space-y-3">
              <div>
                <div className="font-mono text-[11.5px] uppercase tracking-wider text-[#9BB4C7]">
                  Primary Traceability Record
                </div>
                <div className="mt-1 font-mono text-[14.5px] font-bold text-[#42C7E8]">
                  {station.informationFlowSummary.primaryEntityId}
                </div>
              </div>

              <div className="border-t border-[#42C7E8]/15 pt-3">
                <div className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-[#9BB4C7]">
                  ERP System Events
                </div>
                <ul className="mt-1.5 space-y-1 text-[13.5px] text-[#EDF3F7]">
                  {station.informationFlowSummary.erpEvents.map((ev) => (
                    <li key={ev}>• {ev}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#42C7E8]/15 pt-3">
                <div className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-[#9BB4C7]">
                  CRM System Events
                </div>
                <ul className="mt-1.5 space-y-1 text-[13.5px] text-[#A9E8F5]">
                  {station.informationFlowSummary.crmEvents.map((ev) => (
                    <li key={ev}>• {ev}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="border-t border-[#42C7E8]/20 pt-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#42C7E8]">
                  Stage Data Fields ({stationFields.length})
                </h3>
                <button
                  type="button"
                  onClick={() => onOpenInfoExplorer(station.id)}
                  className="font-mono text-[12px] font-semibold text-[#42C7E8] hover:underline"
                >
                  Full Explorer →
                </button>
              </div>
              <div className="mt-3 divide-y divide-[#42C7E8]/15">
                {station.keyDataShown.map((item) => (
                  <div key={item.label} className="py-2.5 first:pt-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#F4F7F8]">{item.label}</span>
                      <CategoryTag category={item.category} />
                    </div>
                    <div className="mt-0.5 font-mono text-[13px] text-[#A9E8F5]">{item.sampleValue}</div>
                    {item.note && <div className="mt-0.5 text-[12px] text-[#FCD34D]">{item.note}</div>}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'EXCEPTIONS' && (
          <>
            {station.unresolvedDecisions.length > 0 && (
              <section className="space-y-2 border-b border-[#E9A23B]/35 pb-4">
                <div className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-[#FCD34D]">
                  <AlertTriangle className="h-4 w-4" />
                  <span>OPEN STAGE DECISIONS</span>
                </div>
                {station.unresolvedDecisions.map((dec, idx) => (
                  <p key={idx} className="text-[13.5px] leading-relaxed text-[#EDF3F7]">
                    • {dec}
                  </p>
                ))}
              </section>
            )}

            <div className="divide-y divide-[#42C7E8]/15">
              {stationExceptions.map((exc) => {
                const isFocused = selectedExceptionId === exc.id;
                return (
                  <div
                    key={exc.id}
                    onClick={() => onSelectException(exc.id)}
                    className={`cursor-pointer py-3.5 transition-colors ${
                      isFocused ? 'bg-[#173B57]/60 px-3 -mx-3 rounded-lg' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[12px]">
                      <span className="font-bold text-[#42C7E8]">{exc.id}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold ${
                            exc.severity === 'CRITICAL' ? 'text-[#FF6B66]' : 'text-[#FCD34D]'
                          }`}
                        >
                          {exc.severity}
                        </span>
                        {!exc.decisionDefinedInSource && (
                          <span className="rounded bg-[#E9A23B]/20 px-1.5 py-0.5 text-[11px] font-bold text-[#FCD34D]">
                            DECISION REQUIRED
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="mt-1.5 text-[15px] font-bold text-[#F4F7F8]">{exc.title}</h4>
                    <p className="mt-1 text-[13px] text-[#A5BAC9]">
                      <strong className="text-[#EDF3F7]">Trigger:</strong> {exc.trigger}
                    </p>
                    <p className="mt-1 text-[13px] text-[#A5BAC9]">
                      <strong className="text-[#EDF3F7]">Owner:</strong> {exc.responsibleRole}
                    </p>
                    <p className="mt-1 text-[13px] text-[#C8F7E0]">
                      <strong className="text-[#5EE8A8]">Decision:</strong> {exc.requiredDecision}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'ANALYSIS' && (
          <div className="space-y-4">
            <p className="font-mono text-[12px] text-[#A9E8F5]">
              Analytical formulas derived from verified Stage {station.number} records (no fabricated live metrics).
            </p>
            <div className="divide-y divide-[#42C7E8]/20">
              {station.analysisOpportunities.map((op) => (
                <div key={op.metricName} className="py-3.5 first:pt-0">
                  <div className="text-[15px] font-bold text-[#F4F7F8]">{op.metricName}</div>
                  <div className="mt-1.5 font-mono text-[12.5px] text-[#42C7E8]">{op.formula}</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#A5BAC9]">{op.decisionValue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
