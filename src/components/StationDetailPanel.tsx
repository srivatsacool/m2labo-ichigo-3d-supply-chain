import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Layers,
  Package,
  ShieldAlert,
  Users,
  X,
} from 'lucide-react';
import { FieldCategory, FlowLayerMode, StationId } from '../data/types';
import { getStationById } from '../stations/stationsData';
import { ERP_CRM_FIELDS } from '../information/erpCrmData';
import { getExceptionsForStation } from '../exceptions/exceptionsData';

interface StationDetailPanelProps {
  stationId: StationId;
  flowMode: FlowLayerMode;
  selectedExceptionId: string | null;
  onClose: () => void;
  onOpenInfoExplorer: (stationId: StationId) => void;
  onSelectException: (exceptionId: string) => void;
}

type PanelTab = 'MATERIAL' | 'INFO' | 'EXCEPTIONS' | 'ANALYSIS';

function CategoryTag({ category }: { category: FieldCategory }) {
  if (category === 'SOURCE_DEFINED') {
    return (
      <span className="rounded border border-[#3CA77A]/50 bg-[#3CA77A]/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#3CA77A]">
        SOURCE-DEFINED
      </span>
    );
  }
  if (category === 'PROPOSED_DEVELOPMENT') {
    return (
      <span className="rounded border border-[#42C7E8]/50 bg-[#42C7E8]/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#A9E8F5]">
        PROPOSED DEV
      </span>
    );
  }
  return (
    <span className="rounded border border-[#E9A23B]/50 bg-[#E9A23B]/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#E9A23B]">
      DERIVED METRIC
    </span>
  );
}

export const StationDetailPanel: React.FC<StationDetailPanelProps> = ({
  stationId,
  flowMode,
  selectedExceptionId,
  onClose,
  onOpenInfoExplorer,
  onSelectException,
}) => {
  const station = getStationById(stationId);
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
      aria-label={`Station ${station.number} details`}
      className="pointer-events-auto absolute right-3 left-3 top-3 z-20 flex max-h-[54vh] flex-col overflow-hidden rounded-xl glass-panel-elevated sm:left-auto sm:bottom-36 sm:max-h-none sm:w-[410px]"
    >
      {/* Header */}
      <div className="border-b border-[#42C7E8]/25 bg-[#102A43]/80 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-[#42C7E8] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#102A43]">
                STATION {station.number}
              </span>
              <span className="font-mono text-[10px] text-[#A9E8F5]">{station.zoneLabel}</span>
            </div>
            <h2 className="mt-1.5 text-base font-bold text-[#F4F7F8]">{station.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close station details"
            className="rounded-md border border-[#42C7E8]/25 bg-[#173B57]/70 p-1 text-[#8C9BA5] hover:border-[#42C7E8] hover:text-[#F4F7F8]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {station.custodyBanner && (
          <div className="mt-2 flex items-center gap-2 rounded border border-[#3CA77A]/60 bg-[#3CA77A]/15 px-2.5 py-1.5 font-mono text-[10px] font-bold text-[#3CA77A]">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>{station.custodyBanner} (Farm upstream ops excluded)</span>
          </div>
        )}

        {station.isDigitalStation && (
          <div className="mt-2 flex items-center gap-2 rounded border border-[#42C7E8]/50 bg-[#42C7E8]/15 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-[#A9E8F5]">
            <Database className="h-3.5 w-3.5 shrink-0" />
            <span>Compact Digital Information Station (No Physical Production)</span>
          </div>
        )}

        <p className="mt-2 text-xs leading-relaxed text-[#F4F7F8]/85">{station.summary}</p>
      </div>

      {/* Sub-Tabs */}
      <div className="grid grid-cols-4 border-b border-[#42C7E8]/20 bg-[#0A1C2E]/60 font-mono text-[10px]">
        {(
          [
            { id: 'MATERIAL', label: 'Material', icon: Package },
            { id: 'INFO', label: 'ERP / CRM', icon: Database },
            { id: 'EXCEPTIONS', label: `Exc (${stationExceptions.length})`, icon: ShieldAlert },
            { id: 'ANALYSIS', label: 'Analysis', icon: BarChart3 },
          ] as { id: PanelTab; label: string; icon: React.ComponentType<{ className?: string }> }[]
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center justify-center gap-1 border-b-2 py-2 transition-colors ${
              activeTab === id
                ? 'border-[#42C7E8] bg-[#173B57]/70 text-[#F4F7F8] font-bold'
                : 'border-transparent text-[#8C9BA5] hover:text-[#A9E8F5]'
            }`}
          >
            <Icon className="h-3 w-3" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 text-xs">
        {activeTab === 'MATERIAL' && (
          <>
            <section className="space-y-2">
              <h3 className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
                <Layers className="h-3.5 w-3.5" />
                <span>Physical Material Movement</span>
              </h3>
              <div className="space-y-2 rounded-lg border border-[#42C7E8]/20 bg-[#102A43]/70 p-3">
                <div>
                  <span className="font-mono text-[10px] text-[#8C9BA5]">INPUTS:</span>
                  <ul className="mt-1 space-y-1 text-[#F4F7F8]">
                    {station.materialMovement.inputs.map((inp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#42C7E8]">•</span>
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-[#42C7E8]/15 pt-2">
                  <span className="font-mono text-[10px] text-[#8C9BA5]">STAGE ACTIONS:</span>
                  <ul className="mt-1 space-y-1 text-[#A9E8F5]">
                    {station.materialMovement.actions.map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-mono text-[10px] text-[#42C7E8]">{i + 1}.</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-[#42C7E8]/15 pt-2">
                  <span className="font-mono text-[10px] text-[#8C9BA5]">OUTPUTS:</span>
                  <ul className="mt-1 space-y-1 text-[#3CA77A]">
                    {station.materialMovement.outputs.map((out, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
                <Users className="h-3.5 w-3.5" />
                <span>Operational Roles Involved</span>
              </h3>
              <div className="space-y-1.5">
                {station.operationalRoles.map((r) => (
                  <div key={r.role} className="rounded-lg border border-[#42C7E8]/20 bg-[#102A43]/70 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#F4F7F8]">{r.role}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[9px] ${
                          r.status === 'Confirmed Concept'
                            ? 'bg-[#3CA77A]/20 text-[#3CA77A]'
                            : 'bg-[#E9A23B]/20 text-[#E9A23B]'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#8C9BA5]">{r.responsibility}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-1.5">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
                3D Physical Assets Represented
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {station.visualAssetsList.map((asset) => (
                  <span
                    key={asset}
                    className="rounded border border-[#42C7E8]/25 bg-[#0A1C2E]/70 px-2 py-1 font-mono text-[10px] text-[#A9E8F5]"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'INFO' && (
          <>
            <div className="rounded-lg border border-[#42C7E8]/35 bg-[#102A43]/80 p-3">
              <div className="font-mono text-[10px] text-[#8C9BA5]">PRIMARY TRACEABILITY ANCHOR</div>
              <div className="mt-0.5 font-mono text-xs font-bold text-[#42C7E8]">
                {station.informationFlowSummary.primaryEntityId}
              </div>
              <div className="mt-2 space-y-1">
                <div className="font-mono text-[10px] text-[#8C9BA5]">ERP EVENTS:</div>
                {station.informationFlowSummary.erpEvents.map((ev) => (
                  <div key={ev} className="text-[11px] text-[#F4F7F8]">
                    • {ev}
                  </div>
                ))}
              </div>
              <div className="mt-2 space-y-1 border-t border-[#42C7E8]/15 pt-2">
                <div className="font-mono text-[10px] text-[#8C9BA5]">CRM EVENTS:</div>
                {station.informationFlowSummary.crmEvents.map((ev) => (
                  <div key={ev} className="text-[11px] text-[#A9E8F5]">
                    • {ev}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
                Stage Data Capture (Conceptual Sample)
              </h3>
              {station.keyDataShown.map((item) => (
                <div key={item.label} className="rounded-lg border border-[#42C7E8]/20 bg-[#102A43]/70 p-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[#F4F7F8]">{item.label}</span>
                    <CategoryTag category={item.category} />
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[#A9E8F5]">{item.sampleValue}</div>
                  {item.note && <div className="mt-0.5 text-[10px] text-[#E9A23B]">Note: {item.note}</div>}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
                  Structured Fields ({stationFields.length})
                </h3>
                <button
                  type="button"
                  onClick={() => onOpenInfoExplorer(station.id)}
                  className="font-mono text-[10px] font-bold text-[#42C7E8] hover:underline"
                >
                  Open Full Field Explorer →
                </button>
              </div>
              {stationFields.map((fld) => (
                <div key={fld.id} className="rounded border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[#F4F7F8]">{fld.fieldName}</span>
                    <CategoryTag category={fld.category} />
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-[#8C9BA5]">
                    {fld.systemOwnership} • {fld.requiredStatus} • {fld.dataType}
                  </div>
                  <div className="mt-1 text-[11px] text-[#A9E8F5]">{fld.analyticalPurpose}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'EXCEPTIONS' && (
          <>
            {station.unresolvedDecisions.length > 0 && (
              <div className="space-y-1.5 rounded-lg border border-[#E9A23B]/50 bg-[#E9A23B]/10 p-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#E9A23B]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>OPEN STAGE DECISIONS</span>
                </div>
                {station.unresolvedDecisions.map((dec, idx) => (
                  <p key={idx} className="text-[11px] text-[#F4F7F8]">
                    • {dec}
                  </p>
                ))}
              </div>
            )}

            <div className="space-y-2.5">
              {stationExceptions.map((exc) => {
                const isFocused = selectedExceptionId === exc.id;
                return (
                  <div
                    key={exc.id}
                    onClick={() => onSelectException(exc.id)}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                      isFocused
                        ? 'border-[#42C7E8] bg-[#173B57]'
                        : exc.severity === 'CRITICAL'
                        ? 'border-[#D9534F]/50 bg-[#D9534F]/10 hover:border-[#D9534F]'
                        : 'border-[#E9A23B]/45 bg-[#102A43]/75 hover:border-[#E9A23B]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-[#42C7E8]">{exc.id}</span>
                      <div className="flex flex-wrap items-center gap-1">
                        <span
                          className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                            exc.severity === 'CRITICAL'
                              ? 'bg-[#D9534F]/25 text-[#D9534F]'
                              : 'bg-[#E9A23B]/25 text-[#E9A23B]'
                          }`}
                        >
                          {exc.severity}
                        </span>
                        {!exc.decisionDefinedInSource && (
                          <span className="rounded border border-[#E9A23B] bg-[#E9A23B]/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#E9A23B]">
                            PROCESS DECISION REQUIRED
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="mt-1.5 font-semibold text-[#F4F7F8]">{exc.title}</h4>
                    <p className="mt-1 text-[11px] text-[#8C9BA5]">
                      <strong className="text-[#A9E8F5]">Trigger:</strong> {exc.trigger}
                    </p>
                    <p className="mt-1 text-[11px] text-[#8C9BA5]">
                      <strong className="text-[#A9E8F5]">Owner:</strong> {exc.responsibleRole}
                    </p>
                    <p className="mt-1 text-[11px] text-[#F4F7F8]">
                      <strong className="text-[#3CA77A]">Required Decision:</strong> {exc.requiredDecision}
                    </p>
                    <div className="mt-1.5 rounded bg-[#0A1C2E]/70 px-2 py-1 font-mono text-[10px] text-[#E9A23B]">
                      {exc.processDecisionNote}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'ANALYSIS' && (
          <div className="space-y-3">
            <div className="rounded border border-[#42C7E8]/30 bg-[#0A1C2E]/70 p-2.5 font-mono text-[10px] text-[#A9E8F5]">
              Analytical opportunities derived directly from Station {station.number} ERP &amp; CRM captures (No fabricated live operational values).
            </div>
            {station.analysisOpportunities.map((op) => (
              <div key={op.metricName} className="rounded-lg border border-[#42C7E8]/25 bg-[#102A43]/80 p-3">
                <div className="font-semibold text-[#F4F7F8]">{op.metricName}</div>
                <div className="mt-1.5 rounded bg-[#0A1C2E] px-2.5 py-1.5 font-mono text-[10px] text-[#42C7E8]">
                  {op.formula}
                </div>
                <p className="mt-1.5 text-[11px] text-[#8C9BA5]">{op.decisionValue}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
